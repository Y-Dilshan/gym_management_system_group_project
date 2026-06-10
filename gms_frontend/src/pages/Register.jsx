import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import logo from "../assets/logo.jpeg";

function Register() {
  return (
    <div className="flex min-h-screen bg-[#2f2f2f] p-[35px] gap-5 box-border">
      {/* LEFT SIDE */}
      <div
        className="flex-1 relative bg-cover bg-center rounded-[22px] overflow-hidden flex justify-center items-center p-[50px]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1974&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/45"></div>

        <Link
          to="/"
          className="absolute top-7 left-7 z-10 text-white no-underline text-[22px] font-semibold"
        >
          ← Back
        </Link>

        <div className="relative z-10 w-full max-w-[520px] flex flex-col justify-center">
          {/* Logo */}
          <div className="flex items-center gap-5 mb-[50px]">
            <img
              src={logo}
              alt="Power Zone Logo"
              className="w-[90px] h-[90px] rounded-xl object-cover shadow-[0_0_20px_rgba(229,185,62,0.4)]"
            />

            <h1 className="text-[#E5B93E] text-[56px] font-bold m-0">
              Power Zone
            </h1>
          </div>

          {/* Text Content */}
          <div className="flex flex-col [text-shadow:0_0_10px_rgba(229,185,62,0.5)]">
            <p className="text-white text-[34px] font-medium m-0">
              Start your journey
            </p>

            <h2 className="text-[#E5B93E] text-[68px] leading-[1.1] font-bold m-0">
              Build the body <br />
              you deserve.
            </h2>

            <p className="text-white text-[24px] leading-[1.6] mt-[10px] max-w-[500px]">
              Join thousands of members who've transformed their lives with
              expert coaching, premium equipment, and a community that pushes
              you further.
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

      {/* RIGHT SIDE */}
      <div className="flex-1 bg-black rounded-[22px] flex justify-center items-center p-10">
        <div className="w-full max-w-[500px]">
          <h1 className="text-[#E5B93E] text-[52px] mb-[10px] text-center">
            Create your account
          </h1>

          <p className="text-white text-center mb-10 text-[18px]">
            You already have an account?
            <Link
              to="/login"
              className="text-white no-underline font-semibold"
            >
              {" "}
              Sign in
            </Link>
          </p>

          <div className="mb-6">
            <label className="block text-white mb-[10px] text-[22px] font-medium">
              Enter your first name
            </label>
            <input
              type="text"
              placeholder="Enter your first name"
              autoComplete="off"
              className="w-full p-[18px] rounded-[14px] border-none text-[22px] bg-[#ECECEC] outline-none box-border"
            />
          </div>

          <div className="mb-6">
            <label className="block text-white mb-[10px] text-[22px] font-medium">
              Enter your last name
            </label>
            <input
              type="text"
              placeholder="Enter your last name"
              autoComplete="off"
              className="w-full p-[18px] rounded-[14px] border-none text-[22px] bg-[#ECECEC] outline-none box-border"
            />
          </div>

          <div className="mb-6">
            <label className="block text-white mb-[10px] text-[22px] font-medium">
              Enter your email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              autoComplete="off"
              className="w-full p-[18px] rounded-[14px] border-none text-[22px] bg-[#ECECEC] outline-none box-border"
            />
          </div>

          <div className="mb-6">
            <label className="block text-white mb-[10px] text-[22px] font-medium">
              Enter your mobile number
            </label>
            <input
              type="text"
              placeholder="Enter your mobile number"
              autoComplete="off"
              className="w-full p-[18px] rounded-[14px] border-none text-[22px] bg-[#ECECEC] outline-none box-border"
            />
          </div>

          <div className="mb-6">
            <label className="block text-white mb-[10px] text-[22px] font-medium">
              Enter your password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              autoComplete="new-password"
              className="w-full p-[18px] rounded-[14px] border-none text-[22px] bg-[#ECECEC] outline-none box-border"
            />
          </div>

          <button className="w-full p-[18px] mt-[10px] rounded-[14px] border-[3px] border-[#D4A017] bg-[#333] text-white text-[28px] font-bold cursor-pointer">
            Start my membership
          </button>

          <p className="text-white text-center my-[30px] text-[18px]">
            or sign up with
          </p>

          <button className="w-full p-[18px] rounded-[14px] border-[3px] border-[#D4A017] bg-[#333] text-white text-[24px] font-semibold cursor-pointer flex justify-center items-center gap-[15px]">
            <FcGoogle size={32} />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;