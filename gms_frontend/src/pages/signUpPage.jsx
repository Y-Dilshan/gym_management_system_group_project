import axios from "axios";
import { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export default function SignUpPage() {
  const navigate = useNavigate();

  //connect to backend
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState("");
  const [customGoogleName, setCustomGoogleName] = useState("");

  const handleBack = () => {
    navigate("/");
  };

  const handleSignin = () => {
    navigate("/signin");
  };

  const handleTrainerSignup = () => {
    navigate("/Applyastrainer");
  };

  const handleGoogleLoginSubmit = async (googleEmail, googleName) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/users/google-login",
        {
          email: googleEmail,
          full_name: googleName || googleEmail.split("@")[0],
          profile_picture: `https://api.dicebear.com/7.x/adventurer/svg?seed=${googleEmail}`
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      toast.success("Account logged in via Google!");
      setShowGoogleModal(false);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Google login failed");
    }
  };

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
        "Registration failed"
      );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Side */}
     <div
        className="flex-1 relative bg-cover bg-center overflow-hidden flex justify-center items-center p-6 sm:p-12 min-h-[400px]"
        style={{
          backgroundImage: "url('/sign_up page.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <button
          onClick={handleBack}
          className="absolute top-6 left-6 z-10 text-white no-underline text-lg font-semibold cursor-pointer hover:text-[#E5B93E] transition"
        >
          ← Back
        </button>

        <div className="relative z-10 w-full max-w-[520px] flex flex-col justify-center py-10">
          {/* Logo */}
          <div className="flex items-center gap-4 mb-8">
            <img
              src="/logo.png"
              alt="Power Zone Logo"
              className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-xl object-cover shadow-[0_0_20px_rgba(229,185,62,0.4)]"
            />

            <h1 className="text-[#E5B93E] text-3xl sm:text-4xl md:text-5xl font-bold m-0">
              Power Zone
            </h1>
          </div>

          {/* Text Content */}
          <div className="flex flex-col [text-shadow:0_0_10px_rgba(229,185,62,0.5)]">
            <p className="text-white text-xl sm:text-2xl font-medium m-0">
              Start your journey
            </p>

            <h2 className="text-[#E5B93E] text-3xl sm:text-5xl md:text-6xl leading-tight font-bold my-2">
              Build the body <br className="hidden sm:inline" /> you deserve.
            </h2>

            <p className="text-zinc-200 text-sm sm:text-lg leading-relaxed mt-2 max-w-[500px]">
              Join thousands of members who've transformed their lives with
              expert coaching, premium equipment, and a community that pushes
              you further.
            </p>

            {/* Features */}
            <div className="text-zinc-200 text-sm sm:text-base leading-relaxed mt-4 space-y-1">
              <p>• 24/7 access to all facilities</p>
              <p>• Personal training session on signup</p>
              <p>• 100+ weekly group classes</p>
              <p>• Cancel anytime — no lock-in</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-[50%] min-h-screen bg-[#333333] flex justify-center items-center py-10">
        <div className="w-[90%] max-w-[500px] bg-black shadow-2xl shadow-gray-600 pt-6 relative rounded-xl flex flex-col justify-between p-6 min-h-[720px]">
            <div>
              {/* Title */}
              <h1 className="text-[28px] text-[#D4AF37] text-center font-semibold"> Create your account </h1>
              <div className="text-white text-center text-sm">
                <h3>
                  Already have an account?{" "}
                  <button
                    onClick={handleSignin}
                    className="cursor-pointer text-[#D4AF37] hover:underline"
                  >
                    Sign in
                  </button>
                </h3>
              </div>
              <div className="flex flex-col items-center pt-[10px] gap-3">
                <div className="w-full flex flex-col">
                  <label className="text-white mb-1 text-[14px]"> Full name </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full h-[38px] border border-[#D4AF37] rounded-xl bg-white text-black px-4 outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>

                <div className="w-full flex flex-col">
                  <label className="text-white mb-1 text-[14px]"> Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-[38px] border border-[#D4AF37] rounded-xl bg-white text-black px-4 outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>

                <div className="w-full flex flex-col">
                  <label className="text-white mb-1 text-[14px]"> Mobile number </label>
                  <input
                    type="text"
                    placeholder="Enter your mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-[38px] border border-[#D4AF37] rounded-xl bg-white text-black px-4 outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>

                <div className="w-full flex flex-col">
                  <label className="text-white mb-1 text-[14px]"> Password </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-[38px] border border-[#D4AF37] rounded-xl bg-white text-black px-4 outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="text-white text-center pt-[20px]">
                <button onClick={handleRegister} className="cursor-pointer border border-[#D4AF37] transition duration-300 w-full h-[40px] rounded-xl bg-[#D4AF37] text-black font-bold hover:bg-[#333333] hover:text-[#D4AF37]">
                  Sign up
                </button>
              </div>

              <div className="flex text-white pt-[15px] flex-col gap-2">
                <span className="text-center text-xs text-zinc-400">or sign up with</span>
                <div className="w-full flex justify-center">
                  <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                      try {
                        const decoded = jwtDecode(credentialResponse.credential);
                        const response = await axios.post(
                          import.meta.env.VITE_BACKEND_URL + "/users/google-login",
                          {
                            email: decoded.email,
                            full_name: decoded.name,
                            profile_picture: decoded.picture
                          }
                        );

                        localStorage.setItem("token", response.data.token);
                        localStorage.setItem("user", JSON.stringify(response.data.user));

                        toast.success("Account logged in via Google!");
                        const role = (response.data.user.role || "MEMBER").toUpperCase();
                        if (role === "ADMIN") {
                          navigate("/admin");
                        } else if (role === "TRAINER") {
                          navigate("/booksessions");
                        } else {
                          navigate("/home");
                        }
                      } catch (error) {
                        console.error(error);
                        toast.error(error.response?.data?.error || "Google sign up failed");
                      }
                    }}
                    onError={() => {
                      toast.error("Google Sign-Up failed");
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Trainer Button */}
            <div className="w-full">
              <button
                className="cursor-pointer border border-[#D4AF37] w-full h-[40px] rounded-xl bg-[#D4AF37] text-black font-bold hover:bg-[#333333] hover:text-[#D4AF37] transition duration-300"
                onClick={handleTrainerSignup}
              >
                Apply As a Trainer
              </button>
            </div>
          </div>
        </div>

      {/* Google Account Selector Modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm">
          <div className="bg-white text-black w-[400px] rounded-2xl shadow-2xl p-6 border border-zinc-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-center gap-2 mb-4">
                <FcGoogle className="text-3xl" />
                <span className="font-semibold text-lg text-zinc-700">Google Sign Up</span>
              </div>
              <h2 className="text-xl font-bold text-center text-zinc-800 mb-1">Sign Up with Google</h2>
              <p className="text-center text-xs text-zinc-500 mb-6">Enter your Google email address to register</p>

              {/* Primary Custom Input */}
              <div className="space-y-3 mb-6">
                <input
                  type="email"
                  placeholder="Google Email (e.g. yourname@gmail.com)"
                  value={customGoogleEmail}
                  onChange={(e) => setCustomGoogleEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-zinc-300 rounded-xl text-sm outline-none focus:ring-1 focus:ring-[#D4AF37] bg-white text-zinc-900 font-semibold"
                  required
                />
                <input
                  type="text"
                  placeholder="Google Display Name (e.g. John Doe)"
                  value={customGoogleName}
                  onChange={(e) => setCustomGoogleName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-zinc-300 rounded-xl text-sm outline-none focus:ring-1 focus:ring-[#D4AF37] bg-white text-zinc-900 font-semibold"
                />
                <button
                  onClick={() => {
                    if (!customGoogleEmail.trim()) {
                      toast.error("Please enter email address");
                      return;
                    }
                    handleGoogleLoginSubmit(customGoogleEmail, customGoogleName);
                  }}
                  className="w-full py-3 bg-zinc-850 hover:bg-zinc-750 text-white rounded-xl text-sm font-bold transition cursor-pointer"
                >
                  Continue with Google Account
                </button>
              </div>

              {/* Demo Quick Select options */}
              <div className="border-t border-zinc-200 pt-4">
                <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-3">Or choose a demo account:</p>
                <div className="space-y-1.5">
                  {[
                    { name: "John Doe", email: "johndoe@gmail.com" },
                    { name: "Jane Smith", email: "janesmith@gmail.com" },
                    { name: "New User", email: "newuser@gmail.com" }
                  ].map((acc) => (
                    <button
                      key={acc.email}
                      onClick={() => handleGoogleLoginSubmit(acc.email, acc.name)}
                      className="w-full text-left p-2.5 border border-zinc-200 rounded-xl hover:bg-zinc-50 flex items-center gap-3 transition"
                    >
                      <div className="w-7 h-7 rounded-full bg-[#D4AF37] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {acc.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-xs text-zinc-800 leading-none">{acc.name}</p>
                        <p className="text-[10px] text-zinc-500 mt-0.5">{acc.email}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowGoogleModal(false)}
              className="mt-6 text-zinc-500 hover:text-black text-sm font-medium py-1 transition text-center"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
