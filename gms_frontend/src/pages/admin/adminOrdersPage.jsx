import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaShoppingCart,
  FaCheckCircle,
  FaTruck,
  FaDollarSign,
} from "react-icons/fa";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    shipping: 0,
    revenue: 0,
  });

  const API = import.meta.env.VITE_BACKEND_URL;

  const loadOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/orders`, {
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

  const handleUpdateStatus = async (id, currentStatus) => {
    const nextStatus = prompt(
      `Enter new status (PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED):`,
      currentStatus
    );
    if (!nextStatus) return;

    const upperStatus = nextStatus.trim().toUpperCase();
    const validStatuses = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];
    if (!validStatuses.includes(upperStatus)) {
      toast.error("Invalid status value");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ order_status: upperStatus }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Order status updated successfully");
        loadOrders();
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
      const res = await fetch(`${API}/orders/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Order deleted successfully");
        loadOrders();
      } else {
        toast.error(data.message || "Failed to delete order");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-8">
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
        {/* Table Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-[#2A2A2A]">
          <h2 className="text-2xl font-semibold text-white">Orders List</h2>
          <input 
            type="text" 
            placeholder="Search Orders..." 
            className="bg-[#1F1F1F] text-white px-4 py-2 rounded-xl border border-[#333333] focus:border-[#D4AF37] outline-none"
          />
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading orders...</div>
        ) : orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#D4AF37] text-black">
                  <th className="px-6 py-5 text-left">Order ID</th>
                  <th className="px-6 py-5 text-left">Customer</th>
                  <th className="px-6 py-5 text-left">Supplement</th>
                  <th className="px-6 py-5 text-left">Address</th>
                  <th className="px-6 py-5 text-left">Date</th>
                  <th className="px-6 py-5 text-left">Status</th>
                  <th className="px-6 py-5 text-left">Amount</th>
                  <th className="px-6 py-5 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.order_id} className="border-b border-[#2A2A2A] text-gray-300 hover:bg-[#1C1C1C] transition-all duration-300">
                    <td className="px-6 py-5 font-semibold text-white"> #ORD{order.order_id} </td>
                    <td className="px-6 py-5"> 
                      <div className="font-semibold text-white">{order.customer_name}</div>
                      <div className="text-xs text-gray-500">{order.customer_email}</div>
                    </td>
                    <td className="px-6 py-5 font-medium"> {order.product_name} (x{order.quantity}) </td>
                    <td className="px-6 py-5 max-w-[200px] truncate"> {order.delivery_address} </td>
                    <td className="px-6 py-5"> {new Date(order.order_date).toLocaleDateString()} </td>
                    <td className="px-6 py-5">
                      <span className={`px-4 py-2 rounded-full text-xs font-semibold border ${
                        order.order_status === "DELIVERED"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : order.order_status === "CANCELLED"
                          ? "bg-red-500/20 text-red-400 border-red-500/30"
                          : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                      }`}>
                        {order.order_status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-[#D4AF37] font-bold">Rs. {Number(order.total_amount).toLocaleString()}</td>
                    <td className="px-6 py-5">
                      <div className="flex gap-3">
                        <button 
                          onClick={() => handleUpdateStatus(order.order_id, order.order_status)} 
                          className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
                        >
                          Status
                        </button>
                        <button 
                          onClick={() => handleDeleteOrder(order.order_id)} 
                          className="bg-red-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-red-700 transition"
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
    </div>
  );
}