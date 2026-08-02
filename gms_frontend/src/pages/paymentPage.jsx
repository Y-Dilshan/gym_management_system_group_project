import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import { API_BASE_URL } from "../utils/api.js";

export default function PaymentPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [method, setMethod] = useState("card");
  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [done, setDone] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    const cartStr = localStorage.getItem("cart") || "[]";
    const address = localStorage.getItem("delivery_address") || "";
    const total = localStorage.getItem("checkout_amount") || "0";

    try {
      const items = JSON.parse(cartStr);
      if (items.length === 0 || !address) {
        toast.error("Invalid checkout details");
        navigate("/products");
        return;
      }
      setCart(items);
      setDeliveryAddress(address);
      setTotalAmount(Number(total));
    } catch (e) {
      navigate("/products");
    }
  }, []);

  const setC = (k, v) => setCard((c) => ({ ...c, [k]: v }));

  const formatCard = (v) =>
    v
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const formatExpiry = (v) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length >= 3 ? d.slice(0, 2) + "/" + d.slice(2) : d;
  };

  const handlePayment = async () => {
    if (method === "card") {
      if (!card.number || !card.name || !card.expiry || !card.cvv) {
        toast.error("Please enter complete card details");
        return;
      }
    }

    setProcessing(true);
    const token = localStorage.getItem("token");

    try {
      // Map items for backend order format
      const orderItems = cart.map(item => ({
        product_id: item.product_id,
        quantity: item.qty
      }));

      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          delivery_address: deliveryAddress,
          items: orderItems
        })
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Payment successful! Order placed.");
        setConfirmedOrderId(data.order_id || `PZ-${Math.floor(Math.random() * 90000 + 10000)}`);
        
        // Clear Cart
        localStorage.removeItem("cart");
        localStorage.removeItem("delivery_address");
        localStorage.removeItem("checkout_amount");
        window.dispatchEvent(new Event("cart-updated"));

        setDone(true);
      } else {
        toast.error(data.message || "Failed to process order");
      }
    } catch (err) {
      console.error(err);
      toast.error("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  if (done) {
    return (
      <div className="bg-[#050505] min-h-screen text-white flex flex-col justify-between">
        <Header />
        <div className="max-w-[540px] mx-auto my-20 p-8 text-center bg-[#111] border border-zinc-800 rounded-3xl shadow-2xl">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold tracking-[2px] text-[#D4AF37] mb-3"> ORDER CONFIRMED! </h1>
          <p className="text-gray-400 mb-4"> Thank you for your purchase. Your supplements will help fuel your fitness goals. </p>
          <p className="text-zinc-600 text-sm mb-8 font-semibold"> Order ID: #{confirmedOrderId} </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full py-3 bg-[#D4AF37] text-black rounded-xl font-bold tracking-[2px] hover:bg-[#b8962d] transition cursor-pointer"
          >
            VIEW IN DASHBOARD
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#050505] min-h-screen text-white flex flex-col">
      <div className="fixed w-full z-40"><Header /></div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-[120px]">
        <h1 className="text-4xl font-bold tracking-wide mb-8">
          PAYMENT
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side: Payment Details */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-[#111] border border-zinc-800 rounded-2xl p-6 space-y-6">
              <h2 className="text-xl font-bold text-[#D4AF37]">Payment Method</h2>
              
              {/* Tabs */}
              <div className="flex gap-3">
                {[
                  ["card", "💳 Card"],
                  ["paypal", "🅿️ PayPal"],
                  ["wallet", "📱 Wallet"]
                ].map(([id, label]) => (
                  <button
                    key={id}
                    onClick={() => setMethod(id)}
                    className={`flex-1 py-3 border rounded-xl font-semibold transition cursor-pointer ${
                      method === id
                        ? "border-[#D4AF37] bg-yellow-500/5 text-white"
                        : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Card Form */}
              {method === "card" && (
                <div className="space-y-4">
                  {/* Card Preview */}
                  <div className="bg-gradient-to-br from-yellow-950 to-zinc-950 border border-yellow-500/20 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-3xl"></div>
                    <div className="flex justify-between mb-8">
                      <span className="text-[#D4AF37] font-extrabold tracking-[2px] text-lg">
                        POWER<span className="text-white font-medium">ZONE</span>
                      </span>
                      <span className="text-zinc-600 text-2xl font-bold">VISA</span>
                    </div>

                    <div className="text-xl tracking-[4px] text-zinc-300 font-mono mb-6">
                      {card.number || "•••• •••• •••• ••••"}
                    </div>

                    <div className="flex justify-between text-xs">
                      <div>
                        <p className="text-zinc-600 mb-1 tracking-wider uppercase font-semibold">CARD HOLDER</p>
                        <p className="text-zinc-300 font-bold uppercase">{card.name || "YOUR NAME"}</p>
                      </div>
                      <div>
                        <p className="text-zinc-600 mb-1 tracking-wider uppercase font-semibold">EXPIRES</p>
                        <p className="text-zinc-300 font-bold">{card.expiry || "MM/YY"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Card Inputs */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1.5">Card Number</label>
                      <input
                        type="text"
                        value={card.number}
                        onChange={(e) => setC("number", formatCard(e.target.value))}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1.5">Name on Card</label>
                      <input
                        type="text"
                        value={card.name}
                        onChange={(e) => setC("name", e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1.5">Expiry Date</label>
                        <input
                          type="text"
                          value={card.expiry}
                          onChange={(e) => setC("expiry", formatExpiry(e.target.value))}
                          placeholder="MM/YY"
                          className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1.5">CVV</label>
                        <input
                          type="password"
                          value={card.cvv}
                          onChange={(e) => setC("cvv", e.target.value.replace(/\D/g, "").slice(0, 3))}
                          placeholder="•••"
                          className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {method === "paypal" && (
                <div className="text-center py-10 text-zinc-400 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
                  <p className="text-4xl mb-3">🅿️</p>
                  <p className="text-sm">Click pay below to sign in and pay securely via PayPal.</p>
                </div>
              )}

              {method === "wallet" && (
                <div className="text-center py-10 text-zinc-400 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
                  <p className="text-4xl mb-3">📱</p>
                  <p className="text-sm">Apple Pay, Google Pay, and Samsung Pay supported.</p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              {["🔒 SSL Secured", "🛡️ Fraud Protected", "↩️ 30-Day Returns"].map((badge) => (
                <span key={badge} className="text-xs text-zinc-500 bg-zinc-900/50 border border-zinc-800 rounded-full px-4 py-1.5">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right Side: Order Summary */}
          <div>
            <div className="bg-[#111] border border-zinc-800 rounded-2xl p-6 space-y-6 shadow-xl">
              <h2 className="text-xl font-bold border-b border-zinc-800 pb-4">Order Summary</h2>
              
              <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.product_id} className="flex justify-between items-center text-sm">
                    <span className="text-zinc-400 line-clamp-1">{item.name} × {item.qty}</span>
                    <span className="text-zinc-300 font-semibold shrink-0">Rs. {(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <hr className="border-zinc-800" />
              
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount</span>
                <span className="text-[#D4AF37]">Rs. {totalAmount.toLocaleString()}</span>
              </div>

              <button
                onClick={handlePayment}
                disabled={processing}
                className="w-full bg-[#D4AF37] hover:bg-[#b8962d] text-black font-bold py-4 rounded-xl transition uppercase tracking-wider text-sm cursor-pointer shadow-lg shadow-yellow-500/5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? "Processing..." : `PAY Rs. ${totalAmount.toLocaleString()}`}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}