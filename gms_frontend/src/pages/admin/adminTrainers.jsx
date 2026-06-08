export default function AdminTrainers() {
  return (
    <div className="w-full h-full p-8 bg-[#E5E5E5]">

      {/* Header */}
      <div className="bg-[#2F2F2F] rounded-2xl shadow-lg px-8 py-5 mb-8">
        <h1 className="text-4xl font-bold text-white">Trainers Management </h1>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-[#2F2F2F]"> Orders List </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#D4AF37] text-white">
              <tr>
                <th className="px-6 py-4 text-left">Image</th>
                <th className="px-6 py-4 text-left">Order ID</th>
                <th className="px-6 py-4 text-left">Customer Name</th>
                <th className="px-6 py-4 text-left">Shipping Address</th>
                <th className="px-6 py-4 text-left">Order Date</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Payment Status</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4"><img src="https://via.placeholder.com/50" alt="Product" className="w-14 h-14 rounded-lg object-cover border" /></td>
                <td className="px-6 py-4 font-medium text-gray-700"> #12345 </td>
                <td className="px-6 py-4"> John Doe </td>
                <td className="px-6 py-4"> 123 Main St, Anytown, USA </td>
                <td className="px-6 py-4"> 2024-06-01 </td>
                <td className="px-6 py-4"> <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium"> Processing </span> </td>
                <td className="px-6 py-4"> <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"> Paid </span> </td>

                <td className="px-6 py-4">
                    <div className="flex gap-2">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"> View </button>
                        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"> Delete </button>
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