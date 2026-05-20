import { useState } from "react";
import {
  Users,
  Search,
  Plus,
  Edit2,
  Ban,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  LayoutDashboard,
  Dumbbell,
  Calendar,
  Package,
  BarChart3,
  Settings,
  LogOut,
  Mail,
  Phone,
  Download,
} from "lucide-react";

const GOLD = "#C9A84C";

const members = [
  {
    id: 1,
    name: "Arjun Perera",
    email: "arjun@email.com",
    phone: "+94 71 234 5678",
    plan: "Premium",
    joined: "Jan 12, 2025",
    status: "active",
    sessions: 48,
    avatar: "AP",
  },
  {
    id: 2,
    name: "Nimal Silva",
    email: "nimal@email.com",
    phone: "+94 77 345 6789",
    plan: "Standard",
    joined: "Mar 3, 2025",
    status: "active",
    sessions: 22,
    avatar: "NS",
  },
  {
    id: 3,
    name: "Kavya Mendis",
    email: "kavya@email.com",
    phone: "+94 76 456 7890",
    plan: "Premium",
    joined: "Feb 20, 2025",
    status: "suspended",
    sessions: 31,
    avatar: "KM",
  },
];

const planColor = {
  Premium: "text-yellow-500 bg-yellow-500/10",
  Standard: "text-green-500 bg-green-500/10",
  Basic: "text-blue-500 bg-blue-500/10",
};

const statusColor = {
  active: "text-green-500 bg-green-500/10",
  suspended: "text-red-500 bg-red-500/10",
  inactive: "text-gray-400 bg-gray-400/10",
};

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Users, label: "Members", active: true },
  { icon: Dumbbell, label: "Trainers" },
  { icon: Calendar, label: "Bookings" },
  { icon: Package, label: "Products" },
  { icon: BarChart3, label: "Reports" },
  { icon: Settings, label: "Settings" },
];

function Sidebar({ open }) {
  return (
    <aside
      className={`sticky top-0 h-screen overflow-hidden border-r border-[#3a3a2a] bg-[#16160f] transition-all duration-300 ${
        open ? "w-60" : "w-[72px]"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-[#3a3a2a] p-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-700">
          <Dumbbell size={20} className="text-white" />
        </div>

        {open && (
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

      {/* Nav */}
      <nav className="flex-1 p-2">
        {navItems.map((item) => (
          <div
            key={item.label}
            className={`mb-1 flex cursor-pointer items-center gap-3 rounded-lg border-l-4 px-3 py-3 transition hover:bg-yellow-500/10 ${
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

            {open && (
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
          <LogOut
            size={18}
            className="text-gray-500"
          />

          {open && (
            <span className="text-sm text-gray-400">
              Logout
            </span>
          )}
        </div>
      </div>
    </aside>
  );
}

export default function ManageMembers() {
  const [sidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] =
    useState("all");
  const [filterPlan, setFilterPlan] =
    useState("all");
  const [showModal, setShowModal] =
    useState(false);

  const filtered = members.filter((m) => {
    const matchSearch =
      m.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      m.email
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchStatus =
      filterStatus === "all" ||
      m.status === filterStatus;

    const matchPlan =
      filterPlan === "all" ||
      m.plan === filterPlan;

    return (
      matchSearch &&
      matchStatus &&
      matchPlan
    );
  });

  return (
    <div className="flex min-h-screen bg-[#1a1a14] text-[#e8e0cc]">
      <Sidebar open={sidebarOpen} />

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-[#3a3a2a] bg-[#16160f] px-7 py-4">
          <div>
            <h1 className="text-2xl font-bold">
              Manage Members
            </h1>

            <p className="text-sm text-gray-500">
              Add, edit, and manage gym memberships
            </p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-[#3a3a2a] px-4 py-2 text-sm text-gray-400 hover:bg-[#22221a]">
              <Download size={14} />
              Export
            </button>

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 rounded-lg border border-yellow-500 bg-yellow-500/10 px-4 py-2 text-sm font-semibold text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
            >
              <Plus size={14} />
              Add Member
            </button>
          </div>
        </header>

        <div className="p-7">
          {/* Summary Cards */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "Total Members",
                value: members.length,
                icon: Users,
                color: "text-yellow-500",
                bg: "bg-yellow-500/10",
              },
              {
                label: "Active",
                value: members.filter(
                  (m) => m.status === "active"
                ).length,
                icon: CheckCircle,
                color: "text-green-500",
                bg: "bg-green-500/10",
              },
              {
                label: "Suspended",
                value: members.filter(
                  (m) => m.status === "suspended"
                ).length,
                icon: XCircle,
                color: "text-red-500",
                bg: "bg-red-500/10",
              },
              {
                label: "Inactive",
                value: members.filter(
                  (m) => m.status === "inactive"
                ).length,
                icon: Clock,
                color: "text-gray-400",
                bg: "bg-gray-400/10",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-4 rounded-xl border border-[#3a3a2a] bg-[#22221a] p-5"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.bg}`}
                >
                  <s.icon
                    size={18}
                    className={s.color}
                  />
                </div>

                <div>
                  <h2
                    className={`text-2xl font-bold ${s.color}`}
                  >
                    {s.value}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="mb-5 flex flex-wrap items-center gap-4 rounded-xl border border-[#3a3a2a] bg-[#22221a] p-5">
            {/* Search */}
            <div className="flex min-w-[250px] flex-1 items-center gap-2 rounded-lg border border-[#3a3a2a] bg-[#1a1a14] px-4 py-2">
              <Search
                size={14}
                className="text-gray-500"
              />

              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              {[
                "all",
                "active",
                "suspended",
                "inactive",
              ].map((s) => (
                <button
                  key={s}
                  onClick={() =>
                    setFilterStatus(s)
                  }
                  className={`rounded-lg border px-4 py-2 text-sm capitalize transition ${
                    filterStatus === s
                      ? "border-yellow-500 bg-yellow-500/10 text-yellow-500"
                      : "border-[#3a3a2a] text-gray-400"
                  }`}
                >
                  {s === "all"
                    ? "All Status"
                    : s}
                </button>
              ))}
            </div>

            {/* Plan Filter */}
            <div className="flex gap-2">
              {[
                "all",
                "Premium",
                "Standard",
                "Basic",
              ].map((p) => (
                <button
                  key={p}
                  onClick={() =>
                    setFilterPlan(p)
                  }
                  className={`rounded-lg border px-4 py-2 text-sm transition ${
                    filterPlan === p
                      ? "border-yellow-500 bg-yellow-500/10 text-yellow-500"
                      : "border-[#3a3a2a] text-gray-400"
                  }`}
                >
                  {p === "all"
                    ? "All Plans"
                    : p}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-[#3a3a2a] bg-[#22221a]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#3a3a2a] bg-[#1a1a14]">
                  {[
                    "Member",
                    "Contact",
                    "Plan",
                    "Sessions",
                    "Joined",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-4 text-left text-xs uppercase tracking-wider text-gray-500"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filtered.map((m) => (
                  <tr
                    key={m.id}
                    className="border-b border-[#3a3a2a]/30 transition hover:bg-yellow-500/5"
                  >
                    {/* Member */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-yellow-500/30 bg-gradient-to-br from-yellow-500/20 to-yellow-700/10 font-bold text-yellow-500">
                          {m.avatar}
                        </div>

                        <div>
                          <h3 className="text-sm font-semibold">
                            {m.name}
                          </h3>

                          <p className="text-xs text-gray-500">
                            ID #
                            {m.id
                              .toString()
                              .padStart(
                                4,
                                "0"
                              )}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-4 py-4">
                      <div className="mb-1 flex items-center gap-2 text-sm text-gray-400">
                        <Mail size={12} />
                        {m.email}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Phone size={12} />
                        {m.phone}
                      </div>
                    </td>

                    {/* Plan */}
                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${planColor[m.plan]}`}
                      >
                        {m.plan}
                      </span>
                    </td>

                    {/* Sessions */}
                    <td className="px-4 py-4 text-sm font-semibold">
                      {m.sessions}
                    </td>

                    {/* Joined */}
                    <td className="px-4 py-4 text-sm text-gray-400">
                      {m.joined}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusColor[m.status]}`}
                      >
                        <span className="h-2 w-2 rounded-full bg-current"></span>
                        {m.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <button className="rounded-lg border border-[#3a3a2a] p-2 text-gray-400 transition hover:bg-yellow-500/10 hover:text-yellow-500">
                          <Edit2 size={14} />
                        </button>

                        <button className="rounded-lg border border-[#3a3a2a] p-2 text-gray-400 transition hover:bg-yellow-500/10 hover:text-yellow-500">
                          <Ban size={14} />
                        </button>

                        <button className="rounded-lg border border-red-500/20 p-2 text-red-500 transition hover:bg-red-500/10">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-[#3a3a2a] px-5 py-4">
              <p className="text-sm text-gray-500">
                Showing {filtered.length} of{" "}
                {members.length} members
              </p>

              <div className="flex gap-2">
                {[1, 2, 3].map((p) => (
                  <button
                    key={p}
                    className="h-8 w-8 rounded-lg border border-[#3a3a2a] text-sm text-gray-400 transition hover:border-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-500"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
        >
          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className="w-full max-w-md rounded-2xl border border-[#3a3a2a] bg-[#22221a] p-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                Add New Member
              </h2>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="text-gray-500 hover:text-white"
              >
                <XCircle size={22} />
              </button>
            </div>

            <div className="space-y-4">
              {[
                [
                  "Full Name",
                  "text",
                  "Enter full name",
                ],
                [
                  "Email Address",
                  "email",
                  "Enter email",
                ],
                [
                  "Phone Number",
                  "tel",
                  "+94 XX XXX XXXX",
                ],
              ].map(([label, type, ph]) => (
                <div key={label}>
                  <label className="mb-2 block text-xs uppercase tracking-wider text-gray-500">
                    {label}
                  </label>

                  <input
                    type={type}
                    placeholder={ph}
                    className="w-full rounded-lg border border-[#3a3a2a] bg-[#1a1a14] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-yellow-500"
                  />
                </div>
              ))}

              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider text-gray-500">
                  Membership Plan
                </label>

                <select className="w-full cursor-pointer rounded-lg border border-[#3a3a2a] bg-[#1a1a14] px-4 py-3 text-sm text-white outline-none focus:border-yellow-500">
                  <option>Premium</option>
                  <option>Standard</option>
                  <option>Basic</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="flex-1 rounded-lg border border-[#3a3a2a] py-3 text-sm text-gray-400 hover:bg-[#1a1a14]"
              >
                Cancel
              </button>

              <button className="flex-1 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-700 py-3 text-sm font-bold text-black">
                Add Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}