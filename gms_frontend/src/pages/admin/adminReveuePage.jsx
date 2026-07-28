import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  FaDollarSign,
  FaChartLine,
  FaUsers,
  FaShoppingCart,
} from "react-icons/fa";

export default function AdminRevenuePage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    loadRevenueDetails();
  }, []);

  const loadRevenueDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      
      // Load stats
      const statsRes = await fetch(`${API}/users/admin/stats`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const statsData = await statsRes.json();
      if (statsRes.ok) {
        setStats(statsData);
      }

      // Load orders
      const ordersRes = await fetch(`${API}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const ordersData = await ordersRes.json();
      if (ordersRes.ok) {
        setOrders(ordersData.orders || []);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load financial records");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">

      {/* Header */}
      <div className="bg-gradient-to-r from-[#111111] to-[#1C1C1C] border border-[#D4AF37]/20 rounded-2xl shadow-2xl p-6 mb-8">
        <h1 className="text-4xl font-bold text-white tracking-wide"> Revenue Management </h1>
        <p className="text-gray-400 mt-2"> Monitor gym earnings, supplement store transactions and financial logs </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#141414] p-6 rounded-2xl border border-[#D4AF37]/20">
          <FaDollarSign className="text-[#D4AF37] text-3xl mb-3" />
          <h3 className="text-gray-400">Total Supplements Revenue</h3>
          <p className="text-[#D4AF37] text-3xl font-bold mt-2">Rs. {Number(stats.totalRevenue).toLocaleString()}</p>
        </div>

        <div className="bg-[#141414] p-6 rounded-2xl border border-[#D4AF37]/20">
          <FaChartLine className="text-green-400 text-3xl mb-3" />
          <h3 className="text-gray-400">Transactions Count</h3>
          <p className="text-white text-3xl font-bold mt-2">{stats.totalOrders} Purchases</p>
        </div>

        <div className="bg-[#141414] p-6 rounded-2xl border border-[#D4AF37]/20">
          <FaUsers className="text-blue-400 text-3xl mb-3" />
          <h3 className="text-gray-400">Base User Base</h3>
          <p className="text-white text-3xl font-bold mt-2">{stats.totalUsers} Clients</p>
        </div>

        <div className="bg-[#141414] p-6 rounded-2xl border border-[#D4AF37]/20">
          <FaShoppingCart className="text-purple-400 text-3xl mb-3" />
          <h3 className="text-gray-400">Product Items</h3>
          <p className="text-white text-3xl font-bold mt-2">{stats.totalProducts} Cataloged</p>
        </div>

      </div>

      {/* Revenue Table */}
      <div className="bg-[#141414] border border-[#D4AF37]/20 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.08)]">
        {/* Table Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-[#2A2A2A]">
          <h2 className="text-2xl font-semibold text-white"> Supplement Orders Transaction History </h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-10 text-zinc-500">Loading revenue records...</div>
          ) : orders.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="bg-[#D4AF37] text-black">
                  <th className="px-6 py-5 text-left font-semibold">Order ID</th>
                  <th className="px-6 py-5 text-left font-semibold">Source type</th>
                  <th className="px-6 py-5 text-left font-semibold">Customer</th>
                  <th className="px-6 py-5 text-left font-semibold">Amount</th>
                  <th className="px-6 py-5 text-left font-semibold">Date</th>
                  <th className="px-6 py-5 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item) => (
                  <tr key={item.order_id} className="border-b border-[#2A2A2A] text-gray-300 hover:bg-[#1C1C1C] transition-all duration-300">
                    <td className="px-6 py-5 text-white font-mono text-xs font-semibold"> #ORD{item.order_id} </td>
                    <td className="px-6 py-5 font-bold text-white"> Supplement purchase </td>
                    <td className="px-6 py-5"> {item.customer_name} </td>
                    <td className="px-6 py-5 text-[#D4AF37] font-bold"> Rs. {Number(item.total_amount).toLocaleString()} </td>
                    <td className="px-6 py-5"> {new Date(item.order_date).toLocaleDateString()} </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        item.order_status === "DELIVERED" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                        item.order_status === "CANCELLED" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                        "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                      }`}>
                        {item.order_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-10 text-zinc-500">No supplements purchase logs available.</div>
          )}
        </div>
      </div>
    </div>
  );
}