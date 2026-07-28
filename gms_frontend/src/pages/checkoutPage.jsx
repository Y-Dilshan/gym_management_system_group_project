import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    country: "LK",
    shipping: "standard",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        setForm(f => ({
          ...f,
          firstName: user.full_name?.split(" ")[0] || "",
          lastName: user.full_name?.split(" ").slice(1).join(" ") || "",
          email: user.email || "",
          phone: user.phone || ""
        }));
      } catch (e) {
        console.error(e);
      }
    }

    const cartStr = localStorage.getItem("cart") || "[]";
    try {
      const items = JSON.parse(cartStr);
      if (items.length === 0) {
        toast.error("Your cart is empty");
        navigate("/products");
        return;
      }
      setCart(items);
    } catch (e) {
      navigate("/products");
    }
  }, []);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const subtotal = cart.reduce((s, i) => s + Number(i.price) * i.qty, 0);
  const shippingCost = form.shipping === "express" ? 1000 : subtotal > 15000 ? 0 : 500;
  const total = subtotal + shippingCost;

  const handleContinue = () => {
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.phone.trim() || !form.address.trim() || !form.city.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Save shipping details in localStorage for the payment page
    const fullAddress = `${form.address}, ${form.city}, ${form.zip || ""}, ${form.country}`;
    localStorage.setItem("delivery_address", fullAddress);
    localStorage.setItem("checkout_amount", total);

    navigate("/payment");
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white flex flex-col">
      <div className="fixed w-full z-40"><Header /></div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-[120px]">
        <h1 className="text-4xl font-bold tracking-wide mb-8">
          CHECKOUT
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side: Shipping Form */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Contact Details */}
            <div className="bg-[#111] border border-zinc-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-xl font-bold text-[#D4AF37]">Contact Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5">First Name</label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) => set("firstName", e.target.value)}
                    placeholder="Alex"
                    className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5">Last Name</label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => set("lastName", e.target.value)}
                    placeholder="Johnson"
                    className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-zinc-400 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="alex@email.com"
                    className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-zinc-400 mb-1.5">Phone Number</label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="+94 77 123 4567"
                    className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-[#111] border border-zinc-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-xl font-bold text-[#D4AF37]">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5">Street Address</label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => set("address", e.target.value)}
                    placeholder="123 Main St"
                    className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">City</label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => set("city", e.target.value)}
                      placeholder="Colombo"
                      className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">Postal Code</label>
                    <input
                      type="text"
                      value={form.zip}
                      onChange={(e) => set("zip", e.target.value)}
                      placeholder="10001"
                      className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-zinc-400 mb-1.5">Country</label>
                    <select
                      value={form.country}
                      onChange={(e) => set("country", e.target.value)}
                      className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-[#D4AF37] cursor-pointer"
                    >
                      <option value="LK">Sri Lanka</option>
                      <option value="US">United States</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="CA">Canada</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="bg-[#111] border border-zinc-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-xl font-bold text-[#D4AF37]">Shipping Method</h2>
              
              <div className="space-y-3">
                {[
                  {
                    id: "standard",
                    label: "Standard Delivery",
                    time: "3-5 business days",
                    cost: subtotal > 15000 ? "FREE" : "Rs. 500"
                  },
                  {
                    id: "express",
                    label: "Express Delivery",
                    time: "1-2 business days",
                    cost: "Rs. 1,000"
                  }
                ].map(method => (
                  <label
                    key={method.id}
                    className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition ${
                      form.shipping === method.id
                        ? "border-[#D4AF37] bg-yellow-500/5 text-white"
                        : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={form.shipping === method.id}
                        onChange={() => set("shipping", method.id)}
                        className="accent-[#D4AF37] h-4 w-4"
                      />
                      <div>
                        <p className={`font-semibold ${form.shipping === method.id ? "text-white" : "text-zinc-300"}`}>{method.label}</p>
                        <p className="text-xs text-zinc-500">{method.time}</p>
                      </div>
                    </div>
                    <span className="font-bold text-[#D4AF37]">{method.cost}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Order Summary */}
          <div>
            <div className="bg-[#111] border border-zinc-800 rounded-2xl p-6 space-y-6 sticky top-[120px] shadow-xl">
              <h2 className="text-xl font-bold border-b border-zinc-800 pb-4">Order Summary</h2>

              <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.product_id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-400 line-clamp-1">{item.name}</span>
                      <span className="text-zinc-600 font-bold shrink-0">×{item.qty}</span>
                    </div>
                    <span className="text-zinc-300 shrink-0 font-medium">Rs. {(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <hr className="border-zinc-800" />

              <div className="space-y-3">
                <div className="flex justify-between text-sm text-zinc-400">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-zinc-400">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? "FREE" : `Rs. ${shippingCost}`}</span>
                </div>
                <hr className="border-zinc-800" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-[#D4AF37]">Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleContinue}
                className="w-full bg-[#D4AF37] hover:bg-[#b8962d] text-black font-bold py-4 rounded-xl transition uppercase tracking-wider text-sm cursor-pointer shadow-lg shadow-yellow-500/5"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}