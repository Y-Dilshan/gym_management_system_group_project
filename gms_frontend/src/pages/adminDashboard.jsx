import { Link, Outlet } from "react-router-dom";
import { LuUsers } from "react-icons/lu";
import { FaClipboardList } from "react-icons/fa";
import { LiaThListSolid } from "react-icons/lia";
import { MdPayments } from "react-icons/md";

export default function AdminDashboard() {
    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar */}
            <div className="w-[280px] bg-[#111827] text-white p-6 shadow-2xl">

                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="w-24 h-24 object-contain"
                    />
                    <h2 className="text-[#D4AF37] text-3xl font-bold mt-2">
                        Admin Panel
                    </h2>
                </div>

                {/* Overview */}
                <div className="mb-6">
                    <h1 className="text-[#D4AF37] font-bold text-lg mb-3">
                        OVERVIEW
                    </h1>

                    <Link
                        to="/admin/dashboard"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition duration-300"
                    >
                        <FaClipboardList size={22} />
                        Dashboard
                    </Link>
                </div>

                {/* Management */}
                <div className="mb-6">
                    <h1 className="text-[#D4AF37] font-bold text-lg mb-3">
                        MANAGEMENT
                    </h1>

                    <div className="flex flex-col gap-2">
                        <Link
                            to="/admin/products"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition"
                        >
                            <FaClipboardList size={22} />
                            Products
                        </Link>

                        <Link
                            to="/admin/users"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition"
                        >
                            <LuUsers size={22} />
                            Users
                        </Link>

                        <Link
                            to="/admin/orders"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition"
                        >
                            <LiaThListSolid size={22} />
                            Orders
                        </Link>

                        <Link
                            to="/admin/payments"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition"
                        >
                            <MdPayments size={22} />
                            Memberships
                        </Link>
                    </div>
                </div>

                {/* Content */}
                <div className="mb-6">
                    <h1 className="text-[#D4AF37] font-bold text-lg mb-3">
                        CONTENT
                    </h1>

                    <div className="flex flex-col gap-2">
                        <Link
                            to="/admin/trainers"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition"
                        >
                            <FaClipboardList size={22} />
                            Trainers
                        </Link>

                        <Link
                            to="/admin/schedules"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition"
                        >
                            <FaClipboardList size={22} />
                            Schedules
                        </Link>
                    </div>
                </div>

                {/* Finance */}
                <div>
                    <h1 className="text-[#D4AF37] font-bold text-lg mb-3">
                        FINANCE
                    </h1>

                    <div className="flex flex-col gap-2">
                        <Link
                            to="/admin/revenue"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition"
                        >
                            <FaClipboardList size={22} />
                            Revenue
                        </Link>

                        <Link
                            to="/admin/settings"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition"
                        >
                            <FaClipboardList size={22} />
                            Settings
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-bold text-gray-800">
                        Dashboard
                    </h1>

                    <Link
                        to="/admin/add-product"
                        className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg transition"
                    >
                        + Add Product
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 min-h-[80vh]">
                    <Outlet />
                </div>

            </div>
        </div>
    );
}