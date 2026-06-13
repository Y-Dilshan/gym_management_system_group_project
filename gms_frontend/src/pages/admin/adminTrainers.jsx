import {Link} from "react-router-dom";

export default function AdminTrainers() {
  return (
    <div className = "m-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#111111] to-[#1C1C1C] border border-[#D4AF37]/20 rounded-2xl shadow-2xl p-6 mb-8 flex items-center justify-between">
        {/* Left Side Text */}
        <div>
          <h1 className="text-4xl font-bold text-white tracking-wide"> Trainers Management</h1>
          <p className="text-gray-400 mt-2">  Manage trainers, schedules, certifications and availability </p>
        </div>
        {/* Right Side Button */}
        <Link to="/admin/add-product" className="bg-[#D4AF37] text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">+ Add Trainer</Link>
        </div>
        {/* Header */}

      {/* Table Card */}
      <div className="bg-[#141414] border border-[#D4AF37]/20 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.08)]">
        {/* Card Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-[#2A2A2A]">
          <h2 className="text-2xl font-semibold text-white"> Trainers List </h2>
          <div className="flex gap-4">
            <input type="text" placeholder="Search Trainers..." className="bg-[#1F1F1F] text-white px-4 py-2 rounded-xl border border-[#333333] focus:border-[#D4AF37] outline-none"/>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Head */}
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
            {/* Table Body */}
            <tbody>
              <tr className="border-b border-[#2A2A2A] text-gray-300 hover:bg-[#1C1C1C] transition-all duration-300">
                <td className="px-6 py-5">
                  <img src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=500" alt="Trainer" className="w-16 h-16 rounded-xl object-cover border border-[#D4AF37]/40"/></td>
                <td className="px-6 py-5 font-semibold text-white"> TR001 </td>
                <td className="px-6 py-5"> Michael Johnson </td>
                <td className="px-6 py-5"> Strength Training </td>
                <td className="px-6 py-5"> 8 Years </td>
                <td className="px-6 py-5"> ACE Certified </td>
                <td className="px-6 py-5"> <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold border border-green-500/30">Available </span> </td>

                <td className="px-6 py-5"><span className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold border border-yellow-500/30">⭐ 4.9</span></td>
                <td className="px-6 py-5">
                  <div className="flex gap-3">
                    <button className="bg-[#D4AF37] text-black px-5 py-2 rounded-xl font-semibold hover:scale-105 transition duration-300">  View </button>
                    <button className="bg-blue-600 px-5 py-2 rounded-xl text-white font-semibold hover:bg-blue-700 hover:scale-105 transition duration-300"> Edit </button>
                    <button className="bg-red-600 px-5 py-2 rounded-xl text-white font-semibold hover:bg-red-700 hover:scale-105 transition duration-300"> Delete </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}