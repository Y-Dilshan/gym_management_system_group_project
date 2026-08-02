import { Link, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";

import { getValidAuth, clearAuth } from "../utils/auth.js";

export default function Header() {
  const [showOption, setShowOption] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const updateAuthUser = () => {
    const auth = getValidAuth();
    setIsLogged(auth.isLogged);
    setUser(auth.user);
  };

  useEffect(() => {
    updateAuthUser();
    updateCartCount();

    window.addEventListener("storage", updateAuthUser);
    window.addEventListener("user-updated", updateAuthUser);
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cart-updated", updateCartCount);
    return () => {
      window.removeEventListener("storage", updateAuthUser);
      window.removeEventListener("user-updated", updateAuthUser);
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cart-updated", updateCartCount);
    };
  }, []);

  const getAvatarSrc = (path) => {
    if (!path) return null;
    if (path.startsWith("data:") || path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    }
    const baseUrl = (import.meta.env.VITE_API_URL || "https://gym-management-system-group-project.onrender.com").replace(/\/api\/?$/, "");
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${baseUrl}${cleanPath}`;
  };

  const handleDashboard = () => {
    setShowOption(false);
    setMobileMenuOpen(false);
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
    clearAuth();
    setIsLogged(false);
    setUser(null);
    setShowOption(false);
    setMobileMenuOpen(false);
    navigate("/");
  };

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
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
    <nav className="bg-black h-[80px] md:h-[100px] px-4 md:px-10 lg:px-16 shadow-2xl shadow-[#333333] border-b border-gray-700 relative">
      <div className="flex items-center justify-between h-full">
        
        {/* Logo */}
        <div onClick={() => handleNavClick("top")} className="flex items-center gap-3 md:gap-4 text-white cursor-pointer shrink-0">
          <img src="/logo.png" alt="logo" className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] object-contain"/>

          <div>
            <p className="text-[20px] md:text-[28px] font-bold leading-none">Power</p>
            <p className="text-[20px] md:text-[28px] font-bold text-[#d4a017] leading-none"> Zone </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-base xl:text-lg text-white">
          <button onClick={() => handleNavClick("top")} className="hover:text-[#d4a017] duration-300 cursor-pointer"> Home </button>
          <button onClick={() => handleNavClick("about")} className="hover:text-[#d4a017] duration-300 cursor-pointer"> About </button>
          <button onClick={() => handleNavClick("our_services")} className="hover:text-[#d4a017] duration-300 cursor-pointer"> Our Services </button>
          <button onClick={() => handleNavClick("contacts")} className="hover:text-[#d4a017] duration-300 cursor-pointer"> Contacts </button>
          {user?.role?.toUpperCase() !== "TRAINER" && (
            <>
              <Link to="/trainers" className="hover:text-[#d4a017] duration-300"> Trainers </Link>
              <Link to="/schedules" className="hover:text-[#d4a017] duration-300"> Schedules </Link>
            </>
          )}
          <Link to="/products" className="hover:text-[#d4a017] duration-300"> Supplements </Link>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-4 md:gap-6">
          
          {/* Cart */}
          <button onClick={() => navigate("/cart")} className="cursor-pointer relative p-1"> 
            <FaCartShopping className="text-2xl md:text-3xl text-white hover:text-[#d4a017] duration-300"/> 
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#d4a017] text-black text-[10px] font-extrabold w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center border border-black shadow-lg">
                {cartCount}
              </span>
            )}
          </button>

          {/* Conditional Profile / Login buttons */}
          {isLogged ? (
            <div className="relative">
              <button onClick={() => setShowOption(!showOption)} className="cursor-pointer flex items-center"> 
                {user?.profile_picture ? (
                  <img
                    src={getAvatarSrc(user.profile_picture)}
                    alt={user?.full_name || "Profile"}
                    className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover border-2 border-[#d4a017] hover:scale-105 duration-300 shadow-md"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <FaUserCircle className="text-3xl md:text-4xl text-white hover:text-[#d4a017] duration-300"/>
                )}
              </button>
              {showOption && (
                <div className="absolute right-0 mt-3 w-64 bg-[#111] rounded-2xl shadow-2xl border border-zinc-800 overflow-hidden z-50">
                  
                  {/* User Section */}
                  <div className="flex flex-col items-center py-4 border-b border-zinc-800 bg-zinc-950">
                    {user?.profile_picture ? (
                      <img
                        src={getAvatarSrc(user.profile_picture)}
                        alt={user?.full_name || "Profile"}
                        className="w-14 h-14 rounded-full object-cover border-2 border-[#d4a017] shadow-lg"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      <FaUserCircle size={45} className="text-[#d4a017]" />
                    )}
                    <h3 className="text-white font-bold mt-2 text-sm"> {user?.full_name || "Gym Member"} </h3>
                    <p className="text-[#d4a017] text-xs font-semibold uppercase tracking-wider"> {user?.role || "Member"} </p>
                  </div>

                  {/* Menu */}
                  <div className="flex flex-col text-sm">
                    <button onClick={handleDashboard} className="w-full text-left px-5 py-3 text-white hover:bg-[#d4a017] hover:text-black transition duration-200"> My Dashboard </button>
                    <button onClick={() => { setShowOption(false); setMobileMenuOpen(false); navigate("/profile"); }} className="w-full text-left px-5 py-3 text-[#d4a017] hover:bg-[#d4a017] hover:text-black font-semibold transition duration-200"> ✏️ Edit Profile </button>
                    {user?.role?.toUpperCase() === "MEMBER" && (
                      <>
                        <button onClick={() => { setShowOption(false); setMobileMenuOpen(false); navigate("/schedules"); }} className="w-full text-left px-5 py-3 text-white hover:bg-[#d4a017] hover:text-black transition duration-200"> Workout Schedules </button>
                        <button onClick={() => { setShowOption(false); setMobileMenuOpen(false); navigate("/dietplans"); }} className="w-full text-left px-5 py-3 text-white hover:bg-[#d4a017] hover:text-black transition duration-200"> Diet Plans </button>
                        <button onClick={() => { setShowOption(false); setMobileMenuOpen(false); navigate("/trainers"); }} className="w-full text-left px-5 py-3 text-white hover:bg-[#d4a017] hover:text-black transition duration-200"> Book a Trainer </button>
                        <button onClick={() => { setShowOption(false); setMobileMenuOpen(false); navigate("/products"); }} className="w-full text-left px-5 py-3 text-white hover:bg-[#d4a017] hover:text-black transition duration-200"> Supplements Store </button>
                      </>
                    )}
                    <button onClick={handleLogout} className="w-full text-left px-5 py-3 text-red-400 hover:bg-red-600 hover:text-white transition duration-200 border-t border-zinc-800"> Logout </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex gap-2 md:gap-3">
              <button onClick={() => navigate("/signin")} className="bg-[#050505] text-white text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded border border-[#d4a017] hover:bg-[#d4a017] hover:text-black transition duration-300 cursor-pointer"> Sign in </button>
              <button onClick={() => navigate("/signup")} className="bg-[#d4a017] text-white text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded hover:bg-[#050505] hover:text-white transition duration-300 cursor-pointer"> Sign Up </button>
            </div>
          )}

          {/* Hamburger Menu Toggle (Mobile) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white hover:text-[#d4a017] text-2xl p-1 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[100%] left-0 w-full bg-black/95 border-b border-zinc-800 backdrop-blur-lg flex flex-col p-6 gap-4 text-white shadow-2xl z-50">
          <button onClick={() => handleNavClick("top")} className="text-left text-lg font-medium py-2 hover:text-[#d4a017] transition border-b border-zinc-800"> Home </button>
          <button onClick={() => handleNavClick("about")} className="text-left text-lg font-medium py-2 hover:text-[#d4a017] transition border-b border-zinc-800"> About </button>
          <button onClick={() => handleNavClick("our_services")} className="text-left text-lg font-medium py-2 hover:text-[#d4a017] transition border-b border-zinc-800"> Our Services </button>
          <button onClick={() => handleNavClick("contacts")} className="text-left text-lg font-medium py-2 hover:text-[#d4a017] transition border-b border-zinc-800"> Contacts </button>
          {user?.role?.toUpperCase() !== "TRAINER" && (
            <>
              <Link to="/trainers" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium py-2 hover:text-[#d4a017] transition border-b border-zinc-800"> Trainers </Link>
              <Link to="/schedules" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium py-2 hover:text-[#d4a017] transition border-b border-zinc-800"> Schedules </Link>
            </>
          )}
          <Link to="/products" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium py-2 hover:text-[#d4a017] transition border-b border-zinc-800"> Supplements </Link>
          
          {!isLogged && (
            <div className="flex flex-col gap-3 pt-3">
              <button onClick={() => { setMobileMenuOpen(false); navigate("/signin"); }} className="w-full bg-zinc-900 text-white text-base py-2.5 rounded-xl border border-[#d4a017] hover:bg-[#d4a017] hover:text-black font-semibold transition"> Sign in </button>
              <button onClick={() => { setMobileMenuOpen(false); navigate("/signup"); }} className="w-full bg-[#d4a017] text-black text-base py-2.5 rounded-xl font-bold hover:bg-yellow-500 transition"> Sign Up </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}