import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { API_BASE_URL as API } from "../utils/api.js";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${API}/users/forgot-password`, { email });
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center flex justify-center items-center p-4 relative"
      style={{ backgroundImage: "url('/login_page.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      <div className="relative z-10 w-full max-w-md bg-[#1a1a1a]/95 border border-zinc-800 backdrop-blur-md shadow-2xl rounded-2xl p-6 sm:p-8 flex flex-col gap-6">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate("/signin")} 
          className="flex items-center gap-2 text-zinc-400 hover:text-[#D4AF37] transition duration-300 cursor-pointer text-sm"
        >
          <GoArrowLeft className="text-[20px]" /> <span>Back to Sign In</span>
        </button>

        {/* Title */}
        <div className="text-center mt-2">
          <h1 className="text-[30px] text-[#D4AF37] font-semibold">Forgot Password</h1>
          <p className="text-zinc-400 text-sm mt-1">Enter your email to receive a password reset link</p>
        </div>

        {/* Status Alerts */}
        {message && (
          <div className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs p-3 rounded-xl text-center">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-950/80 border border-red-500/50 text-red-300 text-xs p-3 rounded-xl text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="w-full flex flex-col">
            <label className="text-white mb-2 text-[14px]">Email Address</label>
            <input 
              type="email" 
              placeholder="Enter your registered email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
              className="w-full h-[45px] border border-zinc-700 focus:border-[#D4AF37] rounded-xl bg-zinc-900 text-white px-5 outline-none focus:ring-1 focus:ring-[#D4AF37]"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="mt-2 cursor-pointer border border-[#D4AF37] w-full h-[45px] rounded-xl bg-[#D4AF37] text-black font-bold hover:bg-[#333333] hover:text-[#D4AF37] transition duration-300 flex items-center justify-center"
          >
            {loading ? "Sending Link..." : "Send Reset Link"}
          </button>
        </form>

      </div>
    </div>
  );
}
