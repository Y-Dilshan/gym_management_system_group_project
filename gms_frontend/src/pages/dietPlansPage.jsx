import { useState } from "react";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

const dietTemplates = {
  loss: {
    title: "Weight Loss / Fat Burn Diet",
    calories: "~1,500 - 1,800 kcal",
    meals: [
      { type: "Breakfast", food: "3 Scrambled egg whites with spinach & tomatoes, 1 slice of whole wheat toast, black coffee or green tea." },
      { type: "Mid-Day Snack", food: "1 Apple with 1 tablespoon of almond butter, or 150g greek yogurt." },
      { type: "Lunch", food: "150g Grilled chicken breast, 1 cup of steamed broccoli, 1/2 cup of quinoa." },
      { type: "Post-Workout", food: "1 Scoop whey protein isolate mixed with water, 1 banana." },
      { type: "Dinner", food: "150g Baked salmon fillet, large mixed green salad with lemon vinaigrette dressing." }
    ]
  },
  maintenance: {
    title: "Healthy Maintenance / Conditioning Diet",
    calories: "~2,000 - 2,300 kcal",
    meals: [
      { type: "Breakfast", food: "3 Whole eggs, 1/2 cup of oatmeal with fresh blueberries and honey, green tea." },
      { type: "Mid-Day Snack", food: "A handful of mixed nuts (walnuts, almonds) and a pear." },
      { type: "Lunch", food: "150g Lean beef stir-fry with mixed bell peppers, carrots, served over 1 cup of brown rice." },
      { type: "Post-Workout", food: "1 Scoop whey protein, 1 cup of oats blended with almond milk." },
      { type: "Dinner", food: "150g Grilled tuna steak, baked sweet potato, asparagus spears." }
    ]
  },
  gain: {
    title: "Bulking & Muscle Mass Gain Diet",
    calories: "~2,800 - 3,200 kcal",
    meals: [
      { type: "Breakfast", food: "4 Eggs (3 whole, 1 white), 2 slices of whole grain toast, 1 bowl of oatmeal with peanut butter and banana." },
      { type: "Mid-Day Snack", food: "Cottage cheese (200g) with pineapple chunks and honey." },
      { type: "Lunch", food: "200g Grilled chicken thighs, 1.5 cups of white rice, grilled zucchini." },
      { type: "Post-Workout", food: "1.5 Scoops whey protein, 1 banana, 2 tablespoons of peanut butter blended with oat milk." },
      { type: "Dinner", food: "200g Sirloin steak, mashed sweet potatoes with butter, roasted green beans." }
    ]
  }
};

export default function DietPlansPage() {
  // Calculator State
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [activity, setActivity] = useState("1.2"); // default sedentary multiplier
  const [tdee, setTdee] = useState(null);
  const [recommendedPlan, setRecommendedPlan] = useState("maintenance");

  const calculateCalories = (e) => {
    e.preventDefault();
    if (!weight || !height || !age) {
      alert("Please fill in weight, height, and age");
      return;
    }

    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age);

    // Mifflin-St Jeor Equation
    let bmr = 0;
    if (gender === "male") {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    const calculatedTdee = Math.round(bmr * parseFloat(activity));
    setTdee(calculatedTdee);

    // Automatically recommend plan based on calculator defaults
    if (activity >= 1.725) {
      setRecommendedPlan("gain");
    } else if (activity <= 1.2) {
      setRecommendedPlan("loss");
    } else {
      setRecommendedPlan("maintenance");
    }
  };

  const selectedPlanDetails = dietTemplates[recommendedPlan];

  return (
    <div className="bg-[#050505] min-h-screen text-white flex flex-col">
      <div className="fixed w-full z-40"><Header /></div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-[120px] grid lg:grid-cols-3 gap-8">
        
        {/* Left Col: Interactive Calculator */}
        <div className="lg:col-span-1">
          <div className="bg-[#111] border border-zinc-800 rounded-3xl p-6 space-y-6 shadow-xl sticky top-[120px]">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Calorie Calculator</h2>
              <p className="text-xs text-zinc-400">Estimate your total daily calorie target using weight metrics</p>
            </div>

            <form onSubmit={calculateCalories} className="space-y-4">
              {/* Gender */}
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5 uppercase font-bold tracking-wider">Gender</label>
                <div className="flex gap-3">
                  {["male", "female"].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className={`flex-1 py-2.5 rounded-xl border font-bold capitalize transition text-sm cursor-pointer ${
                        gender === g
                          ? "border-[#D4AF37] bg-yellow-500/5 text-white"
                          : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight */}
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5 uppercase font-bold tracking-wider">Weight (kg)</label>
                <input
                  type="number"
                  placeholder="e.g. 70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-[#D4AF37]"
                  required
                />
              </div>

              {/* Height */}
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5 uppercase font-bold tracking-wider">Height (cm)</label>
                <input
                  type="number"
                  placeholder="e.g. 175"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-[#D4AF37]"
                  required
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5 uppercase font-bold tracking-wider">Age (Years)</label>
                <input
                  type="number"
                  placeholder="e.g. 25"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-[#D4AF37]"
                  required
                />
              </div>

              {/* Activity Level */}
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5 uppercase font-bold tracking-wider">Activity Level</label>
                <select
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-[#D4AF37] cursor-pointer text-sm font-semibold"
                >
                  <option value="1.2">Sedentary (Little or no exercise)</option>
                  <option value="1.375">Lightly Active (Exercise 1-3 days/wk)</option>
                  <option value="1.55">Moderately Active (Exercise 3-5 days/wk)</option>
                  <option value="1.725">Very Active (Heavy training 6-7 days/wk)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#D4AF37] hover:bg-[#b8962d] text-black font-bold py-3.5 rounded-xl transition uppercase tracking-wider text-xs cursor-pointer shadow-lg shadow-yellow-500/5"
              >
                Calculate Daily Energy
              </button>
            </form>

            {/* Result Indicator */}
            {tdee && (
              <div className="p-4 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 space-y-2">
                <p className="text-xs text-zinc-400">Your Estimated TDEE:</p>
                <h3 className="text-3xl font-extrabold text-[#D4AF37]">{tdee} kcal/day</h3>
                <p className="text-[10px] text-zinc-500">This value indicates your daily maintenance calorie target. Select goals below to choose templates.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Plans List & Templates */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Header Description */}
          <div className="bg-[#111] border border-zinc-800 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl"></div>
            <h1 className="text-4xl font-extrabold tracking-wide mb-3">
              Diet <span className="text-[#D4AF37]">Plans</span>
            </h1>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
              Optimize fat loss, maintain weight, or build lean muscle block by block. Choose a specific diet template to see custom meals.
            </p>

            {/* Goal selection buttons */}
            <div className="flex gap-2 mt-6">
              {[
                ["loss", "Fat Burn"],
                ["maintenance", "Maintenance"],
                ["gain", "Muscle Gain"]
              ].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setRecommendedPlan(key)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    recommendedPlan === key
                      ? "bg-[#D4AF37] text-black"
                      : "bg-zinc-900 text-zinc-400 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Plan Meals Table */}
          {selectedPlanDetails && (
            <div className="bg-[#111] border border-zinc-800 rounded-3xl p-8 space-y-6">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#D4AF37]">{selectedPlanDetails.title}</h2>
                  <p className="text-xs text-zinc-400 mt-1">Recommended daily energy intake: {selectedPlanDetails.calories}</p>
                </div>
              </div>

              {/* Meal Cards */}
              <div className="space-y-4">
                {selectedPlanDetails.meals.map((meal, index) => (
                  <div key={index} className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5 flex flex-col sm:flex-row gap-4 items-start">
                    <span className="bg-[#D4AF37] text-black font-extrabold text-xs uppercase px-3 py-1 rounded-full shrink-0 tracking-wider">
                      {meal.type}
                    </span>
                    <p className="text-zinc-300 text-sm leading-relaxed font-semibold">
                      {meal.food}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      <Footer />
    </div>
  );
}
