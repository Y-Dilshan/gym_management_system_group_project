import axios from "axios"; 
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { GoSignIn } from "react-icons/go";
import { SlUserFollowing } from "react-icons/sl";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import BMI from "../components/bmi.jsx";
import { toast } from "react-hot-toast"; 

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
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    if (token && userString) {
      setIsLogged(true);
      try {
        setUser(JSON.parse(userString));
      } catch (e) {
        console.error(e);
      }
    } else {
      setIsLogged(false);
      setUser(null);
    }
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
    <div className=" bg-[#050505]">
      {/* navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>

      {/*home*/}
      <div className="w-full h-screen bg-[url('home.jpg')] bg-cover bg-center pt-[50px]">
        <div className="w-full mt-50">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-[#d4a017] px-4">
            {" "}
            Unleash Your Potential{" "}
          </h1>
          <p className="text-base md:text-xl lg:text-2xl text-center text-white mt-6 px-6 max-w-[800px] mx-auto">
            {" "}
            Join the ultimate fitness experience designed to build strength,
            improve endurance, and boost your confidence through expert guidance
            and modern training methods.{" "}
          </p>
          <div className="flex items-center justify-center py-[50px]">
            <button
              onClick={handleGetStarted}
              className="bg-[#d4a017] text-black  rounded-3xl w-[180px] md:w-[220px] h-[50px] text-xl md:text-3xl flex items-center justify-center gap-2 text-[30px] border border-[#d4a017] hover:bg-[#D4AF37] hover:text-white transition duration-300 font-bold "
            >
              {" "}
              Get Started{" "}
            </button>
          </div>
        </div>
      </div>

      {/*about*/}
      <div id="about">
        <h1 className="text-4xl font-bold text-center text-[#d4a017] py-[50px]">
          About Us
        </h1>
        <div className="flex flex-col lg:flex-row items-center justify-center mt-[30px] gap-10 px-6">
          <p className="text-center text-lg text-white mt-4 px-4 max-w-[800px] ml-[100px]">
            Welcome to our fitness gym, where we help people of all levels
            achieve their health and fitness goals. With modern equipment,
            expert trainers, and personalized programs, we create a supportive
            and motivating environment for everyone. We believe fitness is more
            than just exercise it’s about building confidence, discipline, and a
            healthier lifestyle. Join us and start your journey toward a
            stronger, better you.
          </p>
          <img
            src="about.jpg "
            alt="about us"
            className="w-[480px] h-[280px] object-cover mt-[30px] mr-[100px]"
          />
        </div>
      </div>

      {/* Our Services */}

      <div id="our_services">
        <h1 className="text-4xl font-bold text-center text-[#d4a017] py-[50px]">
          {" "}
          Our Services{" "}
        </h1>
        <div className="relative px-20">
          <button
            onClick={prevCard}
            className="absolute left-4 top-1/2 z-20 bg-black text-white p-4 rounded-full"
          >
            {" "}
            <FaChevronLeft />{" "}
          </button>
          <div className="overflow-hidden">
            <div
              className="flex gap-8 transition-transform duration-700 "
              style={{
                transform: `translateX(-${current * 22}%)`,
              }}
            >
              {services.map((service, index) => (
                <div
                  key={index}
                  className="min-w-[32%] bg-[#111] rounded-3xl overflow-hidden shadow-lg font-semibold hover:scale-110 transition duration-400"
                >
                  <img
                    src={service.image}
                    className="h-[280px] w-full object-cover"
                  />
                  <div className="p-6">
                    <h2 className="text-3xl text-[#d4a017] font-bold">
                      {" "}
                      {service.title}{" "}
                    </h2>
                    <p className="text-white mt-4">{service.description}</p>
                    <button
                      onClick={() => navigate(service.link)}
                      className="mt-6 w-full bg-[#d4a017] text-black py-3 rounded-xl font-bold hover:bg-yellow-500 cursor-pointer"
                    >
                      {" "}
                      See More{" "}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={nextCard}
            className="absolute right-4 top-1/2 z-20 bg-black text-white p-4 rounded-full"
          >
            {" "}
            <FaChevronRight />{" "}
          </button>
        </div>
      </div>

      {/*Contact Us*/}
      <div id="contacts" className="mt-[50px]">
        <div>
          <h1 className="text-4xl font-bold text-center text-[#d4a017] py-[50px]">
            Contact Us
          </h1>
        </div>

        <form onSubmit={handleContactSubmit} className="flex flex-col gap-5 items-center">
          <div className="flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              required
              className="w-[800px] h-[50px] bg-white items-center justify-center rounded-[15px] pl-[20px] text-black outline-none focus:ring-2 focus:ring-[#d4a017]"
            />
          </div>

          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Enter your name"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              required
              className="w-[800px] h-[50px] bg-white items-center justify-center rounded-[15px] pl-[20px] text-black outline-none focus:ring-2 focus:ring-[#d4a017]"
            />
          </div>

          <div className="flex justify-center">
            <textarea
              placeholder="Message"
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              required
              className="w-[800px] h-[150px] bg-white items-center justify-center rounded-[15px] p-[20px] text-black outline-none focus:ring-2 focus:ring-[#d4a017]"
            />
          </div>

          <div className="flex justify-center w-full">
            <button 
              type="submit" 
              disabled={contactLoading}
              className="flex items-center justify-center gap-2 border text-white text-2xl border-[#d4a017] border-[2px] w-[800px] h-[50px] rounded-2xl hover:bg-[#d4a017] hover:text-black transition duration-300 cursor-pointer font-semibold"
            >
              {contactLoading ? "Sending..." : "Submit"}
            </button>
          </div>
        </form>
      </div>

      {/*BMI*/}
      <div className="mt-[50px]">
        <BMI />
      </div>

      {/* Footer */}

      <div className="pt-[50px]">
        <Footer />
      </div>
    </div>
  );
}
