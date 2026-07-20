import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaTrash, FaPlus, FaMinus, FaShoppingBag } from "react-icons/fa";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

export default function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLogged(false);
      navigate("/signin");
      return;
    }
    setLogged(true);

    const cartStr = localStorage.getItem("cart") || "[]";
    try {
      setCartItems(JSON.parse(cartStr));
    } catch (e) {
      setCartItems([]);
    }
  }, []);

  const updateQuantity = (productId, newQty) => {
    if (newQty < 1) return;
    const updated = cartItems.map(item => {
      if (item.product_id === productId) {
        return { ...item, qty: newQty };
      }
      return item;
    });
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cart-updated"));
  };

  const removeItem = (productId) => {
    const filtered = cartItems.filter(item => item.product_id !== productId);
    setCartItems(filtered);
    localStorage.setItem("cart", JSON.stringify(filtered));
    window.dispatchEvent(new Event("cart-updated"));
    toast.success("Item removed from cart");
  };

  const getSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + (Number(item.price) * item.qty), 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    navigate("/checkout");
  };

  const subtotal = getSubtotal();
  const shipping = subtotal > 15000 ? 0 : 500;
  const total = subtotal + shipping;

  return (
    <div className="bg-[#050505] min-h-screen text-white flex flex-col">
      <div className="fixed w-full z-40"><Header /></div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-[120px]">
        <h1 className="text-4xl font-bold text-white tracking-wide mb-8">
          Shopping <span className="text-[#D4AF37]">Cart</span>
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-[#111] rounded-3xl p-12 text-center border border-zinc-800 flex flex-col items-center justify-center min-h-[400px]">
            <FaShoppingBag className="text-6xl text-[#D4AF37] mb-4 opacity-50" />
            <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
            <p className="text-gray-400 mb-6 max-w-md">Looks like you haven't added any gym supplements to your cart yet. Let's find some fuels for your body!</p>
            <button
              onClick={() => navigate("/products")}
              className="bg-[#D4AF37] text-black font-bold px-8 py-3 rounded-xl hover:bg-[#b8962d] transition cursor-pointer"
            >
              Shop Supplements
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.product_id}
                  className="bg-[#111] border border-zinc-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-yellow-500/10 transition"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={item.image_url || "/s1.png"}
                      alt={item.name}
                      className="w-20 h-20 object-contain rounded-xl bg-zinc-900 p-2 border border-zinc-800 shrink-0"
                    />
                    <div>
                      <h3 className="font-bold text-lg text-white leading-tight">{item.name}</h3>
                      <p className="text-[#D4AF37] font-semibold mt-1">Rs. {Number(item.price).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 justify-between w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0 border-zinc-800">
                    {/* Quantity Control */}
                    <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5">
                      <button
                        onClick={() => updateQuantity(item.product_id, item.qty - 1)}
                        className="text-gray-400 hover:text-white transition cursor-pointer p-1"
                      >
                        <FaMinus size={12} />
                      </button>
                      <span className="w-8 text-center font-bold text-sm">{item.qty}</span>
                      <button
                        onClick={() => updateQuantity(item.product_id, item.qty + 1)}
                        className="text-gray-400 hover:text-white transition cursor-pointer p-1"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>

                    {/* Subtotal & Delete */}
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-xs text-zinc-500">Subtotal</p>
                        <p className="font-bold text-white text-base">Rs. {(item.price * item.qty).toLocaleString()}</p>
                      </div>

                      <button
                        onClick={() => removeItem(item.product_id)}
                        className="text-red-500 hover:text-red-400 transition cursor-pointer p-2 rounded-lg bg-red-500/5 hover:bg-red-500/10 border border-red-500/10"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="h-fit">
              <div className="bg-[#111] border border-zinc-800 rounded-2xl p-6 space-y-6 shadow-xl">
                <h2 className="text-xl font-bold border-b border-zinc-800 pb-4">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-zinc-400">
                    <span>Subtotal</span>
                    <span className="text-white font-semibold">Rs. {subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-sm text-zinc-400">
                    <span>Shipping fee</span>
                    <span className={shipping === 0 ? "text-green-400 font-bold" : "text-white font-semibold"}>
                      {shipping === 0 ? "FREE" : `Rs. ${shipping}`}
                    </span>
                  </div>

                  {shipping > 0 && (
                    <p className="text-[10px] text-zinc-500 italic mt-1">Free delivery for orders above Rs. 15,000!</p>
                  )}

                  <hr className="border-zinc-800" />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-[#D4AF37]">Rs. {total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#D4AF37] hover:bg-[#b8962d] text-black font-bold py-4 rounded-xl transition uppercase tracking-wider text-sm cursor-pointer shadow-lg shadow-yellow-500/5"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
