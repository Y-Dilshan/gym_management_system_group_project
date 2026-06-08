import { Zap, UserPlus, RefreshCcw, Pill, Package, ArrowRight } from "lucide-react";

const actions = [
  { icon: UserPlus, label: "Book Trainer" },
  { icon: RefreshCcw, label: "Renew Membership" },
  { icon: Pill, label: "Buy Supplements" },
  { icon: Package, label: "View Orders" },
];

export default function QuickActions() {
  return (
    <section className="col-span-5 bg-[#1a1a1a] border border-[#2d2d2d] rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-8">
        <Zap className="w-5 h-5 text-[#f2c94c]" />
        <h3 className="text-sm font-semibold">Quick Actions</h3>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {actions.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="bg-[#2d2d2d]/50 hover:bg-[#2d2d2d] transition rounded-xl p-4 flex flex-col items-center gap-4 group"
          >
            <div className="bg-[#f2c94c]/10 p-2 rounded-lg group-hover:bg-[#f2c94c] group-hover:text-black transition">
              <Icon className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-gray-300 text-center">{label}</span>
            <ArrowRight className="w-3 h-3 text-gray-500" />
          </button>
        ))}
      </div>
    </section>
  );
}
