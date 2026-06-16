import Header from "../../components/header.jsx";
import Footer from "../../components/footer.jsx";
import { FaCalendarCheck, FaUser } from "react-icons/fa";

export default function TrainerBookingsPage() {
  const bookings = [
    {
      id: 1,
      memberName: "Kasun Perera",
      date: "2026-06-15",
      time: "06:00 AM",
    },
    {
      id: 2,
      memberName: "Nimal Silva",
      date: "2026-06-15",
      time: "08:00 AM",
    },
    {
      id: 3,
      memberName: "John Fernando",
      date: "2026-06-15",
      time: "02:00 PM",
    },
    {
      id: 4,
      memberName: "Amal Rodrigo",
      date: "2026-06-15",
      time: "04:00 PM",
    },
  ];

  const allSlots = [
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

  const bookedSlots = bookings.map((booking) => booking.time);

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero */}
      <div className="text-center py-12">
        <h1 className="text-5xl font-bold text-white">
          Trainer <span className="text-[#D4AF37]">Bookings</span>
        </h1>

        <p className="text-gray-400 mt-4">
          View your booked sessions and available time slots
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        {/* Time Slots */}
        <div className="bg-zinc-900 rounded-2xl p-8 border border-[#D4AF37]/20 mb-10">
          <h2 className="text-3xl font-bold text-white mb-6">
            Today's Time Slots
          </h2>

          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
            {allSlots.map((slot) => {
              const isBooked = bookedSlots.includes(slot);

              return (
                <div
                  key={slot}
                  className={`rounded-xl p-4 text-center font-semibold transition ${
                    isBooked
                      ? "bg-red-600 text-white"
                      : "bg-green-600 text-white"
                  }`}
                >
                  <p>{slot}</p>

                  <p className="text-sm mt-2">
                    {isBooked ? "Booked" : "Available"}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Booked Sessions */}
        <div className="bg-zinc-900 rounded-2xl border border-[#D4AF37]/20 overflow-hidden">
          <div className="p-6 border-b border-zinc-800">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <FaCalendarCheck className="text-[#D4AF37]" />
              Booked Sessions
            </h2>
          </div>

          {bookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="bg-[#D4AF37] text-black">
                    <th className="p-4 text-left">Member</th>
                    <th className="p-4 text-left">Date</th>
                    <th className="p-4 text-left">Time</th>
                    <th className="p-4 text-left">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-b border-zinc-800 hover:bg-zinc-800/50"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <FaUser className="text-[#D4AF37]" />
                          {booking.memberName}
                        </div>
                      </td>

                      <td className="p-4">{booking.date}</td>

                      <td className="p-4">{booking.time}</td>

                      <td className="p-4">
                        <span className="bg-green-600 px-3 py-1 rounded-lg text-sm">
                          Confirmed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <h3 className="text-2xl text-gray-400">
                No Bookings Available
              </h3>
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="bg-zinc-900 p-6 rounded-2xl border border-[#D4AF37]/20">
            <h3 className="text-gray-400">Total Sessions</h3>
            <p className="text-4xl font-bold text-[#D4AF37] mt-2">
              {bookings.length}
            </p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl border border-[#D4AF37]/20">
            <h3 className="text-gray-400">Booked Slots</h3>
            <p className="text-4xl font-bold text-red-500 mt-2">
              {bookedSlots.length}
            </p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl border border-[#D4AF37]/20">
            <h3 className="text-gray-400">Available Slots</h3>
            <p className="text-4xl font-bold text-green-500 mt-2">
              {allSlots.length - bookedSlots.length}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}