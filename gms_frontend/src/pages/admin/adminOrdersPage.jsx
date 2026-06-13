import { useState } from "react";
import {
  FaShoppingCart,
  FaCheckCircle,
  FaTruck,
  FaDollarSign,
} from "react-icons/fa";

export default function AdminOrdersPage() {
  const [orders] = useState([
    {
      id: "#12345",
      customer: "John Doe",
      address: "123 Main St, Anytown",
      date: "2026-06-12",
      status: "Processing",
      payment: "Paid",
      image: "https://via.placeholder.com/60",
      amount: "$120",
    },
    {
      id: "#12346",
      customer: "Jane Smith",
      address: "45 Lake Road",
      date: "2026-06-11",
      status: "Delivered",
      payment: "Paid",
      image: "https://via.placeholder.com/60",
      amount: "$250",
    },
    {
      id: "#12347",
      customer: "David Silva",
      address: "78 Palm Avenue",
      date: "2026-06-10",
      status: "Shipping",
      payment: "Pending",
      image: "https://via.placeholder.com/60",
      amount: "$180",
    },
  ]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-8">

      {/* Header */}
      <div className="bg-gradient-to-r from-[#111111] to-[#1C1C1C] border border-[#D4AF37]/20 rounded-2xl shadow-2xl p-6 mb-8">
        <h1 className="text-4xl font-bold text-white tracking-wide">
          Orders Management
        </h1>

        <p className="text-gray-400 mt-2">
          Manage customer orders and track deliveries
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <div className="bg-[#141414] p-6 rounded-2xl border border-[#D4AF37]/20">
          <FaShoppingCart className="text-[#D4AF37] text-3xl mb-3" />
          <h3 className="text-gray-400">Total Orders</h3>
          <p className="text-white text-3xl font-bold mt-2">320</p>
        </div>

        <div className="bg-[#141414] p-6 rounded-2xl border border-[#D4AF37]/20">
          <FaCheckCircle className="text-green-400 text-3xl mb-3" />
          <h3 className="text-gray-400">Completed</h3>
          <p className="text-white text-3xl font-bold mt-2">210</p>
        </div>

        <div className="bg-[#141414] p-6 rounded-2xl border border-[#D4AF37]/20">
          <FaTruck className="text-blue-400 text-3xl mb-3" />
          <h3 className="text-gray-400">Shipping</h3>
          <p className="text-white text-3xl font-bold mt-2">80</p>
        </div>

        <div className="bg-[#141414] p-6 rounded-2xl border border-[#D4AF37]/20">
          <FaDollarSign className="text-[#D4AF37] text-3xl mb-3" />
          <h3 className="text-gray-400">Revenue</h3>
          <p className="text-[#D4AF37] text-3xl font-bold mt-2">$12,450</p>
        </div>

      </div>

      {/* Orders Table */}
      <div className="bg-[#141414] border border-[#D4AF37]/20 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.08)]">

        {/* Table Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-[#2A2A2A]">
          <h2 className="text-2xl font-semibold text-white">
            Orders List
          </h2>

          <input
            type="text"
            placeholder="Search Orders..."
            className="bg-[#1F1F1F] text-white px-4 py-2 rounded-xl border border-[#333333] focus:border-[#D4AF37] outline-none"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">

            <thead>
              <tr className="bg-[#D4AF37] text-black">
                <th className="px-6 py-5 text-left">Image</th>
                <th className="px-6 py-5 text-left">Order ID</th>
                <th className="px-6 py-5 text-left">Customer</th>
                <th className="px-6 py-5 text-left">Address</th>
                <th className="px-6 py-5 text-left">Date</th>
                <th className="px-6 py-5 text-left">Status</th>
                <th className="px-6 py-5 text-left">Payment</th>
                <th className="px-6 py-5 text-left">Amount</th>
                <th className="px-6 py-5 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-[#2A2A2A] text-gray-300 hover:bg-[#1C1C1C] transition-all duration-300"
                >
                  <td className="px-6 py-5">
                    <img
                      src={order.image}
                      alt="Product"
                      className="w-16 h-16 rounded-xl object-cover border border-[#D4AF37]/40"
                    />
                  </td>

                  <td className="px-6 py-5 font-semibold text-white">
                    {order.id}
                  </td>

                  <td className="px-6 py-5">
                    {order.customer}
                  </td>

                  <td className="px-6 py-5">
                    {order.address}
                  </td>

                  <td className="px-6 py-5">
                    {order.date}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                        order.status === "Delivered"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : order.status === "Shipping"
                          ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                          : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                        order.payment === "Paid"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-red-500/20 text-red-400 border-red-500/30"
                      }`}
                    >
                      {order.payment}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-[#D4AF37] font-bold">
                    {order.amount}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex gap-3">
                      <button className="bg-[#D4AF37] text-black px-5 py-2 rounded-xl font-semibold hover:scale-105 transition">
                        View
                      </button>

                      <button className="bg-blue-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-700 transition">
                        Update
                      </button>

                      <button className="bg-red-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-red-700 transition">
                        Delete
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}