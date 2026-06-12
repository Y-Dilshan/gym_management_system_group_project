import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

export default function ProductByPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");

  const API = "http://localhost:3000/api";

  useEffect(() => {
    loadproduct();
  }, []);

  const loadproduct = async () => {
    try {
      const res = await fetch(`${API}/products/${id}`);
      const data = await res.json();

      setProduct(data.product);
    } catch (err) {
      console.error(err);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white text-lg">
        Loading...
      </div>
    );
  }
  const handleBuy = async () => {
    if (!address.trim()) {
      alert("Please enter delivery address");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          product_id: product.product_id,
          quantity: quantity,
          delivery_address: address,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Order placed successfully");
        console.log(data);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12">
        {/* Image*/}
        <div className="bg-zinc-900 rounded-2xl p-8 flex items-center justify-center">
          <img
            src={product.image_url ? `/${product.image_url}` : "/s1.png"}
            alt={product.product_name}
            className="w-full h-[400px] object-contain"
          ></img>
        </div>
        {/* Details */}
        <div className="flex flex-col">
          <span className="inline-block w-fit bg-yellow-500 text-black text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full">
            {product.category}
          </span>

          <h1 className="text-4xl font-bold mt-4 leading-tight">
            {product.product_name}
          </h1>

          <p className="text-zinc-400 mt-4 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-6 border-t border-zinc-800 pt-6">
            <h2 className="text-3xl font-bold text-yellow-500">
              Rs. {Number(product.price).toLocaleString()}
            </h2>
            <p className="text-sm text-zinc-500 mt-1">
              Stock available:{" "}
              <span className="text-zinc-300 font-medium">
                {product.stock_quantity}
              </span>
            </p>
          </div>

          {/* <div className="mt-4">Stock: {product.stock_quantity}</div> */}

          {/* <div className="mt-5">
            <label className="block mb-2">Quantity</label>

            <input
              type="number"
              min="1"
              max={product.stock_quantity}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="text-black p-2 rounded w-32"
            />
          </div>
          <div className="mt-5">
            <label className="block mb-2">Delivery Address</label>

            <textarea
              placeholder="Enter delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full mt-2 p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 outline-none"
            />
          </div>

          <button
            onClick={handleBuy}
            className="mt-8 bg-yellow-500 text-black px-8 py-3 rounded-lg font-bold cursor-pointer hover:bg-yellow-600"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
} */}


          {/* CHANGED: wrapped Quantity + Address in a bordered card panel for grouping */}
          <div className="mt-6 bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-5">
            <div>
              {/* CHANGED: added text-sm font-medium text-zinc-300 for label styling */}
              <label className="block mb-2 text-sm font-medium text-zinc-300">
                Quantity
              </label>

              <input
                type="number"
                min="1"
                max={product.stock_quantity}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                // CHANGED: rounded -> rounded-lg, added focus ring
                className="text-white p-2 rounded-lg w-32 outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              {/* CHANGED: added text-sm font-medium text-zinc-300 for label styling */}
              <label className="block mb-2 text-sm font-medium text-zinc-300">
                Delivery Address
              </label>

              <textarea
                placeholder="Enter delivery address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                // CHANGED: removed "mt-2" (handled by parent space-y-5), added rows={3}, focus ring, resize-none
                rows={3}
                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
              />
            </div>
          </div>

          {/* CHANGED: added transition-colors and responsive width (full on mobile, auto on desktop) */}
          <button
            onClick={handleBuy}
            className="mt-8 bg-yellow-500 text-black px-8 py-3 rounded-lg font-bold cursor-pointer hover:bg-yellow-600 transition-colors w-full md:w-auto"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
      );
}