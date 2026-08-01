import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaUserCircle, FaCalendarCheck, FaUsers, FaUserEdit, FaCheck, FaTimes } from "react-icons/fa";
import Header from "../../components/header.jsx";
import Footer from "../../components/footer.jsx";

export default function TrainerDashboardPage() {
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState(null);
  const [members, setMembers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("bookings");
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(true);

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    full_name: "",
    phone: "",
    specialization: "",
    bio: "",
    experience_years: "",
  });

  const API = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const parsed = JSON.parse(userString);
        if (parsed.role.toUpperCase() !== "TRAINER") {
          toast.error("Access denied. Trainer only.");
          navigate("/");
          return;
        }
        setTrainer(parsed);
        setProfileForm({
          full_name: parsed.full_name || "",
          phone: parsed.phone || "",
          specialization: parsed.specialization || "",
          bio: parsed.bio || "",
          experience_years: parsed.experience_years || "",
        });
        loadTrainerBookings();
      } catch (err) {
        console.error(err);
      }
    } else {
      navigate("/signin");
    }
  }, []);

  useEffect(() => {
    if (activeTab === "bookings") {
      loadTrainerBookings();
    }
  }, [activeTab]);

  const loadAssignedMembers = async (trainerId) => {
    if (!trainerId) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/trainers/${trainerId}/members`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setMembers(data.members || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMembers(false);
    }
  };

  const loadTrainerBookings = async () => {
    setLoadingBookings(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/bookings/trainer-bookings`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setBookings(data.bookings || []);
        if (data.trainer_id) {
          loadAssignedMembers(data.trainer_id);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load bookings");
    } finally {
      setLoadingBookings(false);
    }
  };


  const handleBookingStatusChange = async (bookingId, newStatus) => {
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
        toast.success(`Booking status changed to ${newStatus}`);
        loadTrainerBookings();
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to update booking status");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/trainers/${trainer.trainer_id}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileForm),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Profile updated successfully!");
        const updatedTrainer = {
          ...trainer,
          full_name: profileForm.full_name,
          phone: profileForm.phone,
          specialization: profileForm.specialization,
          bio: profileForm.bio,
          experience_years: parseInt(profileForm.experience_years),
          profile_picture: data.profile_picture || trainer.profile_picture
        };
        localStorage.setItem("user", JSON.stringify(updatedTrainer));
        setTrainer(updatedTrainer);
      } else {
        toast.error(data.error || "Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const defaultSlots = [
    "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", 
    "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const [slots, setSlots] = useState(() => {
    const saved = localStorage.getItem("trainer_custom_slots");
    return saved ? JSON.parse(saved) : defaultSlots;
  });

  const [blockedSlots, setBlockedSlots] = useState(() => {
    const saved = localStorage.getItem("trainer_blocked_slots");
    return saved ? JSON.parse(saved) : [];
  });

  const [newSlotTime, setNewSlotTime] = useState("");

  const handleToggleBlockSlot = (slot) => {
    let updated;
    if (blockedSlots.includes(slot)) {
      updated = blockedSlots.filter(s => s !== slot);
      toast.success(`Slot ${slot} is now Available`);
    } else {
      updated = [...blockedSlots, slot];
      toast.success(`Slot ${slot} marked as Unavailable / Off`);
    }
    setBlockedSlots(updated);
    localStorage.setItem("trainer_blocked_slots", JSON.stringify(updated));
  };

  const handleAddSlot = (e) => {
    e.preventDefault();
    if (!newSlotTime.trim()) return;
    const formatted = newSlotTime.trim();
    if (slots.includes(formatted)) {
      toast.error("This slot already exists!");
      return;
    }
    const updated = [...slots, formatted];
    setSlots(updated);
    localStorage.setItem("trainer_custom_slots", JSON.stringify(updated));
    setNewSlotTime("");
    toast.success(`Added new time slot: ${formatted}`);
  };

  const handleRemoveSlot = (slotToRemove) => {
    const updated = slots.filter(s => s !== slotToRemove);
    setSlots(updated);
    localStorage.setItem("trainer_custom_slots", JSON.stringify(updated));
    toast.success(`Removed slot: ${slotToRemove}`);
  };

  const acceptedSlots = bookings.filter(b => b.status === 'ACCEPTED').map(b => b.time_slot);

  const pendingBookingsCount = bookings.filter(b => b.status === "PENDING").length;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      {/* Hero */}
      <div className="text-center py-8 md:py-12 bg-zinc-950 border-b border-zinc-800 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Trainer <span className="text-[#D4AF37]">Dashboard</span>
        </h1>
        <p className="text-zinc-400 text-sm md:text-base mt-3">
          Manage your assigned members, bookings, and profile details
        </p>
      </div>

      {/* Tabs Menu */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 mt-6 md:mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-6">
        <button
          onClick={() => setActiveTab("bookings")}
          className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition cursor-pointer text-sm md:text-base relative ${
            activeTab === "bookings"
              ? "bg-[#D4AF37] text-black"
              : "bg-zinc-900 text-gray-300 hover:bg-zinc-800"
          }`}
        >
          <FaCalendarCheck /> Bookings & Slots
          {pendingBookingsCount > 0 && (
            <span className="bg-red-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full ml-1 animate-pulse">
              {pendingBookingsCount} Pending
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("members")}
          className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition cursor-pointer text-sm md:text-base ${
            activeTab === "members"
              ? "bg-[#D4AF37] text-black"
              : "bg-zinc-900 text-gray-300 hover:bg-zinc-800"
          }`}
        >
          <FaUsers /> Assigned Members ({members.length})
        </button>

        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition cursor-pointer text-sm md:text-base ${
            activeTab === "profile"
              ? "bg-[#D4AF37] text-black"
              : "bg-zinc-900 text-gray-300 hover:bg-zinc-800"
          }`}
        >
          <FaUserEdit /> Edit Profile
        </button>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 py-10 flex-1">
        {/* Tab 1: Assigned Members */}
        {activeTab === "members" && (
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-yellow-500">
              <FaUsers /> Members Assigned to You
            </h2>

            {loadingMembers ? (
              <div className="text-center py-8 text-gray-400">Loading members...</div>
            ) : members.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-white text-left">
                  <thead>
                    <tr className="border-b border-zinc-800 text-gray-400">
                      <th className="p-4">Member Name</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Phone</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((member) => (
                      <tr key={member.user_id} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                        <td className="p-4 font-semibold text-[#D4AF37]">{member.full_name}</td>
                        <td className="p-4">{member.email}</td>
                        <td className="p-4">{member.phone || "-"}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                            member.status === "ACTIVE"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}>
                            {member.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">No members assigned yet</p>
                <p className="text-sm mt-1">Admin will assign members to you once they book personal training</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Bookings & Slots */}
        {activeTab === "bookings" && (
          <div className="space-y-8">
            {/* Time Slots Management */}
            <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">Your Time Slots & Availability</h2>
                  <p className="text-zinc-400 text-sm mt-1">Click a slot to toggle Available / Unavailable, or add/remove custom slots</p>
                </div>

                {/* Add New Slot Form */}
                <form onSubmit={handleAddSlot} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. 06:00 PM"
                    value={newSlotTime}
                    onChange={(e) => setNewSlotTime(e.target.value)}
                    className="bg-zinc-800 text-white px-4 py-2 rounded-xl text-sm border border-zinc-700 focus:border-[#D4AF37] outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#D4AF37] text-black font-bold text-xs px-4 py-2 rounded-xl hover:bg-yellow-500 transition cursor-pointer"
                  >
                    + Add Slot
                  </button>
                </form>
              </div>

              <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
                {slots.map((slot) => {
                  const isBooked = acceptedSlots.includes(slot);
                  const isBlocked = blockedSlots.includes(slot);

                  return (
                    <div
                      key={slot}
                      className={`relative rounded-2xl p-4 text-center font-semibold border transition flex flex-col justify-between items-center min-h-[100px] ${
                        isBooked
                          ? "bg-red-950/40 border-red-500/40 text-red-300"
                          : isBlocked
                          ? "bg-zinc-950 border-zinc-700 text-zinc-500"
                          : "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                      }`}
                    >
                      {/* Delete Slot Button */}
                      {!isBooked && (
                        <button
                          onClick={() => handleRemoveSlot(slot)}
                          title="Remove slot"
                          className="absolute top-2 right-2 text-zinc-500 hover:text-red-400 p-1 text-xs cursor-pointer"
                        >
                          ✕
                        </button>
                      )}

                      <p className="text-lg font-bold mt-1">{slot}</p>

                      <button
                        onClick={() => !isBooked && handleToggleBlockSlot(slot)}
                        disabled={isBooked}
                        className={`mt-2 text-xs px-3 py-1 rounded-full font-bold transition ${
                          isBooked
                            ? "bg-red-500/20 text-red-400 cursor-not-allowed"
                            : isBlocked
                            ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 cursor-pointer"
                            : "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 cursor-pointer"
                        }`}
                      >
                        {isBooked ? "Reserved" : isBlocked ? "Off (Click to Enable)" : "Available (Click to Block)"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>


            {/* Booked Sessions */}
            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
              <div className="p-6 border-b border-zinc-800 bg-zinc-950">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <FaCalendarCheck className="text-[#D4AF37]" /> Active Booking Requests
                </h2>
              </div>

              {loadingBookings ? (
                <div className="text-zinc-500 text-center py-10">Loading bookings...</div>
              ) : bookings.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-white text-left border-collapse">
                    <thead>
                      <tr className="bg-zinc-850 text-gray-400">
                        <th className="p-4">Member Name</th>
                        <th className="p-4">Date</th>
                        <th className="p-4">Time Slot</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking.booking_id} className="border-b border-zinc-800 hover:bg-zinc-800/30 transition">
                          <td className="p-4 font-semibold text-yellow-500">{booking.member_name}</td>
                          <td className="p-4">{new Date(booking.booking_date).toLocaleDateString()}</td>
                          <td className="p-4 font-mono">{booking.time_slot}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                              booking.status === "ACCEPTED" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                              booking.status === "REJECTED" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                              booking.status === "CANCELLED" ? "bg-zinc-800 text-zinc-500 border border-zinc-700" :
                              "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                            }`}>{booking.status}</span>
                          </td>
                          <td className="p-4">
                            {booking.status === "PENDING" && (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleBookingStatusChange(booking.booking_id, "ACCEPTED")}
                                  className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer transition"
                                >
                                  <FaCheck /> Accept
                                </button>
                                <button
                                  onClick={() => handleBookingStatusChange(booking.booking_id, "REJECTED")}
                                  className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer transition"
                                >
                                  <FaTimes /> Reject
                                </button>
                              </div>
                            )}
                            {booking.status === "ACCEPTED" && (
                              <button
                                onClick={() => handleBookingStatusChange(booking.booking_id, "REJECTED")}
                                className="text-red-400 hover:text-red-300 text-xs font-bold transition cursor-pointer"
                              >
                                Revoke Session
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-zinc-500 text-center py-10">No session bookings found.</div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Edit Profile */}
        {activeTab === "profile" && (
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-yellow-500">
              <FaUserEdit /> Update Your Trainer Profile
            </h2>
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={profileForm.full_name}
                    onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })}
                    className="w-full bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-[#D4AF37] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Phone Number</label>
                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-[#D4AF37] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Specialization</label>
                  <input
                    type="text"
                    value={profileForm.specialization}
                    onChange={(e) => setProfileForm({ ...profileForm, specialization: e.target.value })}
                    className="w-full bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-[#D4AF37] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Experience (Years)</label>
                  <input
                    type="number"
                    value={profileForm.experience_years}
                    onChange={(e) => setProfileForm({ ...profileForm, experience_years: e.target.value })}
                    className="w-full bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-[#D4AF37] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Bio Description</label>
                <textarea
                  rows={4}
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="w-full bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-[#D4AF37] outline-none resize-none"
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="bg-[#D4AF37] hover:bg-[#b0902c] text-black font-bold px-8 py-3 rounded-xl transition duration-300 cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}