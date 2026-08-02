import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import { IoMdCart } from "react-icons/io";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/api.js";

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
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogged(true);
    }
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/products`);
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
      : products.filter((p) => p.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="bg-[#050505] min-h-screen">

      <div className = "fixed w-full z-40"><Header /></div>
    
      <div className="flex flex-col h-[200px] justify-center items-center pt-[100px]">
        <h1 className="font-['Roboto'] font-bold text-4xl tracking-wide text-white mb-2 leading-tight"> Premium <span className="text-yellow-500">Supplements</span> </h1>
        <p className="text-gray-400 text-center max-w-xl"> Enhance your fitness journey with premium supplements that support performance, strength, and faster recovery. </p>
      </div>

      <div className="flex h-[80px] justify-center items-center gap-3 overflow-x-auto px-4 bg-[#050505] shadow-2xl">
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

      {/* <div className="grid grid-cols-3 bg-black mx-[100px] gap-2 mt-5"> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 lg:px-20 py-10 bg-black">
        {filteredProducts.map((product) => (
          <div
            key={product.product_id}
            className="
w-full
max-w-sm
mx-auto
rounded-2xl
overflow-hidden
border
border-zinc-800
bg-zinc-900
shadow-lg
hover:shadow-yellow-500/20
hover:-translate-y-2
transition-all
duration-300
flex
flex-col
h-[480px]
"
          >
            {/* Image Area */}
            <div className="relative h-60 bg-gradient-to-br from-zinc-900 to-zinc-800 flex items-center justify-center">
              {" "}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,_#D4AF3725,_transparent_70%)]" />
              <span className="absolute top-3 left-3 bg-[#D4AF37] text-yellow-950 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded">
                {product.category}
              </span>
              <img
                src={product.image_url || "/s1.png"}
                alt={product.product_name}
                className="h-40 object-contain transition-transform duration-300 hover:scale-110 z-10"
              />
            </div>

            {/* Card Body */}
            <div className="p-5 flex flex-col flex-grow">
              <h2 className="font-['Bebas_Neue'] text-2xl tracking-wide text-zinc-900 dark:text-white mb-2 leading-tight">
                {product.product_name}
              </h2>
              <p
                className="
text-sm
text-zinc-400
leading-6
line-clamp-3
h-[72px]
overflow-hidden
mb-5
"
              >
                {" "}
                {product.description}
              </p>
              <hr className="border-zinc-200 dark:border-zinc-700 mb-4" />

              {/* Footer */}
              <div className="flex items-center justify-between gap-3 mt-auto">
                {/* <div>
                  <p className="text-[11px] text-zinc-400 uppercase tracking-widest mb-0.5">
                    Price
                  </p>
                  <p className="text-xl font-medium text-zinc-900 dark:text-white">
                    Rs. {Number(product.price).toLocaleString()}
                  </p>
                </div> */}
                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-500">
                    Price
                  </p>

                  <p className="text-2xl font-bold text-[#D4AF37]">
                    Rs. {Number(product.price).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (logged) {
                      navigate(`/product/${product.product_id}`);
                    } else {
                      navigate("/signin");
                    }
                  }}
                  className="
cursor-pointer
flex
items-center
gap-2
bg-[#D4AF37]
text-black
font-semibold
px-5
py-3
rounded-xl
hover:bg-yellow-400
hover:scale-105
active:scale-95
transition-all
duration-300
shadow-lg
"
                >
                  <IoMdCart /> Buy Now
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
