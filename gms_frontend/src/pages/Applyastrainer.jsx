import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_BACKEND_URL;

export default function ApplyAsTrainer() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    specialization: "",
    bio: "",
    experience_years: "",
  });

  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch(`${API}/trainer-applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          experience_years: form.experience_years
            ? parseInt(form.experience_years)
            : null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to submit application.");
      } else {
        toast.success(data.message || "Application submitted successfully!");

        setForm({
          full_name: "",
          email: "",
          phone: "",
          specialization: "",
          bio: "",
          experience_years: "",
        });
      }
    } catch {
      toast.error("Cannot connect to server. Please try again.");
    }
  };

  const specializations = [
    "Weight Training",
    "Yoga",
    "CrossFit",
    "Cardio & Endurance",
    "Pilates",
    "Nutrition Coaching",
    "Boxing & MMA",
    "Rehabilitation",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E1E1E] via-[#252525] to-[#1E1E1E] text-white flex">
      {/* Golden Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#D4AF37] opacity-10 blur-[180px]" />
      </div>

      {/* Left Section - Hero */}
      <div className="w-2/5 h-screen flex items-center justify-center">
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              {" "}
              APPLY AS A <br />{" "}
              <span className="text-[#D4AF37]">TRAINER</span>{" "}
            </h1>
            <div className="w-28 h-1 bg-[#D4AF37] mx-auto mt-6 rounded-full" />

            <p className="text-gray-400 text-lg max-w-3xl mx-auto mt-6">
              {" "}
              Join the Power Zone family and inspire people to achieve their
              fitness goals. Share your expertise, motivate members, and grow
              your professional fitness career with us.{" "}
            </p>
          </div>
        </section>
      </div>

      {/* Right Section - Form */}
      <div className="w-3/5 h-screen overflow-y-auto">
        <section className="relative pb-24 px-6">
          <div className="max-w-4xl mx-auto">
            {/* Heading */}
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold text-[#D4AF37]">
                {" "}
                Become Part of Our Team{" "}
              </h2>

              <p className="text-gray-400 mt-3">
                {" "}
                Complete the application below and our team will review your
                profile.{" "}
              </p>
            </div>

            {/* Form Card */}
            <div className="bg-[#2A2A2A]/90 backdrop-blur-md border border-[#D4AF37]/20 rounded-3xl p-8 md:p-10 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-[#D4AF37] uppercase">
                    {" "}
                    Full Name *{" "}
                  </label>

                  <input
                    type="text"
                    name="full_name"
                    value={form.full_name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full bg-[#1E1E1E] border border-[#444444] rounded-xl px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-[#D4AF37] uppercase">
                      {" "}
                      Email Address *{" "}
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full bg-[#1E1E1E] border border-[#444444] rounded-xl px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold text-[#D4AF37] uppercase">
                      {" "}
                      Phone Number{" "}
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+94 77 123 4567"
                      className="w-full bg-[#1E1E1E] border border-[#444444] rounded-xl px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* Specialization & Experience */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-[#D4AF37] uppercase">
                      {" "}
                      Specialization *{" "}
                    </label>
                    <select
                      name="specialization"
                      value={form.specialization}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#1E1E1E] border border-[#444444] rounded-xl px-5 py-3 text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                    >
                      <option value="">Select Specialization</option>

                      {specializations.map((item) => (
                        <option key={item} value={item}>
                          {" "}
                          {item}{" "}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold text-[#D4AF37] uppercase">
                      {" "}
                      Experience (Years){" "}
                    </label>

                    <input
                      type="number"
                      min="0"
                      max="50"
                      name="experience_years"
                      value={form.experience_years}
                      onChange={handleChange}
                      placeholder="Years of experience"
                      className="w-full bg-[#1E1E1E] border border-[#444444] rounded-xl px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-[#D4AF37] uppercase">
                    {" "}
                    About You{" "}
                  </label>

                  <textarea
                    rows={6}
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    placeholder="Tell us about your certifications, achievements, coaching style, and fitness experience..."
                    className="w-full bg-[#1E1E1E] border border-[#444444] rounded-xl px-5 py-3 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-[#D4AF37] hover:bg-[#B8860B] text-black font-bold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-yellow-500/20 hover:scale-[1.02] disabled:opacity-50"
                >
                  {" "}
                  {status === "loading"
                    ? "SUBMITTING..."
                    : "SUBMIT APPLICATION"}{" "}
                </button>

                {/* Login Link */}
                <p className="text-center text-gray-400">
                  {" "}
                  Already have an account?{" "}
                  <Link
                    to="/trainer/login"
                    onClick={() => navigate("/signin")}
                    className="text-[#D4AF37] hover:text-[#B8860B] font-semibold"
                  >
                    {" "}
                    Sign in here{" "}
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
