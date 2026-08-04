import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_BASE_URL as API } from "../../utils/api.js";
import toast from "react-hot-toast";

export default function AdminTrainers() {
  const [trainers, setTrainers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Modals state
  const [viewingTrainer, setViewingTrainer] = useState(null);
  const [editingTrainer, setEditingTrainer] = useState(null);

  // Edit form state
  const [editForm, setEditForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    specialization: "",
    experience_years: "",
    bio: "",
  });

  useEffect(() => {
    loadTrainers();
  }, []);

  const loadTrainers = async () => {
    try {
      const res = await fetch(`${API}/trainers`);
      const data = await res.json();
      setTrainers(data.trainers || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load trainers");
    }
  };

  // 1. DELETE TRAINER HANDLER
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this trainer?")) return;

    try {
      const res = await fetch(`${API}/trainers/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Trainer deleted successfully");
        loadTrainers();
      } else {
        toast.error(data.error || "Failed to delete trainer");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting trainer");
    }
  };

  // 2. EDIT TRAINER HANDLERS
  const handleOpenEdit = (trainer) => {
    setEditingTrainer(trainer);
    setEditForm({
      full_name: trainer.full_name || "",
      email: trainer.email || "",
      phone: trainer.phone || "",
      specialization: trainer.specialization || "",
      experience_years: trainer.experience_years || "",
      bio: trainer.bio || "",
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingTrainer) return;

    try {
      const res = await fetch(`${API}/trainers/${editingTrainer.trainer_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Trainer updated successfully");
        setEditingTrainer(null);
        loadTrainers();
      } else {
        toast.error(data.error || "Failed to update trainer");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating trainer");
    }
  };

  // Filtered trainers list for Search
  const filteredTrainers = trainers.filter(
    (t) =>
      t.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="m-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#111111] to-[#1C1C1C] border border-[#D4AF37]/20 rounded-2xl shadow-2xl p-6 mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-wide">
            Trainers Management
          </h1>
          <p className="text-gray-400 mt-2">
            Manage trainers, schedules, certifications and availability
          </p>
        </div>
        <Link
          to="/admin/add-trainer"
          className="bg-[#D4AF37] text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          + Add Trainer
        </Link>
      </div>

      {/* Table Card */}
      <div className="bg-[#141414] border border-[#D4AF37]/20 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.08)]">
        {/* Card Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-[#2A2A2A]">
          <h2 className="text-2xl font-semibold text-white"> Trainers List </h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search Trainers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#1F1F1F] text-white px-4 py-2 rounded-xl border border-[#333333] focus:border-[#D4AF37] outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#D4AF37] text-black">
                <th className="px-6 py-5 text-left font-semibold">Photo</th>
                <th className="px-6 py-5 text-left font-semibold">Trainer ID</th>
                <th className="px-6 py-5 text-left font-semibold">Name</th>
                <th className="px-6 py-5 text-left font-semibold">Specialization</th>
                <th className="px-6 py-5 text-left font-semibold">Experience</th>
                <th className="px-6 py-5 text-left font-semibold">Certification</th>
                <th className="px-6 py-5 text-left font-semibold">Availability</th>
                <th className="px-6 py-5 text-left font-semibold">Rating</th>
                <th className="px-6 py-5 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrainers.map((trainer) => (
                <tr
                  key={trainer.trainer_id}
                  className="border-b border-[#2A2A2A] text-gray-300 hover:bg-[#1C1C1C]"
                >
                  <td className="px-6 py-5">
                    <img
                      src={
                        trainer.profile_picture
                          ? trainer.profile_picture
                          : "/default-trainer.jpg"
                      }
                      alt="Trainer"
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                  </td>

                  <td className="px-6 py-5 text-white">{trainer.trainer_id}</td>

                  <td className="px-6 py-5">{trainer.full_name}</td>

                  <td className="px-6 py-5">{trainer.specialization}</td>

                  <td className="px-6 py-5">
                    {trainer.experience_years} Years
                  </td>

                  <td className="px-6 py-5">{trainer.certification || "-"}</td>

                  <td className="px-6 py-5">
                    <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full">
                      Available
                    </span>
                  </td>

                  <td className="px-6 py-5">⭐ {trainer.rating || "0"}</td>

                  <td className="px-6 py-5">
                    <div className="flex gap-3">
                      <button
                        onClick={() => setViewingTrainer(trainer)}
                        className="bg-[#D4AF37] text-black px-5 py-2 rounded-xl font-medium hover:bg-[#b8952c] transition"
                      >
                        View
                      </button>

                      <button
                        onClick={() => handleOpenEdit(trainer)}
                        className="bg-blue-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-blue-700 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(trainer.trainer_id)}
                        className="bg-red-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredTrainers.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center py-8 text-gray-400">
                    No trainers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIEW MODAL */}
      {viewingTrainer && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-[#1C1C1C] border border-[#D4AF37]/30 rounded-3xl p-6 max-w-lg w-full text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-4 text-[#D4AF37]">
              Trainer Details
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <img
                src={viewingTrainer.profile_picture || "/default-trainer.jpg"}
                alt="Trainer"
                className="w-20 h-20 rounded-2xl object-cover border border-[#D4AF37]"
              />
              <div>
                <h4 className="text-xl font-semibold">{viewingTrainer.full_name}</h4>
                <p className="text-gray-400 text-sm">{viewingTrainer.email}</p>
                <p className="text-gray-400 text-sm">{viewingTrainer.phone || "N/A"}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-300">
              <p><strong>Specialization:</strong> {viewingTrainer.specialization || "N/A"}</p>
              <p><strong>Experience:</strong> {viewingTrainer.experience_years || 0} Years</p>
              <p><strong>Bio:</strong> {viewingTrainer.bio || "No bio provided"}</p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setViewingTrainer(null)}
                className="bg-[#D4AF37] text-black px-6 py-2 rounded-xl font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editingTrainer && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-[#1C1C1C] border border-[#D4AF37]/30 rounded-3xl p-6 max-w-lg w-full text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-4 text-[#D4AF37]">
              Edit Trainer
            </h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editForm.full_name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, full_name: e.target.value })
                  }
                  className="w-full bg-[#141414] border border-[#333] rounded-xl px-4 py-2 text-white outline-none focus:border-[#D4AF37]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  className="w-full bg-[#141414] border border-[#333] rounded-xl px-4 py-2 text-white outline-none focus:border-[#D4AF37]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Phone</label>
                <input
                  type="text"
                  value={editForm.phone}
                  onChange={(e) =>
                    setEditForm({ ...editForm, phone: e.target.value })
                  }
                  className="w-full bg-[#141414] border border-[#333] rounded-xl px-4 py-2 text-white outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Specialization</label>
                <input
                  type="text"
                  value={editForm.specialization}
                  onChange={(e) =>
                    setEditForm({ ...editForm, specialization: e.target.value })
                  }
                  className="w-full bg-[#141414] border border-[#333] rounded-xl px-4 py-2 text-white outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Experience (Years)</label>
                <input
                  type="number"
                  value={editForm.experience_years}
                  onChange={(e) =>
                    setEditForm({ ...editForm, experience_years: e.target.value })
                  }
                  className="w-full bg-[#141414] border border-[#333] rounded-xl px-4 py-2 text-white outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Bio</label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) =>
                    setEditForm({ ...editForm, bio: e.target.value })
                  }
                  className="w-full bg-[#141414] border border-[#333] rounded-xl px-4 py-2 text-white outline-none focus:border-[#D4AF37]"
                  rows="3"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingTrainer(null)}
                  className="bg-gray-600 text-white px-5 py-2 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#D4AF37] text-black px-5 py-2 rounded-xl font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
