import { useState } from "react";


export default function CheckoutPage({ cart, setPage }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    country: "US",
    shipping: "standard",
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shippingCost =
    form.shipping === "express"
      ? 19.99
      : subtotal > 100
      ? 0
      : 9.99;

  const total = subtotal + shippingCost;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl tracking-[2px] mb-8 text-yellow-500 font-bold">
        CHECKOUT
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        {/* Left Side */}
        <div className="flex flex-col gap-5">
          {/* Contact */}
          <Section title="Contact Information">
            <div className="grid md:grid-cols-2 gap-4">
              <Field
                label="First name"
                value={form.firstName}
                onChange={(v) => set("firstName", v)}
                placeholder="Alex"
              />

              <Field
                label="Last name"
                value={form.lastName}
                onChange={(v) => set("lastName", v)}
                placeholder="Johnson"
              />

              <Field
                label="Email"
                value={form.email}
                onChange={(v) => set("email", v)}
                placeholder="alex@email.com"
                type="email"
                full
              />

              <Field
                label="Phone"
                value={form.phone}
                onChange={(v) => set("phone", v)}
                placeholder="+1 555 000 0000"
              />
            </div>
          </Section>

          {/* Shipping Address */}
          <Section title="Shipping Address">
            <div className="grid md:grid-cols-2 gap-4">
              <Field
                label="Street address"
                value={form.address}
                onChange={(v) => set("address", v)}
                placeholder="123 Main St"
                full
              />

              <Field
                label="City"
                value={form.city}
                onChange={(v) => set("city", v)}
                placeholder="New York"
              />

              <Field
                label="ZIP / Postal code"
                value={form.zip}
                onChange={(v) => set("zip", v)}
                placeholder="10001"
              />

              <div>
                <label className="block text-xs text-gray-400 mb-1.5">
                  Country
                </label>

                <select
                  value={form.country}
                  onChange={(e) => set("country", e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="US">United States</option>
                  <option value="GB">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                  <option value="LK">Sri Lanka</option>
                </select>
              </div>
            </div>
          </Section>

          {/* Shipping Method */}
          <Section title="Shipping Method">
            {[
              {
                id: "standard",
                label: "Standard Delivery",
                sub: "5–7 business days",
                price: subtotal > 100 ? "FREE" : "$9.99",
              },
              {
                id: "express",
                label: "Express Delivery",
                sub: "1–2 business days",
                price: "$19.99",
              },
            ].map((opt) => (
              <label
                key={opt.id}
                className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer mb-3 border transition-all ${
                  form.shipping === opt.id
                    ? "bg-yellow-950 border-yellow-500"
                    : "bg-zinc-800 border-zinc-700"
                }`}
              >
                <input
                  type="radio"
                  name="shipping"
                  checked={form.shipping === opt.id}
                  onChange={() => set("shipping", opt.id)}
                  className="w-[18px] h-[18px] accent-yellow-500"
                />

                <div className="flex-1">
                  <div
                    className={`font-semibold ${
                      form.shipping === opt.id
                        ? "text-yellow-500"
                        : "text-white"
                    }`}
                  >
                    {opt.label}
                  </div>

                  <div className="text-sm text-gray-400">
                    {opt.sub}
                  </div>
                </div>

                <div className="font-bold text-yellow-500">
                  {opt.price}
                </div>
              </label>
            ))}
          </Section>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 sticky top-5">
            <h2 className="text-lg tracking-wide text-white font-semibold mb-4">
              ORDER SUMMARY
            </h2>

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between mb-2.5 text-sm"
              >
                <span className="text-gray-400">
                  {item.name}
                  <span className="text-gray-600">
                    {" "}
                    ×{item.qty}
                  </span>
                </span>

                <span className="text-gray-200">
                  ${(item.price * item.qty).toFixed(2)}
                </span>
              </div>
            ))}

            <div className="border-t border-zinc-700 pt-3 mt-2 flex flex-col gap-2.5">
              <Row
                label="Subtotal"
                value={`$${subtotal.toFixed(2)}`}
              />

              <Row
                label="Shipping"
                value={
                  shippingCost === 0
                    ? "FREE"
                    : `$${shippingCost.toFixed(2)}`
                }
                highlight={shippingCost === 0}
              />

              <div className="border-t border-zinc-700 pt-3">
                <Row
                  label="Total"
                  value={`$${total.toFixed(2)}`}
                  big
                />
              </div>
            </div>

            <button
              onClick={() => setPage("payment")}
              className="w-full mt-5 py-3.5 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-bold tracking-[2px] transition-colors"
            >
              CONTINUE TO PAYMENT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}