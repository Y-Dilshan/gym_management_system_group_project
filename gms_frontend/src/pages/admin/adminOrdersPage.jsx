import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaShoppingCart,
  FaCheckCircle,
  FaTruck,
  FaDollarSign,
  FaEye,
  FaTimes,
  FaSearch
} from "react-icons/fa";
import { API_BASE_URL } from "../../utils/api.js";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    shipping: 0,
    revenue: 0,
  });

  const loadOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        const orderList = data.orders || [];
        setOrders(orderList);
        calculateStats(orderList);
      } else {
        toast.error("Failed to load orders");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error loading orders");
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (orderList) => {
    let total = orderList.length;
    let completed = 0;
    let shipping = 0;
    let revenue = 0;

    orderList.forEach((order) => {
      if (order.order_status === "DELIVERED") {
        completed++;
        revenue += parseFloat(order.total_amount);
      } else if (order.order_status === "SHIPPED" || order.order_status === "PROCESSING") {
        shipping++;
      }
    });

    setStats({ total, completed, shipping, revenue });
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleUpdateStatus = async (id, upperStatus) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ order_status: upperStatus }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(`Order #${id} status updated to ${upperStatus}`);
        loadOrders();
        if (selectedOrder && selectedOrder.order_id === id) {
          setSelectedOrder(prev => ({ ...prev, order_status: upperStatus }));
        }
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const handleDeleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Order deleted successfully");
        if (selectedOrder?.order_id === id) setSelectedOrder(null);
        loadOrders();
      } else {
        toast.error(data.message || "Failed to delete order");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const filteredOrders = orders.filter((order) => {
    const q = searchQuery.toLowerCase();
    return (
      order.order_id.toString().includes(q) ||
      order.customer_name?.toLowerCase().includes(q) ||
      order.customer_email?.toLowerCase().includes(q) ||
      order.delivery_address?.toLowerCase().includes(q) ||
      order.product_name?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-8 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#111111] to-[#1C1C1C] border border-[#D4AF37]/20 rounded-2xl shadow-2xl p-6 mb-8">
        <h1 className="text-4xl font-bold text-white tracking-wide">Orders Management</h1>
        <p className="text-gray-400 mt-2">Manage customer supplement orders and update shipping status</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#141414] p-6 rounded-2xl border border-[#D4AF37]/20">
          <FaShoppingCart className="text-[#D4AF37] text-3xl mb-3" />
          <h3 className="text-gray-400">Total Orders</h3>
          <p className="text-white text-3xl font-bold mt-2">{stats.total}</p>
        </div>

        <div className="bg-[#141414] p-6 rounded-2xl border border-[#D4AF37]/20">
          <FaCheckCircle className="text-green-400 text-3xl mb-3" />
          <h3 className="text-gray-400">Delivered</h3>
          <p className="text-white text-3xl font-bold mt-2">{stats.completed}</p>
        </div>

        <div className="bg-[#141414] p-6 rounded-2xl border border-[#D4AF37]/20">
          <FaTruck className="text-blue-400 text-3xl mb-3" />
          <h3 className="text-gray-400">Active Shipments</h3>
          <p className="text-white text-3xl font-bold mt-2">{stats.shipping}</p>
        </div>

        <div className="bg-[#141414] p-6 rounded-2xl border border-[#D4AF37]/20">
          <FaDollarSign className="text-[#D4AF37] text-3xl mb-3" />
          <h3 className="text-gray-400">Total Revenue</h3>
          <p className="text-[#D4AF37] text-3xl font-bold mt-2">Rs. {stats.revenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#141414] border border-[#D4AF37]/20 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.08)]">
        {/* Table Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-6 border-b border-[#2A2A2A] gap-4">
          <h2 className="text-2xl font-semibold text-white">Orders List</h2>
          <div className="relative w-full md:w-80">
            <FaSearch className="absolute left-4 top-3.5 text-gray-500 text-sm" />
            <input 
              type="text" 
              placeholder="Search order ID, customer, address..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1F1F1F] text-white pl-10 pr-4 py-2.5 rounded-xl border border-[#333333] focus:border-[#D4AF37] outline-none text-sm"
            />
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading orders...</div>
        ) : filteredOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#D4AF37] text-black text-sm uppercase tracking-wider">
                  <th className="px-6 py-5 font-bold">Order ID</th>
                  <th className="px-6 py-5 font-bold">Customer</th>
                  <th className="px-6 py-5 font-bold">Supplement</th>
                  <th className="px-6 py-5 font-bold">Delivery Address</th>
                  <th className="px-6 py-5 font-bold">Date</th>
                  <th className="px-6 py-5 font-bold">Status</th>
                  <th className="px-6 py-5 font-bold">Amount</th>
                  <th className="px-6 py-5 font-bold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2A2A]">
                {filteredOrders.map((order) => (
                  <tr key={order.order_id} className="text-gray-300 hover:bg-[#1C1C1C] transition-all duration-300">
                    <td className="px-6 py-5 font-semibold text-white whitespace-nowrap"> #ORD{order.order_id} </td>
                    <td className="px-6 py-5 min-w-[180px]"> 
                      <div className="font-semibold text-white">{order.customer_name}</div>
                      <div className="text-xs text-gray-400">{order.customer_email}</div>
                    </td>
                    <td className="px-6 py-5 font-medium min-w-[160px]"> {order.product_name} (x{order.quantity}) </td>
                    <td className="px-6 py-5 min-w-[240px] max-w-[320px] whitespace-normal break-words text-sm text-gray-300 leading-snug">
                      {order.delivery_address}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm"> {new Date(order.order_date).toLocaleDateString()} </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <select
                        value={order.order_status}
                        onChange={(e) => handleUpdateStatus(order.order_id, e.target.value)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold border outline-none cursor-pointer ${
                          order.order_status === "DELIVERED"
                            ? "bg-green-950/80 text-green-400 border-green-500/40"
                            : order.order_status === "CANCELLED"
                            ? "bg-red-950/80 text-red-400 border-red-500/40"
                            : order.order_status === "SHIPPED"
                            ? "bg-blue-950/80 text-blue-400 border-blue-500/40"
                            : "bg-yellow-950/80 text-yellow-400 border-yellow-500/40"
                        }`}
                      >
                        <option value="PENDING" className="bg-zinc-900 text-yellow-400">PENDING</option>
                        <option value="PROCESSING" className="bg-zinc-900 text-blue-400">PROCESSING</option>
                        <option value="SHIPPED" className="bg-zinc-900 text-blue-400">SHIPPED</option>
                        <option value="DELIVERED" className="bg-zinc-900 text-green-400">DELIVERED</option>
                        <option value="CANCELLED" className="bg-zinc-900 text-red-400">CANCELLED</option>
                      </select>
                    </td>
                    <td className="px-6 py-5 text-[#D4AF37] font-bold whitespace-nowrap">Rs. {Number(order.total_amount).toLocaleString()}</td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => setSelectedOrder(order)}
                          className="bg-zinc-800 hover:bg-zinc-700 text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-2 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <FaEye /> View
                        </button>
                        <button 
                          onClick={() => handleDeleteOrder(order.order_id)} 
                          className="bg-red-600/90 hover:bg-red-700 text-white px-3 py-2 rounded-xl font-semibold text-xs transition cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">No orders found</div>
        )}
      </div>

      {/* Order Details Modal Popup */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#141414] border border-[#D4AF37]/30 text-white w-full max-w-xl rounded-3xl p-6 shadow-2xl space-y-6 relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setSelectedOrder(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white text-xl p-2 rounded-full hover:bg-zinc-800 transition cursor-pointer"
            >
              <FaTimes />
            </button>

            <div className="border-b border-[#2A2A2A] pb-4">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">Order Details</span>
              <h2 className="text-2xl font-bold text-white mt-1">Order #ORD{selectedOrder.order_id}</h2>
              <p className="text-xs text-gray-400 mt-1">Placed on {new Date(selectedOrder.order_date).toLocaleString()}</p>
            </div>

            <div className="space-y-4 text-sm">
              {/* Customer Info */}
              <div className="bg-[#1C1C1C] border border-zinc-800 rounded-2xl p-4 space-y-2">
                <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Customer Information</h3>
                <p className="font-semibold text-white text-base">{selectedOrder.customer_name}</p>
                <p className="text-gray-400 text-xs">{selectedOrder.customer_email}</p>
              </div>

              {/* Delivery Address */}
              <div className="bg-[#1C1C1C] border border-zinc-800 rounded-2xl p-4 space-y-1">
                <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Delivery Address</h3>
                <p className="text-gray-200 font-medium leading-relaxed whitespace-pre-wrap">{selectedOrder.delivery_address}</p>
              </div>

              {/* Order Items & Total */}
              <div className="bg-[#1C1C1C] border border-zinc-800 rounded-2xl p-4 space-y-3">
                <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Supplement Item</h3>
                <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                  <span className="font-medium text-white">{selectedOrder.product_name} × {selectedOrder.quantity}</span>
                  <span className="font-bold text-[#D4AF37]">Rs. {Number(selectedOrder.total_amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-base font-bold pt-1">
                  <span>Total Amount Paid</span>
                  <span className="text-xl text-[#D4AF37]">Rs. {Number(selectedOrder.total_amount).toLocaleString()}</span>
                </div>
              </div>

              {/* Status Update */}
              <div className="flex items-center justify-between bg-[#1C1C1C] border border-zinc-800 rounded-2xl p-4">
                <span className="font-semibold text-gray-300">Order Status:</span>
                <select
                  value={selectedOrder.order_status}
                  onChange={(e) => handleUpdateStatus(selectedOrder.order_id, e.target.value)}
                  className="px-4 py-2 rounded-xl text-xs font-bold border outline-none bg-zinc-900 text-[#D4AF37] border-[#D4AF37]/50 cursor-pointer"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="PROCESSING">PROCESSING</option>
                  <option value="SHIPPED">SHIPPED</option>
                  <option value="DELIVERED">DELIVERED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full py-3 bg-[#D4AF37] hover:bg-[#b8962d] text-black font-bold rounded-xl transition cursor-pointer text-center"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}