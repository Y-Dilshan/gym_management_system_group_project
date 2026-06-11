import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

export default function ProductByPage() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);

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

    if(!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return(
        <div className="min-h-screen bg-zinc-950 text-white p-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Image*/}
        <div className="bg-zinc-900 rounded-xl p-8">
           <img src={product.image_url ? `/${product.image_url}` : "/s1.png"}
            alt={product.product_name}
            className="w-full h-[400px] object-contain"></img>
        </div>
        {/* Details */}
         <div>
          <span className="bg-yellow-500 text-black px-3 py-1 rounded">
            {product.category}
          </span>

          <h1 className="text-4xl font-bold mt-4">
            {product.product_name}
          </h1>

          <p className="text-zinc-400 mt-4">
            {product.description}
          </p>

          <div className="mt-6">
            <h2 className="text-3xl font-bold text-yellow-500">
              Rs. {Number(product.price).toLocaleString()}
            </h2>
          </div>

          <div className="mt-4">
            Stock: {product.stock_quantity}
          </div>

          <button
            className="mt-8 bg-yellow-500 text-black px-8 py-3 rounded-lg font-bold"
          >
            Buy Now
          </button>
        </div>

      </div>
    </div>

    )
}