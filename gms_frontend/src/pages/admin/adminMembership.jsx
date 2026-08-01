import { useState } from "react";
import toast from "react-hot-toast";
import { FaUsers, FaCrown, FaDollarSign, FaCheckCircle, FaTimes } from "react-icons/fa";

export default function AdminMemberships() {
  const [plans, setPlans] = useState([
    {
      id: 1,
      name: "Basic Plan",
      duration: "1 Month",
      price: "$25",
      members: 120,
      status: "Active",
      features: "Gym Access, Locker Access, Fitness Assessment",
    },
    {
      id: 2,
      name: "Premium Plan",
      duration: "3 Months",
      price: "$65",
      members: 85,
      status: "Active",
      features: "Everything in Basic, Group Classes, Diet Consultation",
    },
    {
      id: 3,
      name: "Elite Plan",
      duration: "12 Months",
      price: "$220",
      members: 45,
      status: "Inactive",
      features: "Everything in Premium, Personal Trainer, VIP Support",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [viewingPlan, setViewingPlan] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    duration: "1 Month",
    price: "$",
    members: 0,
    status: "Active",
    features: "",
  });

  // Calculate Header Statistics
  const totalMembers = plans.reduce((acc, curr) => acc + Number(curr.members || 0), 0);
  const activePlansCount = plans.filter((p) => p.status === "Active").length;

  // Open Modal to Add
  const handleOpenAddModal = () => {
    setEditingPlan(null);
    setFormData({
      name: "",
      duration: "1 Month",
      price: "$",
      members: 0,
      status: "Active",
      features: "",
    });
    setIsModalOpen(true);
  };

  // Open Modal to Edit
  const handleOpenEditModal = (plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      duration: plan.duration,
      price: plan.price,
      members: plan.members,
      status: plan.status,
      features: plan.features || "",
    });
    setIsModalOpen(true);
  };

  // Open Modal to View
  const handleOpenViewModal = (plan) => {
    setViewingPlan(plan);
    setIsViewModalOpen(true);
  };

  // Delete Plan
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this membership plan?")) {
      setPlans(plans.filter((p) => p.id !== id));
      toast.success("Membership plan deleted successfully");
    }
  };

  // Save Plan (Add or Edit)
  const handleSavePlan = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price.trim()) {
      toast.error("Please fill out plan name and price");
      return;
    }

    if (editingPlan) {
      // Update existing
      setPlans(
        plans.map((p) => (p.id === editingPlan.id ? { ...p, ...formData } : p))
      );
      toast.success("Membership plan updated successfully!");
    } else {
      // Add new
      const newPlan = {
        id: Date.now(),
        ...formData,
      };
      setPlans([...plans, newPlan]);
      toast.success("New membership plan created!");
    }

    setIsModalOpen(false);
  };

  // Filtered plans
  const filteredPlans = plans.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <button
          onClick={handleOpenAddModal}
          className="bg-[#D4AF37] text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition cursor-pointer"
        >
          + Add Membership
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#141414] p-6 rounded-2xl border border-[#D4AF37]/20">
          <FaUsers className="text-[#D4AF37] text-3xl mb-3" />
          <h3 className="text-gray-400">Total Members</h3>
          <p className="text-white text-3xl font-bold mt-2">{totalMembers}</p>
        </div>

        <div className="bg-[#141414] p-6 rounded-2xl border border-[#D4AF37]/20">
          <FaCrown className="text-[#D4AF37] text-3xl mb-3" />
          <h3 className="text-gray-400">Plans</h3>
          <p className="text-white text-3xl font-bold mt-2">{plans.length}</p>
        </div>

        <div className="bg-[#141414] p-6 rounded-2xl border border-[#D4AF37]/20">
          <FaDollarSign className="text-[#D4AF37] text-3xl mb-3" />
          <h3 className="text-gray-400">Monthly Revenue</h3>
          <p className="text-[#D4AF37] text-3xl font-bold mt-2">$5,600</p>
        </div>

        <div className="bg-[#141414] p-6 rounded-2xl border border-[#D4AF37]/20">
          <FaCheckCircle className="text-green-400 text-3xl mb-3" />
          <h3 className="text-gray-400">Active Plans</h3>
          <p className="text-white text-3xl font-bold mt-2">{activePlansCount}</p>
        </div>
      </div>

      {/* Membership Table */}
      <div className="bg-[#141414] border border-[#D4AF37]/20 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.08)]">
        {/* Table Header & Search */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-[#2A2A2A]">
          <h2 className="text-2xl font-semibold text-white">Membership Plans</h2>
          <input
            type="text"
            placeholder="Search Plans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
              {filteredPlans.length > 0 ? (
                filteredPlans.map((plan) => (
                  <tr
                    key={plan.id}
                    className="border-b border-[#2A2A2A] text-gray-300 hover:bg-[#1C1C1C] transition-all duration-300"
                  >
                    <td className="px-6 py-5 font-semibold text-white">{plan.name}</td>
                    <td className="px-6 py-5">{plan.duration}</td>
                    <td className="px-6 py-5 text-[#D4AF37] font-bold">{plan.price}</td>
                    <td className="px-6 py-5">{plan.members}</td>
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
                        <button
                          onClick={() => handleOpenViewModal(plan)}
                          className="bg-[#D4AF37] text-black px-4 py-2 rounded-xl font-semibold hover:scale-105 transition cursor-pointer"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleOpenEditModal(plan)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(plan.id)}
                          className="bg-red-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-red-700 transition cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500">
                    No membership plans found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#141414] border border-[#D4AF37]/30 rounded-2xl p-6 w-full max-w-md relative text-white">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-[#D4AF37]">
              {editingPlan ? "Edit Membership Plan" : "Add Membership Plan"}
            </h2>
            <form onSubmit={handleSavePlan} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Plan Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#1F1F1F] p-3 rounded-xl border border-zinc-800 outline-none focus:border-[#D4AF37]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full bg-[#1F1F1F] p-3 rounded-xl border border-zinc-800 outline-none focus:border-[#D4AF37]"
                    placeholder="e.g. 1 Month"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Price</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-[#1F1F1F] p-3 rounded-xl border border-zinc-800 outline-none focus:border-[#D4AF37]"
                    placeholder="$25"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-[#1F1F1F] p-3 rounded-xl border border-zinc-800 outline-none focus:border-[#D4AF37]"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Included Features</label>
                <textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="e.g. Gym Access, Personal Trainer, Locker"
                  className="w-full bg-[#1F1F1F] p-3 rounded-xl border border-zinc-800 outline-none focus:border-[#D4AF37] resize-none"
                  rows="3"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#D4AF37] text-black font-bold py-3 rounded-xl hover:scale-[1.02] transition"
              >
                {editingPlan ? "Update Plan" : "Create Plan"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && viewingPlan && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#141414] border border-[#D4AF37]/30 rounded-2xl p-6 w-full max-w-md relative text-white">
            <button
              onClick={() => setIsViewModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl font-bold mb-2 text-[#D4AF37]">
              {viewingPlan.name}
            </h2>
            <div className="space-y-3 mt-4 text-gray-300">
              <p>
                <strong>Duration:</strong> {viewingPlan.duration}
              </p>
              <p>
                <strong>Price:</strong> {viewingPlan.price}
              </p>
              <p>
                <strong>Active Members:</strong> {viewingPlan.members}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={
                    viewingPlan.status === "Active"
                      ? "text-green-400 font-semibold"
                      : "text-red-400 font-semibold"
                  }
                >
                  {viewingPlan.status}
                </span>
              </p>
              <div>
                <strong>Features:</strong>
                <p className="mt-1 bg-[#1F1F1F] p-3 rounded-xl text-sm">
                  {viewingPlan.features || "No features specified."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}