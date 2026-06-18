import { useState } from "react";
import {toast} from "react-hot-toast";

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
    </div>
  );
}