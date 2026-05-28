import { Link } from "react-router-dom";

export default function AdminDashboard(){
    return(
        <div className="w-full h-full flex items-center justify-center">
            <div className = "w-[20%] h-screen bg-[#333333] flex flex-col items-center justify-start py-10">
                <h2 className="text-xl font-bold mb-4">Navigation</h2>
                <ul>
                    <li className="mb-2"><Link to="/admin/dashboard" className="text-blue-500 hover:underline">Dashboard</Link></li>
                    <li className="mb-2"><Link to="/admin/users" className="text-blue-500 hover:underline">Users</Link></li>
                    <li className="mb-2"><Link to="/admin/settings" className="text-blue-500 hover:underline">Settings</Link></li>
                </ul>
            </div>
            
            <div className="w-[80%] h-screen flex items-center justify-center">
                <button className = "bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ">+</button>
                <Link to="/admin/add-product" className="ml-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Add Product</Link>
            </div>
        </div>
    )
}