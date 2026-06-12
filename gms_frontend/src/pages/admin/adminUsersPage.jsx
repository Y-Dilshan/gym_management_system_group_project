import { useState } from "react";
import toast from "react-hot-toast";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  const toggleBlockStatus = async (id, currentStatus) => {
    try {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id
            ? { ...user, isBlocked: !currentStatus }
            : user
        )
      );

      toast.success(
        currentStatus
          ? "User unblocked successfully"
          : "User blocked successfully"
      );
    } catch (error) {
      toast.error("Failed to update user status");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-8">

      {/* Header */}
      <div className="bg-gradient-to-r from-[#111111] to-[#1C1C1C] border border-[#D4AF37]/20 rounded-2xl shadow-2xl p-6 mb-8">
        <h1 className="text-4xl font-bold text-white tracking-wide">
          Users Management
        </h1>
        <p className="text-gray-400 mt-2">
          Manage registered users and permissions
        </p>
      </div>

      {/* Users Table */}
      <div className="bg-[#141414] border border-[#D4AF37]/20 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.08)]">

        {/* Table Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-[#2A2A2A]">
          <h2 className="text-2xl font-semibold text-white">
            Users List
          </h2>

          <input
            type="text"
            placeholder="Search Users..."
            className="bg-[#1F1F1F] text-white px-4 py-2 rounded-xl border border-[#333333] focus:border-[#D4AF37] outline-none"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">

            <thead>
              <tr className="bg-[#D4AF37] text-black">
                <th className="px-6 py-5 text-left font-semibold">Image</th>
                <th className="px-6 py-5 text-left font-semibold">User ID</th>
                <th className="px-6 py-5 text-left font-semibold">Full Name</th>
                <th className="px-6 py-5 text-left font-semibold">Role</th>
                <th className="px-6 py-5 text-left font-semibold">Status</th>
                <th className="px-6 py-5 text-left font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>

              <tr className="border-b border-[#2A2A2A] text-gray-300 hover:bg-[#1C1C1C] transition-all duration-300">

                <td className="px-6 py-5">
                  <img
                    src="https://via.placeholder.com/60"
                    alt="User"
                    className="w-16 h-16 rounded-xl object-cover border border-[#D4AF37]/40"
                  />
                </td>

                <td className="px-6 py-5 font-semibold text-white">
                  #USR001
                </td>

                <td className="px-6 py-5">
                  John Doe
                </td>

                <td className="px-6 py-5">
                  <span className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm border border-blue-500/30">
                    User
                  </span>
                </td>

                <td className="px-6 py-5">
                  <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm border border-green-500/30">
                    Active
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex gap-3">

                    <button className="bg-[#D4AF37] text-black px-5 py-2 rounded-xl font-semibold hover:scale-105 transition duration-300">
                      View
                    </button>

                    <button
                      onClick={() =>
                        toggleBlockStatus("1", false)
                      }
                      className="bg-red-600 px-5 py-2 rounded-xl text-white font-semibold hover:bg-red-700 hover:scale-105 transition duration-300"
                    >
                      Block
                    </button>

                  </div>
                </td>

              </tr>

            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}