import { Dumbbell, CalendarDays, TrendingUp, Wallet } from "lucide-react";

const stats = [
  {
    icon: Dumbbell,
    label: "Membership",
    value: "Active",
    sub: "Your membership is active",
    subColor: "text-gray-400",
  },
  {
    icon: CalendarDays,
    label: "Attendance",
    value: "42 Days",
    sub: "This month",
    subColor: "text-gray-400",
  },
  {
    icon: TrendingUp,
    label: "BMI",
    value: "21.8",
    sub: "Healthy Range",
    subColor: "text-[#27ae60] font-medium",
  },
  {
    icon: Wallet,
    label: "Payments",
    value: "Rs.15,000",
    sub: "Total Paid",
    subColor: "text-gray-400",
  },
];

export default function SummaryStats() {
  return (
    <section className="grid grid-cols-4 gap-6 mb-8">
      {stats.map(({ icon: Icon, label, value, sub, subColor }) => (
        <div key={label} className="bg-[#1a1a1a] border border-[#2d2d2d] p-6 rounded-2xl flex items-center gap-4">
          <div className="bg-[#f2c94c]/10 p-3 rounded-xl">
            <Icon className="w-8 h-8 text-[#f2c94c]" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase">{label}</p>
            <h3 className="text-xl font-bold">{value}</h3>
            <p className={`text-[10px] ${subColor}`}>{sub}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
