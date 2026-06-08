import { Crown, CheckCircle2 } from "lucide-react";

const benefits = [
  "Full Gym Access",
  "Personal Trainer (2 Sessions / Week)",
  "Customized Diet Plan",
  "Supplements Discount (20%)",
  "Priority Booking",
];

export default function MembershipPlan() {
  return (
    <section className="col-span-4 bg-[#1a1a1a] border border-[#2d2d2d] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold">Your Membership Plan</h3>
        <span className="bg-[#f2c94c]/20 text-[#f2c94c] text-[10px] font-bold px-2 py-1 rounded">Recommended</span>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <Crown className="w-6 h-6 text-[#f2c94c]" />
        <h4 className="text-lg font-bold text-[#f2c94c]">Gold Membership</h4>
      </div>

      <ul className="space-y-4 mb-10">
        {benefits.map((b) => (
          <li key={b} className="flex items-center gap-3 text-xs">
            <CheckCircle2 className="w-4 h-4 text-[#f2c94c] shrink-0" />
            {b}
          </li>
        ))}
      </ul>

      <div className="flex items-end justify-between pt-6 border-t border-[#2d2d2d]">
        <div>
          <p className="text-[10px] text-gray-400 uppercase">Price</p>
          <p className="text-lg font-bold">
            Rs.5,000 <span className="text-gray-400 font-normal text-sm">/ month</span>
          </p>
        </div>
        <button className="border border-[#f2c94c] text-[#f2c94c] px-6 py-2 rounded-lg text-xs font-bold hover:bg-[#f2c94c] hover:text-black transition">
          Upgrade Plan
        </button>
      </div>
    </section>
  );
}
