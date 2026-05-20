import { useState } from "react";
import {
  Calendar,
  Search,
  LayoutDashboard,
  Users,
  Dumbbell,
  Package,
  BarChart3,
  Settings,
  LogOut,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";

const bookings = [
  {
    id: "BK001",
    member: "Arjun Perera",
    trainer: "Mike Davidson",
    class: "CrossFit",
    date: "Mon, 19 May",
    time: "9:00 AM",
    duration: "60 min",
    status: "confirmed",
    room: "Hall A",
  },
  {
    id: "BK002",
    member: "Nimal Silva",
    trainer: "Sara Karunaratne",
    class: "Yoga",
    date: "Mon, 19 May",
    time: "10:30 AM",
    duration: "45 min",
    status: "confirmed",
    room: "Studio 2",
  },
  {
    id: "BK003",
    member: "Kavya Mendis",
    trainer: "Tom Richards",
    class: "Boxing",
    date: "Mon, 19 May",
    time: "12:00 PM",
    duration: "60 min",
    status: "pending",
    room: "Ring Room",
  },
  {
    id: "BK004",
    member: "Ruwan Jayawardena",
    trainer: "Mike Davidson",
    class: "Strength",
    date: "Mon, 19 May",
    time: "2:00 PM",
    duration: "90 min",
    status: "cancelled",
    room: "Hall B",
  },
];

const timeSlots = [
  "6:00 AM",
  "7:00 AM",
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
];

const weekDays = [
  "Mon 19",
  "Tue 20",
  "Wed 21",
  "Thu 22",
  "Fri 23",
  "Sat 24",
  "Sun 25",
];

const statusColor = {
  confirmed:
    "text-green-400 bg-green-500/10 border border-green-500/30",
  pending:
    "text-yellow-400 bg-yellow-500/10 border border-yellow-500/30",
  cancelled:
    "text-red-400 bg-red-500/10 border border-red-500/30",
};

const statusIcon = {
  confirmed: CheckCircle,
  pending: Clock,
  cancelled: XCircle,
};

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Users, label: "Members" },
  { icon: Dumbbell, label: "Trainers" },
  { icon: Calendar, label: "Bookings", active: true },
  { icon: Package, label: "Products" },
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
          <h1 className="text-[#C9A84C] font-bold text-lg tracking-wide">
            FITNESS
          </h1>
          <p className="text-[10px] tracking-[3px] text-gray-500">
            FORCE
          </p>
        </div>
      </div>

      <nav className="flex-1 px-2 py-4">
        {navItems.map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 cursor-pointer transition-all
            ${
              item.active
                ? "bg-[#C9A84C]/10 border-l-4 border-[#C9A84C]"
                : "hover:bg-white/5"
            }`}
          >
            <item.icon
              size={18}
              className={
                item.active ? "text-[#C9A84C]" : "text-gray-500"
              }
            />

            <span
              className={`text-sm ${
                item.active
                  ? "text-[#C9A84C] font-semibold"
                  : "text-gray-400"
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </nav>

      <div className="border-t border-[#3a3a2a] p-2">
        <div className="flex items-center gap-3 px-4 py-3 cursor-pointer text-gray-500 hover:bg-white/5 rounded-lg">
          <LogOut size={18} />
          <span className="text-sm">Logout</span>
        </div>
      </div>
    </aside>
  );
}

export default function ManageBookings() {
  const [view, setView] = useState("list");
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showReschedule, setShowReschedule] = useState(null);

  const filtered = bookings.filter((b) => {
    const matchesSearch =
      b.member.toLowerCase().includes(search.toLowerCase()) ||
      b.class.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || b.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#1a1a14] text-[#e8e0cc] flex font-sans">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-[#16160f] border-b border-[#3a3a2a] px-7 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-wide">
              Manage Bookings
            </h1>
            <p className="text-sm text-gray-500">
              View, reschedule, and cancel sessions
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex items-center bg-[#22221a] border border-[#3a3a2a] rounded-lg p-1">
              {["list", "calendar"].map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-4 py-1.5 rounded-md text-sm capitalize transition
                  ${
                    view === v
                      ? "bg-[#C9A84C]/20 border border-[#C9A84C] text-[#C9A84C]"
                      : "text-gray-500"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>

            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C9A84C]/20 border border-[#C9A84C] text-[#C9A84C] font-semibold text-sm hover:bg-[#C9A84C]/30 transition">
              <Plus size={15} />
              New Booking
            </button>
          </div>
        </header>

        <div className="p-7">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              {
                label: "Today's Bookings",
                value: bookings.length,
                color: "text-[#C9A84C]",
              },
              {
                label: "Confirmed",
                value: bookings.filter(
                  (b) => b.status === "confirmed"
                ).length,
                color: "text-green-400",
              },
              {
                label: "Pending",
                value: bookings.filter(
                  (b) => b.status === "pending"
                ).length,
                color: "text-yellow-400",
              },
              {
                label: "Cancelled",
                value: bookings.filter(
                  (b) => b.status === "cancelled"
                ).length,
                color: "text-red-400",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-[#22221a] border border-[#3a3a2a] rounded-xl p-5"
              >
                <h2 className={`text-3xl font-bold ${s.color}`}>
                  {s.value}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 flex-1 min-w-[220px] bg-[#22221a] border border-[#3a3a2a] rounded-lg px-4 py-2">
              <Search size={15} className="text-gray-500" />

              <input
                type="text"
                placeholder="Search member or class..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-sm w-full placeholder:text-gray-600"
              />
            </div>

            {["all", "confirmed", "pending", "cancelled"].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-4 py-2 rounded-lg text-sm capitalize border transition
                ${
                  filterStatus === s
                    ? "border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10"
                    : "border-[#3a3a2a] text-gray-500"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* List View */}
          {view === "list" ? (
            <div className="bg-[#22221a] border border-[#3a3a2a] rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#1a1a14] border-b border-[#3a3a2a]">
                  <tr>
                    {[
                      "Booking ID",
                      "Member",
                      "Trainer",
                      "Class",
                      "Date & Time",
                      "Room",
                      "Status",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left text-xs uppercase tracking-wider text-gray-500 px-4 py-4"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((b) => {
                    const SIcon = statusIcon[b.status];

                    return (
                      <tr
                        key={b.id}
                        className="border-b border-[#3a3a2a]/30 hover:bg-[#C9A84C]/5 transition cursor-pointer"
                        onClick={() => setSelectedBooking(b)}
                      >
                        <td className="px-4 py-4 text-[#C9A84C] font-semibold text-sm">
                          {b.id}
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#C9A84C]/20 text-[#C9A84C] flex items-center justify-center text-sm font-bold">
                              {b.member.charAt(0)}
                            </div>

                            <span className="text-sm font-medium">
                              {b.member}
                            </span>
                          </div>
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-400">
                          {b.trainer}
                        </td>

                        <td className="px-4 py-4">
                          <span className="px-3 py-1 rounded-full bg-[#2a2a1e] border border-[#3a3a2a] text-sm">
                            {b.class}
                          </span>
                        </td>

                        <td className="px-4 py-4">
                          <div className="text-sm">{b.date}</div>

                          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                            <Clock size={11} />
                            {b.time} · {b.duration}
                          </div>
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-400">
                          {b.room}
                        </td>

                        <td className="px-4 py-4">
                          <span
                            className={`flex items-center gap-1 w-fit px-3 py-1 rounded-full text-xs font-semibold ${statusColor[b.status]}`}
                          >
                            <SIcon size={11} />
                            {b.status}
                          </span>
                        </td>

                        <td
                          className="px-4 py-4"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex gap-2">
                            <button
                              onClick={() => setShowReschedule(b)}
                              className="p-2 rounded-lg border border-[#3a3a2a] text-[#C9A84C] hover:bg-[#C9A84C]/10"
                            >
                              <RefreshCw size={14} />
                            </button>

                            <button className="p-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10">
                              <XCircle size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            /* Calendar View */
            <div className="bg-[#22221a] border border-[#3a3a2a] rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-[#3a3a2a]">
                <button className="flex items-center gap-1 px-4 py-2 rounded-lg border border-[#3a3a2a] text-gray-400 hover:bg-white/5">
                  <ChevronLeft size={14} />
                  Prev
                </button>

                <h2 className="font-bold text-lg">
                  Week of May 19 – 25, 2026
                </h2>

                <button className="flex items-center gap-1 px-4 py-2 rounded-lg border border-[#3a3a2a] text-gray-400 hover:bg-white/5">
                  Next
                  <ChevronRight size={14} />
                </button>
              </div>

              <div className="overflow-x-auto">
                <div className="grid grid-cols-8 min-w-[1000px]">
                  <div className="bg-[#1a1a14] border-b border-r border-[#3a3a2a]" />

                  {weekDays.map((d) => (
                    <div
                      key={d}
                      className="bg-[#1a1a14] text-center py-4 border-b border-r border-[#3a3a2a]"
                    >
                      <span
                        className={`font-semibold text-sm ${
                          d.includes("19")
                            ? "text-[#C9A84C]"
                            : "text-gray-400"
                        }`}
                      >
                        {d}
                      </span>
                    </div>
                  ))}

                  {timeSlots.map((slot) => (
                    <>
                      <div
                        key={slot}
                        className="border-r border-b border-[#3a3a2a]/40 text-xs text-gray-500 flex items-start justify-end p-2 bg-[#1a1a14]"
                      >
                        {slot}
                      </div>

                      {weekDays.map((d) => {
                        const dayNum = d.split(" ")[1];

                        const dayBookings = bookings.filter(
                          (b) =>
                            b.date.includes(dayNum) &&
                            b.time === slot
                        );

                        return (
                          <div
                            key={d + slot}
                            className="min-h-[60px] border-r border-b border-[#3a3a2a]/30 p-1 hover:bg-[#C9A84C]/5 transition"
                          >
                            {dayBookings.map((b) => (
                              <div
                                key={b.id}
                                onClick={() => setSelectedBooking(b)}
                                className={`rounded-md p-2 mb-1 cursor-pointer ${statusColor[b.status]}`}
                              >
                                <div className="text-xs font-semibold">
                                  {b.class}
                                </div>

                                <div className="text-[10px] text-gray-400">
                                  {b.member.split(" ")[0]}
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}