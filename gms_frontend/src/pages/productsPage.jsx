import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import { IoMdCart } from "react-icons/io";
import { useState } from "react"; 

const products = [
  {
    id: 1,
    category: "protein",
    badge: "Isolate",
    name: "Premium Whey Protein Isolated",
    description: "Forge Athletics fast-absorbing isolate — low fat, low carb, designed for maximum post-workout muscle recovery. Chocolate Silk, 5 lb.",
    price: "Rs. 35,000.00",
    image: "s1.png",
  },
  {
    id: 2,
    category: "pre-workout",
    badge: "Pre-Workout",
    name: "explosive Pre-Workout Formula",
    description: "High-stimulant formula with beta-alanine and caffeine for explosive energy, focus, and endurance during intense training sessions.",
    price: "Rs. 12,000.00",
    image: "s1.png",
  },
  {
    id: 3,
    category: "health",
    badge: "Health",
    name: "Daily Multivitamin Complex",
    description: "Complete daily multivitamin with essential minerals and antioxidants to support overall health, immunity, and well-being.",
    price: "Rs. 8,500.00",
    image: "s1.png",
  },
  {
    id: 4,
    category: "performance",
    badge: "Performance",
    name: "Creatine Monohydrate",
    description: "Pure micronized creatine monohydrate for increased strength, power output, and enhanced athletic performance.",
    price: "Rs. 9,000.00",
    image: "s1.png",
  },
  {
    id: 5,
    category: "recovery",
    badge: "Recovery",
    name: "BCAA Recovery Blend",
    description: "Essential branched-chain amino acids to reduce muscle soreness, accelerate recovery, and preserve lean muscle mass.",
    price: "Rs. 11,000.00",
    image: "s1.png",
  },
  {
    id: 6,
    category: "protein",
    badge: "Mass Gainer",
    name: "Mass Gainer 5000",
    description: "High-calorie mass gainer with complex carbs and protein blend to support serious muscle and weight gain goals.",
    price: "Rs. 28,000.00",
    image: "s1.png",
  },
];

const categories = [
  { label: "All", value: "all" },
  { label: "Pre-Workout", value: "pre-workout" },
  { label: "Health", value: "health" },
  { label: "Performance", value: "performance" },
  { label: "Recovery", value: "recovery" },
  { label: "Protein", value: "protein" },
];

export default function ProductPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-[#333333]">
      <div>
        <Header />
      </div>

      <div className="flex flex-col h-[100px] justify-center items-center">
        <h1 className="font-['Roboto'] font-bold text-3xl tracking-wide text-zinc-900 dark:text-white mb-2 leading-tight">
          Premium <span className="text-yellow-500">Supplements</span>
        </h1>
        <p className="text-white text-center">
          Enhance your fitness journey with premium supplements that support
          performance, strength, and faster recovery.
        </p>
      </div>

      <div className="flex h-[80px] justify-center items-center gap-3 overflow-x-auto px-4 bg-[#262626]">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)} 
            className={`rounded-xl px-5 py-2 text-sm font-semibold transition-colors whitespace-nowrap
              ${
                activeCategory === cat.value
                  ? "bg-[#d4af37] text-black"          
                  : "bg-white text-black hover:bg-gray-100" 
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 border border-gray-300 bg-[#E7DBB8] mx-[100px] gap-2">
        {filteredProducts.map((product) => (
          <div
            key={product.id} 
            className="max-w-sm mx-auto my-4 rounded-2xl overflow-hidden border border-white/10 bg-white dark:bg-zinc-900 shadow-md font-sans"
          >
            {/* Image Area */}
            <div className="relative bg-zinc-900 flex items-center justify-center h-56">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,_#D4AF3725,_transparent_70%)]" />
              <span className="absolute top-3 left-3 bg-[#D4AF37] text-yellow-950 text-[10px] font-medium tracking-widest uppercase px-3 py-1 rounded">
                {product.badge} 
              </span>
              <img
                src={product.image}
                alt={product.name}
                className="h-40 object-contain relative z-10"
              />
            </div>

            {/* Card Body */}
            <div className="p-5">
              <h2 className="font-['Bebas_Neue'] text-2xl tracking-wide text-zinc-900 dark:text-white mb-2 leading-tight">
                {product.name} 
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                {product.description} 
              </p>
              <hr className="border-zinc-200 dark:border-zinc-700 mb-4" />

              {/* Footer */}
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] text-zinc-400 uppercase tracking-widest mb-0.5">
                    Price
                  </p>
                  <p className="text-xl font-medium text-zinc-900 dark:text-white">
                    {product.price} 
                  </p>
                </div>
                <button className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#b8962d] active:scale-95 text-yellow-950 text-sm font-medium px-5 py-2.5 rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer">
                  <IoMdCart /> Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}