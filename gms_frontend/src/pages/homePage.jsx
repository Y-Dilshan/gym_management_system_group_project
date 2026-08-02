import axios from "axios"; 
import HomeHeader from "../components/homeHeader.jsx";
import Footer from "../components/footer.jsx";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { GoSignIn } from "react-icons/go";
import { SlUserFollowing } from "react-icons/sl";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import BMI from "../components/bmi.jsx";
import { toast } from "react-hot-toast"; 

import { getValidAuth, clearAuth } from "../utils/auth.js";

export default function HomePage() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [contactEmail, setContactEmail] = useState("");
const [contactName, setContactName] = useState("");
const [contactMessage, setContactMessage] = useState("");
const [contactLoading, setContactLoading] = useState(false);

  useEffect(() => {
    const auth = getValidAuth();
    setIsLogged(auth.isLogged);
    setUser(auth.user);
  }, []);

  const handleDashboard = () => {
    if (!user) return navigate("/signin");
    const role = user.role ? user.role.toUpperCase() : "MEMBER";
    if (role === "ADMIN") {
      navigate("/admin");
    } else if (role === "TRAINER") {
      navigate("/booksessions");
    } else {
      navigate("/dashboard");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLogged(false);
    setUser(null);
    navigate("/");
  };

  const handleProduct = () => {
    navigate("/products");
  };

  const handleGetStarted = () => {
    if (isLogged) {
      handleDashboard();
    } else {
      navigate("/signup");
    }
  };

  const handleSignin = () => {
    navigate("/signin");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactEmail || !contactName || !contactMessage) {
      toast.error("Please fill in all fields");
      return;
    }

    setContactLoading(true);
    try {
      const API = import.meta.env.VITE_BACKEND_URL;
      const res = await axios.post(`${API}/contact`, {
        name: contactName,
        email: contactEmail,
        message: contactMessage,
      });
      toast.success(res.data.message || "Your message has been sent successfully!");
      setContactEmail("");
      setContactName("");
      setContactMessage("");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to send message");
    } finally {
      setContactLoading(false);
    }
  };

  const services = [
    {
      title: "Schedules",
      image: "/services1.jpg",
      description:
        "Check available classes and gym schedules to plan your workouts.",
      link: "/schedules",
    },

    {
      title: "Trainers",
      image: "/services2.jpg",
      description:
        "Get guidance from certified trainers and achieve your goals faster.",
      link: "/trainers",
    },

    {
      title: "Supplements",
      image: "/services3.jpg",
      description:
        "Explore premium supplements for muscle growth and recovery.",
      link: "/products",
    },

    {
      title: "Diet Plans",
      image: "/services4.jpg",
      description: "Personalized meal plans to support your fitness journey.",
      link: "/dietplans",
    },

    {
      title: "Personal Training",
      image: "/services5.jpg",
      description: "One-on-one coaching sessions designed for your goals.",
      link: "/trainers",
    },

    {
      title: "Modern Equipment",
      image: "/services6.jpg",
      description: "Train using the latest professional gym equipment.",
      link: "/products",
    },
  ];

  const nextCard = () => {
    setCurrent((prev) => (prev + 1) % services.length);
  };

  const prevCard = () => {
    setCurrent((prev) => (prev === 0 ? services.length - 3 : prev - 1));
  };

  return (
    <div className="bg-[#050505] min-h-screen">
      {/* navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <HomeHeader />
      </div>

      {/*home*/}
      <div
        className="w-full min-h-screen bg-cover bg-center flex items-center justify-center pt-[100px] pb-16 relative"
        style={{ backgroundImage: "url('/home.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="relative z-10 w-full max-w-4xl px-4 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#d4a017] tracking-tight leading-tight">
            Unleash Your Potential
          </h1>
          <p className="text-sm sm:text-lg md:text-2xl text-zinc-200 mt-6 px-2 max-w-3xl mx-auto leading-relaxed">
            Join the ultimate fitness experience designed to build strength,
            improve endurance, and boost your confidence through expert guidance
            and modern training methods.
          </p>
          <div className="flex items-center justify-center mt-10">
            <button
              onClick={handleGetStarted}
              className="bg-[#d4a017] text-black rounded-3xl px-8 py-3.5 text-lg md:text-2xl flex items-center justify-center gap-2 border border-[#d4a017] hover:bg-[#D4AF37] hover:text-white transition duration-300 font-bold shadow-lg cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/*about*/}
      <div id="about" className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#d4a017] mb-10">
          About Us
        </h1>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <p className="text-center lg:text-left text-base md:text-lg text-zinc-300 leading-relaxed max-w-xl">
            Welcome to our fitness gym, where we help people of all levels
            achieve their health and fitness goals. With modern equipment,
            expert trainers, and personalized programs, we create a supportive
            and motivating environment for everyone. We believe fitness is more
            than just exercise — it’s about building confidence, discipline, and a
            healthier lifestyle. Join us and start your journey toward a
            stronger, better you.
          </p>
          <img
            src="/about.jpg"
            alt="about us"
            className="w-full max-w-md lg:w-[480px] h-[280px] md:h-[320px] object-cover rounded-2xl shadow-xl border border-zinc-800"
          />
        </div>
      </div>

      {/* Our Services */}

      <div id="our_services" className="py-16 px-4 md:px-12 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#d4a017] mb-12">
          Our Services
        </h1>
        <div className="relative px-2 sm:px-12">
          <button
            onClick={prevCard}
            className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 z-20 bg-black/80 hover:bg-[#d4a017] hover:text-black border border-zinc-700 text-white p-3 md:p-4 rounded-full transition shadow-lg cursor-pointer"
            aria-label="Previous service"
          >
            <FaChevronLeft size={18} />
          </button>
          
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${current * 100}%)`,
              }}
            >
              {services.map((service, index) => (
                <div
                  key={index}
                  className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] shrink-0 bg-[#111] border border-zinc-800 rounded-3xl overflow-hidden shadow-lg font-semibold transition duration-300 hover:border-[#d4a017]"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-[220px] md:h-[260px] w-full object-cover"
                  />
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl text-[#d4a017] font-bold">
                        {service.title}
                      </h2>
                      <p className="text-zinc-400 mt-3 text-sm font-normal min-h-[60px]">
                        {service.description}
                      </p>
                    </div>
                    <button
                      onClick={() => navigate(service.link)}
                      className="mt-6 w-full bg-[#d4a017] text-black py-3 rounded-xl font-bold hover:bg-yellow-500 transition cursor-pointer"
                    >
                      See More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={nextCard}
            className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 z-20 bg-black/80 hover:bg-[#d4a017] hover:text-black border border-zinc-700 text-white p-3 md:p-4 rounded-full transition shadow-lg cursor-pointer"
            aria-label="Next service"
          >
            <FaChevronRight size={18} />
          </button>
        </div>
      </div>

      {/*Contact Us*/}
      <div id="contacts" className="py-16 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#d4a017] mb-10">
          Contact Us
        </h1>

        <form onSubmit={handleContactSubmit} className="max-w-2xl mx-auto flex flex-col gap-5">
          <div className="w-full">
            <input
              type="email"
              placeholder="Enter your email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              required
              className="w-full h-[50px] bg-white rounded-xl px-5 text-black outline-none focus:ring-2 focus:ring-[#d4a017]"
            />
          </div>

          <div className="w-full">
            <input
              type="text"
              placeholder="Enter your name"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              required
              className="w-full h-[50px] bg-white rounded-xl px-5 text-black outline-none focus:ring-2 focus:ring-[#d4a017]"
            />
          </div>

          <div className="w-full">
            <textarea
              placeholder="Message"
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              required
              rows={4}
              className="w-full bg-white rounded-xl p-5 text-black outline-none focus:ring-2 focus:ring-[#d4a017]"
            />
          </div>

          <div className="w-full">
            <button 
              type="submit" 
              disabled={contactLoading}
              className="w-full border-2 border-[#d4a017] text-white text-xl py-3 rounded-xl hover:bg-[#d4a017] hover:text-black transition duration-300 cursor-pointer font-bold disabled:opacity-50"
            >
              {contactLoading ? "Sending..." : "Submit"}
            </button>
          </div>
        </form>
      </div>

      {/*BMI*/}
      <div className="py-8">
        <BMI />
      </div>

      {/* Footer */}
      <div className="pt-8">
        <Footer />
      </div>
    </div>
  );
}

