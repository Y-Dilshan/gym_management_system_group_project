import axios from "axios";
import { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();

  //conect to backend
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleBack = () => {
    navigate("/");
  };

  const handleSignin = () => {
    navigate("/signin");
  };

  {
    /* trainer application form state */
  }
  const handleTrainerSignup = () => {
    navigate("/Applyastrainer");
  };

  //////////////
  // const handleRegister = async () => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3000/api/users/register",

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/users/register",
        {
          full_name: fullName,
          email: email,
          password: password,
          phone: phone,
        },
      );

      toast.success("Your account created successfully!");
      navigate("/signin");
    } catch (error) {
      console.log(error.response?.data);

      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Registration failed",
      );
    }
  };

  return (
    <div className="flex">
      {/* Left Side */}
      <div
        className="flex-1 relative bg-cover bg-center overflow-hidden flex justify-center items-center p-[26px]"

        style={{
          backgroundImage: "url('sign_up page.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/45"></div>

        <button
          onClick={handleBack}
          className="absolute top-7 left-7 z-10 text-white no-underline text-[22px] font-semibold cursor-pointer hover"
        >
          {" "}
          ← Back{" "}
        </button>

        <div className="relative z-10 w-full max-w-[520px] flex flex-col justify-center">
          {/* Logo */}
          <div className="flex items-center gap-5 mb-[50px]">
            <img
              src="/logo.png"
              alt="Power Zone Logo"
              className="w-[90px] h-[90px] rounded-xl object-cover shadow-[0_0_20px_rgba(229,185,62,0.4)]"
            />

            <h1 className="text-[#E5B93E] text-[56px] font-bold m-0">
              {" "}
              Power Zone{" "}
            </h1>
          </div>

          {/* Text Content */}
          <div className="flex flex-col [text-shadow:0_0_10px_rgba(229,185,62,0.5)]">
            <p className="text-white text-[34px] font-medium m-0">
              {" "}
              Start your journey{" "}
            </p>

            <h2 className="text-[#E5B93E] text-[68px] leading-[1.1] font-bold m-0">
              {" "}
              Build the body <br /> you deserve.{" "}
            </h2>

            <p className="text-white text-[24px] leading-[1.6] mt-[10px] max-w-[500px]">
              {" "}
              Join thousands of members who've transformed their lives with
              expert coaching, premium equipment, and a community that pushes
              you further.{" "}
            </p>

            {/* Features */}
            <div className="text-white text-[22px] leading-[2] mt-[10px]">
              <p>• 24/7 access to all facilities</p>
              <p>• Personal training session on signup</p>
              <p>• 100+ weekly group classes</p>
              <p>• Cancel anytime — no lock-in</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className=" w-[50%] h-screen bg-[#333333] ">
        <div className="bg-[#333333] w-full h-screen flex justify-center items-center">
          <div className="w-[500px] h-[720px] bg-black shadow-2xl shadow-gray-600 pt-6 relative rounded-xl">
        
            {/* Title */}
            <h1 className="text-[32px] text-[#D4AF37] text-center font-semibold">
              {" "}
              Create your account{" "}
            </h1>
            <div className="gap-10 text-white text-center">
              <h3>
                You already have an account?{" "}
                <button
                  onClick={handleSignin}
                  className="cursor-pointer text-white hover:text-[#D4AF37] transition duration-300  "
                >
                  Sign in
                </button>
              </h3>
            </div>
            <div className="flex flex-col items-center pt-[20px]">
              <div className="w-[400px] flex flex-col">
                <label className="text-white mb-2 text-[16px]">
                  {" "}
                  Full name{" "}
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-[400px] h-[40px] border border-[#D4AF37] rounded-2xl bg-white px-5 outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>

              <div className="w-[400px] flex flex-col pt-[20px]">
                <label className="text-white mb-2 text-[16px]"> Email</label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-[400px] h-[40px] border border-[#D4AF37] rounded-2xl bg-white px-5 outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>

              <div className="w-[400px] flex flex-col pt-[20px]">
                <label className="text-white mb-2 text-[16px]">
                  {" "}
                  Mobile number{" "}
                </label>

                <input
                  type="text"
                  placeholder="Enter your mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-[400px] h-[40px] border border-[#D4AF37] rounded-2xl bg-white px-5 outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>

              <div className="w-[400px] flex flex-col pt-[20px]">
                <label className="text-white mb-2 text-[16px]">
                  {" "}
                  Password{" "}
                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-[400px] h-[40px] border border-[#D4AF37] rounded-2xl bg-white px-5 outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>
            </div>

            <div
              onClick={handleRegister}
              className="text-white text-center text-[20px] pt-[30px]"
            >
              <button className="cursor-pointer border border-[#D4AF37] transition duration-300 border-[2px] w-[400px] h-[40px] rounded-2xl bg-[#D4AF37] hover:bg-[#333333] hover:outline-[#D4AF37] hover:text-black">
                Sign up
              </button>
            </div>
            <div className=" flex px-[50px] text-white pt-[20px] flex-col gap-2">
              <span className="text-center">or sign up with</span>
              <button className="cursor-pointer flex items-center justify-center gap-2 border border-[#D4AF37] transition duration-300 border-[2px] w-[400px] h-[40px] rounded-2xl hover:bg-[#D4AF37] hover:text-black">
                <FcGoogle className="text-xl" />
                Sign up with Google
              </button>
            </div>

            {/* Trainer Button */}
            <div className="flex px-[50px] text-white pt-[20px] flex-col gap-2">
              <button
                className="cursor-pointer border mt-[20px] border-[#D4AF37] border-[2px] w-[400px] h-[40px] rounded-2xl bg-[#D4AF37] hover:bg-[#333333] hover:outline-[#D4AF37] transition duration-300 hover:text-black"
                onClick={handleTrainerSignup}
              >
                Apply As a Trainer
              </button>
            </div>
            {/* Trainer Button */}
          </div>
        </div>
      </div>
    </div>
  );
}
