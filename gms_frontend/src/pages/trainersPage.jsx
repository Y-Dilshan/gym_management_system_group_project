import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import { FaCalendarCheck } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const categories = [
  { label: "All", value: "all" },
  { label: "Strength", value: "strength" },
  { label: "Cardio", value: "cardio" },
  { label: "Weight Loss", value: "weight-loss" },
  { label: "Bodybuilding", value: "bodybuilding" },
  { label: "Yoga", value: "yoga" },
];

export default function TrainersPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  // const [trainers] = useState(trainersData);

  ///////////////
  const [trainers, setTrainers] = useState([]);

  const API = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    loadTrainers();
  }, []);

  const loadTrainers = async () => {
    try {
      const res = await fetch(`${API}/trainers`);

      const data = await res.json();
      console.log(data.trainers);

      setTrainers(data.trainers || []);
    } catch (err) {
      console.log(err);
    }
  };

  ///////////////
  const filteredTrainers =
    activeCategory === "all"
      ? trainers
      : trainers.filter(
          (trainer) => trainer.specialization?.toLowerCase() === activeCategory,
        );

  return (
    <div className="min-h-screen bg-black">
      <div className="w-full fixed">
        <Header />
      </div>

      {/* Hero Section */}
      <div className="py-12 flex flex-col justify-center items-center">
        <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-3 text-center px-4">
          {" "}
          Meet Our <span className="text-[#D4AF37]">Expert Trainers</span>{" "}
        </h1>
        <p className="text-gray-400 text-center text-sm md:text-base max-w-2xl px-4">
          {" "}
          Our certified trainers are here to guide your fitness journey.{" "}
        </p>
      </div>

      {/* Categories */}
      <div className="flex justify-start md:justify-center gap-3 overflow-x-auto whitespace-nowrap px-4 py-4">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-5 py-2 rounded-xl font-semibold transition ${
              activeCategory === cat.value
                ? "bg-[#D4AF37] text-black"
                : "bg-zinc-800 text-white hover:bg-zinc-700"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Trainers Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
          {filteredTrainers.map((trainer) => (
            <div
              key={trainer.trainer_id}
              className="bg-zinc-900 rounded-2xl overflow-hidden border border-[#D4AF37]/20"
            >
              <div className="h-64 md:h-72 lg:h-80 overflow-hidden">
                {/* <img src={trainer.profile_picture} alt={trainer.full_name} className="w-full h-full object-cover"/> */}
                <img
                  src={
                    trainer.profile_picture
                      ? `${API}${trainer.profile_picture}`
                      : "/trainer.png"
                  }
                  alt={trainer.full_name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <h2 className="text- md:text-2xlxl font-bold text-white mb-2">
                  {" "}
                  {trainer.full_name}{" "}
                </h2>
                <p className="text-gray-400 mb-4">{trainer.bio}</p>
                <p className="text-gray-300">
                  {" "}
                  <span className="text-[#D4AF37]">Experience:</span>{" "}
                  {trainer.experience_years} Years{" "}
                </p>
                {/* <p className="text-gray-300 mt-2">
                  {" "}
                  <span className="text-[#D4AF37]">Availability:</span>{" "}
                  {trainer.availability}{" "}
                </p> */}
                <p className="text-gray-300 mt-2">
                  <span className="text-[#D4AF37]">Specialization:</span>
                  {trainer.specialization}
                </p>
                <button 
                  onClick={() => navigate("/sessions", { state: { trainer } })}
                  className="w-full mt-6 bg-[#D4AF37] hover:bg-[#b8962d] text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition duration-200 cursor-pointer"
                >
                  <FaCalendarCheck /> Book Session
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTrainers.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl text-white"> No Trainers Available </h3>
          </div>
        )}
      </div>
      <div className="pt-[50px]">
        <Footer />
      </div>
    </div>
  );
}
