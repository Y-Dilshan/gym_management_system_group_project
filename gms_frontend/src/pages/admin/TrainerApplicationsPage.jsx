import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../utils/api.js";

export default function TrainerApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadApplications = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/trainer-applications`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setApplications(data.applications || []);
      } else {
        toast.error(data.error || "Failed to load applications");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const approveApplication = async (id) => {
    const password = prompt("Enter temporary password for the trainer:");
    if (!password) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/trainer-applications/${id}/approve`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Application approved successfully!");
        loadApplications();
      } else {
        toast.error(data.error || "Failed to approve application");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error sending approval request");
    }
  };

  const rejectApplication = async (id) => {
    const note = prompt("Reason for rejection (optional):");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/trainer-applications/${id}/reject`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ note }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || data.message || "Failed to reject application");
        return;
      }

      toast.success(data.message || "Application rejected");
      loadApplications();
    } catch (err) {
      console.error(err);
      toast.error("Error sending rejection request");
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#111111] to-[#1C1C1C] border border-[#D4AF37]/20 rounded-2xl shadow-xl p-6 mb-8">
        <h1 className="text-4xl font-bold text-white tracking-wide">Trainer Applications</h1>
        <p className="text-gray-400 mt-2">Evaluate and manage incoming applications for personal trainer roles</p>
      </div>
      
      {/* Table Card */}
      <div className="bg-[#141414] border border-[#D4AF37]/20 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.08)]">
        <div className="px-8 py-6 border-b border-[#2A2A2A]">
          <h2 className="text-2xl font-semibold text-white">Application Requests</h2>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-10 text-zinc-500">Loading applications...</div>
          ) : applications.length > 0 ? (
            <table className="w-full text-white text-left">
              <thead>
                <tr className="bg-[#D4AF37] text-black">
                  <th className="px-6 py-5 font-semibold">Name</th>
                  <th className="px-6 py-5 font-semibold">Email</th>
                  <th className="px-6 py-5 font-semibold">Phone</th>
                  <th className="px-6 py-5 font-semibold">Specialization</th>
                  <th className="px-6 py-5 font-semibold">Experience</th>
                  <th className="px-6 py-5 font-semibold">Status</th>
                  <th className="px-6 py-5 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {applications.map((app) => (
                  <tr key={app.application_id} className="border-b border-[#2A2A2A] text-gray-300 hover:bg-[#1C1C1C] transition-all duration-300">
                    <td className="px-6 py-5 font-bold text-white">{app.full_name}</td>
                    <td className="px-6 py-5">{app.email}</td>
                    <td className="px-6 py-5 font-mono text-sm">{app.phone || "-"}</td>
                    <td className="px-6 py-5 capitalize">{app.specialization}</td>
                    <td className="px-6 py-5">{app.experience_years} Years</td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        app.status === "approved" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                        app.status === "rejected" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                        "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                      }`}>
                        {app.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      {app.status === "pending" ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => approveApplication(app.application_id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => rejectApplication(app.application_id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-zinc-500 italic">Evaluated</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12 text-zinc-500">No trainer applications logged in database.</div>
          )}
        </div>
      </div>
    </div>
  );
}
