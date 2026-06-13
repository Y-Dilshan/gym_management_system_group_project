import { NavLink, Link, Outlet, useLocation } from "react-router-dom";
import { LuUsers } from "react-icons/lu";
import {
  FaClipboardList,
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaDollarSign,
} from "react-icons/fa";
import { LiaThListSolid } from "react-icons/lia";
import {
  MdPayments,
  MdOutlineDashboardCustomize,
  MdSportsGymnastics,
} from "react-icons/md";
import { AiFillSchedule } from "react-icons/ai";
import { SiRevenuecat } from "react-icons/si";
import { IoIosSettings } from "react-icons/io";

export default function AdminDashboard() {
  const location = useLocation();

  const isDashboard =
    location.pathname === "/admin" ||
    location.pathname === "/admin/dashboard";

  const navStyle = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-[#D4AF37] text-black font-bold"
        : "text-white hover:bg-[#1A1A1A]"
    }`;

  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      {/* Sidebar */}
      <div className="w-[280px] bg-[#050505] border-r border-[#2A2A2A] p-6">
        {/* Logo */}
        <div className="flex items-center gap-4 mb-10">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-20 h-20 object-contain"
          />

          <div>
            <h1 className="text-[#D4AF37] text-2xl font-bold">
              POWER ZONE
            </h1>

            <p className="text-gray-400 text-sm">
              Admin Panel
            </p>
          </div>
        </div>

        {/* Overview */}
        <div className="mb-8">
          <h2 className="text-[#D4AF37] font-bold mb-3">
            OVERVIEW
          </h2>

          <NavLink
            to="/admin/dashboard"
            className={navStyle}
          >
            <MdOutlineDashboardCustomize size={20} />
            Dashboard
          </NavLink>
        </div>

        {/* Management */}
        <div className="mb-8">
          <h2 className="text-[#D4AF37] font-bold mb-3">
            MANAGEMENT
          </h2>

          <div className="flex flex-col gap-2">
            <NavLink
              to="/admin/products"
              className={navStyle}
            >
              <FaClipboardList size={20} />
              Products
            </NavLink>

            <NavLink
              to="/admin/users"
              className={navStyle}
            >
              <LuUsers size={20} />
              Users
            </NavLink>

            <NavLink
              to="/admin/orders"
              className={navStyle}
            >
              <LiaThListSolid size={20} />
              Orders
            </NavLink>

            <NavLink
              to="/admin/memberships"
              className={navStyle}
            >
              <MdPayments size={20} />
              Memberships
            </NavLink>
          </div>
        </div>

        {/* Content */}
        <div className="mb-8">
          <h2 className="text-[#D4AF37] font-bold mb-3">
            CONTENT
          </h2>

          <div className="flex flex-col gap-2">
            <NavLink
              to="/admin/trainers"
              className={navStyle}
            >
              <MdSportsGymnastics size={20} />
              Trainers
            </NavLink>

            <NavLink
              to="/admin/schedules"
              className={navStyle}
            >
              <AiFillSchedule size={20} />
              Schedules
            </NavLink>
          </div>
        </div>

        {/* Finance */}
        <div>
          <h2 className="text-[#D4AF37] font-bold mb-3">
            FINANCE
          </h2>

          <div className="flex flex-col gap-2">
            <NavLink
              to="/admin/revenue"
              className={navStyle}
            >
              <SiRevenuecat size={20} />
              Revenue
            </NavLink>

            <NavLink
              to="/admin/settings"
              className={navStyle}
            >
              <IoIosSettings size={20} />
              Settings
            </NavLink>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {isDashboard && (
          <>
            {/* Header */}
            <div className="bg-gradient-to-r from-[#111111] to-[#1C1C1C] border border-[#D4AF37]/20 rounded-2xl shadow-xl p-6 mb-8 flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Admin Dashboard
                </h1>

                <p className="text-gray-400 mt-2">
                  Manage your gym system efficiently
                </p>
              </div>

              <Link
                to="/admin/add-product"
                className="bg-[#D4AF37] text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
              >
                + Add Product
              </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-[#141414] p-6 rounded-2xl border border-[#2A2A2A]">
                <FaUsers className="text-[#D4AF37] text-3xl mb-3" />
                <h3 className="text-gray-400">Total Users</h3>
                <p className="text-white text-3xl font-bold mt-2">
                  1250
                </p>
              </div>

              <div className="bg-[#141414] p-6 rounded-2xl border border-[#2A2A2A]">
                <FaBoxOpen className="text-[#D4AF37] text-3xl mb-3" />
                <h3 className="text-gray-400">Products</h3>
                <p className="text-white text-3xl font-bold mt-2">
                  85
                </p>
              </div>

              <div className="bg-[#141414] p-6 rounded-2xl border border-[#2A2A2A]">
                <FaShoppingCart className="text-[#D4AF37] text-3xl mb-3" />
                <h3 className="text-gray-400">Orders</h3>
                <p className="text-white text-3xl font-bold mt-2">
                  320
                </p>
              </div>

              <div className="bg-[#141414] p-6 rounded-2xl border border-[#2A2A2A]">
                <FaDollarSign className="text-[#D4AF37] text-3xl mb-3" />
                <h3 className="text-gray-400">Revenue</h3>
                <p className="text-[#D4AF37] text-3xl font-bold mt-2">
                  $12,450
                </p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-[#141414] rounded-3xl border border-[#2A2A2A] overflow-hidden">
              <div className="flex justify-between items-center px-8 py-6 border-b border-[#2A2A2A]">
                <h2 className="text-2xl text-white font-semibold">
                  Recent Orders
                </h2>

                <input
                  type="text"
                  placeholder="Search Orders..."
                  className="bg-[#1F1F1F] text-white px-4 py-2 rounded-xl border border-[#333333] outline-none focus:border-[#D4AF37]"
                />
              </div>

              <table className="w-full">
                <thead>
                  <tr className="bg-[#D4AF37] text-black">
                    <th className="px-6 py-4 text-left">
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-left">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left">
                      Amount
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-b border-[#2A2A2A] hover:bg-[#1C1C1C]">
                    <td className="px-6 py-5 text-white">
                      #12345
                    </td>

                    <td className="px-6 py-5 text-gray-300">
                      John Doe
                    </td>

                    <td className="px-6 py-5 text-gray-300">
                      2026-06-12
                    </td>

                    <td className="px-6 py-5">
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                        Completed
                      </span>
                    </td>

                    <td className="px-6 py-5 text-[#D4AF37] font-bold">
                      $120
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Child Routes */}
        <Outlet />
      </div>
    </div>
  );
}