import gymImage from "../assets/hero.png";
import { Link } from "react-router-dom";

export default function MemberDashboard() {
  return (
    <div className="min-h-screen bg-black text-white flex">

      
      {/* Sidebar */}
<aside className="w-[280px] bg-[#0B0B0B] border-r border-yellow-500/10 flex flex-col">

  {/* Logo */}
  <div className="px-6 pt-7 pb-6 border-b border-yellow-500/10">

    <div className="flex items-center gap-3">

      <img
        src="https://via.placeholder.com/100"
        alt="Power Zone"
        className="w-12 h-12"
      />

      <div>
        <h1 className="text-[20px] font-bold leading-none">
          <span className="text-white">POWER </span>
          <span className="text-yellow-400">ZONE</span>
        </h1>

        <p className="text-[11px] text-gray-400 tracking-[2px] mt-1">
          PREMIUM GYM
        </p>
      </div>

    </div>

  </div>

  {/* Menu */}
  <div className="px-6 pt-12">

    <div className="space-y-6">

      <button className="w-full bg-yellow-500 text-black py-4 rounded-xl font-semibold text-left px-6">
        Dashboard
      </button>

      <button className="w-full py-2 px-6 rounded-xl text-left hover:bg-white/5">
        Membership
      </button>

      <button className="w-full py-2 px-6 rounded-xl text-left hover:bg-white/5">
        Orders
      </button>

      <button className="w-full py-2 px-6 rounded-xl text-left hover:bg-white/5">
        Payments
      </button>

      <button className="w-full py-2 px-6 rounded-xl text-left hover:bg-white/5">
        Trainers
      </button>

      <Link to="/profile">
      <button className="w-full py-2 px-6 rounded-xl text-left hover:bg-white/5">
       Profile
      </button>
      </Link>

      <button className="w-full py-2 px-6 rounded-xl text-left text-red-400 hover:bg-red-500/10">
        Logout
      </button>

    </div>

  </div>

  {/* Push image card to bottom */}
  <div className="flex-1"></div>

  {/* Advertisement Card */}
  <div className="px-5 pb-5">

    <div className="bg-[#111111] rounded-3xl overflow-hidden border border-yellow-500/10">

      <img
        src={gymImage}
        alt="Gym"
        className="w-full h-60 object-cover"
      />

      <div className="p-5">

        <h2 className="text-3xl font-bold leading-tight">
          BE STRONGER
        </h2>

        <h2 className="text-3xl font-bold text-yellow-400 leading-tight">
          THAN YOUR
        </h2>

        <h2 className="text-3xl font-bold leading-tight">
          EXCUSES
        </h2>

        <p className="text-gray-300 mt-4">
          Keep Pushing 💪
        </p>

      </div>

    </div>

  </div>

</aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <header className="h-20 border-b border-yellow-500/20 bg-[#0A0A0A] flex items-center justify-between px-10">

          <div className="flex gap-12 font-medium">

            <span className="text-yellow-400 border-b-2 border-yellow-400 pb-1">
              Dashboard
            </span>

            <span>Membership</span>
            <span>Orders</span>
            <span>Payments</span>
            <span>Trainers</span>
            <span>Supplements</span>

          </div>

          <div className="flex items-center gap-4">

            <div className="relative">

              <span className="text-yellow-400 text-xl">
                🔔
              </span>

              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-yellow-500 text-black text-xs flex items-center justify-center font-bold">
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
        <main className="p-8">

         {/* Title */}
<div className="mb-6">
  <h1 className="text-4xl font-bold">Edit Profile</h1>

  <div className="flex items-center gap-2 mt-1 text-sm">
    <span className="text-gray-400">Dashboard</span>
    <span className="text-yellow-500">›</span>
    <span className="text-yellow-500">Edit Profile</span>
  </div>
</div>

{/* Profile Header */}
<div className="bg-[#111111] rounded-3xl border border-white/5 p-6 flex items-center gap-6">

  <div className="relative">
    <img
      src="https://i.pravatar.cc/200"
      alt=""
      className="w-24 h-24 rounded-full border-2 border-yellow-500 object-cover"
    />

    <button className="absolute bottom-0 right-0 bg-yellow-500 text-black w-9 h-9 rounded-full">
      📷
    </button>
  </div>

  <div>
    <h2 className="text-3xl font-bold">
      Kajanika Sivatheepan
    </h2>

    <p className="text-gray-400 mt-1">
      Member since 05 June 2026
    </p>

    <div className="mt-3 inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-xl">
      👑 Gold Membership
    </div>
  </div>

</div>

{/* Information Cards */}
<div className="grid grid-cols-2 gap-5 mt-5">

  {/* Personal */}
  <div className="bg-[#111111] rounded-3xl p-5 border border-white/5">

    <h3 className="text-xl font-semibold mb-5">
      👤 Personal Information
    </h3>

    <div className="grid grid-cols-2 gap-4">

      <div>
        <label className="text-sm text-gray-400">
          First Name
        </label>

        <input
          type="text"
          defaultValue="Kajanika"
          className="w-full mt-2 h-12 bg-black border border-white/10 rounded-xl px-4"
        />
      </div>

      <div>
        <label className="text-sm text-gray-400">
          Last Name
        </label>

        <input
          type="text"
          defaultValue="Sivatheepan"
          className="w-full mt-2 h-12 bg-black border border-white/10 rounded-xl px-4"
        />
      </div>

      <div>
        <label className="text-sm text-gray-400">
          Email Address
        </label>

        <input
          type="email"
          defaultValue="abcde@gmail.com"
          className="w-full mt-2 h-12 bg-black border border-white/10 rounded-xl px-4"
        />
      </div>

      <div>
        <label className="text-sm text-gray-400">
          Phone Number
        </label>

        <input
          type="text"
          defaultValue="+94 77 123 4567"
          className="w-full mt-2 h-12 bg-black border border-white/10 rounded-xl px-4"
        />
      </div>

      <div>
        <label className="text-sm text-gray-400">
          Date of Birth
        </label>

        <input
          type="date"
          className="w-full mt-2 h-12 bg-black border border-white/10 rounded-xl px-4"
        />
      </div>

      <div>
        <label className="text-sm text-gray-400">
          Gender
        </label>

        <select className="w-full mt-2 h-12 bg-black border border-white/10 rounded-xl px-4">
          <option>Female</option>
          <option>Male</option>
        </select>
      </div>

    </div>

    <div className="mt-4">
      <label className="text-sm text-gray-400">
        Address
      </label>

      <input
        type="text"
        defaultValue="No. 123, Main Street, Jaffna, Sri Lanka"
        className="w-full mt-2 h-12 bg-black border border-white/10 rounded-xl px-4"
      />
    </div>

  </div>

  {/* Account */}
  <div className="bg-[#111111] rounded-3xl p-5 border border-white/5">

    <h3 className="text-xl font-semibold mb-5">
      🔒 Account Information
    </h3>

    <div className="space-y-4">

      <div>
        <label className="text-sm text-gray-400">
          Username
        </label>

        <input
          type="text"
          defaultValue="kajanika"
          className="w-full mt-2 h-12 bg-black border border-white/10 rounded-xl px-4"
        />
      </div>

      <div>
        <label className="text-sm text-gray-400">
          Membership Plan
        </label>

        <input
          type="text"
          defaultValue="Gold Membership"
          className="w-full mt-2 h-12 bg-black border border-white/10 rounded-xl px-4"
        />
      </div>

      <div>
        <label className="text-sm text-gray-400">
          Join Date
        </label>

        <input
          type="date"
          className="w-full mt-2 h-12 bg-black border border-white/10 rounded-xl px-4"
        />
      </div>

      <div>
        <label className="text-sm text-gray-400">
          Member ID
        </label>

        <input
          type="text"
          defaultValue="PZ10026"
          className="w-full mt-2 h-12 bg-black border border-white/10 rounded-xl px-4"
        />
      </div>

    </div>

  </div>

</div>

{/* Password */}
<div className="bg-[#111111] rounded-3xl p-5 border border-white/5 mt-5">

  <h3 className="text-xl font-semibold mb-5">
    🔐 Change Password
  </h3>

  <div className="grid grid-cols-3 gap-5">

    <div>
      <label className="text-sm text-gray-400">
        Current Password
      </label>

      <input
        type="password"
        placeholder="Enter current password"
        className="w-full mt-2 h-12 bg-black border border-white/10 rounded-xl px-4"
      />
    </div>

    <div>
      <label className="text-sm text-gray-400">
        New Password
      </label>

      <input
        type="password"
        placeholder="Enter new password"
        className="w-full mt-2 h-12 bg-black border border-white/10 rounded-xl px-4"
      />
    </div>

    <div>
      <label className="text-sm text-gray-400">
        Confirm New Password
      </label>

      <input
        type="password"
        placeholder="Confirm new password"
        className="w-full mt-2 h-12 bg-black border border-white/10 rounded-xl px-4"
      />
    </div>

  </div>

  <p className="text-gray-500 text-sm mt-3">
    Leave password fields empty if you don't want to change your password.
  </p>

</div>

{/* Buttons */}
<div className="flex justify-center gap-4 mt-6">

  <button className="px-12 py-3 border border-white/20 rounded-xl">
    Cancel
  </button>

  <button className="px-12 py-3 bg-yellow-500 text-black font-semibold rounded-xl">
    Save Changes
  </button>

</div>
         



        </main>

      </div>

    </div>
  );
}