import Header from "../components/header";
import Footer from "../components/footer";
import { useParams } from "react-router-dom";
import { useState } from "react";

const trainersData = [
  {
    trainer_id: 1,
    name: "John Silva",
    specialization: "Bodybuilding",
  },
  {
    trainer_id: 2,
    name: "Nimal Perera",
    specialization: "Weight Loss",
  },
  {
    trainer_id: 3,
    name: "Kasun Fernando",
    specialization: "Strength",
  },
  {
    trainer_id: 4,
    name: "Samantha Jayasuriya",
    specialization: "Yoga",
  },
  {
    trainer_id: 5,
    name: "Dilshan Rodrigo",
    specialization: "Cardio",
  },
];

export default function SessionPage() {
  const { trainerId } = useParams();

  const trainer = trainersData.find(
    (t) => t.trainer_id === Number(trainerId)
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      `Session booked with ${trainer?.name}\nDate: ${formData.date}\nTime: ${formData.time}`
    );

    console.log({
      trainer,
      ...formData,
    });
  };

  return (
    <div className="bg-black min-h-screen">
      <Header />

      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="bg-zinc-900 rounded-2xl p-8 border border-[#D4AF37]/20">
          <h1 className="text-4xl font-bold text-white mb-2">
            Book a Session
          </h1>

          <p className="text-gray-400 mb-8">
            Trainer:{" "}
            <span className="text-[#D4AF37] font-semibold">
              {trainer?.name}
            </span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-zinc-800 text-white p-4 rounded-xl outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-zinc-800 text-white p-4 rounded-xl outline-none"
            />

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full bg-zinc-800 text-white p-4 rounded-xl outline-none"
            />

            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full bg-zinc-800 text-white p-4 rounded-xl outline-none"
            />

            <button
              type="submit"
              className="w-full bg-[#D4AF37] text-black py-4 rounded-xl font-bold hover:bg-[#b8962d]"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}