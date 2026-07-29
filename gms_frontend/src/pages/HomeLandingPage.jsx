import Footer from "../components/footer.jsx";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { FaDumbbell, FaUserFriends, FaAppleAlt, FaShoppingBag } from "react-icons/fa";
import { GiWeightLiftingUp, GiGymBag } from "react-icons/gi";
import BMI from "../components/bmi.jsx";

export default function HomeLandingPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    if (token && userString) {
      try {
        setUser(JSON.parse(userString));
      } catch (e) {
        console.error(e);
        navigate("/signin");
      }
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const firstName = user?.full_name ? user.full_name.split(" ")[0] : "there";

  const quickLinks = [
    {
      title: "Schedules",
      icon: <GiGymBag className="text-4xl" />,
      description: "See today's classes and book your next session.",
      link: "/schedules",
    },
    {
      title: "Trainers",
      icon: <FaUserFriends className="text-4xl" />,
      description: "Message your trainer or find a new one.",
      link: "/trainers",
    },
    {
      title: "Diet Plans",
      icon: <FaAppleAlt className="text-4xl" />,
      description: "Check this week's personalized meal plan.",
      link: "/dietplans",
    },
    {
      title: "Personal Training",
      icon: <GiWeightLiftingUp className="text-4xl" />,
      description: "Manage your one-on-one coaching sessions.",
      link: "/personal-training",
    },
    {
      title: "Supplements",
      icon: <FaShoppingBag className="text-4xl" />,
      description: "Reorder your go-to supplements.",
      link: "/products",
    },
    // {
    //   title: "Equipment",
    //   icon: <FaDumbbell className="text-4xl" />,
    //   description: "Browse the equipment available on the floor.",
    //   link: "/equipment",
    // },
  ];

  return (
    <div className="bg-[#050505] min-h-screen">
      {/* navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black shadow-lg h-[80px] md:h-[100px] px-5 md:px-10 lg:px-20">
        <div className="flex items-center justify-between h-full">
          <div>
            <img
              src="logo.png"
              alt="logo"
              className="w-[70px] h-[70px] md:w-[100px] md:h-[100px]"
            />
          </div>
          <div className="hidden md:flex items-center gap-6 text-lg text-white">
            <a className="hover:text-[#d4a017]" href="/dashboard">
              Dashboard
            </a>
            <a className="hover:text-[#d4a017]" href="/trainers">
              Trainers
            </a>
            <a className="hover:text-[#d4a017]" href="/schedules">
              Schedules
            </a>
            <a className="hover:text-[#d4a017]" href="/dietplans">
              Diet Plans
            </a>
            <a className="hover:text-[#d4a017]" href="/products">
              Supplements
            </a>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <span className="hidden sm:block text-white text-sm md:text-[16px]">
              Hi, {firstName}
            </span>
            <button
              onClick={handleLogout}
              className="bg-[#050505] text-white px-3 py-1 md:px-4 md:py-2 rounded text-sm md:text-[16px] flex items-center gap-2 border border-[#d4a017] hover:bg-[#d4a017] hover:text-black transition duration-300"
            >
              Logout <FiLogOut />
            </button>
          </div>
        </div>
      </nav>

      {/* welcome hero */}
      <div className="w-full h-screen bg-[url('home.jpg')] bg-cover bg-center pt-[50px] flex items-center">
        <div className="w-full">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-[#d4a017] px-4">
            Welcome back, {firstName}
          </h1>
          <p className="text-base md:text-xl lg:text-2xl text-center text-white mt-6 px-6 max-w-[800px] mx-auto">
            Pick up right where you left off. Your schedule, your trainer, and
            your plan are all one click away.
          </p>
          <div className="flex items-center justify-center py-[50px]">
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-[#d4a017] text-black rounded-3xl w-[220px] md:w-[260px] h-[50px] text-xl md:text-2xl flex items-center justify-center gap-2 border border-[#d4a017] hover:bg-[#D4AF37] hover:text-white transition duration-300 font-bold"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* quick links */}
      <div id="quick_links">
        <h1 className="text-4xl font-bold text-center text-[#d4a017] py-[50px]">
          Jump Back In
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-20 pb-[50px]">
          {quickLinks.map((item, index) => (
            <div
              key={index}
              className="bg-[#111] rounded-3xl overflow-hidden shadow-lg font-semibold hover:scale-105 transition duration-300 p-6 flex flex-col items-start"
            >
              <div className="text-[#d4a017] mb-4">{item.icon}</div>
              <h2 className="text-2xl text-[#d4a017] font-bold">
                {item.title}
              </h2>
              <p className="text-white mt-3">{item.description}</p>
              <button
                onClick={() => navigate(item.link)}
                className="mt-6 w-full bg-[#d4a017] text-black py-3 rounded-xl font-bold hover:bg-yellow-500 cursor-pointer"
              >
                Open
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* BMI */}
      <div className="mt-[20px]">
        <BMI />
      </div>

      {/* Footer */}
      <div className="pt-[50px]">
        <Footer />
      </div>
    </div>
  );
}