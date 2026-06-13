import { useState } from "react";

export default function AddTrainerPage() {
  const [trainer, setTrainer] = useState({
    trainer_name: "",
    email: "",
    phone: "",
    specialization: "",
    experience: "",
    certification: "",
    availability: "Available",
    rating: "",
    salary: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setTrainer({
      ...trainer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(trainer);

    // API Call Here
    // axios.post("/api/trainers", trainer)

    alert("Trainer Added Successfully!");
  };

  return (
    <div className="p-8">

      {/* Header */}
      <div className="bg-gradient-to-r from-[#111111] to-[#1C1C1C] border border-[#D4AF37]/20 rounded-2xl shadow-2xl p-6 mb-8">
        <h1 className="text-4xl font-bold text-white tracking-wide">
          Add Trainer
        </h1>

        <p className="text-gray-400 mt-2">
          Register a new trainer to the gym management system
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-[#141414] border border-[#D4AF37]/20 rounded-3xl shadow-[0_0_30px_rgba(212,175,55,0.08)] p-8">

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Trainer Name */}
            <div>
              <label className="block text-gray-300 mb-2">
                Trainer Name
              </label>

              <input
                type="text"
                name="trainer_name"
                value={trainer.trainer_name}
                onChange={handleChange}
                placeholder="Enter trainer name"
                className="w-full bg-[#1F1F1F] text-white px-4 py-3 rounded-xl border border-[#333333] focus:border-[#D4AF37] outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-300 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={trainer.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full bg-[#1F1F1F] text-white px-4 py-3 rounded-xl border border-[#333333] focus:border-[#D4AF37] outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-300 mb-2">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={trainer.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full bg-[#1F1F1F] text-white px-4 py-3 rounded-xl border border-[#333333] focus:border-[#D4AF37] outline-none"
              />
            </div>

            {/* Specialization */}
            <div>
              <label className="block text-gray-300 mb-2">
                Specialization
              </label>

              <select
                name="specialization"
                value={trainer.specialization}
                onChange={handleChange}
                className="w-full bg-[#1F1F1F] text-white px-4 py-3 rounded-xl border border-[#333333] focus:border-[#D4AF37] outline-none"
              >
                <option value="">Select Specialization</option>
                <option>Strength Training</option>
                <option>Bodybuilding</option>
                <option>Weight Loss</option>
                <option>CrossFit</option>
                <option>Yoga</option>
                <option>Cardio Training</option>
              </select>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-gray-300 mb-2">
                Experience (Years)
              </label>

              <input
                type="number"
                name="experience"
                value={trainer.experience}
                onChange={handleChange}
                placeholder="Enter years of experience"
                className="w-full bg-[#1F1F1F] text-white px-4 py-3 rounded-xl border border-[#333333] focus:border-[#D4AF37] outline-none"
              />
            </div>

            {/* Certification */}
            <div>
              <label className="block text-gray-300 mb-2">
                Certification
              </label>

              <input
                type="text"
                name="certification"
                value={trainer.certification}
                onChange={handleChange}
                placeholder="ACE, NASM, ISSA..."
                className="w-full bg-[#1F1F1F] text-white px-4 py-3 rounded-xl border border-[#333333] focus:border-[#D4AF37] outline-none"
              />
            </div>

            {/* Salary */}
            <div>
              <label className="block text-gray-300 mb-2">
                Monthly Salary
              </label>

              <input
                type="number"
                name="salary"
                value={trainer.salary}
                onChange={handleChange}
                placeholder="Enter salary"
                className="w-full bg-[#1F1F1F] text-white px-4 py-3 rounded-xl border border-[#333333] focus:border-[#D4AF37] outline-none"
              />
            </div>

            {/* Availability */}
            <div>
              <label className="block text-gray-300 mb-2">
                Availability
              </label>

              <select
                name="availability"
                value={trainer.availability}
                onChange={handleChange}
                className="w-full bg-[#1F1F1F] text-white px-4 py-3 rounded-xl border border-[#333333] focus:border-[#D4AF37] outline-none"
              >
                <option>Available</option>
                <option>Unavailable</option>
              </select>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-gray-300 mb-2">
                Rating
              </label>

              <input
                type="number"
                step="0.1"
                name="rating"
                value={trainer.rating}
                onChange={handleChange}
                placeholder="4.9"
                className="w-full bg-[#1F1F1F] text-white px-4 py-3 rounded-xl border border-[#333333] focus:border-[#D4AF37] outline-none"
              />
            </div>

            {/* Profile Image URL */}
            <div>
              <label className="block text-gray-300 mb-2">
                Profile Image URL
              </label>

              <input
                type="text"
                name="image"
                value={trainer.image}
                onChange={handleChange}
                placeholder="Paste image URL"
                className="w-full bg-[#1F1F1F] text-white px-4 py-3 rounded-xl border border-[#333333] focus:border-[#D4AF37] outline-none"
              />
            </div>

          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="block text-gray-300 mb-2">
              Description
            </label>

            <textarea
              rows="5"
              name="description"
              value={trainer.description}
              onChange={handleChange}
              placeholder="Trainer profile description..."
              className="w-full bg-[#1F1F1F] text-white px-4 py-3 rounded-xl border border-[#333333] focus:border-[#D4AF37] outline-none resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-8">

            <button
              type="reset"
              className="px-6 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-gray-800 transition"
            >
              Reset
            </button>

            <button
              type="submit"
              className="bg-[#D4AF37] text-black px-8 py-3 rounded-xl font-semibold hover:scale-105 transition duration-300"
            >
              Add Trainer
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}