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
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">
        Product Management
      </h1>

      <div className="border p-5 rounded mb-8">
        <h2 className="text-xl mb-4">
          Add Product
        </h2>

        <input
          name="product_name"
          placeholder="Product Name"
          onChange={handleChange}
          className="border p-2 mr-2"
        />

        <select
          name="category"
          onChange={handleChange}
          className="border p-2 mr-2"
        >
          <option value="">Category</option>
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
          className="border p-2 mr-2"
        />

        <input
          name="stock_quantity"
          placeholder="Stock"
          onChange={handleChange}
          className="border p-2 mr-2"
        />

        <input
          name="image_url"
          placeholder="Image URL"
          onChange={handleChange}
          className="border p-2 mr-2"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="border p-2 block mt-2"
        />

        <button
          onClick={createProduct}
          className="bg-green-600 text-white px-4 py-2 mt-4"
        >
          Add Product
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.product_id}>
              <td>{p.product_id}</td>
              <td>{p.product_name}</td>
              <td>{p.category}</td>
              <td>{p.price}</td>
              <td>{p.stock_quantity}</td>

              <td>
                <button
                  onClick={() =>
                    deleteProduct(p.product_id)
                  }
                  className="bg-red-600 text-white px-3 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}