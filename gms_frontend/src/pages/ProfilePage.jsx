import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import { API_BASE_URL } from "../utils/api.js";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");

    if (!token || !userString) {
      navigate("/signin");
      return;
    }

    try {
      const parsed = JSON.parse(userString);
      setUser(parsed);
      setFullName(parsed.full_name || "");
      setEmail(parsed.email || "");
      setPhone(parsed.phone || "");
      setProfilePicture(parsed.profile_picture || "");
    } catch (e) {
      console.error(e);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/signin");
    } finally {
      setLoading(false);
    }
  }, [navigate]);


  // Handle image file selection from local device with automatic compression
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be under 10MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          const maxDim = 400;
          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
          setProfilePicture(compressedBase64);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // User validation
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

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Please enter a valid email address");
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
        profile_picture: profilePicture.trim() || user.profile_picture || `https://api.dicebear.com/7.x/adventurer/svg?seed=${trimmedEmail}`
      };

      if (trimmedPassword) {
        payload.password = trimmedPassword;
      }

      // Get user ID with fallback
      const userId = user.user_id || user.id || user._id;
      if (!userId) {
        toast.error("User ID not found. Please sign in again.");
        navigate("/signin");
        return;
      }

      const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
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
        window.dispatchEvent(new Event("user-updated"));
        window.dispatchEvent(new Event("storage"));
      } else {
        let message = "Failed to update profile";
        try {
          const data = await res.json();
          message = data.error || message;
        } catch {
          // ignore parse failure
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

  const getAvatarSrc = (path) => {
    if (!path) return null;
    if (path.startsWith("data:") || path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    }
    const baseUrl = API_BASE_URL.replace(/\/api\/?$/, "");
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${baseUrl}${cleanPath}`;
  };
  // Loading state
  if (loading) {
    return (
      <div className="bg-[#050505] min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37] mx-auto"></div>
          <p className="mt-4 text-zinc-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Get dashboard route based on role
  const getDashboardRoute = () => {
    if (user?.role === 'ADMIN') return "/admin";
    if (user?.role === 'TRAINER') return "/booksessions";
    return "/dashboard";
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
            {profilePicture ? (
              <img
                src={getAvatarSrc(profilePicture)}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/trainer1.jpg";
                }}
                alt={fullName}
                className="w-24 h-24 rounded-full object-cover border-4 border-[#D4AF37]/30 shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-[#D4AF37] text-black font-extrabold text-3xl flex items-center justify-center border-4 border-yellow-500/20">
                {fullName?.charAt(0) || "M"}
              </div>
            )}
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

              {/* Upload Profile Picture from Device */}
              <div className="md:col-span-2 space-y-3">
                <label className="block text-xs text-zinc-400 uppercase font-bold tracking-wider">
                  Profile Picture
                </label>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Option A: Select File From Device */}
                  <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl">
                    <span className="block text-xs text-zinc-400 mb-2 font-semibold">Choose File from Device</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full text-xs text-zinc-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#D4AF37] file:text-black hover:file:bg-[#b8962d] cursor-pointer"
                    />
                  </div>

                  {/* Option B: Enter Image URL */}
                  <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl">
                    <span className="block text-xs text-zinc-400 mb-2 font-semibold">Or Paste Image URL</span>
                    <input
                      type="text"
                      value={profilePicture}
                      onChange={(e) => setProfilePicture(e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                      className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 gap-4">
              <button
                type="button"
                onClick={() => navigate(getDashboardRoute())}
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
