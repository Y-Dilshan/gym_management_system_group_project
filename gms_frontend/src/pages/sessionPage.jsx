import Header from "../components/header";
import Footer from "../components/footer";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import {toast} from "react-hot-toast";

export default function SessionsPage() {
  const location = useLocation();
  const trainer = location.state?.trainer;

  const availableSlots = [
    "06:00 AM",
    "07:00 AM",
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  const [selectedSlot, setSelectedSlot] = useState("");

  const handleBooking = () => {
    if (!selectedSlot) {
      toast.error("Please select a time slot");
      return;
    }

    toast.success(`Session booked with ${trainer?.name} at ${selectedSlot}`
    );
  };

  return (
    <div className="bg-black min-h-screen">
      <Header />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-white mb-10"> Book Your Session </h1>
        {trainer && (
          <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-[#D4AF37]/20 mb-10">
            <div className="md:flex">
              <img src={trainer.image_url} alt={trainer.name} className="w-full md:w-80 h-80 object-cover"/>
              <div className="p-6">
                <h2 className="text-3xl font-bold text-white mb-3"> {trainer.name} </h2>
                <p className="text-gray-400 mb-4"> {trainer.bio} </p>
                <p className="text-white">
                  <span className="text-[#D4AF37]"> Specialization: </span>{" "} {trainer.specialization} </p>
                <p className="text-white mt-2"> <span className="text-[#D4AF37]"> Experience: </span>{" "} {trainer.experience} Years </p>
                <p className="text-white mt-2"> <span className="text-[#D4AF37]"> Availability: </span>{" "} {trainer.availability} </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-zinc-900 rounded-2xl p-8 border border-[#D4AF37]/20">
          <h2 className="text-2xl font-bold text-white mb-6"> Available Time Slots </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {availableSlots.map((slot) => (
              <button key={slot} onClick={() => setSelectedSlot(slot)} className={`py-3 rounded-xl font-semibold transition ${
                  selectedSlot === slot
                    ? "bg-[#D4AF37] text-black"
                    : "bg-zinc-800 text-white hover:bg-zinc-700"
                }`}>
                {slot}
              </button>
            ))}
          </div>
          <div className="mt-8">
            <button onClick={handleBooking} className="w-full bg-[#D4AF37] text-black font-bold py-4 rounded-xl hover:bg-[#b8962d] transition">Confirm Booking </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}