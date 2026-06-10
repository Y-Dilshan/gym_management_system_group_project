// export default function AdminAddProduct() {

//     return (
//         <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 p-6">

//             <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-10">

//                 <h1 className="text-4xl font-bold mb-8 text-center">Add New Product </h1>

//                 <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

//                     {/* Product Name */}
//                     <div>
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName" > Product Name </label>

//                         <input id="productName" type="text" placeholder="Enter product name" className="w-full border rounded-lg py-3 px-4 shadow focus:outline-none focus:ring-2 focus:ring-blue-500" />
//                     </div>

//                     {/* Product Description */}
//                     <div>
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productDescription" > Product Description </label>

//                         <input id="productDescription" type="text" placeholder="Enter product description" className="w-full border rounded-lg py-3 px-4 shadow focus:outline-none focus:ring-2 focus:ring-blue-500" />
//                     </div>

//                     {/* Product Price */}
//                     <div>
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productPrice" > Product Price </label>

//                         <input id="productPrice" type="number" placeholder="Enter product price" className="w-full border rounded-lg py-3 px-4 shadow focus:outline-none focus:ring-2 focus:ring-blue-500" />
//                     </div>

//                     {/* Labeled Price */}
//                     <div>
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="labeledPrice" > Labeled Price </label>

//                         <input id="labeledPrice" type="number" placeholder="Enter labeled price" className="w-full border rounded-lg py-3 px-4 shadow focus:outline-none focus:ring-2 focus:ring-blue-500" />
//                     </div>

//                     {/* Product Quantity */}
//                     <div>
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity" > Product Quantity </label>

//                         <input id="quantity" type="number" placeholder="Enter quantity" className="w-full border rounded-lg py-3 px-4 shadow focus:outline-none focus:ring-2 focus:ring-blue-500" />
//                     </div>

//                     {/* Product Category */}
//                     <div>
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category" > Product Category </label>

//                         <input id="category" type="text" placeholder="Enter category" className="w-full border rounded-lg py-3 px-4 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"/>
//                     </div>

//                     <div>
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category" > Product Category </label>
//                         <input id="category" type="text" placeholder="Enter category" className="w-full border rounded-lg py-3 px-4 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"/>
//                     </div>

//                     <div>
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category" > Product Category </label>

//                         <input id="category" type="text" placeholder="Enter category" className="w-full border rounded-lg py-3 px-4 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"/>
//                     </div>

//                     {/* Buttons */}
//                     <div className="md:col-span-2 flex justify-center gap-6 mt-6">

//                         <button type="submit" className="bg-[#D4AF37] hover:bg-[#333333] text-white font-bold py-3 px-10 rounded-xl transition duration-300"> Add Product </button>

//                         <button type="button" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-10 rounded-xl transition duration-300">Delete Product</button>

//                     </div>

//                 </form>

//             </div>

//         </div>
//     );
// }


import { useEffect, useState } from "react";

const API = "http://localhost:3000/api/products";

export default function AdminProductPage() {
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

      alert(data.message);

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
  <div className="min-h-screen bg-gray-100 p-8">
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Product Management
        </h1>
        <p className="text-gray-500 mt-2">
          Manage products, inventory and categories
        </p>
      </div>

      {/* Add Product Form */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Add New Product
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          <input
            name="product_name"
            placeholder="Product Name"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />

          <select
            name="category"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            <option value="">Select Category</option>
            <option value="protein">Protein</option>
            <option value="pre-workout">Pre Workout</option>
            <option value="health">Health</option>
            <option value="performance">Performance</option>
            <option value="recovery">Recovery</option>
          </select>

          <input
            name="price"
            placeholder="Price"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />

          <input
            name="stock_quantity"
            placeholder="Stock Quantity"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />

          <input
            name="image_url"
            placeholder="Image URL"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none lg:col-span-2"
          />
        </div>

        <textarea
          name="description"
          placeholder="Product Description"
          onChange={handleChange}
          rows="4"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-4 focus:ring-2 focus:ring-green-500 focus:outline-none"
        />

        <button
          onClick={createProduct}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition duration-200"
        >
          Add Product
        </button>
      </div>

      {/* Products Table */}
      {/* <div className="bg-white rounded-2xl shadow-md overflow-hidden">

        <div className="px-6 py-4 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">
            Product List
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">

            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left">ID</th>
                <th className="px-6 py-4 text-left">Product</th>
                <th className="px-6 py-4 text-left">Category</th>
                <th className="px-6 py-4 text-left">Price</th>
                <th className="px-6 py-4 text-left">Stock</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr
                  key={p.product_id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    #{p.product_id}
                  </td>

                  <td className="px-6 py-4 font-medium">
                    {p.product_name}
                  </td>

                  <td className="px-6 py-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {p.category}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-semibold text-green-600">
                    Rs. {p.price}
                  </td>

                  <td className="px-6 py-4">
                    {p.stock_quantity}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => deleteProduct(p.product_id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div> */}
    </div>
  </div>
);
}