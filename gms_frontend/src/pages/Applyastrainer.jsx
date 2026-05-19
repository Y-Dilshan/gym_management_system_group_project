import { useState } from "react";
import { useNavigate } from "react-router-dom";


const API = "http://localhost:3000/api";

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          experience_years: form.experience_years
            ? parseInt(form.experience_years)
            : null,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Failed to submit application.");
      } else {
        setStatus("success");
        setMessage(data.message);
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
      setStatus("error");
      setMessage("Cannot connect to server. Please try again.");
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
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-16 font-sans">
      {/* Background texture */}
      <div className="fixed inset-0 bg-zinc-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(234,88,12,0.15),rgba(255,255,255,0))] pointer-events-none" />

      <div className="relative w-full max-w-2xl">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span className="text-orange-500 text-sm font-semibold tracking-widest uppercase">
              PowerZone
            </span>
          </div>
          <h1 className="text-4xl font-black text-white leading-tight">
            Apply as a<br />
            <span className="text-orange-500">Trainer</span>
          </h1>
          <p className="mt-3 text-zinc-400 text-sm leading-relaxed">
            Submit your application and our admin team will review it. Once
            approved, you'll receive your login credentials.
          </p>
        </div>

        {/* Success State */}
        {status === "success" && (
          <div className="mb-6 bg-green-500/10 border border-green-500/30 rounded-xl p-5 flex gap-3">
            <svg
              className="w-5 h-5 text-green-400 mt-0.5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="text-green-400 font-semibold text-sm">
                Application Submitted!
              </p>
              <p className="text-green-300/70 text-sm mt-0.5">{message}</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {status === "error" && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-5 flex gap-3">
            <svg
              className="w-5 h-5 text-red-400 mt-0.5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-red-400 text-sm">{message}</p>
          </div>
        )}

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-5"
        >
          {/* Row: Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Full Name" required>
              <input
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                placeholder="John Silva"
                className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                required
              />
            </Field>
            <Field label="Email Address" required>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@email.com"
                className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                required
              />
            </Field>
          </div>

          {/* Row: Phone + Experience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Phone Number">
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="077 123 4567"
                className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
            </Field>
            <Field label="Years of Experience">
              <input
                name="experience_years"
                type="number"
                min="0"
                max="50"
                value={form.experience_years}
                onChange={handleChange}
                placeholder="e.g. 3"
                className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
            </Field>
          </div>

          {/* Specialization */}
          <Field label="Specialization" required>
            <select
              name="specialization"
              value={form.specialization}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors appearance-none cursor-pointer"
              required
            >
              <option value="" disabled className="text-zinc-500">
                Select your specialization
              </option>
              {specializations.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>

          {/* Bio */}
          <Field label="About You">
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Tell us about your fitness background, certifications, and coaching philosophy..."
              rows={4}
              className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors resize-none"
            />
          </Field>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-orange-500 hover:bg-orange-400 disabled:bg-orange-500/50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-lg transition-colors text-sm tracking-wide flex items-center justify-center gap-2"
          >
            {status === "loading" ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </button>

          <p className="text-center text-zinc-600 text-xs">
            Already have an account?{" "}
            <a
              href="/trainer/login"
              className="text-orange-500 hover:text-orange-400"
            >
              Sign in here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

// ─── Reusable field wrapper ───────────────────────────────────────────────────
function Field({ label, required, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">
        {label} {required && <span className="text-orange-500">*</span>}
      </label>
      {children}
    </div>
  );
}
