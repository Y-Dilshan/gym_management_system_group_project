import { useState } from "react";

export default function PaymentPage({ cart, setPage }) {
  const [method, setMethod] = useState("card");
  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [done, setDone] = useState(false);

  const setC = (k, v) => setCard((c) => ({ ...c, [k]: v }));

  const total = cart
    .reduce((s, i) => s + i.price * i.qty, 9.99)
    .toFixed(2);

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

  if (done) {
    return (
      <div className="max-w-[540px] mx-auto my-20 p-6 text-center">
        <div className="text-6xl mb-4">✅</div>

        <h1 className="text-4xl font-bold tracking-[2px] text-yellow-500 mb-3"> ORDER CONFIRMED! </h1>

        <p className="text-gray-400 mb-2"> Thank you for your purchase. A confirmation has been sent to your email. </p>

        <p className="text-gray-600 text-sm mb-8"> Order #PZ-{Math.floor(Math.random() * 90000 + 10000)} </p>

        <button
          onClick={() => setPage("cart")}
          className="px-8 py-3 bg-yellow-500 text-black rounded-lg font-bold tracking-[2px] hover:bg-yellow-400 transition" > BACK TO SHOP </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold tracking-[2px] text-yellow-500 mb-8">
        PAYMENT
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        {/* Left Side */}
        <div className="flex flex-col gap-5">
          <Section title="Payment Method">
            {/* Payment Method Buttons */}
            <div className="flex flex-wrap gap-3 mb-5">
              {[
                ["card", "💳 Credit / Debit Card"],
                ["paypal", "🅿️ PayPal"],
                ["wallet", "📱 Digital Wallet"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setMethod(id)}
                  className={`flex-1 min-w-[180px] px-3 py-3 rounded-lg border text-sm font-semibold transition-all
                    ${
                      method === id
                        ? "bg-yellow-900 border-yellow-500 text-yellow-500"
                        : "bg-zinc-800 border-zinc-700 text-gray-400 hover:border-yellow-500"
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Card Payment */}
            {method === "card" && (
              <div className="flex flex-col gap-4">
                {/* Card Preview */}
                <div className="bg-gradient-to-br from-yellow-950 to-zinc-900 border border-yellow-500/30 rounded-xl p-6">
                  <div className="flex justify-between mb-6">
                    <span className="text-yellow-500 font-bold tracking-[2px]">
                      POWER
                      <span className="text-gray-400">ZONE</span>
                    </span>

                    <span className="text-gray-500 text-xl">◉◉</span>
                  </div>

                  <div className="text-xl tracking-[4px] text-gray-300 mb-4">
                    {card.number || "•••• •••• •••• ••••"}
                  </div>

                  <div className="flex justify-between text-sm">
                    <div>
                      <div className="text-[10px] text-gray-500 mb-1">
                        CARD HOLDER
                      </div>
                      <div className="text-gray-300">
                        {card.name || "YOUR NAME"}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] text-gray-500 mb-1">
                        EXPIRES
                      </div>
                      <div className="text-gray-300">
                        {card.expiry || "MM/YY"}
                      </div>
                    </div>
                  </div>
                </div>

                <Field
                  label="Card Number"
                  value={card.number}
                  onChange={(v) => setC("number", formatCard(v))}
                  placeholder="1234 5678 9012 3456"
                />

                <Field
                  label="Name on Card"
                  value={card.name}
                  onChange={(v) => setC("name", v)}
                  placeholder="Alex Johnson"
                />

                <div className="grid grid-cols-2 gap-4">
                  <Field
                    label="Expiry Date"
                    value={card.expiry}
                    onChange={(v) => setC("expiry", formatExpiry(v))}
                    placeholder="MM/YY"
                  />

                  <Field
                    label="CVV"
                    value={card.cvv}
                    onChange={(v) =>
                      setC("cvv", v.replace(/\D/g, "").slice(0, 4))
                    }
                    placeholder="•••"
                    type="password"
                  />
                </div>
              </div>
            )}

            {/* PayPal */}
            {method === "paypal" && (
              <div className="text-center py-8 px-5 text-gray-400">
                <div className="text-5xl mb-3">🅿️</div>
                <p>
                  You'll be redirected to PayPal to complete your payment
                  securely.
                </p>
              </div>
            )}

            {/* Wallet */}
            {method === "wallet" && (
              <div className="text-center py-8 px-5 text-gray-400">
                <div className="text-5xl mb-3">📱</div>
                <p>
                  Apple Pay, Google Pay, and Samsung Pay supported.
                </p>
              </div>
            )}
          </Section>

          {/* Security Badges */}
          <div className="flex flex-wrap gap-4 items-center">
            {[
              "🔒 SSL Secured",
              "🛡️ Fraud Protection",
              "↩️ 30-Day Returns",
            ].map((badge) => (
              <span
                key={badge}
                className="text-xs text-gray-500 bg-zinc-800 border border-zinc-700 rounded-full px-3 py-1"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white tracking-wide mb-4">
              ORDER SUMMARY
            </h2>

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between mb-3 text-sm"
              >
                <span className="text-gray-400">
                  {item.name}
                  <span className="text-gray-600 ml-1">
                    ×{item.qty}
                  </span>
                </span>

                <span className="text-gray-200">
                  ${(item.price * item.qty).toFixed(2)}
                </span>
              </div>
            ))}

            <div className="border-t border-zinc-700 pt-4 mt-2">
              <Row label="Total due today" value={`$${total}`} big />
            </div>

            <button
              onClick={() => setDone(true)}
              className="w-full mt-5 py-3.5 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-bold tracking-[2px] transition"
            >
              PAY ${total}
            </button>

            <p className="text-xs text-gray-600 text-center mt-3">
              By placing your order you agree to our Terms of Service
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}