import { useState } from "react";
import {
  Dumbbell,
  Search,
  Plus,
  Star,
  Clock,
  Users,
  LayoutDashboard,
  Calendar,
  Package,
  BarChart3,
  Settings,
  LogOut,
  Edit2,
  Mail,
  Phone,
  Check,
  X,
} from "lucide-react";

const trainers = [
  {
    id: 1,
    name: "Mike Davidson",
    email: "mike@fitnessforce.com",
    phone: "+94 71 111 2222",
    specialty: ["CrossFit", "Strength"],
    rating: 4.9,
    members: 34,
    sessions: 48,
    status: "approved",
    experience: "8 yrs",
    avatar: "MD",
    schedule: ["Mon", "Wed", "Fri"],
  },
  {
    id: 2,
    name: "Sara Karunaratne",
    email: "sara@fitnessforce.com",
    phone: "+94 77 222 3333",
    specialty: ["Yoga", "Pilates"],
    rating: 4.8,
    members: 28,
    sessions: 41,
    status: "approved",
    experience: "5 yrs",
    avatar: "SK",
    schedule: ["Tue", "Thu", "Sat"],
  },
  {
    id: 3,
    name: "Tom Richards",
    email: "tom@fitnessforce.com",
    phone: "+94 76 333 4444",
    specialty: ["Boxing", "HIIT"],
    rating: 4.7,
    members: 22,
    sessions: 36,
    status: "approved",
    experience: "6 yrs",
    avatar: "TR",
    schedule: ["Mon", "Tue", "Thu"],
  },
  {
    id: 4,
    name: "Amali Senanayake",
    email: "amali@email.com",
    phone: "+94 70 444 5555",
    specialty: ["Zumba", "Aerobics"],
    rating: 4.5,
    members: 0,
    sessions: 0,
    status: "pending",
    experience: "3 yrs",
    avatar: "AS",
    schedule: [],
  },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Users, label: "Members" },
  { icon: Dumbbell, label: "Trainers", active: true },
  { icon: Calendar, label: "Bookings" },
  { icon: Package, label: "Products" },
  { icon: BarChart3, label: "Reports" },
  { icon: Settings, label: "Settings" },
];

const statusConfig = {
  approved: {
    text: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500",
    label: "Approved",
  },
  pending: {
    text: "text-yellow-500",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500",
    label: "Pending",
  },
  inactive: {
    text: "text-gray-400",
    bg: "bg-gray-500/10",
    border: "border-gray-500",
    label: "Inactive",
  },
};

function Sidebar({ open }) {
  return (
    <aside
      className={`${
        open ? "w-60" : "w-[72px]"
      } bg-[#16160f] border-r border-[#3a3a2a] sticky top-0 h-screen flex flex-col transition-all duration-300`}
    >
      <div className="p-5 border-b border-[#3a3a2a] flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-800 flex items-center justify-center">
          <Dumbbell className="text-white" size={20} />
        </div>

        {open && (
          <div>
            <h1 className="text-yellow-500 font-bold tracking-wider text-lg">
              FITNESS
            </h1>
            <p className="text-[10px] tracking-[3px] text-gray-500">FORCE</p>
          </div>
        )}
      </div>

      <nav className="flex-1 p-2">
        {navItems.map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg mb-1 cursor-pointer border-l-4 transition-all
              ${
                item.active
                  ? "bg-yellow-500/10 border-yellow-500 text-yellow-500"
                  : "border-transparent text-gray-400 hover:bg-[#22221a]"
              }`}
          >
            <item.icon size={18} />

            {open && (
              <span className="text-sm font-medium">{item.label}</span>
            )}
          </div>
        ))}
      </nav>

      <div className="p-2 border-t border-[#3a3a2a]">
        <div className="flex items-center gap-3 px-3 py-3 text-gray-400 cursor-pointer">
          <LogOut size={18} />
          {open && <span className="text-sm">Logout</span>}
        </div>
      </div>
    </aside>
  );
}

export default function ManageTrainers() {
  const [sidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [scheduleModal, setScheduleModal] = useState(null);
  const [selectedDays, setSelectedDays] = useState([]);

  const filtered = trainers.filter((t) => {
    const matchesSearch = t.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || t.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const pendingCount = trainers.filter(
    (t) => t.status === "pending"
  ).length;

  return (
    <div className="flex min-h-screen bg-[#1a1a14] text-[#e8e0cc] font-sans">
      <Sidebar open={sidebarOpen} />

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-[#16160f] border-b border-[#3a3a2a] px-7 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Manage Trainers</h1>
            <p className="text-sm text-gray-500">
              Trainer approvals, profiles, and schedules
            </p>
          </div>

          <div className="flex items-center gap-3">
            {pendingCount > 0 && (
              <div className="px-4 py-2 rounded-lg border border-yellow-500 bg-yellow-500/10 text-yellow-500 flex items-center gap-2 text-sm">
                <Clock size={14} />
                {pendingCount} pending approvals
              </div>
            )}

            <button className="px-4 py-2 rounded-lg border border-yellow-500 bg-yellow-500/10 text-yellow-500 flex items-center gap-2 text-sm font-semibold hover:bg-yellow-500/20 transition-all">
              <Plus size={14} />
              Add Trainer
            </button>
          </div>
        </header>

        <div className="p-7">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {[
              {
                label: "Total Trainers",
                value: trainers.length,
                color: "text-yellow-500",
              },
              {
                label: "Approved",
                value: trainers.filter((t) => t.status === "approved")
                  .length,
                color: "text-green-500",
              },
              {
                label: "Pending",
                value: pendingCount,
                color: "text-yellow-500",
              },
              {
                label: "Avg Rating",
                value: "4.7★",
                color: "text-orange-400",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-[#22221a] border border-[#3a3a2a] rounded-xl p-5"
              >
                <h2 className={`text-3xl font-bold ${s.color}`}>
                  {s.value}
                </h2>

                <p className="text-sm text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Search & Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[240px] bg-[#22221a] border border-[#3a3a2a] rounded-lg px-4 py-3 flex items-center gap-2">
              <Search size={16} className="text-gray-500" />

              <input
                type="text"
                placeholder="Search trainers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-sm w-full placeholder:text-gray-600"
              />
            </div>

            <div className="flex gap-2">
              {["all", "approved", "pending", "inactive"].map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={`px-4 py-2 rounded-lg border text-sm capitalize transition-all
                    ${
                      filterStatus === s
                        ? "border-yellow-500 bg-yellow-500/10 text-yellow-500"
                        : "border-[#3a3a2a] text-gray-400 hover:bg-[#22221a]"
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Trainer Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
            {filtered.map((t) => (
              <div
                key={t.id}
                className="relative bg-[#22221a] border border-[#3a3a2a] rounded-2xl p-6 hover:border-yellow-500/40 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Status */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border
                    ${statusConfig[t.status].text}
                    ${statusConfig[t.status].bg}
                    ${statusConfig[t.status].border}`}
                  >
                    {statusConfig[t.status].label}
                  </span>
                </div>

                {/* Profile */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-500 font-bold">
                    {t.avatar}
                  </div>

                  <div>
                    <h2 className="text-lg font-bold">{t.name}</h2>

                    <div className="flex items-center gap-1 text-sm">
                      <Star
                        size={12}
                        className="text-orange-400 fill-orange-400"
                      />

                      <span className="text-orange-400 font-semibold">
                        {t.rating}
                      </span>

                      <span className="text-gray-500">
                        · {t.experience}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {t.specialty.map((sp) => (
                    <span
                      key={sp}
                      className="px-3 py-1 rounded-full text-xs border border-[#3a3a2a] bg-[#2a2a1e] text-gray-300"
                    >
                      {sp}
                    </span>
                  ))}
                </div>

                {/* Contact */}
                <div className="space-y-2 mb-5 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Mail size={12} />
                    {t.email}
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone size={12} />
                    {t.phone}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex rounded-lg overflow-hidden bg-[#1a1a14] mb-5">
                  <div className="flex-1 text-center py-3 border-r border-[#3a3a2a]">
                    <h3 className="text-2xl font-bold text-yellow-500">
                      {t.members}
                    </h3>

                    <p className="text-xs text-gray-500">Members</p>
                  </div>

                  <div className="flex-1 text-center py-3">
                    <h3 className="text-2xl font-bold text-yellow-500">
                      {t.sessions}
                    </h3>

                    <p className="text-xs text-gray-500">Sessions</p>
                  </div>
                </div>

                {/* Schedule */}
                <div className="mb-5">
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Schedule
                  </p>

                  <div className="flex gap-1">
                    {days.map((d) => (
                      <div
                        key={d}
                        className={`w-7 h-7 rounded-md border text-[10px] font-semibold flex items-center justify-center
                        ${
                          t.schedule.includes(d)
                            ? "border-yellow-500 bg-yellow-500/10 text-yellow-500"
                            : "border-[#3a3a2a] bg-[#1a1a14] text-gray-600"
                        }`}
                      >
                        {d.charAt(0)}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                {t.status === "approved" && (
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 rounded-lg border border-[#3a3a2a] text-gray-300 hover:bg-[#1a1a14] flex items-center justify-center gap-2 text-sm">
                      <Edit2 size={14} />
                      Edit
                    </button>

                    <button
                      onClick={() => setScheduleModal(t)}
                      className="flex-1 py-2 rounded-lg border border-yellow-500/40 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 flex items-center justify-center gap-2 text-sm"
                    >
                      <Calendar size={14} />
                      Schedule
                    </button>
                  </div>
                )}

                {t.status === "pending" && (
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 rounded-lg border border-green-500 bg-green-500/10 text-green-500 text-sm font-semibold">
                      ✓ Approve
                    </button>

                    <button className="flex-1 py-2 rounded-lg border border-red-500 bg-red-500/10 text-red-500 text-sm">
                      ✗ Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {scheduleModal && (
        <div
          onClick={() => setScheduleModal(null)}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[420px] bg-[#22221a] border border-[#3a3a2a] rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold mb-1">Edit Schedule</h2>

            <p className="text-sm text-gray-500 mb-6">
              {scheduleModal.name}
            </p>

            <div className="mb-6">
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">
                Select Available Days
              </p>

              <div className="flex flex-wrap gap-2">
                {days.map((d) => {
                  const active = (
                    selectedDays.length
                      ? selectedDays
                      : scheduleModal.schedule
                  ).includes(d);

                  return (
                    <button
                      key={d}
                      onClick={() => {
                        const current = selectedDays.length
                          ? selectedDays
                          : [...scheduleModal.schedule];

                        setSelectedDays(
                          current.includes(d)
                            ? current.filter((x) => x !== d)
                            : [...current, d]
                        );
                      }}
                      className={`px-4 py-2 rounded-lg border text-sm transition-all
                      ${
                        active
                          ? "border-yellow-500 bg-yellow-500/10 text-yellow-500"
                          : "border-[#3a3a2a] bg-[#1a1a14] text-gray-400"
                      }`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setScheduleModal(null);
                  setSelectedDays([]);
                }}
                className="flex-1 py-3 rounded-lg border border-[#3a3a2a] text-gray-300"
              >
                Cancel
              </button>

              <button className="flex-1 py-3 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-700 text-black font-bold">
                Save Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}