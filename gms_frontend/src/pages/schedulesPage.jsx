import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaCalendarAlt, FaClock, FaUser, FaDumbbell } from "react-icons/fa";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

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

export default function SchedulesPage() {
  const navigate = useNavigate();
  const [activeDay, setActiveDay] = useState("Monday");
  const [weeklyClasses, setWeeklyClasses] = useState(() => {
    const saved = localStorage.getItem("gym_workout_schedules");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    localStorage.setItem("gym_workout_schedules", JSON.stringify(defaultWeeklyClasses));
    return defaultWeeklyClasses;
  });

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  useEffect(() => {
    const handleSync = () => {
      const saved = localStorage.getItem("gym_workout_schedules");
      if (saved) {
        try { setWeeklyClasses(JSON.parse(saved)); } catch (e) {}
      }
    };
    window.addEventListener("storage", handleSync);
    window.addEventListener("focus", handleSync);
    return () => {
      window.removeEventListener("storage", handleSync);
      window.removeEventListener("focus", handleSync);
    };
  }, []);

  const handleClassBooking = (cls) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please sign in to register for classes");
      navigate("/signin");
      return;
    }

    const existing = JSON.parse(localStorage.getItem("my_schedules") || "[]");
    const isAlreadyBooked = existing.some(
      (item) => item.id === cls.id && item.day === activeDay
    );

    if (isAlreadyBooked) {
      toast.error(`You have already reserved a spot for ${cls.name} on ${activeDay}!`);
      return;
    }

    const newBooking = {
      id: cls.id,
      name: cls.name,
      trainer: cls.trainer,
      time: cls.time,
      day: activeDay,
      level: cls.level,
      description: cls.description,
      bookedAt: new Date().toISOString()
    };

    const updated = [newBooking, ...existing];
    localStorage.setItem("my_schedules", JSON.stringify(updated));

    toast.success(`Reserved spot for ${cls.name} on ${activeDay}! Check it in your User Dashboard.`);
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white flex flex-col">
      <div className="fixed top-0 left-0 w-full z-50"><Header /></div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-[120px]">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-wide mb-3">
            Workout <span className="text-[#D4AF37]">Schedules</span>
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Choose your daily routine and reserve slots in our premium group classes. Achieve targets under expert supervision.
          </p>
        </div>

        {/* Days selector tab */}
        <div className="flex justify-center flex-wrap gap-2 mb-10 border-b border-zinc-800 pb-6">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-6 py-3 rounded-xl font-bold transition text-sm cursor-pointer whitespace-nowrap ${
                activeDay === day
                  ? "bg-[#D4AF37] text-black shadow-lg shadow-yellow-500/10"
                  : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Classes list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {weeklyClasses[activeDay]?.map((cls) => {
            const isFull = cls.capacity.split("/")[0] === cls.capacity.split("/")[1];

            return (
              <div
                key={cls.id}
                className="bg-[#111] border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between hover:border-[#D4AF37]/20 transition-all duration-300"
              >
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-2xl font-bold text-[#D4AF37]">{cls.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      cls.level === "Advanced" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                      cls.level === "Intermediate" ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" :
                      "bg-green-500/10 text-green-400 border border-green-500/20"
                    }`}>
                      {cls.level}
                    </span>
                  </div>
                  <p className="text-zinc-400 mt-2 text-sm leading-relaxed">{cls.description}</p>
                </div>

                <div className="mt-6 border-t border-zinc-800 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5 text-xs text-zinc-400">
                    <div className="flex items-center gap-2">
                      <FaClock className="text-[#D4AF37]" />
                      <span>{cls.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaUser className="text-[#D4AF37]" />
                      <span>Trainer: <strong className="text-white">{cls.trainer}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaDumbbell className="text-[#D4AF37]" />
                      <span>Class Occupancy: <strong className="text-white">{cls.capacity}</strong></span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleClassBooking(cls)}
                    disabled={isFull}
                    className={`px-6 py-3 rounded-xl font-bold tracking-wider text-xs transition uppercase ${
                      isFull
                        ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700"
                        : "bg-[#D4AF37] hover:bg-[#b8962d] text-black cursor-pointer shadow-md shadow-yellow-500/5"
                    }`}
                  >
                    {isFull ? "Fully Booked" : "Reserve Spot"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
