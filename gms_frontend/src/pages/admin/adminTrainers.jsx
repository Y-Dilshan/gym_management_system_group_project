import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AdminTrainers() {
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
      console.error(err);
    }
  };
  return (
    <div className="m-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#111111] to-[#1C1C1C] border border-[#D4AF37]/20 rounded-2xl shadow-2xl p-6 mb-8 flex items-center justify-between">
        {/* Left Side Text */}
        <div>
          <h1 className="text-4xl font-bold text-white tracking-wide">
            {" "}
            Trainers Management
          </h1>
          <p className="text-gray-400 mt-2">
            {" "}
            Manage trainers, schedules, certifications and availability{" "}
          </p>
        </div>
        {/* Right Side Button */}
        <Link
          to="/admin/add-trainer"
          className="bg-[#D4AF37] text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          + Add Trainer
        </Link>
      </div>
      {/* Header */}

      {/* Table Card */}
      <div className="bg-[#141414] border border-[#D4AF37]/20 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.08)]">
        {/* Card Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-[#2A2A2A]">
          <h2 className="text-2xl font-semibold text-white"> Trainers List </h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search Trainers..."
              className="bg-[#1F1F1F] text-white px-4 py-2 rounded-xl border border-[#333333] focus:border-[#D4AF37] outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Head */}
            <thead>
              <tr className="bg-[#D4AF37] text-black">
                <th className="px-6 py-5 text-left font-semibold">Photo</th>
                <th className="px-6 py-5 text-left font-semibold">
                  Trainer ID
                </th>
                <th className="px-6 py-5 text-left font-semibold">Name</th>
                <th className="px-6 py-5 text-left font-semibold">
                  Specialization
                </th>
                <th className="px-6 py-5 text-left font-semibold">
                  Experience
                </th>
                <th className="px-6 py-5 text-left font-semibold">
                  Certification
                </th>
                <th className="px-6 py-5 text-left font-semibold">
                  Availability
                </th>
                <th className="px-6 py-5 text-left font-semibold">Rating</th>
                <th className="px-6 py-5 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {trainers.map((trainer) => (
                <tr
                  key={trainer.trainer_id}
                  className="border-b border-[#2A2A2A] text-gray-300 hover:bg-[#1C1C1C]"
                >
                  <td className="px-6 py-5">
                    <img
                      src={
                        trainer.profile_picture
                          ? trainer.profile_picture
                          : "/default-trainer.jpg"
                      }
                      alt="Trainer"
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                  </td>

                  <td className="px-6 py-5 text-white">{trainer.trainer_id}</td>

                  <td className="px-6 py-5">{trainer.full_name}</td>

                  <td className="px-6 py-5">{trainer.specialization}</td>

                  <td className="px-6 py-5">
                    {trainer.experience_years} Years
                  </td>

                  <td className="px-6 py-5">{trainer.certification || "-"}</td>

                  <td className="px-6 py-5">
                    <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full">
                      Available
                    </span>
                  </td>

                  <td className="px-6 py-5">⭐ {trainer.rating || "0"}</td>

                  <td className="px-6 py-5">
                    <div className="flex gap-3">
                      <button className="bg-[#D4AF37] text-black px-5 py-2 rounded-xl">
                        View
                      </button>

                      <button className="bg-blue-600 px-5 py-2 rounded-xl">
                        Edit
                      </button>

                      <button className="bg-red-600 px-5 py-2 rounded-xl">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
