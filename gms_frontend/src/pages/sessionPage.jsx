import Header from "../components/header";
import Footer from "../components/footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { API_BASE_URL as API } from "../utils/api.js";

export default function SessionsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const trainer = location.state?.trainer;

  const availableSlots = [
    "06:00 AM",
    "07:00 AM",
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  // Set default date to tomorrow
  const getTomorrowDateString = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const [bookingDate, setBookingDate] = useState(getTomorrowDateString());
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }
    if (!trainer) {
      navigate("/trainers");
      return;
    }
    loadBookedSlots();
  }, [bookingDate, trainer]);

  const loadBookedSlots = async () => {
    if (!bookingDate || !trainer) return;
    setLoadingSlots(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/bookings/trainer/${trainer.trainer_id}/booked-slots?date=${bookingDate}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setBookedSlots(data.bookedSlots || []);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load trainer availability");
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleBooking = async () => {
    if (!bookingDate) {
      toast.error("Please select a date");
      return;
    }
    if (!selectedSlot) {
      toast.error("Please select a time slot");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          trainer_id: trainer.trainer_id,
          booking_date: bookingDate,
          time_slot: selectedSlot
        })
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(`Session requested with ${trainer.full_name || trainer.name} on ${bookingDate} at ${selectedSlot}!`);
        setSelectedSlot("");
        loadBookedSlots();
        setTimeout(() => {
          navigate("/dashboard", { state: { activeView: "bookings" } });
        }, 1200);
      } else {
        toast.error(data.error || "Failed to place booking");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white flex flex-col">
      <div className="fixed w-full z-40"><Header /></div>

      <div className="flex-1 max-w-5xl mx-auto px-6 py-[120px] w-full">
        <h1 className="text-4xl font-bold text-center text-white mb-10"> Book Your <span className="text-[#D4AF37]">Session</span> </h1>

        {trainer && (
          <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 mb-10">
            <div className="md:flex">
              <img
src={
  !trainer.profile_picture
    ? "/trainer1.jpg"
    : trainer.profile_picture.startsWith("data:") ||
      trainer.profile_picture.startsWith("http://") ||
      trainer.profile_picture.startsWith("https://")
    ? trainer.profile_picture
    : `${(API || "").replace(/\/api\/?$/, "")}${trainer.profile_picture.startsWith("/") ? "" : "/"}${trainer.profile_picture}`
}
onError={(e) => {
  e.target.onerror = null;
  e.target.src = "/trainer1.jpg";
}}
                alt={trainer.full_name || trainer.name}
                className="w-full md:w-80 h-80 object-cover"
              />

              <div className="p-8 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-[#D4AF37] mb-3"> {trainer.full_name || trainer.name} </h2>
                <p className="text-gray-400 mb-4">{trainer.bio || "Certified fitness expert ready to push your training limits."}</p>
                <p className="text-white">
                  <span className="text-[#D4AF37] font-semibold"> Specialization: </span> {trainer.specialization || "General Fitness"}
                </p>
                <p className="text-white mt-2">
                  <span className="text-[#D4AF37] font-semibold"> Experience: </span> {trainer.experience_years} Years
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-800 pb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Select Date & Time</h2>
              <p className="text-xs text-zinc-400">Available slots update automatically based on date selection</p>
            </div>

            {/* Date Input */}
            <div className="flex flex-col">
              <label className="text-xs text-zinc-400 mb-1.5 font-bold uppercase tracking-wider">Select Date</label>
              <input
                type="date"
                min={getTomorrowDateString()}
                value={bookingDate}
                onChange={(e) => {
                  setBookingDate(e.target.value);
                  setSelectedSlot("");
                }}
                className="bg-zinc-950 text-white border border-zinc-800 rounded-xl px-4 py-2 outline-none focus:border-[#D4AF37] cursor-pointer text-sm font-semibold"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded bg-zinc-800 border border-zinc-700"></div>
              <span className="text-gray-400">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded bg-[#D4AF37]"></div>
              <span className="text-gray-400">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded bg-red-950 border border-red-500/20"></div>
              <span className="text-gray-400">Booked</span>
            </div>
          </div>

          {loadingSlots ? (
            <div className="text-center py-8 text-zinc-400">Checking availability...</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {availableSlots.map((slot) => {
                const isBooked = bookedSlots.includes(slot);

                return (
                  <button
                    key={slot}
                    disabled={isBooked}
                    onClick={() => !isBooked && setSelectedSlot(slot)}
                    className={`py-4 rounded-2xl font-bold transition-all duration-200 cursor-pointer ${
                      isBooked
                        ? "bg-red-950/20 text-red-400/50 border border-red-950 cursor-not-allowed opacity-50"
                        : selectedSlot === slot
                        ? "bg-[#D4AF37] text-black border border-[#D4AF37] shadow-lg shadow-yellow-500/10"
                        : "bg-zinc-950 border border-zinc-800 text-white hover:border-[#D4AF37]/50"
                    }`}
                  >
                    <div>{slot}</div>
                    {isBooked && <div className="text-[10px] text-red-500 font-medium mt-1">Unavailable</div>}
                  </button>
                );
              })}
            </div>
          )}

          {selectedSlot && (
            <div className="p-4 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 text-sm">
              <p className="text-zinc-300">
                You selected slot:{" "}
                <span className="text-[#D4AF37] font-bold ml-1">
                  {selectedSlot} on {bookingDate}
                </span>
              </p>
            </div>
          )}

          <button
            onClick={handleBooking}
            disabled={!selectedSlot}
            className="w-full bg-[#D4AF37] text-black font-extrabold py-4 rounded-2xl hover:bg-[#b8962d] transition uppercase tracking-wider text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-yellow-500/5"
          >
            Confirm Booking Request
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}