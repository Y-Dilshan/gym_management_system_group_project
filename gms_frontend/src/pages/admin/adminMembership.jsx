import { useState } from "react";
import { FaUsers, FaCrown, FaDollarSign, FaCheckCircle } from "react-icons/fa";

export default function AdminMemberships() {
  const [plans] = useState([
    {
      id: 1,
      name: "Basic Plan",
      duration: "1 Month",
      price: "$25",
      members: 120,
      status: "Active",
    },
    {
      id: 2,
      name: "Premium Plan",
      duration: "3 Months",
      price: "$65",
      members: 85,
      status: "Active",
    },
    {
      id: 3,
      name: "Elite Plan",
      duration: "12 Months",
      price: "$220",
      members: 45,
      status: "Inactive",
    },
  ]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-8">

      {/* Header */}
      <div className="bg-gradient-to-r from-[#111111] to-[#1C1C1C] border border-[#D4AF37]/20 rounded-2xl shadow-2xl p-6 mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-wide">
            Membership Management
          </h1>

          <p className="text-gray-400 mt-2">
            Manage gym membership plans and subscriptions
          </p>
        </div>

        <button className="bg-[#D4AF37] text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition">
          + Add Membership
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <div className="bg-[#141414] p-6 rounded-2xl border border-[#D4AF37]/20">
          <FaUsers className="text-[#D4AF37] text-3xl mb-3" />
          <h3 className="text-gray-400">Total Members</h3>
          <p className="text-white text-3xl font-bold mt-2">250</p>
        </div>

        <div className="bg-[#141414] p-6 rounded-2xl border border-[#D4AF37]/20">
          <FaCrown className="text-[#D4AF37] text-3xl mb-3" />
          <h3 className="text-gray-400">Plans</h3>
          <p className="text-white text-3xl font-bold mt-2">3</p>
        </div>

        <div className="bg-[#141414] p-6 rounded-2xl border border-[#D4AF37]/20">
          <FaDollarSign className="text-[#D4AF37] text-3xl mb-3" />
          <h3 className="text-gray-400">Monthly Revenue</h3>
          <p className="text-[#D4AF37] text-3xl font-bold mt-2">$5,600</p>
        </div>

        <div className="bg-[#141414] p-6 rounded-2xl border border-[#D4AF37]/20">
          <FaCheckCircle className="text-green-400 text-3xl mb-3" />
          <h3 className="text-gray-400">Active Plans</h3>
          <p className="text-white text-3xl font-bold mt-2">2</p>
        </div>

      </div>

      {/* Membership Table */}
      <div className="bg-[#141414] border border-[#D4AF37]/20 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.08)]">

        {/* Table Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-[#2A2A2A]">
          <h2 className="text-2xl font-semibold text-white">
            Membership Plans
          </h2>

          <input
            type="text"
            placeholder="Search Plans..."
            className="bg-[#1F1F1F] text-white px-4 py-2 rounded-xl border border-[#333333] focus:border-[#D4AF37] outline-none"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">

            <thead>
              <tr className="bg-[#D4AF37] text-black">
                <th className="px-6 py-5 text-left">Plan Name</th>
                <th className="px-6 py-5 text-left">Duration</th>
                <th className="px-6 py-5 text-left">Price</th>
                <th className="px-6 py-5 text-left">Members</th>
                <th className="px-6 py-5 text-left">Status</th>
                <th className="px-6 py-5 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {plans.map((plan) => (
                <tr
                  key={plan.id}
                  className="border-b border-[#2A2A2A] text-gray-300 hover:bg-[#1C1C1C] transition-all duration-300"
                >
                  <td className="px-6 py-5 font-semibold text-white">
                    {plan.name}
                  </td>

                  <td className="px-6 py-5">
                    {plan.duration}
                  </td>

                  <td className="px-6 py-5 text-[#D4AF37] font-bold">
                    {plan.price}
                  </td>

                  <td className="px-6 py-5">
                    {plan.members}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                        plan.status === "Active"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-red-500/20 text-red-400 border-red-500/30"
                      }`}
                    >
                      {plan.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex gap-3">
                      <button className="bg-[#D4AF37] text-black px-4 py-2 rounded-xl font-semibold hover:scale-105 transition">
                        View
                      </button>

                      <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition">
                        Edit
                      </button>

                      <button className="bg-red-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-red-700 transition">
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

      {/* Membership Plan Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <div className="bg-[#141414] border border-[#D4AF37]/20 rounded-3xl p-8 text-center">
          <h3 className="text-white text-2xl font-bold">Basic</h3>
          <p className="text-[#D4AF37] text-4xl font-bold mt-4">$25</p>
          <p className="text-gray-400 mt-2">Per Month</p>

          <ul className="mt-6 space-y-2 text-gray-300">
            <li>✔ Gym Access</li>
            <li>✔ Locker Access</li>
            <li>✔ Fitness Assessment</li>
          </ul>
        </div>

        <div className="bg-[#141414] border-2 border-[#D4AF37] rounded-3xl p-8 text-center">
          <h3 className="text-white text-2xl font-bold">Premium</h3>
          <p className="text-[#D4AF37] text-4xl font-bold mt-4">$65</p>
          <p className="text-gray-400 mt-2">3 Months</p>

          <ul className="mt-6 space-y-2 text-gray-300">
            <li>✔ Everything in Basic</li>
            <li>✔ Group Classes</li>
            <li>✔ Diet Consultation</li>
          </ul>
        </div>

        <div className="bg-[#141414] border border-[#D4AF37]/20 rounded-3xl p-8 text-center">
          <h3 className="text-white text-2xl font-bold">Elite</h3>
          <p className="text-[#D4AF37] text-4xl font-bold mt-4">$220</p>
          <p className="text-gray-400 mt-2">12 Months</p>

          <ul className="mt-6 space-y-2 text-gray-300">
            <li>✔ Everything in Premium</li>
            <li>✔ Personal Trainer</li>
            <li>✔ VIP Support</li>
          </ul>
        </div>

      </div>
    </div>
  );
}