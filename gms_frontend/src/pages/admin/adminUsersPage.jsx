import { useState } from "react";
import toast from "react-hot-toast";

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
   <div className="w-full h-full p-8 bg-[#E5E5E5]">

      {/* Header */}
      <div className="bg-[#2F2F2F] rounded-2xl shadow-lg px-8 py-5 mb-8">
        <h1 className="text-4xl font-bold text-white">Users Management </h1>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-[#2F2F2F]"> Users</h2>

        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="w-full bg-[#D4AF37] text-white">
              <tr>
                <th className="px-6 py-4 text-left">Image</th>
                <th className="px-6 py-4 text-left">User ID</th>
                <th className="px-6 py-4 text-left">FUll Name</th>
                <th className="px-6 py-4 text-left">Role</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4"><img src="https://via.placeholder.com/50" alt="Product" className="w-14 h-14 rounded-lg object-cover border" /></td>
                <td className="px-6 py-4 font-medium text-gray-700"> #12345 </td>
                <td className="px-6 py-4"> John Doe </td>
                <td className="px-6 py-4"> User </td>

                <td className="px-6 py-4">
                    <div className="flex gap-2">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"> View </button>
                        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"> Delete </button>
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