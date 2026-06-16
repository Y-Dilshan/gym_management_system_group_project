import Footer from "../components/footer.jsx";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { GoSignIn } from "react-icons/go";
import { SlUserFollowing } from "react-icons/sl";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import BMI from "../components/bmi.jsx";

export default function HomePage() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const handleProduct = () => {
    navigate("/products");
  };

  const handleGetStarted = () => {
    navigate("/signup");
  };

  const handleSignin = () => {
    navigate("/signin");
  };

  const handleSignUp = () => {
    navigate("/signup");
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
      link: "/personal-training",
    },

    {
      title: "Modern Equipment",
      image: "/services6.jpg",
      description: "Train using the latest professional gym equipment.",
      link: "/equipment",
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
      <nav className="fixed top-0 left-0 w-full z-50 bg-black shadow-lg h-[100px] px-[100px]">
        <div className="flex items-center justify-between h-full">
          <div>
            <img src="logo.png" alt="logo" className="w-[100px] h-[100px]" />
          </div>
          <div className="flex items-center gap-10 text-xl text-white">
            <a className="hover:text-[#d4a017]" href="#">
              Home
            </a>
            <a className="hover:text-[#d4a017]" href="#about">
              About
            </a>
            <a className="hover:text-[#d4a017]" href="#our_services">
              Our Services
            </a>
            <a className="hover:text-[#d4a017]" href="#contacts">
              Contacts
            </a>
            <Link className="hover:text-[#d4a017]" to="/trainers">
              Trainers
            </Link>
            <Link className="hover:text-[#d4a017]" to="/schedules">
              Schedules
            </Link>
          </div>

          <div className="flex gap-5">
            <Link to="/signin">
              <button
                onClick={handleSignin}
                className="bg-[#050505] text-white px-4 py-2 rounded w-[150px] h-[35px] flex items-center justify-center gap-2 text-[16px] border border-[#d4a017] hover:bg-[#d4a017] hover:text-black transition duration-300"
              >
                Sign in <GoSignIn />
              </button>
            </Link>

            <Link to="/signup">
              <button
                onClick={handleSignUp}
                className="bg-[#d4a017] text-white px-4 py-2 rounded w-[150px] h-[35px] text-[16px] flex items-center justify-center gap-2 hover:bg-[#050505] hover:text-white transition duration-300"
              >
                Sign Up <SlUserFollowing />
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/*home*/}
      <div className="w-full h-screen bg-[url('home.jpg')] bg-cover bg-center pt-[50px]">
        <div className="w-full mt-50">
          <h1 className="text-6xl font-bold text-center text-[#d4a017]">
            Unleash Your Potential
          </h1>
          <p className="text-center text-2xl text-white mt-10 px-4 max-w-[800px] mx-auto">
            Join the ultimate fitness experience designed to build strength,
            improve endurance, and boost your confidence through expert guidance
            and modern training methods.
          </p>

          {/* <div className = "flex items-center justify-center py-[50px]"> */}

          {/* <button onClick={handleGetStarted} className="bg-[#333333] text-white  rounded w-[150px] h-[35px] flex items-center justify-center gap-2 text-[20px] border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition duration-300 font-bold">Get Started </button> */}
          {/* </div> */}

          <div className="flex items-center justify-center py-[50px]">
            <button
              onClick={handleGetStarted}
              className="bg-[#d4a017] text-black  rounded-3xl w-[200px] h-[50px] mt-20 flex items-center justify-center gap-2 text-[30px] border border-[#d4a017] hover:bg-[#D4AF37] hover:text-white transition duration-300 font-bold "
            >
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
        <div className="flex items-center justify-center mt-[30px] gap-10">
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
          Our Services
        </h1>

        <div className="relative px-20">
          <button
            onClick={prevCard}
            className="absolute left-4 top-1/2 z-20 bg-black text-white p-4 rounded-full"
          >
            <FaChevronLeft />
          </button>

          <div className="overflow-hidden">
            <div
              className="flex gap-8 transition-transform duration-700"
              style={{
                transform: `translateX(-${current * 34}%)`,
              }}
            >
              {services.map((service, index) => (
                <div
                  key={index}
                  className="min-w-[32%] bg-[#111] rounded-3xl overflow-hidden shadow-lg"
                >
                  <img
                    src={service.image}
                    className="h-[280px] w-full object-cover"
                  />

                  <div className="p-6">
                    <h2 className="text-3xl text-[#d4a017] font-bold">
                      {service.title}
                    </h2>

                    <p className="text-white mt-4">{service.description}</p>

                    <button
                      onClick={() => navigate(service.link)}
                      className="mt-6 w-full bg-[#d4a017] text-black py-3 rounded-xl font-bold hover:bg-yellow-500 cursor-pointer"

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
            className="absolute right-4 top-1/2 z-20 bg-black text-white p-4 rounded-full"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/*Contact Us*/}
      <div id="contacts">
        <div>
          <h1 className="text-4xl font-bold text-center text-[#d4a017] py-[50px]">
            Contact Us
          </h1>
        </div>

        <div className="flex justify-center pt-[20px]">
          <input
            type="text"
            placeholder="Enter your email"
            className="w-[800px] h-[50px] bg-white items-center justify-center rounded-[15px] pl-[20px]"
          />
        </div>

        <div className="flex justify-center pt-[20px]">
          <input
            type="text"
            placeholder="Enter your name"
            className="w-[800px] h-[50px] bg-white items-center justify-center rounded-[15px] pl-[20px]"
          />
        </div>

        <div className="flex justify-center pt-[20px]">
          <textarea
            type="text"
            placeholder="Message"
            className="w-[800px] h-[150px] bg-white items-center justify-center rounded-[15px] pl-[20px]"
          />
        </div>

        <div className=" flex justify-center pt-[20px]">
          <button className="flex items-center justify-center gap-2 border text-white text-2xl border-[#d4a017] border-[2px] w-[800px] h-[50px] rounded-2xl hover:bg-[#d4a017] hover:text-black cursor-pointer">
            Submit
          </button>
        </div>
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
