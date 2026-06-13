import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const API = `${import.meta.env.VITE_BACKEND_URL}/products`;

export default function AdminAddProduct() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    product_name: "",
    category: "",
    description: "",
    price: "",
    stock_quantity: "",
    image_url: "",
  });

  const loadProducts = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      setProducts(data.products || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createProduct = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Product Added Successfully");
        loadProducts();

        setForm({
          product_name: "",
          category: "",
          description: "",
          price: "",
          stock_quantity: "",
          image_url: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const clearForm = () => {
    setForm({
      product_name: "",
      category: "",
      description: "",
      price: "",
      stock_quantity: "",
      image_url: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="bg-gradient-to-r from-[#111111] to-[#1C1C1C] border border-[#D4AF37]/20 rounded-2xl shadow-2xl p-6 mb-8">
        <h1 className="text-4xl font-bold text-white"> Add Products </h1>
        <p className="text-gray-400 mt-2">  Manage products, inventory and categories </p>
      </div>

      {/* Form Card */}
      <div className="bg-[#141414] border border-[#D4AF37]/20 rounded-3xl p-8 shadow-[0_0_30px_rgba(212,175,55,0.08)]">
        {/* Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white"> Add New Product </h2>
          <p className="text-gray-400 mt-2"> Create and manage products for your store inventory </p>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Product Name */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block"> Product Name </label>
            <input type="text" name="product_name" value={form.product_name} onChange={handleChange} placeholder="Enter product name" className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none"/>
          </div>

          {/* Category */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block"> Category </label>
            <select name="category" value={form.category} onChange={handleChange} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none">
              <option value="">Select Category</option>
              <option value="protein">Protein</option>
              <option value="pre-workout">Pre Workout</option>
              <option value="health">Health</option>
              <option value="performance">Performance</option>
              <option value="recovery">Recovery</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block"> Price </label>
            <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Rs. 0.00" className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none"/>
          </div>

          {/* Stock */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block"> Stock Quantity </label>
            <input type="number" name="stock_quantity" value={form.stock_quantity} onChange={handleChange} placeholder="Available stock" className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none"/>
          </div>

          {/* Image URL */}
          <div className="lg:col-span-2">
            <label className="text-gray-300 text-sm mb-2 block"> Product Image URL </label>
            <input
              type="text" name="image_url" value={form.image_url} onChange={handleChange} placeholder="https://image-url.com" className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none"/>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <label className="text-gray-300 text-sm mb-2 block"> Product Description </label>
          <textarea rows="5" name="description" value={form.description} onChange={handleChange} placeholder="Enter product description..." className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none resize-none"/>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          <button onClick={createProduct} className="bg-[#D4AF37] text-black font-bold px-8 py-3 rounded-xl hover:scale-105 transition duration-300"> Add Product </button>
          <button onClick={clearForm} className="border border-red-500 text-red-500 px-8 py-3 rounded-xl hover:bg-red-500 hover:text-white transition duration-300"> Clear Form </button>
        </div>
      </div>
    </div>
  );
}