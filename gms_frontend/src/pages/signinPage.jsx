import axios from "axios";
import { useState, useEffect } from "react";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState("");
  const [customGoogleName, setCustomGoogleName] = useState("");

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const handleSignup = () => {
    navigate("/signup");
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
      
      const role = response.data.user.role ? response.data.user.role.toUpperCase() : "MEMBER";
      toast.success("Login successful!");
      setShowGoogleModal(false);

      if (role === "ADMIN") {
        navigate("/admin");
      } else if (role === "TRAINER") {
        navigate("/booksessions");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Google login failed");
    }
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

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success("Login successful!");
      console.log(response.data);

      const user = response.data.user;
      const role = (user.role || "MEMBER").toUpperCase();

      if (role === "ADMIN") {
        navigate("/admin");
      } else if (role === "TRAINER") {
        navigate("/booksessions");
      } else {
        navigate("/home");
      }

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="bg-[url('login_page.jpg')] w-full h-screen flex justify-center items-center object-cover">
      <div className="w-[450px] h-[550px] bg-[#1a1a1a]/95 border border-zinc-800 backdrop-blur-md shadow-2xl pt-10 relative rounded-2xl p-8 flex flex-col justify-between">
        
        {/* Back Button */}
        <button onClick={handleBack} className="flex items-center gap-2 text-zinc-400 hover:text-[#D4AF37] transition duration-300 absolute left-8 top-8 cursor-pointer">
          <GoArrowLeft className="text-[20px]" /> <span> Back </span>
        </button>

        {/* Title */}
        <div className="text-center mt-6">
          <h1 className="text-[32px] text-[#D4AF37] font-semibold"> Sign In </h1>
          <p className="text-zinc-400 text-sm mt-1">Access your Power Zone portal</p>
        </div>

        <div className="flex flex-col items-center pt-[20px] gap-4 w-full">
          <div className="w-full flex flex-col">
            <label className="text-white mb-2 text-[14px]"> Email </label>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-[45px] border border-zinc-700 focus:border-[#D4AF37] rounded-xl bg-zinc-900 text-white px-5 outline-none focus:ring-1 focus:ring-[#D4AF37]"/>
          </div>

          <div className="w-full flex flex-col">
            <label className="text-white mb-2 text-[14px]"> Password </label>
            <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-[45px] border border-zinc-700 focus:border-[#D4AF37] rounded-xl bg-zinc-900 text-white px-5 outline-none focus:ring-1 focus:ring-[#D4AF37]"/>
          </div>
        </div>

        <div className="w-full pt-[20px] flex flex-col gap-3">
          <button onClick={handleSubmit} className="cursor-pointer border border-[#D4AF37] w-full h-[45px] rounded-xl bg-[#D4AF37] text-black font-bold hover:bg-[#333333] hover:text-[#D4AF37] transition duration-300">
            Sign In
          </button>
          
          <button onClick={() => setShowGoogleModal(true)} className="cursor-pointer border border-zinc-700 w-full h-[45px] rounded-xl bg-zinc-900 text-white flex items-center justify-center gap-2 hover:bg-[#333333] transition duration-300">
            <FcGoogle className="text-xl" /> Sign in with Google
          </button>
        </div>

        <div className="w-full text-center flex flex-col gap-2 mt-4 text-sm text-zinc-400">
          <div>
            Don't have an account?{" "}
            <button onClick={handleSignup} className="cursor-pointer text-[#D4AF37] hover:underline"> Sign Up </button>
          </div>
          <div>
            Forgot Password?{" "}
            <button className="cursor-pointer text-[#D4AF37] hover:underline"> Reset here </button>
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
                <span className="font-semibold text-lg text-zinc-700">Google Sign In</span>
              </div>
              <h2 className="text-xl font-bold text-center text-zinc-800 mb-1">Sign In with Google</h2>
              <p className="text-center text-xs text-zinc-500 mb-6">Enter your Google email address to log in</p>

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
                    { name: "Alex Admin (Demo)", email: "admin@powerzone.com" }
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
