import { useState } from "react";
import {
  FaCog,
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaSave,
} from "react-icons/fa";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    gymName: "POWER ZONE GYM",
    email: "info@powerzone.com",
    phone: "+94 77 123 4567",
    address: "Colombo, Sri Lanka",
    membershipFee: "25",
    openingTime: "06:00",
    closingTime: "22:00",
  });

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    alert("Settings Saved Successfully");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-8">

      {/* Header */}
      <div className="bg-gradient-to-r from-[#111111] to-[#1C1C1C] border border-[#D4AF37]/20 rounded-2xl shadow-2xl p-6 mb-8">
        <div className="flex items-center gap-4">
          <FaCog className="text-[#D4AF37] text-4xl" />

          <div>
            <h1 className="text-4xl font-bold text-white">
              Settings
            </h1>

            <p className="text-gray-400 mt-2">
              Manage gym and system settings
            </p>
          </div>
        </div>
      </div>

      {/* Settings Form */}
      <div className="bg-[#141414] border border-[#D4AF37]/20 rounded-3xl p-8 shadow-[0_0_30px_rgba(212,175,55,0.08)]">

        <div className="grid md:grid-cols-2 gap-6">

          {/* Gym Name */}
          <div>
            <label className="text-white flex items-center gap-2 mb-2">
              <FaBuilding />
              Gym Name
            </label>

            <input
              type="text"
              name="gymName"
              value={settings.gymName}
              onChange={handleChange}
              className="w-full bg-[#1F1F1F] text-white border border-[#333] rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-white flex items-center gap-2 mb-2">
              <FaEnvelope />
              Email
            </label>

            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
              className="w-full bg-[#1F1F1F] text-white border border-[#333] rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-white flex items-center gap-2 mb-2">
              <FaPhone />
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              value={settings.phone}
              onChange={handleChange}
              className="w-full bg-[#1F1F1F] text-white border border-[#333] rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Address */}
          <div>
            <label className="text-white flex items-center gap-2 mb-2">
              <FaMapMarkerAlt />
              Address
            </label>

            <input
              type="text"
              name="address"
              value={settings.address}
              onChange={handleChange}
              className="w-full bg-[#1F1F1F] text-white border border-[#333] rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Membership Fee */}
          <div>
            <label className="text-white mb-2 block">
              Default Membership Fee ($)
            </label>

            <input
              type="number"
              name="membershipFee"
              value={settings.membershipFee}
              onChange={handleChange}
              className="w-full bg-[#1F1F1F] text-white border border-[#333] rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Opening Time */}
          <div>
            <label className="text-white mb-2 block">
              Opening Time
            </label>

            <input
              type="time"
              name="openingTime"
              value={settings.openingTime}
              onChange={handleChange}
              className="w-full bg-[#1F1F1F] text-white border border-[#333] rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Closing Time */}
          <div>
            <label className="text-white mb-2 block">
              Closing Time
            </label>

            <input
              type="time"
              name="closingTime"
              value={settings.closingTime}
              onChange={handleChange}
              className="w-full bg-[#1F1F1F] text-white border border-[#333] rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37]"
            />
          </div>

        </div>

        {/* Notifications Section */}
        <div className="mt-10 border-t border-[#2A2A2A] pt-8">

          <h2 className="text-2xl font-bold text-white mb-6">
            Notification Settings
          </h2>

          <div className="space-y-4">

            <label className="flex items-center gap-3 text-gray-300">
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 accent-[#D4AF37]"
              />
              Email Notifications
            </label>

            <label className="flex items-center gap-3 text-gray-300">
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 accent-[#D4AF37]"
              />
              Membership Expiry Alerts
            </label>

            <label className="flex items-center gap-3 text-gray-300">
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 accent-[#D4AF37]"
              />
              Order Notifications
            </label>

          </div>
        </div>

        {/* Save Button */}
        <div className="mt-10 flex justify-end">
          <button
            onClick={handleSave}
            className="bg-[#D4AF37] text-black px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition"
          >
            <FaSave />
            Save Settings
          </button>
        </div>

      </div>
    </div>
  );
}