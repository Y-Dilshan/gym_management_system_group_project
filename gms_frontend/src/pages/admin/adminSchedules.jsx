import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { API_BASE_URL as API } from "../../utils/api.js";

const defaultWeeklyClasses = {
  Monday: [
    { id: 1, name: "Strength Training", time: "07:00 AM - 08:30 AM", trainer: "Mike Davidson", level: "Intermediate", capacity: "18/20", description: "Build overall strength with heavy barbell exercises." },
    { id: 2, name: "Cardio Conditioning", time: "09:30 AM - 10:30 AM", trainer: "Tom Richards", level: "Beginner", capacity: "12/25", description: "High heart rate fat burner and cardiovascular conditioning." },
    { id: 3, name: "Power Yoga", time: "04:30 PM - 05:30 PM", trainer: "Sara Karunaratne", level: "All Levels", capacity: "15/15", description: "Vinyasa yoga flows designed for flexibility and mental peace." }
  ],
  Tuesday: [
    { id: 4, name: "HIIT Blast", time: "08:00 AM - 09:00 AM", trainer: "Tom Richards", level: "Advanced", capacity: "20/20", description: "High-intensity interval cardio training for fat loss." },
    { id: 5, name: "Bodybuilding Basics", time: "11:00 AM - 12:30 PM", trainer: "Mike Davidson", level: "Beginner", capacity: "14/15", description: "Targeted hypertrophy training focusing on form and growth." },
    { id: 6, name: "Flexibility & Balance", time: "05:00 PM - 06:00 PM", trainer: "Sara Karunaratne", level: "All Levels", capacity: "8/15", description: "Slow stretch routine and posture alignment exercises." }
  ],
  Wednesday: [
    { id: 7, name: "Strength Training", time: "07:00 AM - 08:30 AM", trainer: "Mike Davidson", level: "Intermediate", capacity: "19/20", description: "Build overall strength with heavy barbell exercises." },
    { id: 8, name: "Zumba Burn", time: "09:30 AM - 10:30 AM", trainer: "Tom Richards", level: "Beginner", capacity: "22/30", description: "Dance fitness party to burn calories and tone muscle." },
    { id: 9, name: "Ashtanga Flow", time: "04:30 PM - 05:30 PM", trainer: "Sara Karunaratne", level: "Intermediate", capacity: "12/15", description: "Traditional structured yoga series for physical purification." }
  ],
  Thursday: [
    { id: 10, name: "Core & Abs Crusher", time: "08:00 AM - 09:00 AM", trainer: "Tom Richards", level: "All Levels", capacity: "25/25", description: "Focused isometric and dynamic core movements." },
    { id: 11, name: "Olympic Powerlifting", time: "03:00 PM - 04:30 PM", trainer: "Mike Davidson", level: "Advanced", capacity: "8/10", description: "Learn clean & jerk, snatch, and squat biomechanics." }
  ],
  Friday: [
    { id: 12, name: "CrossFit Challenge", time: "07:30 AM - 09:00 AM", trainer: "Mike Davidson", level: "Advanced", capacity: "15/15", description: "WOD (Workout of the day) combining gymnastics and weightlifting." },
    { id: 13, name: "Endurance Ride", time: "10:00 AM - 11:00 AM", trainer: "Tom Richards", level: "Intermediate", capacity: "18/25", description: "Simulated spin cycles for legs muscular endurance." },
    { id: 14, name: "Restorative Yoga", time: "05:00 PM - 06:00 PM", trainer: "Sara Karunaratne", level: "Beginner", capacity: "14/15", description: "Slow deep-stretch style yoga to relax after a hard week." }
  ],
  Saturday: [
    { id: 15, name: "Zumba Burn", time: "08:30 AM - 09:30 AM", trainer: "Tom Richards", level: "Beginner", capacity: "28/30", description: "Dance fitness party to burn calories and tone muscle." },
    { id: 16, name: "Power HIIT WOD", time: "10:30 AM - 11:30 AM", trainer: "Mike Davidson", level: "Advanced", capacity: "15/20", description: "Combines Olympic weights with cardio blast intervals." }
  ],
  Sunday: [
    { id: 17, name: "Yoga Masterclass", time: "09:00 AM - 10:30 AM", trainer: "Sara Karunaratne", level: "All Levels", capacity: "12/20", description: "Deep dive into breathing control, postures and meditation." }
  ]
};

export default function AdminSchedules() {
  const [activeTab, setActiveTab] = useState("workout_schedules"); // "workout_schedules" or "bookings"
  
  // 1-on-1 Bookings State
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Group Workout Schedules State
  const [selectedDay, setSelectedDay] = useState("All");
  const [weeklySchedules, setWeeklySchedules] = useState(() => {
    const saved = localStorage.getItem("gym_workout_schedules");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    localStorage.setItem("gym_workout_schedules", JSON.stringify(defaultWeeklyClasses));
    return defaultWeeklyClasses;
  });

  // Modal States for Group Workout Schedules
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewingSchedule, setViewingSchedule] = useState(null);
  const [editingSchedule, setEditingSchedule] = useState(null);

  const [scheduleForm, setScheduleForm] = useState({
    day: "Monday",
    name: "",
    time: "",
    trainer: "",
    level: "All Levels",
    occupancy: 0,
    maxCapacity: 20,
    description: ""
  });

  useEffect(() => {
    loadAllBookings();
  }, []);

  const saveSchedulesToStorage = (updated) => {
    setWeeklySchedules(updated);
    localStorage.setItem("gym_workout_schedules", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const loadAllBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/bookings`, {
        headers: { Authorization: `Bearer ${token}` }
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

  // --- GROUP SCHEDULE HANDLERS ---
  const handleCreateSchedule = (e) => {
    e.preventDefault();
    const day = scheduleForm.day;
    const newId = Date.now();
    const newClass = {
      id: newId,
      name: scheduleForm.name,
      time: scheduleForm.time,
      trainer: scheduleForm.trainer,
      level: scheduleForm.level,
      capacity: `${scheduleForm.occupancy}/${scheduleForm.maxCapacity}`,
      description: scheduleForm.description
    };

    const updated = {
      ...weeklySchedules,
      [day]: [...(weeklySchedules[day] || []), newClass]
    };

    saveSchedulesToStorage(updated);
    toast.success(`Workout schedule added for ${day}!`);
    setShowAddModal(false);
    setScheduleForm({
      day: "Monday",
      name: "",
      time: "",
      trainer: "",
      level: "All Levels",
      occupancy: 0,
      maxCapacity: 20,
      description: ""
    });
  };

  const handleOpenEdit = (day, item) => {
    const parts = (item.capacity || "0/20").split("/");
    setEditingSchedule({ day, item });
    setScheduleForm({
      day: day,
      name: item.name || "",
      time: item.time || "",
      trainer: item.trainer || "",
      level: item.level || "All Levels",
      occupancy: parts[0] || 0,
      maxCapacity: parts[1] || 20,
      description: item.description || ""
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingSchedule) return;

    const oldDay = editingSchedule.day;
    const newDay = scheduleForm.day;
    const id = editingSchedule.item.id;

    const updatedItem = {
      id: id,
      name: scheduleForm.name,
      time: scheduleForm.time,
      trainer: scheduleForm.trainer,
      level: scheduleForm.level,
      capacity: `${scheduleForm.occupancy}/${scheduleForm.maxCapacity}`,
      description: scheduleForm.description
    };

    let updated = { ...weeklySchedules };

    if (oldDay === newDay) {
      updated[oldDay] = updated[oldDay].map(i => i.id === id ? updatedItem : i);
    } else {
      updated[oldDay] = updated[oldDay].filter(i => i.id !== id);
      updated[newDay] = [...(updated[newDay] || []), updatedItem];
    }

    saveSchedulesToStorage(updated);
    toast.success("Workout schedule updated successfully!");
    setEditingSchedule(null);
  };

  const handleDeleteSchedule = (day, id) => {
    if (!window.confirm("Are you sure you want to delete this workout schedule?")) return;

    const updated = {
      ...weeklySchedules,
      [day]: weeklySchedules[day].filter(i => i.id !== id)
    };

    saveSchedulesToStorage(updated);
    toast.success("Schedule deleted successfully!");
  };

  // Flattened schedules for display
  const daysList = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const allGroupSchedules = [];
  daysList.forEach(day => {
    (weeklySchedules[day] || []).forEach(item => {
      allGroupSchedules.push({ day, ...item });
    });
  });

  const filteredGroupSchedules = allGroupSchedules.filter(item => {
    const matchesDay = selectedDay === "All" || item.day === selectedDay;
    const matchesSearch =
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.trainer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.time?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDay && matchesSearch;
  });

  const filteredBookings = bookings.filter(b => 
    b.member_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.trainer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.time_slot?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#111111] to-[#1C1C1C] border border-[#D4AF37]/20 rounded-2xl shadow-2xl p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-wide">Schedules Management</h1>
          <p className="text-gray-400 mt-2">Manage daily workout group classes and monitor 1-on-1 session reservations</p>
        </div>
        <div className="flex gap-3 shrink-0">
          {activeTab === "workout_schedules" ? (
            <button
              onClick={() => {
                setScheduleForm({
                  day: "Monday",
                  name: "",
                  time: "",
                  trainer: "",
                  level: "All Levels",
                  occupancy: 0,
                  maxCapacity: 20,
                  description: ""
                });
                setShowAddModal(true);
              }}
              className="bg-[#D4AF37] text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition cursor-pointer"
            >
              + Add Schedule
            </button>
          ) : (
            <Link to="/admin/add-trainer" className="bg-[#D4AF37] text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
              + Add Trainer
            </Link>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("workout_schedules")}
          className={`px-6 py-3 rounded-xl font-bold transition text-sm cursor-pointer ${
            activeTab === "workout_schedules"
              ? "bg-[#D4AF37] text-black"
              : "bg-[#141414] text-gray-400 border border-[#2A2A2A] hover:text-white"
          }`}
        >
          Group Workout Schedules
        </button>
        <button
          onClick={() => setActiveTab("bookings")}
          className={`px-6 py-3 rounded-xl font-bold transition text-sm cursor-pointer ${
            activeTab === "bookings"
              ? "bg-[#D4AF37] text-black"
              : "bg-[#141414] text-gray-400 border border-[#2A2A2A] hover:text-white"
          }`}
        >
          Trainer 1-on-1 Reservations
        </button>
      </div>

      {/* TAB 1: WORKOUT SCHEDULES MANAGEMENT */}
      {activeTab === "workout_schedules" && (
        <div className="bg-[#141414] border border-[#D4AF37]/20 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.08)]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-8 py-6 border-b border-[#2A2A2A] gap-4">
            <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 md:pb-0">
              {["All", ...daysList].map(d => (
                <button
                  key={d}
                  onClick={() => setSelectedDay(d)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    selectedDay === d ? "bg-[#D4AF37] text-black" : "bg-[#1F1F1F] text-gray-300 hover:bg-[#2A2A2A]"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Search schedules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#1F1F1F] text-white px-4 py-2 rounded-xl border border-[#333333] focus:border-[#D4AF37] outline-none text-sm w-full md:w-auto"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#D4AF37] text-black">
                  <th className="px-6 py-5 font-semibold">Day</th>
                  <th className="px-6 py-5 font-semibold">Class Name</th>
                  <th className="px-6 py-5 font-semibold">Time Slot</th>
                  <th className="px-6 py-5 font-semibold">Trainer</th>
                  <th className="px-6 py-5 font-semibold">Level</th>
                  <th className="px-6 py-5 font-semibold">Occupancy</th>
                  <th className="px-6 py-5 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredGroupSchedules.map((item) => (
                  <tr key={`${item.day}-${item.id}`} className="border-b border-[#2A2A2A] text-gray-300 hover:bg-[#1C1C1C] transition">
                    <td className="px-6 py-5 font-bold text-[#D4AF37]">{item.day}</td>
                    <td className="px-6 py-5 font-semibold text-white">{item.name}</td>
                    <td className="px-6 py-5 font-mono text-sm">{item.time}</td>
                    <td className="px-6 py-5 text-gray-300">{item.trainer}</td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        item.level === "Advanced" ? "bg-red-500/20 text-red-400" :
                        item.level === "Intermediate" ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-green-500/20 text-green-400"
                      }`}>
                        {item.level}
                      </span>
                    </td>
                    <td className="px-6 py-5 font-mono text-white">{item.capacity}</td>
                    <td className="px-6 py-5">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setViewingSchedule(item)}
                          className="bg-[#D4AF37] text-black px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-[#b8952c] transition"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleOpenEdit(item.day, item)}
                          className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteSchedule(item.day, item.id)}
                          className="bg-red-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-red-700 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredGroupSchedules.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-10 text-zinc-500">
                      No workout schedules found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: 1-ON-1 SESSION BOOKINGS */}
      {activeTab === "bookings" && (
        <div className="bg-[#141414] border border-[#D4AF37]/20 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.08)]">
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

          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-10 text-zinc-500">Loading sessions schedules...</div>
            ) : filteredBookings.length > 0 ? (
              <table className="w-full">
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
      )}

      {/* ADD SCHEDULE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#1C1C1C] border border-[#D4AF37]/30 rounded-3xl p-6 max-w-lg w-full text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-4 text-[#D4AF37]">Add Workout Schedule</h3>
            <form onSubmit={handleCreateSchedule} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Day of Week</label>
                <select
                  value={scheduleForm.day}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, day: e.target.value })}
                  className="w-full bg-[#141414] border border-[#333] rounded-xl px-4 py-2 text-white outline-none focus:border-[#D4AF37]"
                >
                  {daysList.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Class Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Strength Training"
                  value={scheduleForm.name}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, name: e.target.value })}
                  className="w-full bg-[#141414] border border-[#333] rounded-xl px-4 py-2 text-white outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Time Slot</label>
                  <input
                    type="text"
                    required
                    placeholder="07:00 AM - 08:30 AM"
                    value={scheduleForm.time}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                    className="w-full bg-[#141414] border border-[#333] rounded-xl px-4 py-2 text-white outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Trainer Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mike Davidson"
                    value={scheduleForm.trainer}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, trainer: e.target.value })}
                    className="w-full bg-[#141414] border border-[#333] rounded-xl px-4 py-2 text-white outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Level</label>
                  <select
                    value={scheduleForm.level}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, level: e.target.value })}
                    className="w-full bg-[#141414] border border-[#333] rounded-xl px-3 py-2 text-white outline-none focus:border-[#D4AF37] text-xs"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="All Levels">All Levels</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Current</label>
                  <input
                    type="number"
                    min="0"
                    value={scheduleForm.occupancy}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, occupancy: e.target.value })}
                    className="w-full bg-[#141414] border border-[#333] rounded-xl px-3 py-2 text-white outline-none focus:border-[#D4AF37] text-xs"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Max Cap</label>
                  <input
                    type="number"
                    min="1"
                    value={scheduleForm.maxCapacity}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, maxCapacity: e.target.value })}
                    className="w-full bg-[#141414] border border-[#333] rounded-xl px-3 py-2 text-white outline-none focus:border-[#D4AF37] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Description</label>
                <textarea
                  rows="2"
                  value={scheduleForm.description}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, description: e.target.value })}
                  className="w-full bg-[#141414] border border-[#333] rounded-xl px-4 py-2 text-white outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-gray-600 text-white px-5 py-2 rounded-xl text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#D4AF37] text-black px-5 py-2 rounded-xl font-bold text-sm"
                >
                  Add Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW SCHEDULE MODAL */}
      {viewingSchedule && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#1C1C1C] border border-[#D4AF37]/30 rounded-3xl p-6 max-w-lg w-full text-white shadow-2xl">
            <h3 className="text-2xl font-bold text-[#D4AF37] mb-2">{viewingSchedule.name}</h3>
            <p className="text-sm text-gray-400 mb-4">{viewingSchedule.day} - {viewingSchedule.time}</p>
            <div className="space-y-2 text-sm text-gray-300 mb-6">
              <p><strong>Trainer:</strong> {viewingSchedule.trainer}</p>
              <p><strong>Difficulty Level:</strong> {viewingSchedule.level}</p>
              <p><strong>Class Occupancy:</strong> {viewingSchedule.capacity}</p>
              <p><strong>Description:</strong> {viewingSchedule.description || "No description provided."}</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setViewingSchedule(null)}
                className="bg-[#D4AF37] text-black px-6 py-2 rounded-xl font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT SCHEDULE MODAL */}
      {editingSchedule && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#1C1C1C] border border-[#D4AF37]/30 rounded-3xl p-6 max-w-lg w-full text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-4 text-[#D4AF37]">Edit Workout Schedule</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Day of Week</label>
                <select
                  value={scheduleForm.day}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, day: e.target.value })}
                  className="w-full bg-[#141414] border border-[#333] rounded-xl px-4 py-2 text-white outline-none focus:border-[#D4AF37]"
                >
                  {daysList.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Class Name</label>
                <input
                  type="text"
                  required
                  value={scheduleForm.name}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, name: e.target.value })}
                  className="w-full bg-[#141414] border border-[#333] rounded-xl px-4 py-2 text-white outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Time Slot</label>
                  <input
                    type="text"
                    required
                    value={scheduleForm.time}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                    className="w-full bg-[#141414] border border-[#333] rounded-xl px-4 py-2 text-white outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Trainer Name</label>
                  <input
                    type="text"
                    required
                    value={scheduleForm.trainer}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, trainer: e.target.value })}
                    className="w-full bg-[#141414] border border-[#333] rounded-xl px-4 py-2 text-white outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Level</label>
                  <select
                    value={scheduleForm.level}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, level: e.target.value })}
                    className="w-full bg-[#141414] border border-[#333] rounded-xl px-3 py-2 text-white outline-none focus:border-[#D4AF37] text-xs"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="All Levels">All Levels</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Current</label>
                  <input
                    type="number"
                    min="0"
                    value={scheduleForm.occupancy}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, occupancy: e.target.value })}
                    className="w-full bg-[#141414] border border-[#333] rounded-xl px-3 py-2 text-white outline-none focus:border-[#D4AF37] text-xs"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Max Cap</label>
                  <input
                    type="number"
                    min="1"
                    value={scheduleForm.maxCapacity}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, maxCapacity: e.target.value })}
                    className="w-full bg-[#141414] border border-[#333] rounded-xl px-3 py-2 text-white outline-none focus:border-[#D4AF37] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Description</label>
                <textarea
                  rows="2"
                  value={scheduleForm.description}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, description: e.target.value })}
                  className="w-full bg-[#141414] border border-[#333] rounded-xl px-4 py-2 text-white outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingSchedule(null)}
                  className="bg-gray-600 text-white px-5 py-2 rounded-xl text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#D4AF37] text-black px-5 py-2 rounded-xl font-bold text-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}