import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_BACKEND_URL;

  const loadUsers = async () => {
    try {
      const res = await fetch(`${API}/users`);
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users || []);
      } else {
        toast.error("Failed to fetch users");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const toggleBlockStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: nextStatus })
      });

      if (res.ok) {
        toast.success(`User is now ${nextStatus}`);
        loadUsers();
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to update status");
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        toast.success("User deleted successfully");
        loadUsers();
      } else {
        const data = await res.json();
        toast.error(data.message || data.error || "Failed to delete user");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#111111] to-[#1C1C1C] border border-[#D4AF37]/20 rounded-2xl shadow-2xl p-6 mb-8 flex items-center justify-between">
        {/* Left Side Text */}
        <div>
          <h1 className="text-4xl font-bold text-white tracking-wide">Users Management</h1>
          <p className="text-gray-400 mt-2">Manage registered users, trainers, and permissions</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#141414] border border-[#D4AF37]/20 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.08)]">
        {/* Table Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-[#2A2A2A]">
          <h2 className="text-2xl font-semibold text-white">Users List</h2>
          <input 
            type="text" 
            placeholder="Search Users..." 
            className="bg-[#1F1F1F] text-white px-4 py-2 rounded-xl border border-[#333333] focus:border-[#D4AF37] outline-none"
          />
        </div>
        
        {/* Table */}
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading users...</div>
        ) : users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#D4AF37] text-black">
                  <th className="px-6 py-5 text-left font-semibold">User ID</th>
                  <th className="px-6 py-5 text-left font-semibold">Full Name</th>
                  <th className="px-6 py-5 text-left font-semibold">Email</th>
                  <th className="px-6 py-5 text-left font-semibold">Phone</th>
                  <th className="px-6 py-5 text-left font-semibold">Role</th>
                  <th className="px-6 py-5 text-left font-semibold">Status</th>
                  <th className="px-6 py-5 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.user_id} className="border-b border-[#2A2A2A] text-gray-300 hover:bg-[#1C1C1C] transition-all duration-300">
                    <td className="px-6 py-5 font-semibold text-white"> #USR{user.user_id} </td>
                    <td className="px-6 py-5"> {user.full_name} </td>
                    <td className="px-6 py-5"> {user.email} </td>
                    <td className="px-6 py-5"> {user.phone || "-"} </td>
                    <td className="px-6 py-5"> 
                      <span className={`px-4 py-1.5 rounded-full text-xs font-semibold border ${
                        user.role === "ADMIN"
                          ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                          : user.role === "TRAINER"
                          ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                          : "bg-zinc-500/20 text-zinc-400 border-zinc-500/30"
                      }`}> 
                        {user.role} 
                      </span> 
                    </td>
                    <td className="px-6 py-5"> 
                      <span className={`px-4 py-1.5 rounded-full text-xs font-semibold border ${
                        user.status === "ACTIVE"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-red-500/20 text-red-400 border-red-500/30"
                      }`}> 
                        {user.status} 
                      </span> 
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex gap-3">
                        <button 
                          onClick={() => toggleBlockStatus(user.user_id, user.status)} 
                          className="bg-[#D4AF37] text-black px-4 py-2 rounded-xl font-semibold hover:scale-105 transition duration-300"
                        >
                          {user.status === "ACTIVE" ? "Suspend" : "Activate"}
                        </button>
                        <button 
                          onClick={() => handleDelete(user.user_id)} 
                          className="bg-red-600 px-4 py-2 rounded-xl text-white font-semibold hover:bg-red-700 hover:scale-105 transition duration-300"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">No users found</div>
        )}
      </div>
    </div>
  );
}