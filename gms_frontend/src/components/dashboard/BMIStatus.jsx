import { Heart } from "lucide-react";

export default function BMIStatus() {
  const radius = 45;
  const circumference = 2 * Math.PI * radius; // ~282.74
  const filled = 210;

  return (
    <section className="col-span-3 bg-[#1a1a1a] border border-[#2d2d2d] rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="w-5 h-5 text-[#f2c94c]" />
        <h3 className="text-sm font-semibold">BMI Status</h3>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative w-40 h-40 flex items-center justify-center">
          <svg
            className="w-full h-full"
            style={{ transform: "rotate(-90deg)" }}
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r={radius} fill="transparent" stroke="#2d2d2d" strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="#f2c94c"
              strokeWidth="8"
              strokeDasharray={`${filled} ${circumference}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-4xl font-bold">21.8</p>
            <p className="text-[10px] text-gray-400">BMI</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm font-bold text-[#27ae60] mb-1">Healthy Range</p>
          <p className="text-[10px] text-gray-400 max-w-[120px] mx-auto">Your BMI is in the healthy range.</p>
        </div>

        <button className="mt-8 border border-[#f2c94c] text-[#f2c94c] w-full py-2.5 rounded-lg text-xs font-bold hover:bg-[#f2c94c] hover:text-black transition">
          Calculate Again
        </button>
      </div>
    </section>
  );
}
