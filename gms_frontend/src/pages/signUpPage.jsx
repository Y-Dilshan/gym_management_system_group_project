import { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function SignUpPage() {
  const navigate = useNavigate();

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

  return (
    <div className="flex">
      {/* Left Side */}
      <div className="flex h-screen w-[50%] overflow-hidden relative">
        <img
          src="/register_page.jpg"
          lt="Gym"
          className="w-full h-full object-cover blur"
        />

        <div className="">
          {/* Back Button */}
          <button className="flex items-center gap-2 text-white hover:text-[#D4AF37] transition duration-300 absolute left-10 top-10">
            <GoArrowLeft className="text-[20px]" />
            <span onClick={handleBack}>Back</span>
          </button>
        </div>
      </div>

      {/* Right Side */}
      <div className=" w-[50%] h-screen">
        <div className="bg-[url('login_page.jpg')] w-full h-screen flex justify-center items-center">
          <div className="w-[500px] h-[700px] bg-[#333333] shadow-2xl shadow-gray-600 pt-6 relative rounded-xl w-[400px]">
            {/* Title */}
            <h1 className="text-[32px] text-[#D4AF37] text-center font-semibold">
              {" "}
              Create your account
            </h1>
            <div className="gap-10 text-white text-center">
              <h3>
                You already have an account?{" "}
                <button onClick={handleSignin}>Sign in</button>
              </h3>
            </div>
            <div className="flex flex-col items-center pt-[20px]">
              <div className="w-[400px] flex flex-col">
                <label className="text-white mb-2 text-[16px]">
                  {" "}
                  Full name{" "}
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-[400px] h-[40px] border border-[#D4AF37] rounded-2xl bg-white px-5 outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>

              <div className="w-[400px] flex flex-col pt-[20px]">
                <label className="text-white mb-2 text-[16px]"> Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-[400px] h-[40px] border border-[#D4AF37] rounded-2xl bg-white px-5 outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>

              <div className="w-[400px] flex flex-col pt-[20px]">
                <label className="text-white mb-2 text-[16px]">
                  {" "}
                  Mobile number{" "}
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-[400px] h-[40px] border border-[#D4AF37] rounded-2xl bg-white px-5 outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>

              <div className="w-[400px] flex flex-col pt-[20px]">
                <label className="text-white mb-2 text-[16px]">
                  {" "}
                  Password{" "}
                </label>
                <input
                  type="email"
                  placeholder="Enter your password"
                  className="w-[400px] h-[40px] border border-[#D4AF37] rounded-2xl bg-white px-5 outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>
            </div>
            <div className="text-white text-center text-[20px] pt-[30px]">
              <button className=" border border-[#D4AF37] border-[2px] w-[400px] h-[40px] rounded-2xl bg-[#D4AF37] hover:bg-[#333333] hover:outline-[#D4AF37] hover:text-black">
                Sign in
              </button>
            </div>
            <div className=" flex px-[50px] text-white pt-[20px] flex-col gap-2">
              <span className="text-center">or sign up with</span>
              <button className="flex items-center justify-center gap-2 border border-[#D4AF37] border-[2px] w-[400px] h-[40px] rounded-2xl hover:bg-[#D4AF37] hover:text-black">
                <FcGoogle className="text-xl" />
                Sign up with Google
              </button>
            </div>

            {/* Trainer Button */}
            <div className="flex px-[50px] text-white pt-[20px] flex-col gap-2">
              <button
                className=" border border-[#D4AF37] border-[2px] w-[400px] h-[40px] rounded-2xl bg-[#D4AF37] hover:bg-[#333333] hover:outline-[#D4AF37] hover:text-black"
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
