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
  const [logged, setLogged] = useState(false)

  const API = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogged(true);
    }
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

  const handleAddToCart = (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please sign in to add items to cart");
      navigate("/signin");
      return;
    }

    const cartStr = localStorage.getItem("cart") || "[]";
    let cart = [];
    try {
      cart = JSON.parse(cartStr);
    } catch (e) {
      cart = [];
    }

    const existing = cart.find(item => item.product_id === product.product_id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: product.product_id,
        product_id: product.product_id,
        name: product.product_name,
        price: Number(product.price),
        image_url: product.image_url,
        qty: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));
    toast.success(`${product.product_name} added to cart!`);
  };

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-[#050505] min-h-screen">

      <div className = "fixed w-full z-40"><Header /></div>
    
      <div className="flex flex-col h-[200px] justify-center items-center pt-[100px]">
        <h1 className="font-['Roboto'] font-bold text-4xl tracking-wide text-white mb-2 leading-tight"> Premium <span className="text-yellow-500">Supplements</span> </h1>
        <p className="text-gray-400 text-center max-w-xl"> Enhance your fitness journey with premium supplements that support performance, strength, and faster recovery. </p>
      </div>

      <div className="flex h-[80px] justify-center items-center gap-3 overflow-x-auto px-4 bg-[#050505] shadow-2xl">
        {categories.map((cat) => (
          <button key={cat.value}  onClick={() => setActiveCategory(cat.value)}
            className={`rounded-xl px-5 py-2 text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer
              ${
                activeCategory === cat.value
                   ? "bg-[#d4af37] text-black"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}>
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-black px-[100px] gap-8 py-10">
        {filteredProducts.map((product) => (
          <div
            key={product.product_id}
            className="rounded-2xl overflow-hidden border border-white/10 bg-[#111] hover:border-yellow-500/20 transition-all duration-300 shadow-lg flex flex-col justify-between">
            {/* Image Area */}
            <div className="relative bg-zinc-900 flex items-center justify-center h-56 border-b border-white/5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,_#D4AF3725,_transparent_70%)]" />
              <span className="absolute top-3 left-3 bg-[#D4AF37] text-yellow-950 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded">
                {product.category}
              </span>

              <img src={product.image_url || "/s1.png"} alt={product.product_name} className="h-40 object-contain relative z-10"/>
            </div>

            {/* Card Body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold tracking-wide text-white mb-2 leading-tight">{product.product_name}</h2>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4 line-clamp-3">{product.description}</p>
              </div>
              
              <div>
                <hr className="border-zinc-800 mb-4" />

                {/* Footer */}
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest mb-0.5">Price</p>
                    <p className="text-lg font-bold text-yellow-400">Rs. {Number(product.price).toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => navigate(`/product/${product.product_id}`)} 
                      className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold px-3 py-2 rounded-lg cursor-pointer"
                    >
                      Details
                    </button>
                    <button 
                      onClick={() => handleAddToCart(product)} 
                      className="flex items-center gap-1 bg-[#D4AF37] hover:bg-[#b8962d] text-black text-xs font-bold px-3 py-2 rounded-lg cursor-pointer"
                    > 
                      <IoMdCart/> + Cart 
                    </button>
                  </div>
                </div>
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
