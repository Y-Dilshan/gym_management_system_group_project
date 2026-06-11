import { useState } from "react";

export default function BMI() {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState("Male");
  const [activity, setActivity] = useState("Moderate");
  const [bmi, setBmi] = useState(24.2);

  const calculateBMI = () => {
    const bmiValue = (
      weight /
      ((height / 100) * (height / 100))
    ).toFixed(1);

    setBmi(bmiValue);
  };

  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-[#222222] border border-[#3a3a3a] rounded-2xl p-8">

        {/* Header */}
        <div className="text-center">
          <span className="bg-[#D4AF37] text-black px-4 py-1 rounded-full text-xs font-semibold">
            FREE TOOL
          </span>

          <h1 className="text-4xl font-bold text-white mt-4">
            BMI Calculator
          </h1>

          <p className="text-gray-400 mt-3">
            Check your body mass index and get a personalized fitness insight.
          </p>
        </div>

        {/* Unit Selection */}
        <div className="grid grid-cols-2 gap-2 mt-8 border border-[#444] rounded-xl p-1">
          <button className="bg-[#2e2e2e] text-white py-3 rounded-lg font-medium">
            Metric (kg / cm)
          </button>

          <button className="text-gray-300 py-3 rounded-lg font-medium hover:bg-[#2e2e2e]">
            Imperial (lbs / ft)
          </button>
        </div>

        {/* Inputs */}
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              WEIGHT (KG)
            </label>

            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-[#2c2c2c] border border-[#444] rounded-lg p-4 text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">
              HEIGHT (CM)
            </label>

            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full bg-[#2c2c2c] border border-[#444] rounded-lg p-4 text-white outline-none"
            />
          </div>
        </div>

        {/* Age */}
        <div className="mt-6">
          <div className="flex justify-between text-gray-400 text-sm mb-3">
            <span>AGE</span>
            <span>{age} YRS</span>
          </div>

          <input
            type="range"
            min="10"
            max="80"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Gender & Activity */}
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              GENDER
            </label>

            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full bg-[#2c2c2c] border border-[#444] rounded-lg p-4 text-white"
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">
              ACTIVITY LEVEL
            </label>

            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full bg-[#2c2c2c] border border-[#444] rounded-lg p-4 text-white"
            >
              <option>Low</option>
              <option>Moderate</option>
              <option>High</option>
            </select>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={calculateBMI}
          className="w-full mt-8 bg-[#2c2c2c] border border-[#444] hover:bg-[#D4AF37] hover:text-black text-white py-4 rounded-xl font-semibold transition"
        >
          Calculate BMI →
        </button>

        {/* Result Card */}
        <div className="mt-8 bg-[#1b1b1b] rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <h2 className="text-6xl font-bold text-white">{bmi}</h2>

            <span className="bg-green-200 text-green-900 px-4 py-1 rounded-full text-sm font-medium">
              Normal
            </span>
          </div>

          {/* BMI Scale */}
          <div className="mt-6">
            <div className="h-2 rounded-full bg-gradient-to-r from-blue-500 via-green-400 via-yellow-400 to-red-500"></div>

            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>Underweight</span>
              <span>Normal</span>
              <span>Overweight</span>
              <span>Obese</span>
            </div>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="border border-[#444] rounded-xl p-4 text-center">
              <h3 className="text-white text-xl font-bold">
                53-72 kg
              </h3>
              <p className="text-gray-400 text-sm">
                Ideal weight
              </p>
            </div>

            <div className="border border-[#444] rounded-xl p-4 text-center">
              <h3 className="text-white text-xl font-bold">
                Normal
              </h3>
              <p className="text-gray-400 text-sm">
                Category
              </p>
            </div>

            <div className="border border-[#444] rounded-xl p-4 text-center">
              <h3 className="text-white text-xl font-bold">
                Low
              </h3>
              <p className="text-gray-400 text-sm">
                Health Risk
              </p>
            </div>
          </div>

          <div className="border-t border-[#333] mt-6 pt-6">
            <p className="text-gray-300">
              Great work! You're in the healthy range.
              Focus on maintaining this with consistent
              training and balanced nutrition.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}