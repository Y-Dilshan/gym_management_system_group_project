import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { GoVerified } from "react-icons/go";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  const toggleBlockStatus = async (id, currentStatus) => {
    try {
      // API call here
      // await axios.put(`/api/users/${id}/block`, {
      //   isBlocked: !currentStatus,
      // });

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
    <div className="p-6 bg-[#333333] min-h-screen">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-300 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800"> Users Details </h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">First Name</th>
                <th className="px-6 py-4">Last Name</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-300">
              {users.map((item, index) => (
                <tr key={item._id || index} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <img src={item.image} alt={item.firstName} className="w-10 h-10 rounded-full object-cover" />
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      {item.email}
                      {item.isEmailVerified && (
                        <GoVerified className="text-blue-500" />
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4">{item.firstName}</td>
                  <td className="px-6 py-4">{item.lastName}</td>
                  <td className="px-6 py-4">{item.role}</td>

                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        item.isBlocked
                          ? "text-red-500 bg-red-100"
                          : "text-green-500 bg-green-100"
                      }`} >
                      {item.isBlocked ? "Blocked" : "Active"} </span>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        toggleBlockStatus(item._id, item.isBlocked)
                      }
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition duration-300 shadow-sm ${
                        item.isBlocked
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-red-100 text-red-700 hover:bg-red-200"
                      }`}
                    >
                      {item.isBlocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-500" > No users found </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}