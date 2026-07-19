import { useState } from "react";

const ZONES = [
  { label: "Underweight", range: "< 18.5", color: "#3b82f6", bg: "#eff6ff", text: "#1e3a8a" },
  { label: "Normal",      range: "18.5 – 24.9", color: "#10b981", bg: "#ecfdf5", text: "#064e3b" },
  { label: "Overweight",  range: "25 – 29.9", color: "#f59e0b", bg: "#fffbeb", text: "#451a03" },
  { label: "Obese",       range: "≥ 30", color: "#ef4444", bg: "#fef2f2", text: "#450a0a" },
];

function getZone(bmi) {
  if (bmi < 18.5) return 0;
  if (bmi < 25)   return 1;
  if (bmi < 30)   return 2;
  return 3;
}

function getTip(zoneIdx, goal) {
  const tips = [
    "Consider increasing caloric intake with nutrient-rich foods. Our nutrition coaching can help you reach a healthy weight.",
    `Great work! You're in the ideal range. Focus on maintaining this with consistent training. Our ${goal.toLowerCase()} programs will keep you progressing.`,
    "Targeted cardio and strength training can help. Our coaches will design a plan tailored specifically to you.",
    "Your health is the priority. A structured fitness program combined with dietary changes can make a real difference. Speak to a Power Zone trainer today.",
  ];
  return tips[zoneIdx];
}

function getIdealRange(heightCm, unit) {
  const hM = heightCm / 100;
  const low = Math.round(18.5 * hM * hM);
  const high = Math.round(24.9 * hM * hM);
  if (unit === "imperial") {
    return `${Math.round(low * 2.205)}–${Math.round(high * 2.205)} lbs`;
  }
  return `${low}–${high} kg`;
}

export default function BMI() {
  const [unit, setUnit] = useState("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState("Male");
  const [activity, setActivity] = useState("Moderate");
  const [result, setResult] = useState(null);

  const GOLD = "#c9a227";

  function calculate() {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!w || !h || w <= 0 || h <= 0) return;
    const wKg = unit === "metric" ? w : w * 0.453592;
    const hM  = unit === "metric" ? h / 100 : h * 0.3048;
    const bmi = wKg / (hM * hM);
    const bmiR = Math.round(bmi * 10) / 10;
    const zoneIdx = getZone(bmiR);
    const heightCm = unit === "metric" ? h : h * 30.48;
    setResult({
      bmi: bmiR,
      zoneIdx,
      ideal: getIdealRange(heightCm, unit),
      tip: getTip(zoneIdx, activity),
    });
  }

  const barPercent = result
    ? Math.min(100, Math.max(0, ((result.bmi - 16) / (40 - 16)) * 100))
    : 0;

  const zone = result ? ZONES[result.zoneIdx] : null;

  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-3" style={{ background: GOLD, color: "#1a1200" }}> Free Tool </span>
          <h2 className="text-3xl font-bold text-white mb-2">BMI Calculator</h2>
          <p className="text-gray-400 text-sm"> Check your body mass index and get a personalized fitness insight. </p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6">
          {/* Unit toggle */}
          <div className="flex bg-zinc-800 rounded-xl p-1 mb-6">
            {["metric", "imperial"].map((u) => (
              <button key={u} onClick={() => { setUnit(u); setResult(null); setWeight(""); setHeight(""); }} className="flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-150"
                style={
                  unit === u
                    ? { background: GOLD, color: "#1a1200" }
                    : { color: "#9ca3af" }
                }>
                {u === "metric" ? "Metric  (kg / cm)" : "Imperial  (lbs / ft)"} </button>
            ))}
          </div>

          {/* Weight + Height */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[
              { id: "weight", label: unit === "metric" ? "Weight (kg)" : "Weight (lbs)", val: weight, set: setWeight, ph: unit === "metric" ? "70" : "154" },
              { id: "height", label: unit === "metric" ? "Height (cm)" : "Height (ft)",  val: height, set: setHeight, ph: unit === "metric" ? "170" : "5.7" },
            ].map(({ id, label, val, set, ph }) => (
              <div key={id}>
                <label className="block text-xs text-gray-400 font-medium uppercase tracking-wider mb-1.5"> {label} </label>
                <input type="number" value={val} onChange={(e) => { set(e.target.value); setResult(null); }} placeholder={ph} min="1" className="w-full h-11 bg-zinc-800 border border-zinc-600 rounded-lg px-3 text-white text-base font-medium outline-none focus:border-yellow-500 transition-colors" style={{ "--tw-ring-color": GOLD }}/>
              </div>
            ))}
          </div>

          {/* Age slider */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs text-gray-400 font-medium uppercase tracking-wider">Age</label>
              <span className="text-sm font-semibold text-white">{age} yrs</span>
            </div>
            <input type="range" min="10" max="80" step="1" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full h-1.5 rounded-full appearance-none cursor-pointer" style={{ accentColor: GOLD }}/>
          </div>

          {/* Gender + Activity */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { id: "gender", label: "Gender", val: gender, set: setGender, opts: ["Male", "Female", "Other"] },
              { id: "activity", label: "Activity Level", val: activity, set: setActivity, opts: ["Sedentary", "Light", "Moderate", "Very Active"] },
            ].map(({ id, label, val, set, opts }) => (
              <div key={id}>
                <label className="block text-xs text-gray-400 font-medium uppercase tracking-wider mb-1.5"> </label>
                <select value={val} onChange={(e) => set(e.target.value)} className="w-full h-11 bg-zinc-800 border border-zinc-600 rounded-lg px-3 text-white text-sm outline-none focus:border-yellow-500 transition-colors"> {opts.map((o) => <option key={o}>{o}</option>)} </select>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button onClick={calculate} className="w-full h-12 rounded-xl text-sm font-semibold tracking-wide transition-opacity hover:opacity-90 active:scale-[0.98] cursor-pointer" style={{ background: GOLD, color: "#1a1200" }}> Calculate BMI → </button>

          {/* Result */}
          {result && zone && (
            <div className="mt-5 bg-zinc-800 rounded-xl p-5">
              {/* Score row */}
              <div className="flex items-end gap-3 mb-4">
                <span className="text-5xl font-semibold text-white leading-none">{result.bmi}</span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full mb-1" style={{ background: zone.bg, color: zone.text }}> {zone.label} </span>
              </div>

              {/* Gradient bar */}
              <div className="relative h-2 rounded-full overflow-hidden mb-1.5"
                style={{ background: "linear-gradient(to right, #3b82f6 0%, #10b981 22%, #f59e0b 50%, #ef4444 100%)" }}>
                <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-all duration-500" style={{ left: `${barPercent}%`, transform: `translate(-50%, -50%)`, background: "#fff", borderColor: "#1a1200" }}/>
              </div>
              <div className="flex justify-between text-[10px] text-gray-500 mb-4">
                <span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: "Ideal weight", val: result.ideal },
                  { label: "Category",     val: zone.label },
                  { label: "Health risk",  val: result.zoneIdx === 0 ? "Moderate" : result.zoneIdx === 1 ? "Low" : result.zoneIdx === 2 ? "Elevated" : "High" },
                ].map(({ label, val }) => (
                  <div key={label} className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-center">
                    <p className="text-white text-sm font-semibold leading-tight">{val}</p>
                    <p className="text-gray-500 text-[11px] mt-0.5">{label}</p>
                  </div>
                ))}
              </div>

              {/* Tip */}
              <p className="text-gray-400 text-sm leading-relaxed border-t border-zinc-700 pt-4"> {result.tip} </p>

              {/* CTA link */}
              <button onClick={() => sendPrompt("What Power Zone training program should I join based on my BMI?")} className="mt-4 w-full py-2.5 rounded-lg border border-zinc-600 text-sm text-gray-300 hover:bg-zinc-700 transition-colors"> Get a training plan recommendation ↗ </button>
            </div>
          )}
        </div>

        <p className="text-center text-zinc-600 text-xs mt-4"> BMI is a screening tool, not a diagnostic measure. Consult a healthcare professional for medical advice. </p>
      </div>
    </section>
  );
}