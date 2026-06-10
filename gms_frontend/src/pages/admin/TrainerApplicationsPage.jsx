import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const API = "http://localhost:3000/api";

export default function TrainerApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadApplications = async () => {
    try {
      const res = await fetch(`${API}/trainer-applications`);
      const data = await res.json();
      setApplications(data.applications || []);
    } catch (err) {
      console.error(err);
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
      const res = await fetch(`${API}/trainer-applications/${id}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      toast.success(data.message);
      loadApplications();
    } catch (err) {
      console.error(err);
    }
  };

  const rejectApplication = async (id) => {
    const note = prompt("Reason for rejection (optional):");
    try {
      const res = await fetch(`${API}/trainer-applications/${id}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note }),
      });
      const data = await res.json();

      console.log(data);

      if (!res.ok) {
        toast.error(data.error || data.message);
        return;
      }

      toast.success(data.message);
      loadApplications();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-white p-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#333333] text-white py-5 px-25">
      <h1 className="text-3xl font-bold mb-8 text-[#D4AF37]">Trainer Applications</h1>
      
      <div className="overflow-x-auto shadow-lg bg-white">
        <table className="w-full border border-zinc-700">
          <thead>
            <tr className="bg-zinc-800">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Specialization</th>
              <th className="p-3">Experience</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr key={app.application_id} className="border-t border-zinc-700">
                <td className="p-3">{app.full_name}</td>
                <td className="p-3">{app.email}</td>
                <td className="p-3">{app.specialization}</td>
                <td className="p-3">{app.experience_years} yrs</td>
                <td className="p-3">{app.status}</td>

                <td className="p-3 flex gap-2">
                  {app.status === "pending" && (
                    <>
                      <button onClick={() => approveApplication(app.application_id)} className="bg-green-600 px-3 py-1 rounded">Approve </button>
                      <button onClick={() => rejectApplication(app.application_id)} className="bg-red-600 px-3 py-1 rounded" >Reject </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
