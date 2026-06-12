export default function AdminProductPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] p-8">

      {/* Header */}
      <div className="bg-gradient-to-r from-[#111111] to-[#1C1C1C] border border-[#D4AF37]/20 rounded-2xl shadow-2xl p-6 mb-8">
        <h1 className="text-4xl font-bold text-white tracking-wide"> Product Management </h1>
        <p className="text-gray-400 mt-2"> Manage customer orders and track deliveries </p>
      </div>

      {/* Table Card */}
      <div className="bg-[#141414] border border-[#D4AF37]/20 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.08)]">

        {/* Card Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-[#2A2A2A]">
          <h2 className="text-2xl font-semibold text-white"> Orders List </h2>

          <input type="text" placeholder="Search Orders..." className="bg-[#1F1F1F] text-white px-4 py-2 rounded-xl border border-[#333333] focus:border-[#D4AF37] outline-none"/>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">

            {/* Table Head */}
            <thead>
              <tr className="bg-[#D4AF37] text-black">
                <th className="px-6 py-5 text-left font-semibold">Image</th>
                <th className="px-6 py-5 text-left font-semibold">Order ID</th>
                <th className="px-6 py-5 text-left font-semibold">Customer</th>
                <th className="px-6 py-5 text-left font-semibold">Address</th>
                <th className="px-6 py-5 text-left font-semibold">Date</th>
                <th className="px-6 py-5 text-left font-semibold">Status</th>
                <th className="px-6 py-5 text-left font-semibold">Payment</th>
                <th className="px-6 py-5 text-left font-semibold">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>

              <tr className="border-b border-[#2A2A2A] text-gray-300 hover:bg-[#1C1C1C] transition-all duration-300">
                <td className="px-6 py-5"> <img src="https://via.placeholder.com/60" alt="Product" className="w-16 h-16 rounded-xl object-cover border border-[#D4AF37]/40"/></td>
                    <td className="px-6 py-5 font-semibold text-white"> #12345 </td>
                    <td className="px-6 py-5"> John Doe </td>
                    <td className="px-6 py-5"> 123 Main St, Anytown </td>
                    <td className="px-6 py-5"> 2026-06-12 </td>
                    <td className="px-6 py-5"> <span className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold border border-yellow-500/30">Processing </span></td>
                    <td className="px-6 py-5"> <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold border border-green-500/30">Paid </span> </td>
                    <td className="px-6 py-5">
                  <div className="flex gap-3">
                    <button className="bg-[#D4AF37] text-black px-5 py-2 rounded-xl font-semibold hover:scale-105 transition duration-300"> View </button>
                    <button className="bg-red-600 px-5 py-2 rounded-xl text-white font-semibold hover:bg-red-700 hover:scale-105 transition duration-300">Delete </button>
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