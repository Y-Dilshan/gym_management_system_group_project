import { Link, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Header() {
  const [showOption, setShowOption] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

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
    setShowOption(false);
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
    setShowOption(false);
    navigate("/");
  };

  return (
    <nav className="bg-black h-[100px] px-[100px] shadow-2xl shadow-[#333333] border-b border-gray-700">
      <div className="flex items-center justify-between h-full">
        
        {/* Logo */}
        <div className="flex items-center gap-4 text-white">
          <img src="/logo.png" alt="logo" className="w-[80px] h-[80px] object-contain"/>

          <div>
            <p className="text-[30px] font-bold leading-none">Power</p>
            <p className="text-[30px] font-bold text-[#d4a017] leading-none"> Zone </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-10 text-xl text-white">
          <Link to="/" className="hover:text-[#d4a017] duration-300"> Home </Link>
          <Link to="/#about" className="hover:text-[#d4a017] duration-300"> About </Link>
          <Link to="/#our_services" className="hover:text-[#d4a017] duration-300"> Our Services </Link>
          <Link to="/#contacts" className="hover:text-[#d4a017] duration-300"> Contacts </Link>
          <Link to="/trainers" className="hover:text-[#d4a017] duration-300"> Trainers </Link>
          <Link to="/schedules" className="hover:text-[#d4a017] duration-300"> Schedules </Link>
          <Link to="/products" className="hover:text-[#d4a017] duration-300"> Supplements </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-8">
          
          {/* Cart */}
          <button onClick={() => navigate("/products")} className="cursor-pointer"> 
            <FaCartShopping size={32} className="text-white hover:text-[#d4a017] duration-300"/> 
          </button>

          {/* Conditional Profile / Login buttons */}
          {isLogged ? (
            <div className="relative">
              <button onClick={() => setShowOption(!showOption)} className="cursor-pointer"> 
                <FaUserCircle size={55} className="text-white hover:text-[#d4a017] duration-300"/>
              </button>
              {showOption && (
                <div className="absolute right-0 mt-3 w-56 bg-[#1f1f1f] rounded-xl shadow-2xl border border-gray-700 overflow-hidden z-50">
                  
                  {/* User Section */}
                  <div className="flex flex-col items-center py-4 border-b border-gray-700">
                    <FaUserCircle size={50} className="text-[#d4a017]" />
                    <h3 className="text-white font-semibold mt-2"> {user?.full_name || "Gym Member"} </h3>
                    <p className="text-gray-400 text-sm"> {user?.role || "Member"} </p>
                  </div>

                  {/* Menu */}
                  <button onClick={handleDashboard} className="w-full py-3 text-white hover:bg-[#d4a017] hover:text-black transition-all duration-300"> My Dashboard </button>
                  <button onClick={handleLogout} className="w-full py-3 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"> Logout </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-4">
              <button onClick={() => navigate("/signin")} className="bg-[#050505] text-white px-4 py-2 rounded border border-[#d4a017] hover:bg-[#d4a017] hover:text-black transition duration-300"> Sign in </button>
              <button onClick={() => navigate("/signup")} className="bg-[#d4a017] text-white px-4 py-2 rounded hover:bg-[#050505] hover:text-white transition duration-300"> Sign Up </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}