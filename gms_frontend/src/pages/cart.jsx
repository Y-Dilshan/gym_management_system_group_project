export default function CartPage({ cart, setCart, setPage }) {
  const updateQty = (id, delta) => {
    setCart(c =>
      c.map(i =>
        i.id === id
          ? { ...i, qty: Math.max(1, i.qty + delta) }
          : i
      )
    );
  };

  const remove = (id) => setCart(c => c.filter(i => i.id !== id));

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold tracking-widest text-yellow-500 mb-2">
        YOUR CART
      </h1>

      <p className="text-sm text-gray-500 mb-8">
        {cart.length} items in your cart
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        {/* Items */}
        <div className="flex flex-col gap-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-900 border border-zinc-700 rounded-xl p-5 flex items-center gap-5"
            >
              {/* Product Image */}
              <div className="w-16 h-16 bg-zinc-800 rounded-lg flex items-center justify-center text-3xl">
                {item.img}
              </div>

              {/* Product Details */}
              <div className="flex-1">
                <div className="text-white font-semibold tracking-wide">
                  {item.name}
                </div>

                <div className="text-sm text-gray-500 mt-1">
                  {item.variant}
                </div>

                <div className="text-yellow-500 font-semibold mt-2">
                  ${item.price.toFixed(2)}
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQty(item.id, -1)}
                  className="w-8 h-8 bg-zinc-800 border border-zinc-700 text-white rounded-md flex items-center justify-center hover:bg-zinc-700"
                >
                  −
                </button>

                <span className="w-6 text-center font-semibold">
                  {item.qty}
                </span>

                <button
                  onClick={() => updateQty(item.id, 1)}
                  className="w-8 h-8 bg-zinc-800 border border-zinc-700 text-yellow-500 rounded-md flex items-center justify-center hover:bg-zinc-700"
                >
                  +
                </button>
              </div>

              {/* Item Total */}
              <div className="min-w-[72px] text-right font-semibold text-white">
                ${(item.price * item.qty).toFixed(2)}
              </div>

              {/* Remove Button */}
              <button
                onClick={() => remove(item.id)}
                className="text-gray-500 hover:text-red-500 text-lg"
                title="Remove"
              >
                ✕
              </button>
            </div>
          ))}

          {/* Promo Code */}
          <div className="flex gap-3 mt-2">
            <input
              type="text"
              placeholder="Promo code"
              className="max-w-[220px] w-full px-4 py-2 rounded-md border border-zinc-700 bg-zinc-900 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />

            <button className="px-5 py-2 bg-zinc-800 border border-zinc-700 text-yellow-500 rounded-md font-semibold hover:bg-zinc-700 transition">
              Apply
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
            <h2 className="text-lg font-bold tracking-wide text-white mb-5">
              ORDER SUMMARY
            </h2>

            <div className="flex flex-col gap-3">
              <Row
                label="Subtotal"
                value={`$${subtotal.toFixed(2)}`}
              />

              <Row
                label="Shipping"
                value={
                  shipping === 0
                    ? "FREE"
                    : `$${shipping.toFixed(2)}`
                }
                highlight={shipping === 0}
              />

              {shipping > 0 && (
                <p className="text-xs text-gray-500">
                  Free shipping on orders over $100
                </p>
              )}

              <div className="border-t border-zinc-700 pt-3 mt-1">
                <Row
                  label="Total"
                  value={`$${total.toFixed(2)}`}
                  big
                />
              </div>
            </div>

            <button
              onClick={() => setPage("checkout")}
              className="w-full mt-6 py-3.5 bg-yellow-500 hover:bg-yellow-400 text-black font-bold tracking-widest rounded-lg transition"
            >
              PROCEED TO CHECKOUT
            </button>

            <div className="text-center mt-4 text-xs text-gray-500">
              🔒 Secure checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}