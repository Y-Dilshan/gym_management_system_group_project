import {
  FaDollarSign,
  FaChartLine,
  FaUsers,
  FaShoppingCart,
} from "react-icons/fa";

export default function AdminRevenuePage() {
  const revenueData = [
    {
      id: 1,
      source: "Premium Membership",
      customer: "John Doe",
      amount: "$65",
      date: "2026-06-12",
      status: "Completed",
    },
    {
      id: 2,
      source: "Protein Supplement",
      customer: "Jane Smith",
      amount: "$120",
      date: "2026-06-11",
      status: "Completed",
    },
    {
      id: 3,
      source: "Elite Membership",
      customer: "David Silva",
      amount: "$220",
      date: "2026-06-10",
      status: "Completed",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-8">

      {/* Header */}
      <div className="bg-gradient-to-r from-[#111111] to-[#1C1C1C] border border-[#D4AF37]/20 rounded-2xl shadow-2xl p-6 mb-8">
        <h1 className="text-4xl font-bold text-white tracking-wide"> Revenue Management </h1>
        <p className="text-gray-400 mt-2"> Monitor gym earnings and financial performance </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#141414] p-6 rounded-2xl border border-[#D4AF37]/20">
          <FaDollarSign className="text-[#D4AF37] text-3xl mb-3" />
          <h3 className="text-gray-400">Total Revenue</h3>
          <p className="text-[#D4AF37] text-3xl font-bold mt-2"> $48,500 </p>
        </div>

        <div className="bg-[#141414] p-6 rounded-2xl border border-[#D4AF37]/20">
          <FaChartLine className="text-green-400 text-3xl mb-3" />
          <h3 className="text-gray-400">Monthly Revenue</h3>
          <p className="text-white text-3xl font-bold mt-2"> $12,450 </p>
        </div>

        <div className="bg-[#141414] p-6 rounded-2xl border border-[#D4AF37]/20">
          <FaUsers className="text-blue-400 text-3xl mb-3" />
          <h3 className="text-gray-400">Membership Revenue</h3>
          <p className="text-white text-3xl font-bold mt-2"> $8,200 </p>
        </div>

        <div className="bg-[#141414] p-6 rounded-2xl border border-[#D4AF37]/20">
          <FaShoppingCart className="text-purple-400 text-3xl mb-3" />
          <h3 className="text-gray-400">Product Revenue</h3>
          <p className="text-white text-3xl font-bold mt-2"> $4,250 </p>
        </div>

      </div>

      {/* Revenue Table */}
      <div className="bg-[#141414] border border-[#D4AF37]/20 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.08)]">
        {/* Table Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-[#2A2A2A]">
          <h2 className="text-2xl font-semibold text-white"> Revenue History </h2>

          <input type="text" placeholder="Search Revenue..." className="bg-[#1F1F1F] text-white px-4 py-2 rounded-xl border border-[#333333] focus:border-[#D4AF37] outline-none"/>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#D4AF37] text-black">
                <th className="px-6 py-5 text-left">ID</th>
                <th className="px-6 py-5 text-left">Revenue Source</th>
                <th className="px-6 py-5 text-left">Customer</th>
                <th className="px-6 py-5 text-left">Amount</th>
                <th className="px-6 py-5 text-left">Date</th>
                <th className="px-6 py-5 text-left">Status</th>
                <th className="px-6 py-5 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {revenueData.map((item) => (
                <tr key={item.id} className="border-b border-[#2A2A2A] text-gray-300 hover:bg-[#1C1C1C] transition-all duration-300" >
                  <td className="px-6 py-5 text-white"> #{item.id} </td>
                  <td className="px-6 py-5"> {item.source}  </td>
                  <td className="px-6 py-5"> {item.customer} </td>
                  <td className="px-6 py-5 text-[#D4AF37] font-bold"> {item.amount} </td>
                  <td className="px-6 py-5"> {item.date} </td>
                  <td className="px-6 py-5">
                    <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold border border-green-500/30">{item.status} </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex gap-3">
                      <button className="bg-[#D4AF37] text-black px-4 py-2 rounded-xl font-semibold hover:scale-105 transition">View </button>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition">Report </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue Summary */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">

        <div className="bg-[#141414] border border-[#D4AF37]/20 rounded-2xl p-6">
          <h3 className="text-white text-xl font-bold mb-2">  Membership Income </h3>
          <p className="text-[#D4AF37] text-4xl font-bold"> $8,200 </p>
          <p className="text-gray-400 mt-2"> 65% of total revenue </p>
        </div>
        <div className="bg-[#141414] border border-[#D4AF37]/20 rounded-2xl p-6">
          <h3 className="text-white text-xl font-bold mb-2"> Product Sales </h3>
          <p className="text-[#D4AF37] text-4xl font-bold"> $4,250 </p>
          <p className="text-gray-400 mt-2">35% of total revenue </p>
        </div>
        <div className="bg-[#141414] border border-[#D4AF37]/20 rounded-2xl p-6">
          <h3 className="text-white text-xl font-bold mb-2"> Growth Rate </h3>
          <p className="text-green-400 text-4xl font-bold"> +18%</p>
          <p className="text-gray-400 mt-2"> Compared to last month </p>
        </div>
      </div>
    </div>
  );
}