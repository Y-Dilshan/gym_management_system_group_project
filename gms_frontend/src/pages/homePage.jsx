// import Header from "../components/Header.jsx";
import Header from "../components/header.jsx";

export default function HomePage() {
    return(
        <div className=" bg-[#333333]">
            <Header />

            // home
            <div className = "w-full px-[100px]">
                    <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
                    <img src="homepage.jpg" alt="homepage" className="w-[1320px] h-[650px] blur-sm object-cover"/>
                </div>
            <div>
                <h1 className = "text-4xl font-bold text-center text-[#D4AF37] pt-[50px]">Unleash Your Potential</h1>
                <p className = "text-center text-lg text-white mt-4 px-4 max-w-[800px] mx-auto">
                    Join the ultimate fitness experience designed to build strength, improve endurance, and boost your confidence through expert guidance and modern training methods.
                </p>

            <div className = "flex items-center justify-center mt-[50px]">
                <button className="bg-[#333333] text-white  rounded w-[150px] h-[35px] flex items-center justify-center gap-2 text-[20px] border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition duration-300">Get Started </button>
            </div>
              
            </div>
            </div>

            {/*about*/} 
            <div >
                    <h1 className = "text-4xl font-bold text-center text-[#D4AF37] pt-[50px]">About Us</h1>
                <div className = "flex items-center justify-center mt-[30px] gap-10">

                    <p className = "text-center text-lg text-white mt-4 px-4 max-w-[800px] ml-[100px]">
                        Welcome to our fitness gym, where we help people of all levels achieve their health and fitness goals. With modern equipment, expert trainers, and personalized programs, we create a supportive and motivating environment for everyone.

                        We believe fitness is more than just exercise it’s about building confidence, discipline, and a healthier lifestyle. Join us and start your journey toward a stronger, better you.
                    </p>

                <img src = "about.jpg " alt = "about us" className="w-[480px] h-[280px] object-cover mt-[30px] mr-[100px]"/>
            </div>
            </div>

            {/*Our Services*/} 
            <div>
                <h1 className = "text-4xl font-bold text-center text-[#D4AF37] pt-[50px]">Our Services</h1>
            </div>
        </div>
    )
}