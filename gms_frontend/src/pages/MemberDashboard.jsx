import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaUserCircle, FaCalendarAlt, FaAppleAlt } from "react-icons/fa";
import { FaCartShopping, FaDumbbell } from "react-icons/fa6";
import gymImage from "../assets/hero.png";

export default function MemberDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [classSchedules, setClassSchedules] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [activeView, setActiveView] = useState(location.state?.activeView || "dashboard"); // dashboard, bookings, orders, schedules

  // Reschedule Form State
  const [rescheduleId, setRescheduleId] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newSlot, setNewSlot] = useState("08:00 AM");

  const API = import.meta.env.VITE_BACKEND_URL;

  const timeSlots = [
    "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", 
    "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const parsed = JSON.parse(userString);
        setUser(parsed);
        loadUserDetails(parsed.user_id);
        loadOrders();
        loadBookings();
        loadClassSchedules();
      } catch (err) {
        console.error(err);
      }
    } else {
      navigate("/signin");
    }

    if (location.state?.activeView) {
      setActiveView(location.state.activeView);
    }
  }, [location]);

  const loadClassSchedules = () => {
    const saved = JSON.parse(localStorage.getItem("my_schedules") || "[]");
    setClassSchedules(saved);
  };

  const handleCancelClassSchedule = (id, day) => {
    const updated = classSchedules.filter((s) => !(s.id === id && s.day === day));
    setClassSchedules(updated);
    localStorage.setItem("my_schedules", JSON.stringify(updated));
    toast.success("Class reservation cancelled");
  };

  const loadUserDetails = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
    } catch (err) {
      console.error(err);
    }
  };

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
      setLoadingOrders(false);
    }
  };

  const loadBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/bookings/my-bookings`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setBookedSlots(data.bookings || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingBookings(false);
    }
  };

  const setBookedSlots = (bookingList) => {
    setBookings(bookingList);
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this trainer session?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/bookings/${bookingId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: "CANCELLED" })
      });

      if (res.ok) {
        toast.success("Booking cancelled successfully");
        loadBookings();
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to cancel booking");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleRescheduleSubmit = async (e) => {
    e.preventDefault();
    if (!newDate) {
      toast.error("Please choose a date");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/bookings/${rescheduleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          booking_date: newDate,
          time_slot: newSlot
        })
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Booking rescheduled. Status reset to Pending.");
        setRescheduleId(null);
        loadBookings();
      } else {
        toast.error(data.error || "Rescheduling failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 24.9) return "Healthy Range";
    if (bmi < 29.9) return "Overweight";
    return "Obese";
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row relative">
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/80 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static top-0 left-0 z-50 h-full w-[280px] bg-[#0B0B0B] border-r border-yellow-500/10 flex flex-col shrink-0 transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        
        {/* Logo */}
        <div className="px-6 pt-7 pb-6 border-b border-yellow-500/10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Power Zone" className="w-10 h-10 md:w-12 md:h-12" />
            <div>
              <h1 className="text-[18px] md:text-[20px] font-bold leading-none">
                <span className="text-white">POWER </span>
                <span className="text-yellow-400">ZONE</span>
              </h1>
              <p className="text-[10px] md:text-[11px] text-gray-400 tracking-[2px] mt-1">PREMIUM GYM</p>
            </div>
          </div>

          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-zinc-400 hover:text-white text-xl">
            ✕
          </button>
        </div>

        {/* Menu */}
        <div className="px-6 pt-6 space-y-2 overflow-y-auto">
          <button 
            onClick={() => { setActiveView("dashboard"); setSidebarOpen(false); }} 
            className={`w-full py-3 rounded-xl font-bold text-left px-5 text-sm transition ${
              activeView === "dashboard" ? "bg-[#D4AF37] text-black" : "text-zinc-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            Dashboard Overview
          </button>

          <button 
            onClick={() => { setActiveView("bookings"); setSidebarOpen(false); }} 
            className={`w-full py-3 rounded-xl font-bold text-left px-5 text-sm transition ${
              activeView === "bookings" ? "bg-[#D4AF37] text-black" : "text-zinc-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            My Trainer Sessions
          </button>

          <button 
            onClick={() => { setActiveView("orders"); setSidebarOpen(false); }} 
            className={`w-full py-3 rounded-xl font-bold text-left px-5 text-sm transition ${
              activeView === "orders" ? "bg-[#D4AF37] text-black" : "text-zinc-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            My Supplement Orders
          </button>

          <button 
            onClick={() => { setActiveView("schedules"); setSidebarOpen(false); }} 
            className={`w-full py-3 rounded-xl font-bold text-left px-5 text-sm transition ${
              activeView === "schedules" ? "bg-[#D4AF37] text-black" : "text-zinc-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            My Class Schedules
          </button>

          <div className="border-t border-zinc-800 my-4 pt-4 space-y-2">
            <button onClick={() => { setSidebarOpen(false); navigate("/products"); }} className="w-full py-2 px-5 text-left text-sm text-zinc-400 hover:text-white flex items-center gap-2">
              <FaCartShopping size={14} className="text-[#D4AF37]" /> Supplement Store
            </button>
            <button onClick={() => { setSidebarOpen(false); navigate("/schedules"); }} className="w-full py-2 px-5 text-left text-sm text-zinc-400 hover:text-white flex items-center gap-2">
              <FaDumbbell size={14} className="text-[#D4AF37]" /> Workout Schedules
            </button>
            <button onClick={() => { setSidebarOpen(false); navigate("/dietplans"); }} className="w-full py-2 px-5 text-left text-sm text-zinc-400 hover:text-white flex items-center gap-2">
              <FaAppleAlt size={14} className="text-[#D4AF37]" /> Diet Plans
            </button>
            <button onClick={() => { setSidebarOpen(false); navigate("/profile"); }} className="w-full py-2 px-5 text-left text-sm text-zinc-400 hover:text-white flex items-center gap-2">
              <FaUserCircle size={14} className="text-[#D4AF37]" /> Edit Profile
            </button>
          </div>

          <button onClick={handleLogout} className="w-full py-3 px-5 rounded-xl text-left text-red-500 hover:bg-red-950/20 text-sm font-bold transition">
            Logout
          </button>
        </div>

        <div className="flex-1"></div>

        {/* Ad Card */}
        <div className="px-5 pb-5 hidden lg:block">
          <div className="bg-[#111111] rounded-3xl overflow-hidden border border-yellow-500/10">
            <img src="/logo.png" alt="Gym" className="w-full h-24 object-contain p-2" />
            <div className="p-4">
              <h2 className="text-sm font-bold leading-tight">BE STRONGER</h2>
              <h2 className="text-sm font-bold text-yellow-400 leading-tight">THAN EXCUSES</h2>
              <p className="text-gray-400 mt-1 text-xs">POWER 
                                <span className="text-yellow-400"> ZONE</span> 💪</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Navbar */}
        <header className="h-16 md:h-20 border-b border-zinc-800 bg-[#0A0A0A] flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-yellow-400 text-2xl p-1">
              ☰
            </button>
            <div className="hidden sm:flex gap-6 font-semibold text-zinc-400 text-sm md:text-base">
              <span onClick={() => setActiveView("dashboard")} className={`cursor-pointer ${activeView === "dashboard" ? "text-yellow-400" : "hover:text-white"}`}>Dashboard</span>
              {user?.role?.toUpperCase() !== "TRAINER" && (
                <>
                  <span onClick={() => navigate("/trainers")} className="hover:text-white cursor-pointer">Trainers</span>
                  <span onClick={() => navigate("/schedules")} className="hover:text-white cursor-pointer">Schedules</span>
                </>
              )}
              <span onClick={() => navigate("/dietplans")} className="hover:text-white cursor-pointer">Diet Plans</span>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <button onClick={() => navigate("/cart")} className="p-2 text-zinc-400 hover:text-white transition">
              <FaCartShopping size={18} />
            </button>
            <span className="text-xs md:text-sm font-semibold truncate max-w-[120px]">{user?.full_name || "Member"}</span>
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#D4AF37] text-black font-extrabold flex items-center justify-center border-2 border-yellow-500 text-xs md:text-sm shrink-0">
              {user?.full_name?.charAt(0) || "M"}
            </div>
          </div>
        </header>

        {/* Content Container */}
        <main className="p-8 flex-1 overflow-y-auto">
          
          {/* Active View: Dashboard */}
          {activeView === "dashboard" && (
            <div className="space-y-8">
              {/* Welcome Card */}
              <div className="rounded-3xl border border-yellow-500/10 bg-[#111] p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl"></div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                  <div className="col-span-2">
                    <p className="text-zinc-500 text-sm font-bold uppercase tracking-wider">Welcome Back,</p>
                    <h1 className="text-3xl font-extrabold text-white mt-1">
                      {user?.full_name || "Gym Member"} <span className="text-[#D4AF37]">💪</span>
                    </h1>
                    <p className="text-xs text-zinc-400 mt-2">Check details, scheduled trainers and meal guides below.</p>
                  </div>
                  <div className="border-l border-zinc-800 pl-6">
                    <p className="text-zinc-500 text-xs font-semibold">Tier Plan</p>
                    <h3 className="text-lg text-yellow-400 font-bold mt-1">Gold Membership</h3>
                  </div>
                  <div className="border-l border-zinc-800 pl-6">
                    <p className="text-zinc-500 text-xs font-semibold">Account status</p>
                    <p className="text-green-400 font-bold mt-1 text-lg">{user?.status || "Active"}</p>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                <div className="bg-[#111] rounded-2xl p-6 border border-zinc-800">
                  <span className="text-2xl">📅</span>
                  <p className="text-zinc-400 mt-4 text-xs font-semibold">Trainer Sessions</p>
                  <h2 className="text-[#D4AF37] text-2xl font-bold mt-1">
                    {bookings.filter(b => b.status === 'ACCEPTED').length} Active
                  </h2>
                  <p className="text-[10px] text-zinc-500 mt-1">Booked with professional trainers</p>
                </div>
                <div className="bg-[#111] rounded-2xl p-6 border border-zinc-800 cursor-pointer hover:border-yellow-500/30 transition" onClick={() => setActiveView("schedules")}>
                  <span className="text-2xl">🏋️‍♂️</span>
                  <p className="text-zinc-400 mt-4 text-xs font-semibold">Class Schedules</p>
                  <h2 className="text-[#D4AF37] text-2xl font-bold mt-1">
                    {classSchedules.length} Reserved
                  </h2>
                  <p className="text-[10px] text-zinc-500 mt-1">Group workout classes</p>
                </div>
                <div className="bg-[#111] rounded-2xl p-6 border border-zinc-800">
                  <span className="text-2xl">⚡</span>
                  <p className="text-zinc-400 mt-4 text-xs font-semibold">BMI Status</p>
                  <h2 className="text-[#D4AF37] text-2xl font-bold mt-1">22.4</h2>
                  <p className="text-[10px] text-zinc-500 mt-1">{getBMICategory(22.4)}</p>
                </div>
                <div className="bg-[#111] rounded-2xl p-6 border border-zinc-800">
                  <span className="text-2xl">📦</span>
                  <p className="text-zinc-400 mt-4 text-xs font-semibold">Supplements Purchases</p>
                  <h2 className="text-[#D4AF37] text-2xl font-bold mt-1">{orders.length} Orders</h2>
                  <p className="text-[10px] text-zinc-500 mt-1">Fuel & protein intake details</p>
                </div>
              </div>

              {/* Quick Summary Panels */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Bookings Shortlist */}
                <div className="bg-[#111] border border-zinc-800 rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-white">Upcoming Sessions</h2>
                    <button onClick={() => setActiveView("bookings")} className="text-xs text-[#D4AF37] hover:underline font-bold">See All</button>
                  </div>
                  {bookings.length > 0 ? (
                    <div className="space-y-3">
                      {bookings.slice(0, 3).map((b) => (
                        <div key={b.booking_id} className="p-3 bg-zinc-950 rounded-xl border border-zinc-900 flex justify-between items-center">
                          <div>
                            <p className="font-bold text-[#D4AF37] text-sm">{b.trainer_name}</p>
                            <p className="text-xs text-zinc-400">{new Date(b.booking_date).toLocaleDateString()} @ {b.time_slot}</p>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            b.status === "ACCEPTED" ? "bg-green-500/10 text-green-400" : b.status === "PENDING" ? "bg-yellow-500/10 text-yellow-400" : "bg-red-500/10 text-red-400"
                          }`}>{b.status}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-zinc-500 text-sm">
                      No sessions booked.{" "}
                      <Link to="/trainers" className="text-[#D4AF37] hover:underline">Find a Trainer</Link>
                    </div>
                  )}
                </div>

                {/* Orders Shortlist */}
                <div className="bg-[#111] border border-zinc-800 rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-white">Recent Orders</h2>
                    <button onClick={() => setActiveView("orders")} className="text-xs text-[#D4AF37] hover:underline font-bold">See All</button>
                  </div>
                  {orders.length > 0 ? (
                    <div className="space-y-3">
                      {orders.slice(0, 3).map((o) => (
                        <div key={o.order_id} className="p-3 bg-zinc-950 rounded-xl border border-zinc-900 flex justify-between items-center text-sm">
                          <div>
                            <p className="font-bold text-zinc-300 line-clamp-1">{o.product_name}</p>
                            <p className="text-xs text-zinc-500">{new Date(o.order_date).toLocaleDateString()}</p>
                          </div>
                          <span className="text-[#D4AF37] font-bold">Rs. {Number(o.total_amount).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-zinc-500 text-sm">
                      No order logs.{" "}
                      <Link to="/products" className="text-[#D4AF37] hover:underline">Shop Supplements</Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Active View: Bookings */}
          {activeView === "bookings" && (
            <div className="bg-[#111] border border-zinc-800 rounded-3xl p-8 space-y-6">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                <h2 className="text-2xl font-bold">Your Trainer Bookings</h2>
                <button onClick={() => navigate("/trainers")} className="bg-[#D4AF37] text-black px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#b8962d] transition">
                  Book New Session
                </button>
              </div>

              {loadingBookings ? (
                <div className="text-zinc-500 text-center py-10">Loading bookings...</div>
              ) : bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.booking_id} className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-yellow-500 text-lg border border-zinc-800">
                          👤
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-white">{booking.trainer_name}</h3>
                          <p className="text-xs text-zinc-400 font-medium">Specialization: {booking.trainer_specialization || "General Fitness"}</p>
                          <p className="text-xs text-zinc-500 mt-1">Date: <span className="text-[#D4AF37]">{new Date(booking.booking_date).toLocaleDateString()}</span> | Time Slot: <span className="text-[#D4AF37]">{booking.time_slot}</span></p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 justify-between border-t md:border-t-0 pt-4 md:pt-0 border-zinc-900">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          booking.status === "ACCEPTED" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                          booking.status === "REJECTED" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                          booking.status === "CANCELLED" ? "bg-zinc-800 text-zinc-500 border border-zinc-700" :
                          "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                        }`}>{booking.status}</span>

                        {booking.status !== "CANCELLED" && booking.status !== "REJECTED" && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setRescheduleId(booking.booking_id);
                                const dateStr = new Date(booking.booking_date).toISOString().split("T")[0];
                                setNewDate(dateStr);
                                setNewSlot(booking.time_slot);
                              }}
                              className="px-3.5 py-1.5 border border-zinc-700 hover:border-[#D4AF37] hover:text-[#D4AF37] text-white rounded-lg text-xs font-bold transition cursor-pointer"
                            >
                              Update Slot
                            </button>
                            <button
                              onClick={() => handleCancelBooking(booking.booking_id)}
                              className="px-3.5 py-1.5 bg-red-950/20 border border-red-500/10 hover:bg-red-500 hover:text-white text-red-400 rounded-lg text-xs font-bold transition cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-zinc-500 text-center py-10">No bookings logged. Get started by selecting an expert trainer!</div>
              )}

              {/* Reschedule Modal overlay */}
              {rescheduleId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                  <form onSubmit={handleRescheduleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 w-[400px] space-y-4">
                    <h3 className="text-xl font-bold text-[#D4AF37]">Reschedule Session</h3>
                    <p className="text-xs text-zinc-400">Rescheduling changes booking status back to Pending for trainer approval.</p>
                    
                    <div>
                      <label className="block text-xs text-zinc-500 mb-1.5">New Date</label>
                      <input
                        type="date"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                        className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-4 py-2 outline-none focus:border-[#D4AF37] text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-500 mb-1.5">New Time Slot</label>
                      <select
                        value={newSlot}
                        onChange={(e) => setNewSlot(e.target.value)}
                        className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-4 py-2 outline-none focus:border-[#D4AF37] text-sm cursor-pointer"
                      >
                        {timeSlots.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setRescheduleId(null)}
                        className="flex-1 py-2.5 border border-zinc-800 hover:bg-zinc-800 rounded-xl text-sm font-semibold transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2.5 bg-[#D4AF37] text-black hover:bg-[#b8962d] rounded-xl text-sm font-bold transition"
                      >
                        Confirm
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* Active View: Orders */}
          {activeView === "orders" && (
            <div className="bg-[#111] border border-zinc-800 rounded-3xl p-8 space-y-6">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                <h2 className="text-2xl font-bold">Supplement Purchase Log</h2>
                <button onClick={() => navigate("/products")} className="bg-[#D4AF37] text-black px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#b8962d] transition">
                  Shop Supplements
                </button>
              </div>

              {loadingOrders ? (
                <div className="text-zinc-500 text-center py-10">Loading orders...</div>
              ) : orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-800 text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                        <th className="pb-4">Order Code</th>
                        <th className="pb-4">Supplement</th>
                        <th className="pb-4">Order Date</th>
                        <th className="pb-4">Delivery Address</th>
                        <th className="pb-4">Status</th>
                        <th className="pb-4">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-850">
                      {orders.map((o) => (
                        <tr key={o.order_id} className="hover:bg-white/5 transition text-sm">
                          <td className="py-4 font-mono text-zinc-400">#ORD{o.order_id}</td>
                          <td className="py-4 font-bold text-white">{o.product_name}</td>
                          <td className="py-4 text-zinc-400">{new Date(o.order_date).toLocaleDateString()}</td>
                          <td className="py-4 text-xs text-zinc-400 max-w-[200px] truncate">{o.delivery_address}</td>
                          <td className="py-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              o.order_status === "DELIVERED" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                              o.order_status === "CANCELLED" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                              "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                            }`}>{o.order_status}</span>
                          </td>
                          <td className="py-4 text-[#D4AF37] font-bold">Rs. {Number(o.total_amount).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-zinc-500 text-center py-10">No orders logged. Explore our supplement selection to fuel your diet plans!</div>
              )}
            </div>
          )}

          {/* Active View: Schedules */}
          {activeView === "schedules" && (
            <div className="bg-[#111] border border-zinc-800 rounded-3xl p-8 space-y-6">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                <h2 className="text-2xl font-bold text-white">My Workout Class Schedules</h2>
                <button 
                  onClick={() => navigate("/schedules")} 
                  className="bg-[#D4AF37] text-black px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#b8962d] transition cursor-pointer"
                >
                  Book More Classes
                </button>
              </div>

              {classSchedules.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {classSchedules.map((item, index) => (
                    <div key={index} className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-lg text-[#D4AF37]">{item.name}</h3>
                          <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            {item.day}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-2">Trainer: <span className="text-white font-semibold">{item.trainer}</span></p>
                        <p className="text-xs text-zinc-400">Time: <span className="text-white font-semibold">{item.time}</span></p>
                        {item.description && <p className="text-xs text-zinc-500 mt-2">{item.description}</p>}
                      </div>

                      <div className="border-t border-zinc-900 pt-3 flex justify-between items-center">
                        <span className="text-[11px] text-zinc-500">Level: <strong className="text-zinc-300">{item.level}</strong></span>
                        <button
                          onClick={() => handleCancelClassSchedule(item.id, item.day)}
                          className="px-3 py-1 bg-red-950/20 border border-red-500/10 hover:bg-red-500 hover:text-white text-red-400 rounded-lg text-xs font-bold transition cursor-pointer"
                        >
                          Cancel Spot
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-zinc-500 text-center py-10">
                  No class schedules reserved yet. Explore our Workout Schedules page to reserve your spots!
                </div>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}