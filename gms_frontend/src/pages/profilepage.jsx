import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);

  const API = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const parsed = JSON.parse(userString);
        setUser(parsed);
        setFullName(parsed.full_name || "");
        setEmail(parsed.email || "");
        setPhone(parsed.phone || "");
      } catch (e) {
        console.error(e);
        // Corrupted/unparsable user data — clear it and send the user
        // back to sign in instead of leaving `user` null forever.
        localStorage.removeItem("user");
        navigate("/signin");
      }
    } else {
      navigate("/signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    // Guard against submitting before `user` has loaded (or if it was
    // never successfully loaded) — previously this would crash on
    // `user.role` / `user.user_id` below.
    if (!user) {
      toast.error("Your session has expired. Please sign in again.");
      navigate("/signin");
      return;
    }

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedEmail) {
      toast.error("Name and Email are required");
      return;
    }

    setSaving(true);
    const token = localStorage.getItem("token");

    try {
      const payload = {
        full_name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        role: user.role,
        status: user.status,
        profile_picture:
          user.profile_picture ||
          `https://api.dicebear.com/7.x/adventurer/svg?seed=${trimmedEmail}`
      };

      if (trimmedPassword) {
        payload.password = trimmedPassword;
      }

      const res = await fetch(`${API}/users/${user.user_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        toast.success("Profile updated successfully!");
        const updatedUser = {
          ...user,
          full_name: trimmedName,
          email: trimmedEmail,
          phone: trimmedPhone,
          profile_picture: payload.profile_picture
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setPassword("");
      } else {
        // The error response might not be JSON (e.g. a proxy/500 HTML
        // page), so parse it defensively instead of letting it throw.
        let message = "Failed to update profile";
        try {
          const data = await res.json();
          message = data.error || message;
        } catch {
          // ignore parse failure, fall back to default message
        }
        toast.error(message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white flex flex-col">
      <div className="fixed w-full z-40"><Header /></div>

      <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-[120px]">
        <h1 className="text-4xl font-bold tracking-wide mb-8 text-center md:text-left">
          Edit Your <span className="text-[#D4AF37]">Profile</span>
        </h1>

        <div className="bg-[#111] border border-zinc-800 rounded-3xl p-8 space-y-6 shadow-2xl">
          {/* Avatar and Info Header */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-zinc-800">
            <div className="w-24 h-24 rounded-full bg-[#D4AF37] text-black font-extrabold text-3xl flex items-center justify-center border-4 border-yellow-500/20">
              {fullName?.charAt(0) || "M"}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold">{fullName || "Gym Member"}</h2>
              <p className="text-xs text-zinc-400 mt-1 uppercase font-semibold tracking-wider text-[#D4AF37]">
                {user?.role || "Member"} Account
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5 uppercase font-bold tracking-wider">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-[#D4AF37]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1.5 uppercase font-bold tracking-wider">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="johndoe@email.com"
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-[#D4AF37]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1.5 uppercase font-bold tracking-wider">Mobile Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+94 77 123 4567"
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1.5 uppercase font-bold tracking-wider">New Password (Leave blank to keep same)</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 gap-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="px-6 py-3 border border-zinc-800 hover:bg-zinc-800 rounded-xl text-sm font-semibold transition"
              >
                Back to Dashboard
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-8 py-3 bg-[#D4AF37] hover:bg-[#b8962d] text-black font-bold rounded-xl transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-yellow-500/5"
              >
                {saving ? "Saving Changes..." : "Save Profile Details"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}