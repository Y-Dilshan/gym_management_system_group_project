import axios from "axios";
import { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

import { Toaster, toast } from "react-hot-toast";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/users/login",
        {
          email,
          password,
        },
      );

      // Save JWT token
      localStorage.setItem("token", response.data.token);

      // Save user info
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success("Login successful!");

      console.log(response.data);

      navigate("/");
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="bg-[url('login_page.jpg')] w-full h-screen flex justify-center items-center">
      <div className="w-[500px] h-[500px] bg-[#333333] shadow-2xl shadow-gray-600 pt-10 relative rounded-xl w-[400px]">
        {/* Back Button */}
        <button className="flex items-center gap-2 text-white hover:text-[#D4AF37] transition duration-300 absolute left-10 top-10">
          <GoArrowLeft className="text-[20px] " />
          <span onClick={handleBack} className="cursor-pointer">
            Back
          </span>
        </button>

        {/* Title */}
        <h1 className="text-[32px] text-[#D4AF37] text-center font-semibold">
          Sign In
        </h1>

        <div className="flex flex-col items-center pt-[20px]">
          <div className="w-[400px] flex flex-col">
            <label className="text-white mb-2 text-[16px]"> Email </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[400px] h-[40px] border border-[#D4AF37] rounded-2xl bg-white px-5 outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
          </div>

          <div className="w-[400px] flex flex-col pt-[20px]">
            <label className="text-white mb-2 text-[16px]"> Password </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[400px] h-[40px] border border-[#D4AF37] rounded-2xl bg-white px-5 outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
          </div>
        </div>

        <div className="text-white text-center text-[20px] pt-[30px]">
          <button
            onClick={handleSubmit}
            className="cursor-pointer border border-[#D4AF37] border-[2px] w-[400px] h-[40px] rounded-2xl bg-[#D4AF37] hover:bg-[#333333] transition duration-300 hover:outline-[#333333] hover:text-black"
          >
            Sign In
          </button>
        </div>

        <div className="pt-[30px] flex pl-[50px] text-white gap-2">
          <span>You already haven’t an account?</span>

          <button
            onClick={handleSignup}
            className="cursor-pointer hover:text-[#D4AF37] transition duration-300"
          >
            Sign Up
          </button>
        </div>

        <div className="pt-[30px] flex pl-[50px] text-white gap-2 justify-end pr-[50px]">
          <span>Forgot Password?</span>
          <button className="cursor-pointer hover:text-[#D4AF37] transition duration-300">
            Reset here
          </button>
        </div>
      </div>
    </div>
  );
}
