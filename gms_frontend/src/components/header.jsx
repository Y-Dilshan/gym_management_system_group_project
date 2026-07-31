import { Link, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Header() {
  const [showOption, setShowOption] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();

  const updateCartCount = () => {
    const cartStr = localStorage.getItem("cart") || "[]";
    try {
      const cart = JSON.parse(cartStr);
      const count = cart.reduce((acc, item) => acc + (item.qty || 0), 0);
      setCartCount(count);
    } catch (e) {
      setCartCount(0);
    }
  };

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

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cart-updated", updateCartCount);
    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cart-updated", updateCartCount);
    };
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

  const handleNavClick = (sectionId) => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        if (sectionId === "top") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    } else {
      if (sectionId === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="bg-black h-[100px] px-[100px] shadow-2xl shadow-[#333333] border-b border-gray-700">
      <div className="flex items-center justify-between h-full">
        
        {/* Logo */}
        <div onClick={() => handleNavClick("top")} className="flex items-center gap-4 text-white cursor-pointer">
          <img src="/logo.png" alt="logo" className="w-[80px] h-[80px] object-contain"/>

          <div>
            <p className="text-[30px] font-bold leading-none">Power</p>
            <p className="text-[30px] font-bold text-[#d4a017] leading-none"> Zone </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-10 text-xl text-white">
          <button onClick={() => handleNavClick("top")} className="hover:text-[#d4a017] duration-300 cursor-pointer"> Home </button>
          <button onClick={() => handleNavClick("about")} className="hover:text-[#d4a017] duration-300 cursor-pointer"> About </button>
          <button onClick={() => handleNavClick("our_services")} className="hover:text-[#d4a017] duration-300 cursor-pointer"> Our Services </button>
          <button onClick={() => handleNavClick("contacts")} className="hover:text-[#d4a017] duration-300 cursor-pointer"> Contacts </button>
          <Link to="/trainers" className="hover:text-[#d4a017] duration-300"> Trainers </Link>
          <Link to="/schedules" className="hover:text-[#d4a017] duration-300"> Schedules </Link>
          <Link to="/products" className="hover:text-[#d4a017] duration-300"> Supplements </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-8">
          
          {/* Cart */}
          <button onClick={() => navigate("/cart")} className="cursor-pointer relative"> 
            <FaCartShopping size={32} className="text-white hover:text-[#d4a017] duration-300"/> 
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#d4a017] text-black text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border border-black shadow-lg">
                {cartCount}
              </span>
            )}
          </button>

          {/* Conditional Profile / Login buttons */}
          {isLogged ? (
            <div className="relative">
              <button onClick={() => setShowOption(!showOption)} className="cursor-pointer"> 
                <FaUserCircle size={55} className="text-white hover:text-[#d4a017] duration-300"/>
              </button>
              {showOption && (
                <div className="absolute right-0 mt-3 w-64 bg-[#111] rounded-2xl shadow-2xl border border-zinc-800 overflow-hidden z-50">
                  
                  {/* User Section */}
                  <div className="flex flex-col items-center py-4 border-b border-zinc-800 bg-zinc-950">
                    <FaUserCircle size={50} className="text-[#d4a017]" />
                    <h3 className="text-white font-bold mt-2"> {user?.full_name || "Gym Member"} </h3>
                    <p className="text-[#d4a017] text-xs font-semibold uppercase tracking-wider"> {user?.role || "Member"} </p>
                  </div>

                  {/* Menu */}
                  <div className="flex flex-col text-sm">
                    <button onClick={handleDashboard} className="w-full text-left px-5 py-3 text-white hover:bg-[#d4a017] hover:text-black transition duration-200"> My Dashboard </button>
                    <button onClick={() => { setShowOption(false); navigate("/profile"); }} className="w-full text-left px-5 py-3 text-[#d4a017] hover:bg-[#d4a017] hover:text-black font-semibold transition duration-200"> ✏️ Edit Profile </button>
                    {user?.role?.toUpperCase() === "MEMBER" && (
                      <>
                        <button onClick={() => { setShowOption(false); navigate("/schedules"); }} className="w-full text-left px-5 py-3 text-white hover:bg-[#d4a017] hover:text-black transition duration-200"> Workout Schedules </button>
                        <button onClick={() => { setShowOption(false); navigate("/dietplans"); }} className="w-full text-left px-5 py-3 text-white hover:bg-[#d4a017] hover:text-black transition duration-200"> Diet Plans </button>
                        <button onClick={() => { setShowOption(false); navigate("/trainers"); }} className="w-full text-left px-5 py-3 text-white hover:bg-[#d4a017] hover:text-black transition duration-200"> Book a Trainer </button>
                        <button onClick={() => { setShowOption(false); navigate("/products"); }} className="w-full text-left px-5 py-3 text-white hover:bg-[#d4a017] hover:text-black transition duration-200"> Supplements Store </button>
                      </>
                    )}
                    <button onClick={handleLogout} className="w-full text-left px-5 py-3 text-red-400 hover:bg-red-600 hover:text-white transition duration-200 border-t border-zinc-800"> Logout </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-4">
              <button onClick={() => navigate("/signin")} className="bg-[#050505] text-white px-4 py-2 rounded border border-[#d4a017] hover:bg-[#d4a017] hover:text-black transition duration-300 cursor-pointer"> Sign in </button>
              <button onClick={() => navigate("/signup")} className="bg-[#d4a017] text-white px-4 py-2 rounded hover:bg-[#050505] hover:text-white transition duration-300 cursor-pointer"> Sign Up </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}