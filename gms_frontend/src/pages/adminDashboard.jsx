import { Link, Outlet, useLocation } from "react-router-dom";
import { LuUsers } from "react-icons/lu";
import { FaClipboardList } from "react-icons/fa";
import { LiaThListSolid } from "react-icons/lia";
import { MdPayments } from "react-icons/md";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { MdSportsGymnastics } from "react-icons/md";
import { AiFillSchedule } from "react-icons/ai";
import { SiRevenuecat } from "react-icons/si";
import { IoIosSettings } from "react-icons/io";

export default function AdminDashboard() {
  const location = useLocation();

  const isDashboard =
    location.pathname === "/admin" ||
    location.pathname === "/admin/dashboard";

  return (
    <div className="flex min-h-screen bg-[#050505]">

      {/* Sidebar */}
      <div className="w-[280px] bg-[#050505] text-white p-6 border-r border-[#2A2A2A] shadow-2xl">

        {/* Logo */}
        <div className="flex gap-4 items-center mb-8">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-16 h-16 object-contain"
          />
          <h2 className="text-[#D4AF37] text-2xl font-bold tracking-wide">
            POWER ZONE
          </h2>
        </div>

        {/* Overview */}
        <div className="mb-6">
          <h1 className="text-[#D4AF37] font-bold text-sm mb-3 tracking-widest">
            OVERVIEW
          </h1>

          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#1C1C1C] transition"
          >
            <MdOutlineDashboardCustomize size={22} />
            Dashboard
          </Link>
        </div>

        {/* Management */}
        <div className="mb-6">
          <h1 className="text-[#D4AF37] font-bold text-sm mb-3 tracking-widest">
            MANAGEMENT
          </h1>

          <div className="flex flex-col gap-2">
            <Link
              to="/admin/products"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#1C1C1C] transition"
            >
              <FaClipboardList size={22} />
              Products
            </Link>

            <Link
              to="/admin/users"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#1C1C1C] transition"
            >
              <LuUsers size={22} />
              Users
            </Link>

            <Link
              to="/admin/orders"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#1C1C1C] transition"
            >
              <LiaThListSolid size={22} />
              Orders
            </Link>

            <Link
              to="/admin/memberships"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#1C1C1C] transition"
            >
              <MdPayments size={22} />
              Memberships
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="mb-6">
          <h1 className="text-[#D4AF37] font-bold text-sm mb-3 tracking-widest">
            CONTENT
          </h1>

          <div className="flex flex-col gap-2">
            <Link
              to="/admin/trainers"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#1C1C1C] transition"
            >
              <MdSportsGymnastics size={22} />
              Trainers
            </Link>

            <Link
              to="/admin/schedules"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#1C1C1C] transition"
            >
              <AiFillSchedule size={22} />
              Schedules
            </Link>
          </div>
        </div>

        {/* Finance */}
        <div>
          <h1 className="text-[#D4AF37] font-bold text-sm mb-3 tracking-widest">
            FINANCE
          </h1>

          <div className="flex flex-col gap-2">
            <Link
              to="/admin/revenue"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#1C1C1C] transition"
            >
              <SiRevenuecat size={22} />
              Revenue
            </Link>

            <Link
              to="/admin/settings"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#1C1C1C] transition"
            >
              <IoIosSettings size={22} />
              Settings
            </Link>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 bg-black">

        {/* Top Header (ONLY Dashboard Page) */}
        {isDashboard && (
          <div className="bg-gradient-to-r from-[#111111] to-[#1C1C1C] border-b border-[#D4AF37]/20 px-8 py-5 flex justify-between items-center shadow-xl">

            <h1 className="text-3xl font-bold text-white tracking-wide">
              Admin Dashboard
            </h1>

            <Link
              to="/admin/add-product"
              className="bg-[#D4AF37] text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              + Add Product
            </Link>

          </div>
        )}

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
}