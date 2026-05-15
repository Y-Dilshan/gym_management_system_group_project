// import Header from "../components/Header.jsx";
import Header from "../components/header.jsx";

export default function HomePage() {
    return(
        <div className=" bg-[#A3A3A3]">
            <Header />
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
                <img src="homepage.jpg" alt="homepage" className="w-[1180px] h-[650px] blur-sm object-cover"/>
            </div>
            <div>
                <h1 className = "text-4xl font-bold text-center text-[#D4AF37] pt-[50px]">Unleash Your Potential</h1>
                <p className = "text-center text-lg text-black mt-4 px-4">
                    Join the ultimate fitness experience designed to build strength, improve endurance, and boost your confidence through expert guidance and modern training methods.
                </p>
            </div>
        </div>
    )
}