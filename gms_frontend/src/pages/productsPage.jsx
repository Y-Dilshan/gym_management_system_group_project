import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import { IoMdCart } from "react-icons/io";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { label: "All", value: "all" },
  { label: "Pre-Workout", value: "pre-workout" },
  { label: "Health", value: "health" },
  { label: "Performance", value: "performance" },
  { label: "Recovery", value: "recovery" },
  { label: "Protein", value: "protein" },
];

export default function ProductPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState([]);

  const API = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await fetch(`${API}/products`);
      const data = await res.json();

      setProducts(data.products || []);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-[#050505]">
    <Header />

      <div className="flex flex-col h-[100px] justify-center items-center">
        <h1 className="font-['Roboto'] font-bold text-3xl tracking-wide text-zinc-900 dark:text-white mb-2 leading-tight"> Premium <span className="text-yellow-500">Supplements</span> </h1>
        <p className="text-white text-center"> Enhance your fitness journey with premium supplements that support performance, strength, and faster recovery. </p>
      </div>

      <div className="flex h-[80px] justify-center items-center gap-3 overflow-x-auto px-4 bg-[#050505] shadow-2xl ">
        {categories.map((cat) => (
          <button key={cat.value}  onClick={() => setActiveCategory(cat.value)}
            className={`rounded-xl px-5 py-2 text-sm font-semibold transition-colors whitespace-nowrap
              ${
                activeCategory === cat.value
                  ? "bg-[#d4af37] text-black"
                  : "bg-white text-black hover:bg-gray-100"
              }`}>
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 bg-black mx-[100px] gap-2 mt-5">
        {filteredProducts.map((product) => (
          <div
            // key={product.id}
            key={product.product_id}
            className="max-w-sm mx-auto my-4 rounded-2xl overflow-hidden border border-white/10 bg-white dark:bg-zinc-900 shadow-md font-sans">
            {/* Image Area */}
            <div className="relative bg-zinc-900 flex items-center justify-center h-56">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,_#D4AF3725,_transparent_70%)]" />
              <span className="absolute top-3 left-3 bg-[#D4AF37] text-yellow-950 text-[10px] font-medium tracking-widest uppercase px-3 py-1 rounded">
                {/* {product.badge} */}
                {product.category}
              </span>

              <img
                src={product.image_url || "/s1.png"}
                alt={product.product_name}
                className="h-40 object-contain relative z-10"
              />

            </div>

            {/* Card Body */}
            <div className="p-5">
              <h2 className="font-['Bebas_Neue'] text-2xl tracking-wide text-zinc-900 dark:text-white mb-2 leading-tight">{product.product_name}</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">{product.description}</p>
              <hr className="border-zinc-200 dark:border-zinc-700 mb-4" />

              {/* Footer */}
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] text-zinc-400 uppercase tracking-widest mb-0.5">Price</p>
                  <p className="text-xl font-medium text-zinc-900 dark:text-white">Rs. {Number(product.price).toLocaleString()}</p>
                </div>
                <button
                  onClick={() => navigate(`/product/${product.product_id}`)}
                  className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#b8962d] active:scale-95 text-yellow-950 text-sm font-medium px-5 py-2.5 rounded-lg"
                >
                  <IoMdCart/> Buy Now
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
