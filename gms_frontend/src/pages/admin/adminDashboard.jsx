import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import {
  Users,
  Calendar,
  ShoppingBag,
  Bell,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Dumbbell,
  ChevronRight,
  Menu,
  LayoutDashboard,
  Package,
  BarChart3,
  Settings,
  LogOut,
  Clock,
  DollarSign,
} from "lucide-react";

const stats = [
  {
    label: "Total Members",
    value: "1,284",
    change: "+12%",
    up: true,
    icon: Users,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  {
    label: "Monthly Revenue",
    value: "$24,560",
    change: "+8.3%",
    up: true,
    icon: DollarSign,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    label: "Active Bookings",
    value: "342",
    change: "-3%",
    up: false,
    icon: Calendar,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "Product Sales",
    value: "189",
    change: "+21%",
    up: true,
    icon: ShoppingBag,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
];

const recentBookings = [
  {
    name: "Arjun Perera",
    trainer: "Mike D.",
    class: "CrossFit",
    time: "9:00 AM",
    status: "confirmed",
  },
  {
    name: "Nimal Silva",
    trainer: "Sara K.",
    class: "Yoga",
    time: "10:30 AM",
    status: "pending",
  },
  {
    name: "Kavya Mendis",
    trainer: "Tom R.",
    class: "Boxing",
    time: "12:00 PM",
    status: "confirmed",
  },
  {
    name: "Ruwan Jayawardena",
    trainer: "Mike D.",
    class: "Strength",
    time: "2:00 PM",
    status: "cancelled",
  },
  {
    name: "Priya Fernando",
    trainer: "Sara K.",
    class: "Pilates",
    time: "4:30 PM",
    status: "confirmed",
  },
];

const topTrainers = [
  { name: "Mike Davidson", classes: 48, rating: 4.9, img: "MD" },
  { name: "Sara Karunaratne", classes: 41, rating: 4.8, img: "SK" },
  { name: "Tom Richards", classes: 36, rating: 4.7, img: "TR" },
];

const revenueData = [40, 65, 50, 80, 70, 90, 75, 95, 85, 100, 88, 92];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "Members", onClick: () => {handleMembers} },
  { icon: Dumbbell, label: "Trainers" },
  { icon: Calendar, label: "Bookings" },
  { icon: Package, label: "Products" },
  { icon: BarChart3, label: "Reports" },
  { icon: Settings, label: "Settings" },
];

const statusColor = {
  confirmed:
    "text-green-500 bg-green-500/10",
  pending:
    "text-yellow-500 bg-yellow-500/10",
  cancelled:
    "text-red-500 bg-red-500/10",
};

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigate = useNavigate();
  const handleMembers = () =>{
    navigate('/admin/members');
  }

  return (
    <div className="flex min-h-screen bg-[#1a1a14] text-[#e8e0cc] font-sans">
      {/* Sidebar */}
      <aside
        className={`bg-[#16160f] border-r border-[#3a3a2a] transition-all duration-300 sticky top-0 h-screen overflow-hidden ${
          sidebarOpen ? "w-60" : "w-[72px]"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 border-b border-[#3a3a2a] p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-700">
            <Dumbbell className="text-white" size={20} />
          </div>

          {sidebarOpen && (
            <div>
              <h1 className="text-lg font-bold tracking-wider text-yellow-500">
                FITNESS
              </h1>
              <p className="text-[10px] tracking-[3px] text-gray-500">
                FORCE
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2">
          {navItems.map((item) => (
            <div
              key={item.label}
              className={`mb-1 flex cursor-pointer items-center gap-3 rounded-lg border-l-4 px-3 py-3 transition-all duration-200 hover:bg-yellow-500/10 ${
                item.active
                  ? "border-yellow-500 bg-yellow-500/10"
                  : "border-transparent"
              }`}
            >
              <item.icon
                size={18}
                className={
                  item.active
                    ? "text-yellow-500"
                    : "text-gray-500"
                }
              />

              {sidebarOpen && (
                <span
                  className={`text-sm ${
                    item.active
                      ? "font-semibold text-yellow-500"
                      : "text-gray-400"
                  }`}
                >
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-[#3a3a2a] p-2">
          <div className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3 hover:bg-yellow-500/10">
            <LogOut size={18} className="text-gray-500" />

            {sidebarOpen && (
              <span className="text-sm text-gray-400">
                Logout
              </span>
            )}
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-[#3a3a2a] bg-[#16160f] px-7 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                setSidebarOpen(!sidebarOpen)
              }
              className="text-gray-500"
            >
              <Menu size={20} />
            </button>

            <div>
              <h1 className="text-2xl font-bold">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-500">
                Tuesday, 19 May 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="flex items-center gap-2 rounded-lg border border-[#3a3a2a] bg-[#22221a] px-4 py-2">
              <Search
                size={14}
                className="text-gray-500"
              />

              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
              />
            </div>

            {/* Notification */}
            <div className="relative cursor-pointer">
              <Bell
                size={20}
                className="text-gray-500"
              />

              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-yellow-500"></span>
            </div>

            {/* Profile */}
            <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-yellow-500 to-yellow-700 font-bold text-white">
              A
            </div>
          </div>
        </header>

        <div className="p-7">
          {/* Stats */}
          <div className="mb-7 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-[#3a3a2a] bg-[#22221a] p-6 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.bg}`}
                  >
                    <s.icon
                      size={20}
                      className={s.color}
                    />
                  </div>

                  <span
                    className={`flex items-center gap-1 text-sm font-semibold ${
                      s.up
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {s.up ? (
                      <ArrowUpRight size={14} />
                    ) : (
                      <ArrowDownRight size={14} />
                    )}
                    {s.change}
                  </span>
                </div>

                <h2 className="mb-1 text-3xl font-bold text-white">
                  {s.value}
                </h2>

                <p className="text-sm text-gray-500">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Charts + Trainers */}
          <div className="mb-7 grid grid-cols-1 gap-5 xl:grid-cols-[1fr_340px]">
            {/* Revenue */}
            <div className="rounded-xl border border-[#3a3a2a] bg-[#22221a] p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold">
                    Revenue Overview
                  </h2>

                  <p className="text-sm text-gray-500">
                    Monthly earnings 2026
                  </p>
                </div>

                <h2 className="text-3xl font-bold text-yellow-500">
                  $24,560
                </h2>
              </div>

              <div className="flex h-40 items-end gap-2">
                {revenueData.map((v, i) => (
                  <div
                    key={i}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    <div
                      style={{ height: `${v}%` }}
                      className={`w-full rounded-t-md transition-all duration-200 hover:opacity-90 ${
                        i === 11
                          ? "bg-gradient-to-b from-yellow-500 to-yellow-700"
                          : "bg-yellow-500/20"
                      }`}
                    ></div>

                    <span className="text-[10px] text-gray-500">
                      {months[i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trainers */}
            <div className="rounded-xl border border-[#3a3a2a] bg-[#22221a] p-6">
              <h2 className="mb-5 text-lg font-bold">
                Top Trainers
              </h2>

              {topTrainers.map((t) => (
                <div
                  key={t.name}
                  className="mb-5 flex items-center gap-4"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-yellow-500/70 to-yellow-700 text-sm font-bold">
                    {t.img}
                  </div>

                  <div className="flex-1">
                    <h3 className="mb-1 text-sm font-semibold">
                      {t.name}
                    </h3>

                    <div className="h-1 rounded bg-[#2a2a1e]">
                      <div
                        style={{
                          width: `${
                            (t.classes / 50) * 100
                          }%`,
                        }}
                        className="h-full rounded bg-gradient-to-r from-yellow-500 to-yellow-700"
                      ></div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-bold text-yellow-500">
                      ★ {t.rating}
                    </p>

                    <p className="text-xs text-gray-500">
                      {t.classes} cls
                    </p>
                  </div>
                </div>
              ))}

              {/* Membership */}
              <div className="mt-6 border-t border-[#3a3a2a] pt-5">
                <p className="text-center text-sm text-gray-500">
                  Membership Split
                </p>

                <div className="mt-3 flex gap-2">
                  {[
                    ["Premium", 45, "text-yellow-500"],
                    ["Standard", 35, "text-green-500"],
                    ["Basic", 20, "text-blue-500"],
                  ].map(([label, value, color]) => (
                    <div
                      key={label}
                      className="flex-1 text-center"
                    >
                      <h2
                        className={`text-xl font-bold ${color}`}
                      >
                        {value}%
                      </h2>

                      <p className="text-xs text-gray-500">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="rounded-xl border border-[#3a3a2a] bg-[#22221a] p-6 overflow-x-auto">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold">
                Recent Bookings
              </h2>

              <button className="flex items-center gap-1 rounded-md border border-yellow-500/30 px-4 py-2 text-sm text-yellow-500">
                View All
                <ChevronRight size={14} />
              </button>
            </div>

            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#3a3a2a]">
                  {[
                    "Member",
                    "Trainer",
                    "Class",
                    "Time",
                    "Status",
                    "Action",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-3 py-3 text-left text-xs uppercase tracking-wider text-gray-500"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {recentBookings.map((b) => (
                  <tr
                    key={b.name}
                    className="border-b border-[#3a3a2a]/30 transition hover:bg-yellow-500/5"
                  >
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/10 text-sm font-bold text-yellow-500">
                          {b.name.charAt(0)}
                        </div>

                        <span className="text-sm font-medium">
                          {b.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-3 py-4 text-sm text-gray-400">
                      {b.trainer}
                    </td>

                    <td className="px-3 py-4 text-sm">
                      {b.class}
                    </td>

                    <td className="px-3 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <Clock size={12} />
                        {b.time}
                      </div>
                    </td>

                    <td className="px-3 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusColor[b.status]}`}
                      >
                        {b.status}
                      </span>
                    </td>

                    <td className="px-3 py-4">
                      <button className="rounded-md border border-[#3a3a2a] px-3 py-1 text-xs text-gray-400 hover:bg-[#2a2a1e]">
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}