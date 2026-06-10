import { Link, Routes, Route, Outlet, useLocation } from "react-router-dom";
import { LuUsers } from "react-icons/lu";
import { FaClipboardList } from "react-icons/fa";
import { LiaThListSolid } from "react-icons/lia";
import { MdPayments } from "react-icons/md";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { MdSportsGymnastics } from "react-icons/md";
import { AiFillSchedule } from "react-icons/ai";
import { SiRevenuecat } from "react-icons/si";
import { IoIosSettings } from "react-icons/io";
import AdminProductPage from './admin/adminProductPage.jsx';
import AdminAddProduct from './admin/adminAddProduct.jsx';
import AdminOrdersPage from './admin/adminOrdersPage.jsx';
import AdminUsersPage from './admin/adminUsersPage.jsx';

export default function AdminDashboard() {
    const location = useLocation();
    const isDashboard = location.pathname === "/admin" || location.pathname === "/admin/dashboard";

    return (
        <div className="flex min-h-screen bg-[#333333]">
            {/* Left Sidebar - Fixed */}
            <div className="w-[280px] bg-[#333333] text-white p-6 shadow-2xl">
                <div className="flex gap-8 items-center mb-4">
                    <img src="/logo.png" alt="Logo" className="w-24 h-24 object-contain" />
                    <h2 className="text-[#D4AF37] text-3xl font-bold mt-2"> POWER ZONE </h2>
                </div>

                {/* Overview */}
                <div className="mb-4">
                    <h1 className="text-[#D4AF37] font-bold text-lg mb-2"> OVERVIEW </h1>
                    <Link to="/admin/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition duration-300" > <MdOutlineDashboardCustomize size={22} /> Dashboard </Link>
                </div>

                {/* Management */}
                <div className="mb-4">
                    <h1 className="text-[#D4AF37] font-bold text-lg mb-2"> MANAGEMENT </h1>

                    <div className="flex flex-col gap-2">
                        <Link to="/admin/products" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition" > <FaClipboardList size={22} /> Products </Link>
                        <Link to="/admin/users" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition" > <LuUsers size={22} /> Users </Link>
                        <Link to="/admin/orders" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition" > <LiaThListSolid size={22} /> Orders </Link>
                        <Link to="/admin/memberships" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition" > <MdPayments size={22} /> Memberships </Link>
                    </div>
                </div>

                {/* Content */}
                <div className="mb-4">
                    <h1 className="text-[#D4AF37] font-bold text-lg mb-2"> CONTENT </h1>

                    <div className="flex flex-col gap-2">
                        <Link to="/admin/trainers" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition" > <MdSportsGymnastics size={22} /> Trainers </Link>
                        <Link to="/admin/schedules" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition" > <AiFillSchedule size={22} /> Schedules </Link>
                    </div>
                </div>

                {/* Finance */}
                <div>
                    <h1 className="text-[#D4AF37] font-bold text-lg mb-2"> FINANCE </h1>

                    <div className="flex flex-col gap-2">
                        <Link to="/admin/revenue" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition" > <SiRevenuecat size={22} /> Revenue </Link>
                        <Link to="/admin/settings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition" > <IoIosSettings size={22} /> Settings </Link>
                    </div>
                </div>
            </div>

            {/* Main Content Area with Routing */}
            <div className="w-[calc(100%-280px)] flex-1 p-8 bg-white rounded-lg shadow-2xl m-4">
                {/* Only show header on dashboard page */}
                {isDashboard && (
                    <div className="flex justify-between items-center mb-4 bg-[#333333] p-4 rounded-lg shadow-lg">
                        <h1 className="text-4xl font-bold text-white"> Admin Dashboard </h1>
                        <Link to="/admin/add-product" className="bg-[#D4AF37] hover:bg-[#333333] text-white px-5 py-3 rounded-lg shadow-lg transition" > + Add Product </Link>
                    </div>
                )}

                {/* This is where the nested routes will render */}
                <Outlet />
            </div>
        </div>
    );
}