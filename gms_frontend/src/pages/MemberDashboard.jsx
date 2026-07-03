import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import gymImage from "../assets/hero.png";

export default function MemberDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const parsed = JSON.parse(userString);
        setUser(parsed);
        loadOrders();
      } catch (err) {
        console.error(err);
      }
    } else {
      navigate("/signin");
    }
  }, []);

  const loadOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/orders/my-orders`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error(err);
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

  // Calculate BMI
  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 24.9) return "Healthy Range";
    if (bmi < 29.9) return "Overweight";
    return "Obese";
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-[280px] bg-[#0B0B0B] border-r border-yellow-500/10 flex flex-col shrink-0">
        {/* Logo */}
        <div className="px-6 pt-7 pb-6 border-b border-yellow-500/10">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Power Zone"
              className="w-12 h-12"
            />
            <div>
              <h1 className="text-[20px] font-bold leading-none">
                <span className="text-white">POWER </span>
                <span className="text-yellow-400">ZONE</span>
              </h1>
              <p className="text-[11px] text-gray-400 tracking-[2px] mt-1">
                PREMIUM GYM
              </p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="px-6 pt-12">
          <div className="space-y-6">
            <button 
              onClick={() => navigate("/dashboard")} 
              className="w-full bg-yellow-500 text-black py-4 rounded-xl font-semibold text-left px-6"
            >
              Dashboard
            </button>

            <button 
              onClick={() => navigate("/products")} 
              className="w-full py-2 px-6 rounded-xl text-left hover:bg-white/5"
            >
              Supplements Store
            </button>

            <button 
              onClick={() => navigate("/schedules")} 
              className="w-full py-2 px-6 rounded-xl text-left hover:bg-white/5"
            >
              Schedules
            </button>

            <button 
              onClick={() => navigate("/trainers")} 
              className="w-full py-2 px-6 rounded-xl text-left hover:bg-white/5"
            >
              Trainers
            </button>

            <button 
              onClick={() => navigate("/profile")} 
              className="w-full py-2 px-6 rounded-xl text-left hover:bg-white/5"
            >
              Edit Profile
            </button>

            <button 
              onClick={handleLogout} 
              className="w-full py-2 px-6 rounded-xl text-left text-red-400 hover:bg-red-500/10"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Push image card to bottom */}
        <div className="flex-1"></div>

        {/* Advertisement Card */}
        <div className="px-5 pb-5">
          <div className="bg-[#111111] rounded-3xl overflow-hidden border border-yellow-500/10">
            <img
              src={gymImage}
              alt="Gym"
              className="w-full h-40 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-bold leading-tight">BE STRONGER</h2>
              <h2 className="text-xl font-bold text-yellow-400 leading-tight">THAN YOUR</h2>
              <h2 className="text-xl font-bold leading-tight">EXCUSES</h2>
              <p className="text-gray-300 mt-2 text-sm">Keep Pushing 💪</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="h-20 border-b border-yellow-500/20 bg-[#0A0A0A] flex items-center justify-between px-10">
          <div className="flex gap-12 font-medium text-gray-400">
            <span 
              onClick={() => navigate("/dashboard")} 
              className="text-yellow-400 border-b-2 border-yellow-400 pb-1 cursor-pointer"
            >
              Dashboard
            </span>
            <span onClick={() => navigate("/products")} className="hover:text-white cursor-pointer">Supplements</span>
            <span onClick={() => navigate("/trainers")} className="hover:text-white cursor-pointer">Trainers</span>
            <span onClick={() => navigate("/schedules")} className="hover:text-white cursor-pointer">Schedules</span>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/products")} className="relative p-2 text-gray-400 hover:text-white transition">
              <FaCartShopping size={22} />
            </button>
            
            <img
              src={user?.profile_picture ? `${API}${user.profile_picture}` : "https://i.pravatar.cc/100"}
              alt="profile"
              className="w-10 h-10 rounded-full border-2 border-yellow-500 object-cover"
            />
            <span>{user?.full_name || "Member"}</span>
          </div>
        </header>

        {/* Content */}
        <main className="p-8 flex-1 overflow-y-auto">
          {/* Hero Card */}
          <div className="rounded-3xl border border-yellow-500/20 bg-[#111111] px-10 py-10">
            <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-8">
              <div className="col-span-2">
                <p className="text-xl text-gray-400">Welcome Back,</p>
                <h1 className="text-4xl font-bold text-yellow-400 mt-2">
                  {user?.full_name || "Gym Member"} 💪
                </h1>
              </div>

              <div className="border-l border-white/10 pl-8">
                <p className="text-gray-400">Current Plan</p>
                <h3 className="text-xl text-yellow-400 font-bold mt-2">
                  Gold Membership
                </h3>
              </div>

              <div className="border-l border-white/10 pl-8">
                <p className="text-gray-400">Status</p>
                <p className="text-green-400 text-lg font-bold mt-2">
                  {user?.status || "Active"}
                </p>
              </div>

              <div className="border-l border-white/10 pl-8">
                <p className="text-gray-400">Join Date</p>
                <p className="text-yellow-400 text-lg font-bold mt-2">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "05 Jun 2026"}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {/* Membership */}
            <div className="bg-[#111111] rounded-2xl p-6 border border-white/5">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-yellow-400 text-2xl">
                🏋️
              </div>
              <p className="text-gray-400 mt-4 text-sm">Membership Status</p>
              <h2 className="text-yellow-400 text-3xl font-bold mt-1">Active</h2>
              <p className="text-gray-500 mt-2 text-xs">Standard monthly access</p>
            </div>

            {/* Attendance */}
            <div className="bg-[#111111] rounded-2xl p-6 border border-white/5">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-green-400 text-2xl">
                📅
              </div>
              <p className="text-gray-400 mt-4 text-sm">Attendance</p>
              <h2 className="text-green-400 text-3xl font-bold mt-1">12 Days</h2>
              <p className="text-gray-500 mt-2 text-xs">This month</p>
            </div>

            {/* BMI */}
            <div className="bg-[#111111] rounded-2xl p-6 border border-white/5">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-blue-400 text-2xl">
                💙
              </div>
              <p className="text-gray-400 mt-4 text-sm">BMI Score</p>
              <h2 className="text-blue-400 text-3xl font-bold mt-1">22.4</h2>
              <p className="text-gray-500 mt-2 text-xs">{getBMICategory(22.4)}</p>
            </div>

            {/* Payments */}
            <div className="bg-[#111111] rounded-2xl p-6 border border-white/5">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-yellow-400 text-2xl">
                💳
              </div>
              <p className="text-gray-400 mt-4 text-sm">Payments</p>
              <h2 className="text-yellow-400 text-3xl font-bold mt-1">Rs. 15,000</h2>
              <p className="text-gray-500 mt-2 text-xs">Total plan fees paid</p>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="mt-8 bg-[#111111] rounded-2xl p-8 border border-white/5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Supplement Orders</h2>
              <button onClick={() => navigate("/products")} className="text-yellow-400 text-sm hover:underline">
                Buy More Supplements
              </button>
            </div>

            {loading ? (
              <div className="text-center py-6 text-gray-500">Loading orders...</div>
            ) : orders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-400 border-b border-white/10">
                      <th className="pb-4">Order ID</th>
                      <th className="pb-4">Supplement</th>
                      <th className="pb-4">Order Date</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.order_id} className="border-b border-white/5 hover:bg-white/5 transition">
                        <td className="py-4">#ORD{order.order_id}</td>
                        <td className="font-semibold">{order.product_name}</td>
                        <td>{new Date(order.order_date).toLocaleDateString()}</td>
                        <td>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase ${
                            order.order_status === "DELIVERED"
                              ? "bg-green-500/20 text-green-400"
                              : order.order_status === "CANCELLED"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}>
                            {order.order_status}
                          </span>
                        </td>
                        <td className="text-yellow-400 font-bold">Rs. {Number(order.total_amount).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">No orders found</p>
                <p className="text-sm mt-1">Explore our shop to purchase gym supplements!</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}