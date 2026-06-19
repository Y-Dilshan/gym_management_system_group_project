import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import gymImage from "../assets/hero.png";

export default function MemberDashboard() {
  const [profileImage, setProfileImage] = useState(
    "https://i.pravatar.cc/150?img=12"
  );

  const [member, setMember] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    gender: "",
    height: "",
    weight: "",
    goal: "",
    emergencyContact: "",
  });

  const handleChange = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    console.log(member);
    toast.success("Profile Updated Successfully!");
  };

  return (
    <div className="min-h-screen bg-black flex justify-center p-6">
      <div className="w-full max-w-5xl bg-[#111] p-8 rounded-2xl border border-yellow-500/20">
        <h1 className="text-3xl font-bold text-yellow-400 mb-8"> Edit my Profile </h1>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-8">
          <img src={profileImage} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-yellow-500" />

          <label className="mt-4 cursor-pointer bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400">
            Change Photo
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden"/>
          </label>
        </div>

        {/* Form */}
        <div className="grid md:grid-cols-2 gap-5">
          <input type="text" name="name" placeholder="Full Name" value={member.name} onChange={handleChange} className="p-3 rounded-lg bg-black border border-gray-700 text-white"/>
          <input type="email" name="email" placeholder="Email Address" value={member.email} onChange={handleChange} className="p-3 rounded-lg bg-black border border-gray-700 text-white"/>
          <input type="text" name="phone" placeholder="Phone Number" value={member.phone} onChange={handleChange} className="p-3 rounded-lg bg-black border border-gray-700 text-white"/>
          <input type="date" name="dob"  value={member.dob} onChange={handleChange} className="p-3 rounded-lg bg-black border border-gray-700 text-white"/>
          <select name="gender" value={member.gender} onChange={handleChange} className="p-3 rounded-lg bg-black border border-gray-700 text-white">
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input type="text" name="address" placeholder="Address" value={member.address} onChange={handleChange} className="p-3 rounded-lg bg-black border border-gray-700 text-white"/>
          <input type="number" name="height" placeholder="Height (cm)" value={member.height} onChange={handleChange} className="p-3 rounded-lg bg-black border border-gray-700 text-white"/>
          <input type="number" name="weight" placeholder="Weight (kg)" value={member.weight} onChange={handleChange} className="p-3 rounded-lg bg-black border border-gray-700 text-white"/>
          <select name="goal" value={member.goal} onChange={handleChange} className="p-3 rounded-lg bg-black border border-gray-700 text-white">
            <option value="">Fitness Goal</option>
            <option>Weight Loss</option>
            <option>Muscle Gain</option>
            <option>Body Building</option>
            <option>General Fitness</option>
          </select>

          <input type="text" name="emergencyContact" placeholder="Emergency Contact" value={member.emergencyContact} onChange={handleChange} className="p-3 rounded-lg bg-black border border-gray-700 text-white"/>
        </div>

        {/* Save Button */}
        <div className = "flex gap-5 justify-end">
        <div className="mt-8 flex">
          <button onClick={handleSave} className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-white transition"> Save Changes </button>
        </div>

        <div className="mt-8 flex">
          <button type="reset" className="bg-black text-white px-8 py-3 rounded-lg font-semibold border border-red-600 hover:bg-yellow-500 hover:text-black transition"> Clear </button>
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

          {/* Hero Card */}
          <div className="rounded-3xl border border-yellow-500/20 bg-[#111111] px-10 py-10">

            <div className="grid grid-cols-5 items-center gap-8">

              <div className="col-span-2">

                <p className="text-2xl text-gray-300">
                  Welcome Back,
                </p>

                <h1 className="text-6xl font-bold text-yellow-400 mt-2">
                  Kajanika 💪
                </h1>

              </div>

              <div className="border-l border-white/10 pl-8">

                <p className="text-gray-400">
                  Current Plan
                </p>

                <h3 className="text-3xl text-yellow-400 font-bold mt-2">
                  Gold Membership
                </h3>

              </div>

              <div className="border-l border-white/10 pl-8">

                <p className="text-gray-400">
                  Status
                </p>

                <p className="text-green-400 text-2xl font-bold mt-2">
                  Active
                </p>

              </div>

              <div className="border-l border-white/10 pl-8">

                <p className="text-gray-400">
                  Expiry Date
                </p>

                <p className="text-yellow-400 text-2xl font-bold mt-2">
                  25 Dec 2026
                </p>

              </div>

            </div>

          </div>
          {/* Stats Cards */}
<div className="grid grid-cols-4 gap-6 mt-8">

  {/* Membership */}
  <div className="bg-[#111111] rounded-2xl p-6 border border-white/5">
    <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center text-yellow-400 text-3xl">
      🏋️
    </div>

    <p className="text-gray-400 mt-4">Membership</p>

    <h2 className="text-yellow-400 text-5xl font-bold">
      Active
    </h2>

    <p className="text-gray-500 mt-2">
      Your membership is active
    </p>
  </div>

  {/* Attendance */}
  <div className="bg-[#111111] rounded-2xl p-6 border border-white/5">
    <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center text-green-400 text-3xl">
      📅
    </div>

    <p className="text-gray-400 mt-4">Attendance</p>

    <h2 className="text-green-400 text-5xl font-bold">
      42 Days
    </h2>

    <p className="text-gray-500 mt-2">
      This month
    </p>
  </div>

  {/* BMI */}
  <div className="bg-[#111111] rounded-2xl p-6 border border-white/5">
    <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center text-blue-400 text-3xl">
      💙
    </div>

    <p className="text-gray-400 mt-4">BMI</p>

    <h2 className="text-blue-400 text-5xl font-bold">
      21.8
    </h2>

    <p className="text-gray-500 mt-2">
      Healthy Range
    </p>
  </div>

  {/* Payments */}
  <div className="bg-[#111111] rounded-2xl p-6 border border-white/5">
    <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center text-yellow-400 text-3xl">
      💳
    </div>

    <p className="text-gray-400 mt-4">Payments</p>

    <h2 className="text-yellow-400 text-5xl font-bold">
      Rs.15,000
    </h2>

    <p className="text-gray-500 mt-2">
      Total Paid
    </p>
  </div>

</div>

{/* Recent Orders */}
<div className="mt-8 bg-[#111111] rounded-2xl p-8 border border-white/5">

  <div className="flex justify-between items-center mb-6">

    <h2 className="text-3xl font-bold">
      Recent Orders
    </h2>

    <button className="text-yellow-400">
      View All
    </button>

  </div>

  <table className="w-full">

    <thead>
      <tr className="text-left text-gray-400 border-b border-white/10">
        <th className="pb-4">Order ID</th>
        <th className="pb-4">Supplement</th>
        <th className="pb-4">Date</th>
        <th className="pb-4">Status</th>
        <th className="pb-4">Amount</th>
      </tr>
    </thead>

    <tbody>

      <tr className="border-b border-white/5">
        <td className="py-5">ORD001</td>
        <td>Gold Standard 100% Whey Protein</td>
        <td>05 Jun 2026</td>
        <td className="text-green-400">Delivered</td>
        <td>Rs. 8,999</td>
      </tr>

      <tr className="border-b border-white/5">
        <td className="py-5">ORD002</td>
        <td>Creatine Monohydrate</td>
        <td>02 Jun 2026</td>
        <td className="text-yellow-400">Pending</td>
        <td>Rs. 4,999</td>
      </tr>

      <tr className="border-b border-white/5">
        <td className="py-5">ORD003</td>
        <td>C4 Original Pre Workout</td>
        <td>30 May 2026</td>
        <td className="text-green-400">Delivered</td>
        <td>Rs. 6,500</td>
      </tr>

      <tr>
        <td className="py-5">ORD004</td>
        <td>BCAA Energy</td>
        <td>28 May 2026</td>
        <td className="text-green-400">Delivered</td>
        <td>Rs. 5,999</td>
      </tr>

    </tbody>

  </table>

</div>

        </main>

      </div>

    </div>
  );
}