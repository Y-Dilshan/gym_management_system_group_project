import { NavLink, Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { LuUsers } from "react-icons/lu";
import {
  FaClipboardList,
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaDollarSign,
  FaCalendarAlt,
  FaEnvelope,
} from "react-icons/fa";
import { LiaThListSolid } from "react-icons/lia";
import {
  MdPayments,
  MdOutlineDashboardCustomize,
  MdSportsGymnastics,
} from "react-icons/md";
import { AiFillSchedule } from "react-icons/ai";
import { SiRevenuecat } from "react-icons/si";
import { IoIosSettings } from "react-icons/io";

import { API_BASE_URL as API } from "../utils/api.js";

export default function AdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard =
    location.pathname === "/admin" ||
    location.pathname === "/admin/dashboard" ||
    location.pathname === "/admin/";

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    if (!token || !userString) {
      navigate("/signin");
      return;
    }

    try {
      const parsed = JSON.parse(userString);
      if (parsed.role?.toUpperCase() !== "ADMIN") {
        toast.error("Access Denied. Admins only.");
        navigate("/");
        return;
      }
    } catch (e) {
      navigate("/signin");
      return;
    }

    if (isDashboard) {
      loadStats();
      loadRecentOrders();
    }
  }, [location.pathname]);

  const loadStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/users/admin/stats`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setStats(data);
      }
    } catch (err) {
      console.error("Error loading admin stats:", err);
    }
  };

  const loadRecentOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error("Error loading recent orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-[#D4AF37] text-black font-bold"
        : "text-white hover:bg-[#1A1A1A]"
    }`;

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white flex flex-col lg:flex-row relative">
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/80 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 z-50 w-[280px] h-screen bg-[#050505] border-r border-[#2A2A2A] pl-6 pt-6 pr-6 flex flex-col justify-between shrink-0 transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        <div>
          {/* Logo */}
          <div className="mb-8 flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <img src="/logo.png" alt="logo" className="w-[50px] h-[50px] object-contain" />
              <div className="flex flex-col">
                <h1 className="text-[#D4AF37] text-base font-bold leading-none">POWER ZONE</h1>
                <p className="text-gray-500 text-[10px] mt-1 tracking-widest uppercase">Admin Panel</p>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-zinc-400 hover:text-white text-xl">
              ✕
            </button>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4 overflow-y-auto max-h-[70vh] pr-2">
            <div>
              <h2 className="text-[#D4AF37] text-xs font-bold tracking-wider mb-2">OVERVIEW</h2>
              <NavLink to="/admin" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 text-white hover:bg-[#1A1A1A]" style={({ isActive }) => isActive && isDashboard ? { backgroundColor: "#D4AF37", color: "black", fontWeight: "bold" } : {}}>
                <MdOutlineDashboardCustomize size={20} /> Dashboard
              </NavLink>
            </div>

            <div>
              <h2 className="text-[#D4AF37] text-xs font-bold tracking-wider mb-2">MANAGEMENT</h2>
              <div className="flex flex-col gap-1.5">
                <NavLink to="/admin/products" onClick={() => setSidebarOpen(false)} className={navLinkClass}> <FaClipboardList size={20} /> Products </NavLink>
                <NavLink to="/admin/users" onClick={() => setSidebarOpen(false)} className={navLinkClass}> <LuUsers size={20} /> Users </NavLink>
                <NavLink to="/admin/orders" onClick={() => setSidebarOpen(false)} className={navLinkClass}> <LiaThListSolid size={20} /> Orders </NavLink>
                <NavLink to="/admin/memberships" onClick={() => setSidebarOpen(false)} className={navLinkClass}> <MdPayments size={20} /> Memberships </NavLink>
              </div>
            </div>

            <div>
              <h2 className="text-[#D4AF37] text-xs font-bold tracking-wider mb-2">CONTENT</h2>
              <div className="flex flex-col gap-1.5">
                <NavLink to="/admin/trainers" onClick={() => setSidebarOpen(false)} className={navLinkClass}> <MdSportsGymnastics size={20} /> Trainers </NavLink>
                <NavLink to="/admin/schedules" onClick={() => setSidebarOpen(false)} className={navLinkClass}> <AiFillSchedule size={20} /> Schedules & Bookings </NavLink>
                <NavLink to="/admin/trainer-applications" onClick={() => setSidebarOpen(false)} className={navLinkClass}> <FaUsers size={20} /> Applications </NavLink>
                <NavLink to="/admin/messages" onClick={() => setSidebarOpen(false)} className={navLinkClass}> <FaEnvelope size={18} /> Messages </NavLink>
              </div>
            </div>

            <div>
              <h2 className="text-[#D4AF37] text-xs font-bold tracking-wider mb-2">FINANCE</h2>
              <div className="flex flex-col gap-1.5">
                <NavLink to="/admin/revenue" onClick={() => setSidebarOpen(false)} className={navLinkClass}> <SiRevenuecat size={20} /> Revenue </NavLink>
                <NavLink to="/admin/settings" onClick={() => setSidebarOpen(false)} className={navLinkClass}> <IoIosSettings size={20} /> Settings </NavLink>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-6">
          <button onClick={handleLogout} className="w-full py-3 bg-red-950/20 text-red-500 rounded-xl font-bold border border-red-500/10 hover:bg-red-600 hover:text-white transition duration-200 cursor-pointer text-center">
            Logout Admin
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar for Mobile */}
        <div className="lg:hidden bg-[#050505] border-b border-[#2A2A2A] px-4 py-3 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="text-[#D4AF37] text-2xl p-1">
              ☰
            </button>
            <span className="font-bold text-white">Power Zone Admin</span>
          </div>
          <button onClick={handleLogout} className="text-xs text-red-400 border border-red-500/20 px-3 py-1.5 rounded-lg">
            Logout
          </button>
        </div>

        <main className="p-4 sm:p-6 md:p-8 flex-1 min-h-screen">
          {isDashboard && (
            <>
              {/* Header */}
              <div className="bg-gradient-to-r from-[#111111] to-[#1C1C1C] border border-[#D4AF37]/20 rounded-2xl shadow-xl p-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl sm:text-4xl font-bold text-white">Admin Dashboard</h1>
                  <p className="text-gray-400 mt-1 text-xs sm:text-sm">Manage your gym system efficiently with real-time stats</p>
                </div>
                <Link to="/admin/add-product" className="bg-[#D4AF37] text-black px-5 py-2.5 rounded-xl font-semibold hover:scale-105 transition text-sm shrink-0"> + Add Product </Link>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#141414] p-6 rounded-2xl border border-[#2A2A2A]">
                  <FaUsers className="text-[#D4AF37] text-3xl mb-3" />
                  <h3 className="text-gray-400 text-sm">Total Users</h3>
                  <p className="text-white text-3xl font-bold mt-2">{stats.totalUsers}</p>
                </div>

                <div className="bg-[#141414] p-6 rounded-2xl border border-[#2A2A2A]">
                  <FaBoxOpen className="text-[#D4AF37] text-3xl mb-3" />
                  <h3 className="text-gray-400 text-sm">Products</h3>
                  <p className="text-white text-3xl font-bold mt-2">{stats.totalProducts}</p>
                </div>

                <div className="bg-[#141414] p-6 rounded-2xl border border-[#2A2A2A]">
                  <FaShoppingCart className="text-[#D4AF37] text-3xl mb-3" />
                  <h3 className="text-gray-400 text-sm">Orders</h3>
                  <p className="text-white text-3xl font-bold mt-2">{stats.totalOrders}</p>
                </div>

                <div className="bg-[#141414] p-6 rounded-2xl border border-[#2A2A2A]">
                  <FaDollarSign className="text-[#D4AF37] text-3xl mb-3" />
                  <h3 className="text-gray-400 text-sm">Revenue</h3>
                  <p className="text-[#D4AF37] text-3xl font-bold mt-2">Rs. {Number(stats.totalRevenue).toLocaleString()}</p>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-[#141414] rounded-3xl border border-[#2A2A2A] overflow-hidden mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-6 py-5 border-b border-[#2A2A2A] gap-4">
                  <h2 className="text-xl sm:text-2xl text-white font-semibold">Recent Orders</h2>
                  <input type="text" placeholder="Search Orders..." className="bg-[#1F1F1F] text-white px-4 py-2 rounded-xl border border-[#333333] outline-none focus:border-[#D4AF37] text-sm w-full sm:w-auto"/>
                </div>

                {loading ? (
                  <div className="text-center py-10 text-zinc-500">Loading orders...</div>
                ) : orders.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-[#D4AF37] text-black text-xs font-bold uppercase">
                          <th className="px-6 py-4">Order ID</th>
                          <th className="px-6 py-4">Customer</th>
                          <th className="px-6 py-4">Date</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 5).map((order) => (
                          <tr key={order.order_id} className="border-b border-[#2A2A2A] hover:bg-[#1C1C1C] text-sm">
                            <td className="px-6 py-5 text-white font-mono">#ORD{order.order_id}</td>
                            <td className="px-6 py-5 text-gray-300 font-semibold">{order.customer_name}</td>
                            <td className="px-6 py-5 text-gray-300">{new Date(order.order_date).toLocaleDateString()}</td>
                            <td className="px-6 py-5">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                order.order_status === "DELIVERED" ? "bg-green-500/20 text-green-400" :
                                order.order_status === "CANCELLED" ? "bg-red-500/20 text-red-400" :
                                "bg-yellow-500/20 text-yellow-400"
                              }`}>
                                {order.order_status}
                              </span>
                            </td>
                            <td className="px-6 py-5 text-[#D4AF37] font-bold">Rs. {Number(order.total_amount).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-10 text-zinc-500">No orders logged in database.</div>
                )}
              </div>

            {/* Summary Cards */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-[#141414] rounded-3xl p-6 border border-[#2A2A2A]">
                <h2 className="text-white text-2xl font-bold mb-4">Membership Summary</h2>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Basic Monthly Plan</span>
                    <span className="text-white font-bold">120 Members</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Premium Plan</span>
                    <span className="text-white font-bold">85 Members</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Gold Club Access</span>
                    <span className="text-white font-bold">45 Members</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#141414] rounded-3xl p-6 border border-[#2A2A2A]">
                <h2 className="text-white text-2xl font-bold mb-4">Financial Overview</h2>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Membership Fees</span>
                    <span className="text-[#D4AF37] font-bold">Rs. 8,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Product Supplement Sales</span>
                    <span className="text-[#D4AF37] font-bold">Rs. {Number(stats.totalRevenue).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Account Gross</span>
                    <span className="text-green-400 font-bold">Rs. {(8200 + Number(stats.totalRevenue)).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Child Pages */}
        <Outlet />
      </main>
    </div>
  </div>
  );
}