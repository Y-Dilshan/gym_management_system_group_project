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

      toast.success(data.message);
      loadProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduct = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      alert(data.message);

      loadProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className=" bg-[#050505] h-[80px] flex flex-col justify-center border-b-1 border-white shadow-2xl shadow-[#333333]">
          <h1 className="text-4xl font-bold text-white ml-10 ">
            {" "}
            Add Products{" "}
          </h1>
          <p className="mt-2 text-white ml-10">
            {" "}
            Manage products, inventory and categories{" "}
          </p>
        </div>

        {/* Add Product Form */}
        <div className="flex justify-center py-10">
          <div className="w-[1100px] bg-[#111111] border border-[#D4AF37]/30 rounded-3xl shadow-2xl p-10">
            {/* Title */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white">
                {" "}
                Add New Product
              </h2>
              <p className="text-gray-400 mt-2">
                {" "}
                Create and manage products for your store inventory{" "}
              </p>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="text-gray-300 text-sm mb-2 block">
                  {" "}
                  Product Name{" "}
                </label>
                <input
                  name="product_name"
                  placeholder="Enter product name"
                  onChange={handleChange}
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm mb-2 block">
                  {" "}
                  Category{" "}
                </label>
                <select
                  name="category"
                  onChange={handleChange}
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none"
                >
                  <option value="">Select Category</option>
                  <option value="protein">Protein</option>
                  <option value="pre-workout">Pre Workout</option>
                  <option value="health">Health</option>
                  <option value="performance">Performance</option>
                  <option value="recovery">Recovery</option>
                </select>
              </div>

              <div>
                <label className="text-gray-300 text-sm mb-2 block">
                  {" "}
                  Price{" "}
                </label>
                <input
                  name="price"
                  placeholder="Rs. 0.00"
                  onChange={handleChange}
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm mb-2 block">
                  {" "}
                  Stock Quantity{" "}
                </label>
                <input
                  name="stock_quantity"
                  placeholder="Available stock"
                  onChange={handleChange}
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="lg:col-span-2">
                <label className="text-gray-300 text-sm mb-2 block">
                  {" "}
                  Product Image URL{" "}
                </label>
                <input
                  name="image_url"
                  placeholder="https://image-url.com"
                  onChange={handleChange}
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <label className="text-gray-300 text-sm mb-2 block">
                {" "}
                Product Description{" "}
              </label>

              <textarea
                name="description"
                rows="5"
                placeholder="Enter product description..."
                onChange={handleChange}
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={createProduct}
                className="bg-[#D4AF37] text-black font-semibold px-8 py-3 rounded-xl hover:scale-105 transition-all duration-300"
              >
                {" "}
                Add Product{" "}
              </button>

              <button className="border border-red-500 text-red-500 px-8 py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300">
                {" "}
                Clear Form{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
