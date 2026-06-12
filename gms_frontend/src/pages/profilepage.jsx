import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import gymImage from "../assets/gym.jpg";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* Sidebar */}
      <aside className="w-[250px] bg-[#080808] border-r border-yellow-500/20 flex flex-col">

        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-yellow-500/20">
          <img
            src={logo}
            alt="logo"
            className="w-12 h-12 object-contain"
          />

          <div className="ml-3">
            <h1 className="text-3xl font-bold">
              <span className="text-white">POWER </span>
              <span className="text-yellow-400">ZONE</span>
            </h1>

            <p className="text-xs tracking-widest text-gray-400">
              PREMIUM GYM
            </p>
          </div>
        </div>

        {/* Menu */}
        <div className="px-5 pt-10 space-y-7">

          <Link to="/dashboard" className="block">
            Dashboard
          </Link>

          <button className="block">
            Membership
          </button>

          <button className="block">
            Orders
          </button>

          <button className="block">
            Payments
          </button>

          <button className="block">
            Trainers
          </button>

          <button className="w-full bg-yellow-500/20 text-yellow-400 py-3 rounded-xl text-left px-5">
            Profile
          </button>

          <button className="block text-gray-300">
            Settings
          </button>

          <button className="block text-red-400">
            Logout
          </button>

        </div>

        {/* Bottom Image */}
        <div className="mt-auto p-5">

          <div className="rounded-3xl overflow-hidden bg-[#111111]">

            <img
              src={gymImage}
              alt="gym"
              className="w-full h-64 object-cover"
            />

            <div className="p-4">

              <h3 className="text-4xl font-bold">
                BE STRONGER
              </h3>

              <h3 className="text-4xl font-bold text-yellow-400">
                THAN YOUR
              </h3>

              <h3 className="text-4xl font-bold">
                EXCUSES
              </h3>

              <p className="mt-3 text-gray-300">
                Keep Pushing 💪
              </p>

            </div>

          </div>

        </div>

      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <header className="h-20 border-b border-yellow-500/20 flex items-center justify-between px-10 bg-[#080808]">

          <div className="flex gap-12 font-medium">

            <Link to="/dashboard">DASHBOARD</Link>
            <span>MEMBERSHIP</span>
            <span>ORDERS</span>
            <span>PAYMENTS</span>
            <span>TRAINERS</span>
            <span>SUPPLEMENTS</span>

          </div>

          <div className="flex items-center gap-4">

            <div className="relative">
              🔔
              <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </div>
            </div>

            <img
              src="https://i.pravatar.cc/100"
              alt="profile"
              className="w-12 h-12 rounded-full border-2 border-yellow-500"
            />

            <span>Kajanika</span>

          </div>

        </header>

        {/* Content */}
        <main className="flex-1 p-8 bg-black text-white">

          {/* Header */}
          <div className="mb-6">

            <h1 className="text-4xl font-bold">
              Edit Profile
            </h1>

            <div className="flex items-center gap-2 mt-2 text-sm">
              <span className="text-gray-400">Dashboard</span>
              <span className="text-yellow-400">›</span>
              <span className="text-yellow-400">Edit Profile</span>
            </div>

          </div>

          {/* Profile Card */}
          <div className="bg-[#111111] rounded-3xl p-6 border border-white/5 flex items-center gap-6">

            <div className="relative">

              <img
                src="https://i.pravatar.cc/200"
                alt="profile"
                className="w-28 h-28 rounded-full border-2 border-yellow-500"
              />

              <button className="absolute bottom-1 right-1 bg-yellow-500 text-black w-10 h-10 rounded-full">
                📷
              </button>

            </div>

            <div>

              <h2 className="text-4xl font-bold">
                Kajanika Sivatheepan
              </h2>

              <p className="text-gray-400 mt-2">
                Member since 01 Jan 2026
              </p>

              <button className="mt-4 bg-yellow-500/20 text-yellow-400 px-5 py-2 rounded-xl">
                👑 Gold Membership
              </button>

            </div>

          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-6 mt-6">

            {/* Personal Info */}
            <div className="bg-[#111111] rounded-3xl p-6">

              <h3 className="text-xl font-semibold mb-6">
                Personal Information
              </h3>

              <div className="grid grid-cols-2 gap-4">

                <input className="bg-black border border-white/10 rounded-xl p-3" defaultValue="Kajanika" />
                <input className="bg-black border border-white/10 rounded-xl p-3" defaultValue="Sivatheepan" />

                <input className="bg-black border border-white/10 rounded-xl p-3" defaultValue="kajanika@gmail.com" />
                <input className="bg-black border border-white/10 rounded-xl p-3" defaultValue="+94 77 123 4567" />

                <input type="date" className="bg-black border border-white/10 rounded-xl p-3" />

                <select className="bg-black border border-white/10 rounded-xl p-3">
                  <option>Female</option>
                  <option>Male</option>
                </select>

              </div>

              <input
                className="w-full mt-4 bg-black border border-white/10 rounded-xl p-3"
                defaultValue="No.123, Main Street, Jaffna, Sri Lanka"
              />

            </div>

            {/* Account Info */}
            <div className="bg-[#111111] rounded-3xl p-6">

              <h3 className="text-xl font-semibold mb-6">
                Account Information
              </h3>

              <div className="space-y-4">

                <input className="w-full bg-black border border-white/10 rounded-xl p-3" defaultValue="kajanika" />

                <input className="w-full bg-black border border-white/10 rounded-xl p-3" defaultValue="Gold Membership" />

                <input type="date" className="w-full bg-black border border-white/10 rounded-xl p-3" />

                <input className="w-full bg-black border border-white/10 rounded-xl p-3" defaultValue="PZ10026" />

              </div>

            </div>

          </div>

          {/* Password */}
          <div className="bg-[#111111] rounded-3xl p-6 mt-6">

            <h3 className="text-xl font-semibold mb-6">
              Change Password
            </h3>

            <div className="grid grid-cols-3 gap-6">

              <input
                type="password"
                placeholder="Current Password"
                className="bg-black border border-white/10 rounded-xl p-3"
              />

              <input
                type="password"
                placeholder="New Password"
                className="bg-black border border-white/10 rounded-xl p-3"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                className="bg-black border border-white/10 rounded-xl p-3"
              />

            </div>

          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-8">

            <button className="border border-white/20 px-10 py-3 rounded-xl">
              Cancel
            </button>

            <button className="bg-yellow-500 text-black font-semibold px-10 py-3 rounded-xl">
              Save Changes
            </button>

          </div>

        </main>

      </div>

    </div>
  );
}