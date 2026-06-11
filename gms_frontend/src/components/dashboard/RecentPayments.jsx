import { FileText } from "lucide-react";

const payments = [
  { date: "01 Jun 2026", description: "Membership Fee (May)", amount: "Rs.5,000", status: "Paid" },
  { date: "01 May 2026", description: "Membership Fee (Apr)", amount: "Rs.5,000", status: "Paid" },
  { date: "01 Apr 2026", description: "Membership Fee (Mar)", amount: "Rs.5,000", status: "Paid" },
];

export default function RecentPayments() {
  return (
    <section className="col-span-7 bg-[#1a1a1a] border border-[#2d2d2d] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-[#f2c94c]" />
          <h3 className="text-sm font-semibold">Recent Payments</h3>
        </div>
        <a className="text-[10px] font-bold text-[#f2c94c]" href="#">View All</a>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="text-[10px] text-gray-500 uppercase tracking-widest border-b border-[#2d2d2d]">
            <th className="pb-4 font-medium">Date</th>
            <th className="pb-4 font-medium">Description</th>
            <th className="pb-4 font-medium">Amount</th>
            <th className="pb-4 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {payments.map((p, i) => (
            <tr key={i} className={i < payments.length - 1 ? "border-b border-[#2d2d2d]/30" : ""}>
              <td className="py-4 font-medium">{p.date}</td>
              <td className="py-4 text-gray-400">{p.description}</td>
              <td className="py-4">{p.amount}</td>
              <td className="py-4 text-[#27ae60] font-bold">{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
