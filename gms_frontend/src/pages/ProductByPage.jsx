import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import { toast } from "react-hot-toast";

export default function ProductByPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    loadproduct();
  }, [id]);

  const loadproduct = async () => {
    try {
      const res = await fetch(`${API}/products/${id}`);
      const data = await res.json();
      if (res.ok) {
        setProduct(data.product);
      } else {
        toast.error(data.message || "Failed to load product");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
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
      existing.qty += parseInt(quantity);
    } else {
      cart.push({
        id: product.product_id,
        product_id: product.product_id,
        name: product.product_name,
        price: Number(product.price),
        image_url: product.image_url,
        qty: parseInt(quantity)
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));
    toast.success(`${product.product_name} added to cart!`);
  };

  const handleBuy = async () => {
    if (!address.trim()) {
      toast.error("Please enter delivery address");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please sign in to place an order");
      navigate("/signin");
      return;
    }

    try {
      const res = await fetch(`${API}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: product.product_id,
          quantity: parseInt(quantity),
          delivery_address: address,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Order placed successfully!");
        setAddress("");
        setQuantity(1);
        loadproduct();
      } else {
        toast.error(data.message || "Failed to place order");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white text-lg">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-zinc-950 text-white">
        <Header />
        <div className="flex-1 flex items-center justify-center text-lg">
          Product not found
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <Header />
      
      <div className="flex-1 max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12 w-full">
        {/* Image */}
        <div className="bg-zinc-900 rounded-2xl p-8 flex items-center justify-center h-fit border border-zinc-800">
          <img
            src={product.image_url || "/s1.png"}
            alt={product.product_name}
            className="max-w-full max-h-[400px] object-contain rounded-xl"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="inline-block w-fit bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full">
              {product.category}
            </span>

            <h1 className="text-4xl font-bold mt-4 leading-tight text-white">
              {product.product_name}
            </h1>

            <p className="text-zinc-400 mt-4 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-6 border-t border-zinc-800 pt-6">
              <h2 className="text-3xl font-bold text-[#D4AF37]">
                Rs. {Number(product.price).toLocaleString()}
              </h2>
              <p className="text-sm text-zinc-500 mt-1">
                Stock available:{" "}
                <span className="text-zinc-300 font-medium">
                  {product.stock_quantity}
                </span>
              </p>
            </div>

            {/* Quantity + Address input form */}
            <div className="mt-6 bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-5">
              <div>
                <label className="block mb-2 text-sm font-medium text-zinc-300">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  max={product.stock_quantity}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="text-white bg-zinc-800 p-2.5 rounded-lg w-32 border border-zinc-700 outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-zinc-300">
                  Delivery Address
                </label>
                <textarea
                  placeholder="Enter delivery address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              disabled={product.stock_quantity <= 0}
              className={`px-8 py-4 rounded-lg font-bold text-[#D4AF37] border border-[#D4AF37] tracking-wide text-lg transition duration-300 w-full md:w-auto hover:bg-[#D4AF37] hover:text-black cursor-pointer ${
                product.stock_quantity <= 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuy}
              disabled={product.stock_quantity <= 0}
              className={`px-8 py-4 rounded-lg font-bold text-black tracking-wide text-lg transition duration-300 w-full md:w-auto ${
                product.stock_quantity <= 0 
                  ? "bg-zinc-700 text-zinc-400 cursor-not-allowed" 
                  : "bg-[#D4AF37] hover:bg-[#b59228] cursor-pointer"
              }`}
            >
              {product.stock_quantity <= 0 ? "Out of Stock" : "Buy Now"}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}