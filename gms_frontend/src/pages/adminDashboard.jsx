import { Link } from "react-router-dom";
import { LuUsers } from "react-icons/lu";
import { FaClipboardList } from "react-icons/fa";
import { LiaThListSolid } from "react-icons/lia";
import { MdPayments } from "react-icons/md";

export default function AdminDashboard(){
    return(
        <div className="w-full h-full flex items-center justify-center">
            <div className = "w-[20%] h-screen bg-[#333333] flex flex-col items-center justify-start py-10">
                <img src="/logo.png" alt="Logo" className="w-[150px] h-[150px] mb-4 flex" />
                <h2 className = "flex text-[#D4AF37] text-4xl">Admin Dashboard</h2>
                <ul>
                    <li className="mb-2 text-3xl pt-[20px]"><Link to="/admin/dashboard" className="text-white hover:text-4xl flex gap-2"><FaClipboardList />Products</Link></li>
                    <li className="mb-2 text-3xl pt-[20px]"><Link to="/admin/users" className="text-white hover:text-4xl flex gap-2"><LuUsers /> Users</Link></li>
                    <li className="mb-2 text-3xl pt-[20px]"><Link to="/admin/settings" className="text-white hover:text-4xl flex gap-2"><LiaThListSolid /> Orders</Link></li>
                    <li className="mb-2 text-3xl pt-[20px]"><Link to="/admin/settings" className="text-white hover:text-4xl flex gap-2"><MdPayments />Payments</Link></li>
                </ul>
            </div>
            
            <div className="w-[80%] h-screen flex items-center justify-center">
                <button className = "bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ">+</button>
                <Link to="/admin/add-product" className="ml-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Add Product</Link>
            </div>
        </div>
    )
}