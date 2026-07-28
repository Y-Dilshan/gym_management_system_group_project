import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function AdminSchedules() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const API = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    loadAllBookings();
  }, []);

  const loadAllBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setBookings(data.bookings || []);
      } else {
        toast.error("Failed to load booking logs");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong loading schedules");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/bookings/${bookingId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        toast.success(`Booking set to ${newStatus}`);
        loadAllBookings();
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to update booking");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const filteredBookings = bookings.filter(b => 
    b.member_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.trainer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.time_slot?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="bg-gradient-to-r from-[#111111] to-[#1C1C1C] border border-[#D4AF37]/20 rounded-2xl shadow-2xl p-6 mb-8 flex items-center justify-between">
        {/* Left Side Text */}
        <div>
          <h1 className="text-4xl font-bold text-white tracking-wide">Trainer Session Bookings</h1>
          <p className="text-gray-400 mt-2">Monitor and manage trainer schedules and session reservations across the system</p>
        </div>
        {/* Right Side Button */}
        <Link to="/admin/add-trainer" className="bg-[#D4AF37] text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
          + Add Trainer
        </Link>
      </div>

      {/* Table Card */}
      <div className="bg-[#141414] border border-[#D4AF37]/20 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.08)]">
        {/* Card Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-[#2A2A2A]">
          <h2 className="text-2xl font-semibold text-white">All Booked Sessions</h2>
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#1F1F1F] text-white px-4 py-2 rounded-xl border border-[#333333] focus:border-[#D4AF37] outline-none"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-10 text-zinc-500">Loading sessions schedules...</div>
          ) : filteredBookings.length > 0 ? (
            <table className="w-full">
              {/* Table Head */}
              <thead>
                <tr className="bg-[#D4AF37] text-black">
                  <th className="px-6 py-5 text-left font-semibold">Booking ID</th>
                  <th className="px-6 py-5 text-left font-semibold">Member</th>
                  <th className="px-6 py-5 text-left font-semibold">Trainer</th>
                  <th className="px-6 py-5 text-left font-semibold">Specialization</th>
                  <th className="px-6 py-5 text-left font-semibold">Date</th>
                  <th className="px-6 py-5 text-left font-semibold">Time Slot</th>
                  <th className="px-6 py-5 text-left font-semibold">Status</th>
                  <th className="px-6 py-5 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {filteredBookings.map((b) => (
                  <tr key={b.booking_id} className="border-b border-[#2A2A2A] text-gray-300 hover:bg-[#1C1C1C] transition-all duration-300">
                    <td className="px-6 py-5 font-mono text-xs font-semibold text-[#D4AF37]">#BK{b.booking_id}</td>
                    <td className="px-6 py-5 font-bold text-white">{b.member_name}</td>
                    <td className="px-6 py-5 text-yellow-500/90">{b.trainer_name}</td>
                    <td className="px-6 py-5 capitalize">{b.trainer_specialization || "General"}</td>
                    <td className="px-6 py-5">{new Date(b.booking_date).toLocaleDateString()}</td>
                    <td className="px-6 py-5 font-mono">{b.time_slot}</td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        b.status === "ACCEPTED" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                        b.status === "REJECTED" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                        b.status === "CANCELLED" ? "bg-zinc-800 text-zinc-500 border border-zinc-700" :
                        "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex gap-2">
                        {b.status === "PENDING" && (
                          <>
                            <button
                              onClick={() => handleStatusChange(b.booking_id, "ACCEPTED")}
                              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleStatusChange(b.booking_id, "REJECTED")}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {b.status !== "CANCELLED" && b.status !== "PENDING" && (
                          <button
                            onClick={() => handleStatusChange(b.booking_id, "PENDING")}
                            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer"
                          >
                            Reset to Pending
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-10 text-zinc-500">No scheduled sessions bookings found.</div>
          )}
        </div>
      </div>
    </div>
  );
}