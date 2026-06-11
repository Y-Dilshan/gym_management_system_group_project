import { Calendar, Check, X, Trophy } from "lucide-react";

const days = [
  { label: "Mon", present: true },
  { label: "Tue", present: true },
  { label: "Wed", present: true },
  { label: "Thu", present: false },
  { label: "Fri", present: true },
  { label: "Sat", present: true },
  { label: "Sun", present: null },
];

export default function AttendanceOverview() {
  return (
    <section className="col-span-5 bg-[#1a1a1a] border border-[#2d2d2d] rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-5 h-5 text-[#f2c94c]" />
        <h3 className="text-sm font-semibold">Attendance Overview</h3>
      </div>
      <p className="text-xs text-gray-400 mb-6">This Month</p>

      <div className="grid grid-cols-7 gap-2 mb-8 text-center">
        {days.map(({ label, present }) => (
          <div key={label} className="space-y-3">
            <p className="text-[10px] text-gray-400">{label}</p>
            <div
              className={`w-10 h-10 mx-auto rounded-full border flex items-center justify-center ${
                present === true
                  ? "border-[#27ae60] text-[#27ae60]"
                  : present === false
                  ? "border-[#eb5757] text-[#eb5757]"
                  : "border-[#2d2d2d] text-gray-500"
              }`}
            >
              {present === true ? (
                <Check className="w-5 h-5" />
              ) : (
                <X className="w-5 h-5" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#2d2d2d]/30 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#f2c94c]/10 p-2 rounded-lg">
            <Trophy className="w-6 h-6 text-[#f2c94c]" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#f2c94c]">Great Going!</p>
            <p className="text-[10px] text-gray-400">You've completed 18 visits this month.</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold">18 / 26</p>
          <p className="text-[10px] text-gray-400">Visits</p>
        </div>
      </div>
    </section>
  );
}
