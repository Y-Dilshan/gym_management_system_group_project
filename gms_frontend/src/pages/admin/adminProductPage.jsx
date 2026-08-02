import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../utils/api.js";

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/products`);
      const data = await res.json();
      if (res.ok) {
        setProducts(data.products || []);
      } else {
        toast.error("Failed to load products");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error loading products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Product deleted successfully");
        loadProducts();
      } else {
        toast.error(data.message || "Failed to delete product");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#111111] to-[#1C1C1C] border border-[#D4AF37]/20 rounded-2xl shadow-2xl p-6 mb-8 flex items-center justify-between">
        {/* Left Side Text */}
        <div>
          <h1 className="text-4xl font-bold text-white tracking-wide">Product Management</h1>
          <p className="text-gray-400 mt-2">Manage products, inventory levels, and categories</p>
        </div>

        {/* Right Side Button */}
        <Link 
          to="/admin/add-product" 
          className="bg-[#D4AF37] text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          + Add Product
        </Link>
      </div>

      {/* Table Card */}
      <div className="bg-[#141414] border border-[#D4AF37]/20 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.08)]">
        {/* Card Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-[#2A2A2A]">
          <h2 className="text-2xl font-semibold text-white">Products List</h2>
          <input 
            type="text" 
            placeholder="Search Products..." 
            className="bg-[#1F1F1F] text-white px-4 py-2 rounded-xl border border-[#333333] focus:border-[#D4AF37] outline-none"
          />
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading products...</div>
        ) : products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table Head */}
              <thead>
                <tr className="bg-[#D4AF37] text-black">
                  <th className="px-6 py-5 text-left font-semibold">Image</th>
                  <th className="px-6 py-5 text-left font-semibold">Product ID</th>
                  <th className="px-6 py-5 text-left font-semibold">Product Name</th>
                  <th className="px-6 py-5 text-left font-semibold">Category</th>
                  <th className="px-6 py-5 text-left font-semibold">Price</th>
                  <th className="px-6 py-5 text-left font-semibold">Stock</th>
                  <th className="px-6 py-5 text-left font-semibold">Status</th>
                  <th className="px-6 py-5 text-left font-semibold">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {products.map((product) => (
                  <tr key={product.product_id} className="border-b border-[#2A2A2A] text-gray-300 hover:bg-[#1C1C1C] transition-all duration-300">
                    <td className="px-6 py-5"> 
                      <img 
                        src={product.image_url || "/s1.png"} 
                        alt={product.product_name} 
                        className="w-16 h-16 rounded-xl object-cover border border-[#D4AF37]/40"
                      />
                    </td>
                    <td className="px-6 py-5 font-semibold text-white"> #PRD{product.product_id} </td>
                    <td className="px-6 py-5 font-semibold text-white"> {product.product_name} </td>
                    <td className="px-6 py-5 uppercase text-sm"> {product.category} </td>
                    <td className="px-6 py-5 text-[#D4AF37] font-bold"> Rs. {Number(product.price).toLocaleString()} </td>
                    <td className="px-6 py-5"> {product.stock_quantity} </td>
                    <td className="px-6 py-5"> 
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                        product.status === "active"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-red-500/20 text-red-400 border-red-500/30"
                      }`}>
                        {product.status} 
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex gap-3">
                        <button 
                          onClick={() => handleDelete(product.product_id)} 
                          className="bg-red-600 px-5 py-2 rounded-xl text-white font-semibold hover:bg-red-700 hover:scale-105 transition duration-300"
                        >
                          Delete 
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">No products found</div>
        )}
      </div>
    </div>
  );
}