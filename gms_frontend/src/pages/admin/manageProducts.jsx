import { useState } from "react";
import {
  Package,
  Search,
  Plus,
  LayoutDashboard,
  Users,
  Dumbbell,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  Edit2,
  Trash2,
  AlertTriangle,
  Download,
  Star,
  XCircle,
} from "lucide-react";

const products = [
  {
    id: "PRD001",
    name: "Whey Protein 2kg",
    category: "Supplements",
    price: 8900,
    stock: 45,
    sold: 128,
    status: "in-stock",
    rating: 4.8,
    img: "🥛",
    brand: "NutriForce",
  },
  {
    id: "PRD002",
    name: "Creatine Monohydrate",
    category: "Supplements",
    price: 3500,
    stock: 3,
    sold: 89,
    status: "low-stock",
    rating: 4.7,
    img: "💊",
    brand: "PureGains",
  },
  {
    id: "PRD003",
    name: "Resistance Bands Set",
    category: "Equipment",
    price: 2200,
    stock: 0,
    sold: 56,
    status: "out-of-stock",
    rating: 4.6,
    img: "🏋️",
    brand: "FitBand",
  },
  {
    id: "PRD004",
    name: "Gym Gloves (Pair)",
    category: "Accessories",
    price: 1800,
    stock: 32,
    sold: 201,
    status: "in-stock",
    rating: 4.5,
    img: "🥊",
    brand: "GripPro",
  },
];

const categories = ["All", "Supplements", "Equipment", "Accessories"];

const stockStatus = {
  "in-stock": {
    color: "text-green-500",
    bg: "bg-green-500/10",
    label: "In Stock",
  },
  "low-stock": {
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    label: "Low Stock",
  },
  "out-of-stock": {
    color: "text-red-500",
    bg: "bg-red-500/10",
    label: "Out of Stock",
  },
};

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Users, label: "Members" },
  { icon: Dumbbell, label: "Trainers" },
  { icon: Calendar, label: "Bookings" },
  { icon: Package, label: "Products", active: true },
  { icon: BarChart3, label: "Reports" },
  { icon: Settings, label: "Settings" },
];

function Sidebar() {
  return (
    <aside className="w-60 bg-[#16160f] border-r border-[#3a3a2a] flex flex-col sticky top-0 h-screen">
      <div className="p-5 border-b border-[#3a3a2a] flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C9A84C] to-[#8B6914] flex items-center justify-center">
          <Dumbbell size={20} className="text-white" />
        </div>

        <div>
          <h1 className="text-[#C9A84C] font-bold tracking-wider text-lg">
            FITNESS
          </h1>
          <p className="text-[10px] tracking-[3px] text-zinc-500">FORCE</p>
        </div>
      </div>

      <nav className="flex-1 p-2">
        {navItems.map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg mb-1 cursor-pointer transition-all
              ${
                item.active
                  ? "bg-[#C9A84C]/10 border-l-4 border-[#C9A84C]"
                  : "hover:bg-white/5"
              }`}
          >
            <item.icon
              size={18}
              className={item.active ? "text-[#C9A84C]" : "text-zinc-500"}
            />

            <span
              className={`text-sm ${
                item.active
                  ? "text-[#C9A84C] font-semibold"
                  : "text-zinc-400"
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </nav>

      <div className="p-2 border-t border-[#3a3a2a]">
        <div className="flex items-center gap-3 px-3 py-3 cursor-pointer text-zinc-500 hover:bg-white/5 rounded-lg">
          <LogOut size={18} />
          <span className="text-sm">Logout</span>
        </div>
      </div>
    </aside>
  );
}

export default function ManageProducts() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [viewMode, setViewMode] = useState("table");

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || p.category === category;

    return matchesSearch && matchesCategory;
  });

  const lowStock = products.filter(
    (p) => p.status === "low-stock" || p.status === "out-of-stock"
  );

  return (
    <div className="min-h-screen bg-[#1a1a14] text-[#e8e0cc] flex">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-[#16160f] border-b border-[#3a3a2a] px-7 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Manage Products</h1>
            <p className="text-sm text-zinc-500">
              Inventory, pricing, and stock management
            </p>
          </div>

          <div className="flex gap-3">
            <div className="bg-[#22221a] border border-[#3a3a2a] rounded-lg p-1 flex">
              {["table", "grid"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1 rounded-md text-sm transition
                    ${
                      viewMode === mode
                        ? "bg-[#C9A84C]/20 border border-[#C9A84C] text-[#C9A84C]"
                        : "text-zinc-500"
                    }`}
                >
                  {mode === "table" ? "☰ Table" : "⊞ Grid"}
                </button>
              ))}
            </div>

            <button className="px-4 py-2 border border-[#3a3a2a] rounded-lg text-sm text-zinc-400 flex items-center gap-2 hover:bg-white/5">
              <Download size={14} />
              Export
            </button>

            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-[#C9A84C]/20 border border-[#C9A84C] rounded-lg text-[#C9A84C] text-sm font-semibold flex items-center gap-2 hover:bg-[#C9A84C]/30"
            >
              <Plus size={14} />
              Add Product
            </button>
          </div>
        </header>

        <div className="p-7">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              {
                label: "Total Products",
                value: products.length,
                color: "text-[#C9A84C]",
                sub: "in inventory",
              },
              {
                label: "Revenue",
                value: "LKR 892K",
                color: "text-green-500",
                sub: "this month",
              },
              {
                label: "Low / Out Stock",
                value: lowStock.length,
                color: "text-red-500",
                sub: "need restocking",
              },
              {
                label: "Best Seller",
                value: "Shaker 700ml",
                color: "text-blue-500",
                sub: "312 units sold",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-[#22221a] border border-[#3a3a2a] rounded-xl p-5"
              >
                <h2 className={`text-2xl font-bold mb-1 ${s.color}`}>
                  {s.value}
                </h2>

                <p className="text-sm text-zinc-400">{s.label}</p>

                <span className="text-xs text-zinc-600">{s.sub}</span>
              </div>
            ))}
          </div>

          {/* Alert */}
          {lowStock.length > 0 && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 mb-5">
              <AlertTriangle size={16} className="text-red-500" />

              <p className="text-sm text-red-400">
                <strong>
                  {
                    lowStock.filter(
                      (p) => p.status === "out-of-stock"
                    ).length
                  }{" "}
                  products
                </strong>{" "}
                out of stock and{" "}
                <strong>
                  {
                    lowStock.filter((p) => p.status === "low-stock")
                      .length
                  }{" "}
                  products
                </strong>{" "}
                running low.
              </p>

              <button className="ml-auto px-3 py-1 border border-red-500/30 rounded-md text-xs text-red-400 hover:bg-red-500/10">
                View All
              </button>
            </div>
          )}

          {/* Filters */}
          <div className="flex gap-4 mb-5">
            <div className="flex-1 bg-[#22221a] border border-[#3a3a2a] rounded-lg px-4 py-2 flex items-center gap-2">
              <Search size={15} className="text-zinc-500" />

              <input
                type="text"
                placeholder="Search products or brands..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-sm text-zinc-300 w-full"
              />
            </div>

            <div className="flex gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-4 py-2 rounded-lg text-sm transition
                    ${
                      category === c
                        ? "bg-[#C9A84C]/20 border border-[#C9A84C] text-[#C9A84C]"
                        : "border border-[#3a3a2a] text-zinc-500"
                    }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Table View */}
          {viewMode === "table" ? (
            <div className="bg-[#22221a] border border-[#3a3a2a] rounded-xl overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1a1a14] border-b border-[#3a3a2a]">
                    {[
                      "Product",
                      "Category",
                      "Price",
                      "Stock",
                      "Sold",
                      "Rating",
                      "Status",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-3 text-xs uppercase tracking-wider text-zinc-500"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-[#3a3a2a]/40 hover:bg-[#C9A84C]/5 transition"
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#2a2a1e] flex items-center justify-center text-xl">
                            {p.img}
                          </div>

                          <div>
                            <h3 className="font-semibold">{p.name}</h3>

                            <p className="text-xs text-zinc-500">
                              {p.brand} · {p.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span className="px-3 py-1 rounded-full text-xs bg-[#2a2a1e] border border-[#3a3a2a] text-zinc-300">
                          {p.category}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-[#C9A84C] font-semibold">
                        {p.price.toLocaleString()}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`font-semibold ${
                            stockStatus[p.status].color
                          }`}
                        >
                          {p.stock}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-zinc-400">
                        {p.sold}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1">
                          <Star
                            size={12}
                            className="text-yellow-500 fill-yellow-500"
                          />

                          <span className="text-sm text-yellow-500 font-semibold">
                            {p.rating}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${stockStatus[p.status].bg}
                          ${stockStatus[p.status].color}`}
                        >
                          {stockStatus[p.status].label}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditProduct(p);
                              setShowModal(true);
                            }}
                            className="p-2 rounded-md border border-[#3a3a2a] text-[#C9A84C] hover:bg-[#C9A84C]/10"
                          >
                            <Edit2 size={14} />
                          </button>

                          <button className="p-2 rounded-md border border-red-500/20 text-red-500 hover:bg-red-500/10">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* Grid View */
            <div className="grid grid-cols-4 gap-5">
              {filtered.map((p) => (
                <div
                  key={p.id}
                  className="bg-[#22221a] border border-[#3a3a2a] rounded-2xl p-5 hover:border-[#C9A84C]/40 transition-all hover:-translate-y-1"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-14 h-14 rounded-xl bg-[#2a2a1e] flex items-center justify-center text-3xl">
                      {p.img}
                    </div>

                    <span
                      className={`px-2 py-1 rounded-full text-[10px] font-bold
                        ${stockStatus[p.status].bg}
                        ${stockStatus[p.status].color}`}
                    >
                      {stockStatus[p.status].label}
                    </span>
                  </div>

                  <h3 className="font-bold mb-1">{p.name}</h3>

                  <p className="text-xs text-zinc-500 mb-4">{p.brand}</p>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold text-[#C9A84C]">
                      LKR {p.price.toLocaleString()}
                    </span>

                    <div className="flex items-center gap-1">
                      <Star
                        size={12}
                        className="text-yellow-500 fill-yellow-500"
                      />

                      <span className="text-sm text-yellow-500">
                        {p.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm text-zinc-400 mb-5">
                    <span>
                      Stock:{" "}
                      <strong className={stockStatus[p.status].color}>
                        {p.stock}
                      </strong>
                    </span>

                    <span>
                      Sold: <strong>{p.sold}</strong>
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditProduct(p);
                        setShowModal(true);
                      }}
                      className="flex-1 py-2 rounded-lg bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] text-sm font-semibold hover:bg-[#C9A84C]/20"
                    >
                      Edit
                    </button>

                    <button className="flex-1 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm hover:bg-red-500/20">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          onClick={() => {
            setShowModal(false);
            setEditProduct(null);
          }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[480px] bg-[#22221a] border border-[#3a3a2a] rounded-2xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">
                {editProduct ? "Edit Product" : "Add Product"}
              </h2>

              <button
                onClick={() => {
                  setShowModal(false);
                  setEditProduct(null);
                }}
                className="text-zinc-500 hover:text-white"
              >
                <XCircle size={22} />
              </button>
            </div>

            <div className="space-y-4">
              {[
                ["Product Name", "text", editProduct?.name || ""],
                ["Brand", "text", editProduct?.brand || ""],
                ["Price", "number", editProduct?.price || ""],
                ["Stock Quantity", "number", editProduct?.stock || ""],
              ].map(([label, type, value]) => (
                <div key={label}>
                  <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-2">
                    {label}
                  </label>

                  <input
                    type={type}
                    defaultValue={value}
                    className="w-full bg-[#1a1a14] border border-[#3a3a2a] rounded-lg px-4 py-3 text-sm text-zinc-200 outline-none focus:border-[#C9A84C]"
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-2">
                  Category
                </label>

                <select className="w-full bg-[#1a1a14] border border-[#3a3a2a] rounded-lg px-4 py-3 text-sm text-zinc-200 outline-none">
                  <option>Supplements</option>
                  <option>Equipment</option>
                  <option>Accessories</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-2">
                  Description
                </label>

                <textarea
                  rows={3}
                  placeholder="Product description..."
                  className="w-full bg-[#1a1a14] border border-[#3a3a2a] rounded-lg px-4 py-3 text-sm text-zinc-200 outline-none resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditProduct(null);
                }}
                className="flex-1 py-3 rounded-lg border border-[#3a3a2a] text-zinc-400 hover:bg-white/5"
              >
                Cancel
              </button>

              <button className="flex-1 py-3 rounded-lg bg-gradient-to-br from-[#C9A84C] to-[#8B6914] text-black font-bold hover:opacity-90">
                {editProduct ? "Update Product" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}