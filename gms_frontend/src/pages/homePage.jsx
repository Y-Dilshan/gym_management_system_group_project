import Footer from "../components/footer.jsx";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { GoSignIn } from "react-icons/go";
import { SlUserFollowing } from "react-icons/sl";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import BMI from "../components/bmiCal.jsx";

export default function HomePage() {

    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);

    const handleProduct = () => {
        navigate('/products');
    }

    const handleGetStarted = () =>{
        navigate('/signup');
    }

    const handleSignin = () => {
        navigate('/signin');
    }

    const handleSignUp = () => {
        navigate('/signup');
    }

    const images = [
        "/services1.jpg",
        "/services2.jpg",
        "/services3.jpg",
        "/services4.jpg",
        "/services5.jpg",
        "/services6.jpg",
    ]

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

    return(
        <div className=" bg-[#050505]">
            
            {/* navbar */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-black shadow-lg h-[100px] px-[100px]">
                <div className="flex items-center justify-between h-full">
                    <div>
                        <img src="logo.png" alt="logo" className="w-[100px] h-[100px]"/>
                    </div>
                    <div className="flex items-center gap-10 text-xl text-white">
                        <a className = "hover:text-[#d4a017]" href="#">Home</a>
                        <a className = "hover:text-[#d4a017]" href="#about">About</a>
                        <a className = "hover:text-[#d4a017]" href="#our_services">Our Services</a>
                        <a className = "hover:text-[#d4a017]" href="#contacts">Contacts</a>
                        <Link className = "hover:text-[#d4a017]" to="/trainers">Trainers</Link>
                        <Link className = "hover:text-[#d4a017]" to="/schedules">Schedules</Link>
                    </div>

                    <div className="flex gap-5">
                        <Link to = "/signin">
                        <button onClick = {handleSignin} className="bg-[#050505] text-white px-4 py-2 rounded w-[150px] h-[35px] flex items-center justify-center gap-2 text-[16px] border border-[#d4a017] hover:bg-[#d4a017] hover:text-black transition duration-300">
                            Sign in <GoSignIn />
                        </button>
                        </Link>
                    
                        <Link to = "/signup">
                        <button onClick = {handleSignUp} className="bg-[#d4a017] text-white px-4 py-2 rounded w-[150px] h-[35px] text-[16px] flex items-center justify-center gap-2 hover:bg-[#050505] hover:text-white transition duration-300">
                            Sign Up <SlUserFollowing />
                        </button>
                        </Link>
                    </div>
                </div>

            </nav>

            {/*home*/}
            <div className = "w-full h-screen bg-[url('home.jpg')] bg-cover bg-center pt-[50px]">
                <div className = "w-full mt-50">
                <h1 className = "text-6xl font-bold text-center text-[#d4a017]">Unleash Your Potential</h1>
                <p className = "text-center text-2xl text-white mt-10 px-4 max-w-[800px] mx-auto">
                    Join the ultimate fitness experience designed to build strength, improve endurance, and boost your confidence through expert guidance and modern training methods.</p>

             {/* <div className = "flex items-center justify-center py-[50px]"> */}

                 {/* <button onClick={handleGetStarted} className="bg-[#333333] text-white  rounded w-[150px] h-[35px] flex items-center justify-center gap-2 text-[20px] border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition duration-300 font-bold">Get Started </button> */}
             {/* </div> */}
              
                <div className = "flex items-center justify-center py-[50px]">
                    <button onClick={handleGetStarted} className="bg-[#d4a017] text-black  rounded-3xl w-[200px] h-[50px] mt-20 flex items-center justify-center gap-2 text-[30px] border border-[#d4a017] hover:bg-[#D4AF37] hover:text-white transition duration-300 font-bold ">Get Started </button>
                </div>
            </div>
            </div>
            
            

            {/*about*/} 
            <div id="about">
            <h1 className = "text-4xl font-bold text-center text-[#d4a017] py-[50px]">About Us</h1>
            <div className = "flex items-center justify-center mt-[30px] gap-10">
                <p className = "text-center text-lg text-white mt-4 px-4 max-w-[800px] ml-[100px]">Welcome to our fitness gym, where we help people of all levels achieve their health and fitness goals. With modern equipment, expert trainers, and personalized programs, we create a supportive and motivating environment for everyone. We believe fitness is more than just exercise it’s about building confidence, discipline, and a healthier lifestyle. Join us and start your journey toward a stronger, better you.</p>
                <img src = "about.jpg " alt = "about us" className="w-[480px] h-[280px] object-cover mt-[30px] mr-[100px]"/>
            </div>
            </div>

            {/*Our Services*/} 
            <div>
                <h1 className = "text-4xl font-bold text-center text-[#d4a017] py-[50px]">Our Services</h1>
                <div className="w-full mt-[20px] h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${images[current]})` }}>
                {/* Left Arrow */}
                <button onClick={prevImage} className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full"> <FaChevronLeft /> </button>

                {/* Right Arrow */}
                <button onClick={nextImage} className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full"> <FaChevronRight /> </button>
                
            </div>
            </div>
            

        {/*Contact Us*/} 
        <div id="contacts">
            <div>
                <h1 className = "text-4xl font-bold text-center text-[#d4a017] py-[50px]">Contact Us</h1>
            </div>

            <div className = "flex justify-center pt-[20px]">
                <input type="text" placeholder="Enter your email" className = "w-[800px] h-[50px] bg-white items-center justify-center rounded-[15px] pl-[20px]" />
            </div>

            <div className = "flex justify-center pt-[20px]">
                <input type="text" placeholder="Enter your name" className = "w-[800px] h-[50px] bg-white items-center justify-center rounded-[15px] pl-[20px]" />
            </div>

            <div className = "flex justify-center pt-[20px]">
                <textarea type="text" placeholder="Message" className = "w-[800px] h-[150px] bg-white items-center justify-center rounded-[15px] pl-[20px]" />
            </div>

             <div className = " flex justify-center pt-[20px]">
                <button className="flex items-center justify-center gap-2 border text-white text-2xl border-[#d4a017] border-[2px] w-[800px] h-[50px] rounded-2xl hover:bg-[#d4a017] hover:text-black cursor-pointer">Submit</button>
            </div>
        </div>

        {/*BMI*/} 
        <div className = "mt-[50px]">
            <BMI />
        </div>
        

        {/* Footer */}

        <div className = "pt-[50px]">
            <Footer/>
        </div>
        
        </div>
    )
}