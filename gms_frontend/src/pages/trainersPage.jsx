import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import { FaCalendarCheck } from "react-icons/fa";
import { useState, useEffect } from "react";

const categories = [
  { label: "All", value: "all" },
  { label: "Strength", value: "strength" },
  { label: "Cardio", value: "cardio" },
  { label: "Weight Loss", value: "weight-loss" },
  { label: "Bodybuilding", value: "bodybuilding" },
  { label: "Yoga", value: "yoga" },
];

// const trainersData = [
//   {
//     trainer_id: 1,
//     name: "John Silva",
//     specialization: "bodybuilding",
//     experience: 8,
//     availability: "Mon - Fri | 6:00 AM - 2:00 PM",
//     bio: "Certified bodybuilding coach specializing in muscle growth and strength training.",
//     image_url:
//       "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=500",
//   },
//   {
//     trainer_id: 2,
//     name: "Nimal Perera",
//     specialization: "weight-loss",
//     experience: 6,
//     availability: "Mon - Sat | 8:00 AM - 5:00 PM",
//     bio: "Expert in fat-loss programs and nutrition guidance.",
//     image_url:
//       "https://images.unsplash.com/photo-1549476464-37392f717541?w=500",
//   },
//   {
//     trainer_id: 3,
//     name: "Kasun Fernando",
//     specialization: "strength",
//     experience: 10,
//     availability: "Mon - Fri | 5:00 PM - 10:00 PM",
//     bio: "Powerlifting and strength-training specialist.",
//     image_url:
//       "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500",
//   },
//   {
//     trainer_id: 4,
//     name: "Samantha Jayasuriya",
//     specialization: "yoga",
//     experience: 7,
//     availability: "Tue - Sun | 7:00 AM - 1:00 PM",
//     bio: "Certified yoga instructor focused on flexibility and mindfulness.",
//     image_url:
//       "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=500",
//   },
//   {
//     trainer_id: 5,
//     name: "Dilshan Rodrigo",
//     specialization: "cardio",
//     experience: 5,
//     availability: "Mon - Sat | 6:00 AM - 12:00 PM",
//     bio: "Cardio fitness expert helping improve endurance.",
//     image_url:
//       "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500",
//   },
// ];

export default function TrainersPage() {
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

      setTrainers(data.trainers || []);
    } catch (err) {
      console.log(err);
    }
  };

  ///////////////
  const filteredTrainers =
    activeCategory === "all"
      ? trainers
      : trainers.filter((trainer) => trainer.specialization === activeCategory);

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <div className="py-12 flex flex-col justify-center items-center">
        <h1 className="font-bold text-4xl text-white mb-3">
          {" "}
          Meet Our <span className="text-[#D4AF37]">Expert Trainers</span>{" "}
        </h1>
        <p className="text-gray-400 text-center max-w-2xl px-4">
          {" "}
          Our certified trainers are here to guide your fitness journey.{" "}
        </p>
      </div>

      {/* Categories */}
      <div className="flex justify-center gap-3 overflow-x-auto px-4 py-4">
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
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
          {filteredTrainers.map((trainer) => (
            <div
              key={trainer.trainer_id}
              className="bg-zinc-900 rounded-2xl overflow-hidden border border-[#D4AF37]/20"
            >
              <div className="h-80 overflow-hidden">
                {/* <img src={trainer.image_url} alt={trainer.name} className="w-full h-full object-cover"/> */}
                <img
                  src={
                    trainer.image_url
                      ? `http://localhost:3000/${trainer.profile_picture}`
                      : "/trainer.png"
                  }
                  alt={trainer.trainer_name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {" "}
                  {trainer.trainer_name}{" "}
                </h2>
                <p className="text-gray-400 mb-4">{trainer.bio}</p>
                <p className="text-gray-300">
                  {" "}
                  <span className="text-[#D4AF37]">Experience:</span>{" "}
                  {trainer.experience_years} Years{" "}
                </p>
                <p className="text-gray-300 mt-2">
                  {" "}
                  <span className="text-[#D4AF37]">Availability:</span>{" "}
                  {trainer.availability}{" "}
                </p>
                <button className="w-full mt-6 bg-[#D4AF37] text-black font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#b8962d]">
                  <FaCalendarCheck /> Book Session{" "}
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
      <Footer />
    </div>
  );
}
