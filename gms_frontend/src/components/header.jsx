import { Link, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";

export default function Header() {
  const [showOption, setShowOption] = useState(false);

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/dashboard");
    setShowOption(false);
  };

  const handleLogout = () => {
    console.log("Logout");
    setShowOption(false);
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
          <Link to="/about" className="hover:text-[#d4a017] duration-300"> About </Link>
          <Link to="/our_services" className="hover:text-[#d4a017] duration-300"> Our Services </Link>
          <Link to="/contacts" className="hover:text-[#d4a017] duration-300"> Contacts </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-8">
          
          {/* Cart */}
          <button className="cursor-pointer"> <FaCartShopping size={32} className="text-white hover:text-[#d4a017] duration-300"/> </button>

          {/* Profile */}
          <div className="relative">
            <button onClick={() => setShowOption(!showOption)} className="cursor-pointer"> <FaUserCircle size={55} className="text-white hover:text-[#d4a017] duration-300"/></button>
            {showOption && (
              <div className="absolute right-0 mt-3 w-56 bg-[#1f1f1f] rounded-xl shadow-2xl border border-gray-700 overflow-hidden z-50">
                
                {/* User Section */}
                <div className="flex flex-col items-center py-4 border-b border-gray-700">
                  <FaUserCircle size={50} className="text-[#d4a017]" />
                  <h3 className="text-white font-semibold mt-2"> Gym Member </h3>
                  <p className="text-gray-400 text-sm"> Welcome Back </p>
                </div>

                {/* Menu */}
                <button onClick={handleEdit} className="w-full py-3 text-white hover:bg-[#d4a017] hover:text-black transition-all duration-300"> Edit Profile </button>
                <button onClick={handleLogout} className="w-full py-3 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"> Logout </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}