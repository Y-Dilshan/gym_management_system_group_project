import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",
    role: "MEMBER",
    status: "ACTIVE",
    specialization: "",
    bio: "",
    experience_years: "",
  });

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

  const handleInputChange = (k, v) => {
    setForm(prev => ({ ...prev, [k]: v }));
  };

  const handleAddUserSubmit = async (e) => {
    e.preventDefault();
    if (!form.full_name.trim() || !form.email.trim() || !form.password.trim()) {
      toast.error("Name, email and password are required");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const payload = { ...form };
      if (payload.role === "TRAINER") {
        payload.experience_years = payload.experience_years ? parseInt(payload.experience_years) : 0;
      }

      const res = await fetch(`${API}/users/admin/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "User created successfully!");
        setShowAddModal(false);
        setForm({
          full_name: "",
          email: "",
          password: "",
          phone: "",
          role: "MEMBER",
          status: "ACTIVE",
          specialization: "",
          bio: "",
          experience_years: "",
        });
        loadUsers();
      } else {
        toast.error(data.error || "Failed to create user");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error creating user");
    }
  };

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

  const filteredUsers = users.filter(user => 
    user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#111111] to-[#1C1C1C] border border-[#D4AF37]/20 rounded-2xl shadow-2xl p-6 mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-wide">Users Management</h1>
          <p className="text-gray-400 mt-2">Manage registered users, trainers, and permissions</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#D4AF37] text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition cursor-pointer"
        >
          + Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-[#141414] border border-[#D4AF37]/20 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.08)]">
        {/* Table Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-[#2A2A2A]">
          <h2 className="text-2xl font-semibold text-white">Users List</h2>
          <input 
            type="text" 
            placeholder="Search Users..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#1F1F1F] text-white px-4 py-2 rounded-xl border border-[#333333] focus:border-[#D4AF37] outline-none"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-10 text-zinc-500">Loading accounts database...</div>
          ) : filteredUsers.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="bg-[#D4AF37] text-black">
                  <th className="px-6 py-5 text-left font-semibold">User ID</th>
                  <th className="px-6 py-5 text-left font-semibold">Name</th>
                  <th className="px-6 py-5 text-left font-semibold">Email</th>
                  <th className="px-6 py-5 text-left font-semibold">Phone</th>
                  <th className="px-6 py-5 text-left font-semibold">Role</th>
                  <th className="px-6 py-5 text-left font-semibold">Status</th>
                  <th className="px-6 py-5 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.user_id} className="border-b border-[#2A2A2A] text-gray-300 hover:bg-[#1C1C1C] transition-all duration-300">
                    <td className="px-6 py-5 text-white font-mono text-xs font-semibold"> #USR{user.user_id} </td>
                    <td className="px-6 py-5 font-bold text-white"> {user.full_name} </td>
                    <td className="px-6 py-5"> {user.email} </td>
                    <td className="px-6 py-5 font-mono text-sm"> {user.phone || "-"} </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        user.role === "ADMIN" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                        user.role === "TRAINER" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                        "bg-zinc-800 text-zinc-400 border border-zinc-700"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        user.status === "ACTIVE" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                        "bg-red-500/10 text-red-400 border border-red-500/20"
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleBlockStatus(user.user_id, user.status)}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                            user.status === "ACTIVE"
                              ? "bg-yellow-950/20 text-yellow-400 border border-yellow-500/10 hover:bg-yellow-500 hover:text-black"
                              : "bg-green-950/20 text-green-400 border border-green-500/10 hover:bg-green-500 hover:text-white"
                          }`}
                        >
                          {user.status === "ACTIVE" ? "Suspend" : "Activate"}
                        </button>
                        <button
                          onClick={() => handleDelete(user.user_id)}
                          className="bg-red-950/20 text-red-400 border border-red-500/10 hover:bg-red-600 hover:text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-10 text-zinc-500">No users found.</div>
          )}
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <form onSubmit={handleAddUserSubmit} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 w-[450px] space-y-4 max-h-[90vh] overflow-y-auto pr-2 shadow-2xl">
            <div>
              <h3 className="text-2xl font-bold text-[#D4AF37]">Create New Account</h3>
              <p className="text-xs text-zinc-400">Register standard members, trainers or administrators directly</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5 uppercase font-bold tracking-wider">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={form.full_name}
                  onChange={(e) => handleInputChange("full_name", e.target.value)}
                  className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-4 py-2 outline-none focus:border-[#D4AF37]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1.5 uppercase font-bold tracking-wider">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. user@gmail.com"
                  value={form.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-4 py-2 outline-none focus:border-[#D4AF37]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1.5 uppercase font-bold tracking-wider">Password</label>
                <input
                  type="password"
                  placeholder="Password value"
                  value={form.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-4 py-2 outline-none focus:border-[#D4AF37]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1.5 uppercase font-bold tracking-wider">Mobile Phone</label>
                <input
                  type="text"
                  placeholder="e.g. +94 77 123 4567"
                  value={form.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-4 py-2 outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5 uppercase font-bold tracking-wider">Role</label>
                  <select
                    value={form.role}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-4 py-2.5 outline-none focus:border-[#D4AF37] cursor-pointer text-sm font-semibold"
                  >
                    <option value="MEMBER">MEMBER</option>
                    <option value="TRAINER">TRAINER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5 uppercase font-bold tracking-wider">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => handleInputChange("status", e.target.value)}
                    className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-4 py-2.5 outline-none focus:border-[#D4AF37] cursor-pointer text-sm font-semibold"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="SUSPENDED">SUSPENDED</option>
                  </select>
                </div>
              </div>

              {/* Conditional Trainer Profile details */}
              {form.role === "TRAINER" && (
                <div className="border-t border-zinc-800 pt-3 mt-2 space-y-3">
                  <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Trainer Details</p>
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1">Specialization</label>
                    <input
                      type="text"
                      placeholder="e.g. Bodybuilding, Yoga"
                      value={form.specialization}
                      onChange={(e) => handleInputChange("specialization", e.target.value)}
                      className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-4 py-2 outline-none focus:border-[#D4AF37] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1">Experience Years</label>
                    <input
                      type="number"
                      placeholder="e.g. 5"
                      value={form.experience_years}
                      onChange={(e) => handleInputChange("experience_years", e.target.value)}
                      className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-4 py-2 outline-none focus:border-[#D4AF37] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1">Bio Description</label>
                    <textarea
                      rows={2}
                      placeholder="Trainer bio description..."
                      value={form.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-4 py-2 outline-none focus:border-[#D4AF37] text-sm resize-none"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4 border-t border-zinc-800">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2.5 border border-zinc-800 hover:bg-zinc-800 rounded-xl text-sm font-semibold transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-[#D4AF37] text-black hover:bg-[#b8962d] rounded-xl text-sm font-bold transition"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}