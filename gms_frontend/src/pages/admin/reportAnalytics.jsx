import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Calendar,
  Package,
  LayoutDashboard,
  Dumbbell,
  Settings,
  LogOut,
  Download,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const GOLD = "#C9A84C";

const revenueMonthly = [42, 58, 51, 73, 68, 84, 72, 91, 80, 96, 88, 100];
const attendanceWeekly = [65, 72, 68, 85, 78, 92, 55];
const newMembersMonthly = [8, 14, 11, 19, 16, 22, 18, 25, 21, 28, 24, 31];

const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const popularClasses = [
  { name: "CrossFit", sessions: 148, pct: 92, color: "#C9A84C" },
  { name: "Yoga", sessions: 124, pct: 77, color: "#4CAF50" },
  { name: "Boxing", sessions: 98, pct: 61, color: "#f44336" },
  { name: "HIIT", sessions: 87, pct: 54, color: "#2196F3" },
];

const topMembers = [
  {
    name: "Dilani Wickramasinghe",
    sessions: 89,
    spent: 124500,
    plan: "Premium",
  },
  {
    name: "Priya Fernando",
    sessions: 67,
    spent: 98200,
    plan: "Premium",
  },
  {
    name: "Arjun Perera",
    sessions: 48,
    spent: 76800,
    plan: "Premium",
  },
];

const revenueSources = [
  { label: "Memberships", value: 68, color: "#C9A84C" },
  { label: "PT Sessions", value: 18, color: "#4CAF50" },
  { label: "Products", value: 14, color: "#2196F3" },
];

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Users, label: "Members" },
  { icon: Dumbbell, label: "Trainers" },
  { icon: Calendar, label: "Bookings" },
  { icon: Package, label: "Products" },
  { icon: BarChart3, label: "Reports", active: true },
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

          <p className="text-[10px] tracking-[3px] text-zinc-500">
            FORCE
          </p>
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
        <div className="flex items-center gap-3 px-3 py-3 text-zinc-500 hover:bg-white/5 rounded-lg cursor-pointer">
          <LogOut size={18} />
          <span className="text-sm">Logout</span>
        </div>
      </div>
    </aside>
  );
}

function DonutChart({ segments }) {
  let cumulative = 0;
  const r = 40;
  const circumference = 2 * Math.PI * r;

  return (
    <svg width="130" height="130" viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke="#2a2a1e"
        strokeWidth="16"
      />

      {segments.map((seg, i) => {
        const offset = cumulative;
        const dash = (seg.value / 100) * circumference;

        cumulative += seg.value;

        return (
          <circle
            key={i}
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth="14"
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeDashoffset={-(offset / 100) * circumference}
            style={{
              transform: "rotate(-90deg)",
              transformOrigin: "50% 50%",
            }}
          />
        );
      })}

      <text
        x="50"
        y="54"
        textAnchor="middle"
        fill="#C9A84C"
        fontSize="12"
        fontWeight="bold"
      >
        68%
      </text>
    </svg>
  );
}

export default function ReportsAnalytics() {
  const [period, setPeriod] = useState("monthly");

  return (
    <div className="min-h-screen bg-[#1a1a14] text-[#e8e0cc] flex">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-[#16160f] border-b border-[#3a3a2a] px-7 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Reports & Analytics
            </h1>

            <p className="text-sm text-zinc-500">
              Revenue, attendance, and performance insights
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#22221a] border border-[#3a3a2a] rounded-lg p-1 flex gap-1">
              {["weekly", "monthly", "yearly"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-4 py-1 rounded-md text-sm capitalize transition
                    ${
                      period === p
                        ? "bg-[#C9A84C]/20 border border-[#C9A84C] text-[#C9A84C]"
                        : "text-zinc-500"
                    }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <button className="px-4 py-2 border border-[#3a3a2a] rounded-lg text-sm text-zinc-400 flex items-center gap-2 hover:bg-white/5">
              <Download size={14} />
              Export PDF
            </button>
          </div>
        </header>

        <div className="p-7">
          {/* KPI CARDS */}
          <div className="grid grid-cols-4 gap-5 mb-6">
            {[
              {
                label: "Total Revenue",
                value: "$24,560",
                change: "+8.3%",
                up: true,
                color: "text-[#C9A84C]",
              },
              {
                label: "Attendance Rate",
                value: "87%",
                change: "+4.1%",
                up: true,
                color: "text-green-500",
              },
              {
                label: "New Members",
                value: "31",
                change: "+29%",
                up: true,
                color: "text-blue-500",
              },
              {
                label: "Churn Rate",
                value: "2.4%",
                change: "-0.8%",
                up: true,
                color: "text-orange-500",
              },
            ].map((k) => (
              <div
                key={k.label}
                className="bg-[#22221a] border border-[#3a3a2a] rounded-2xl p-6"
              >
                <div className="flex justify-between mb-4">
                  <p className="text-xs uppercase tracking-wider text-zinc-500">
                    {k.label}
                  </p>

                  <span className="flex items-center gap-1 text-xs font-semibold text-green-500">
                    {k.up ? (
                      <ArrowUpRight size={12} />
                    ) : (
                      <ArrowDownRight size={12} />
                    )}

                    {k.change}
                  </span>
                </div>

                <h2 className={`text-3xl font-bold mb-1 ${k.color}`}>
                  {k.value}
                </h2>

                <p className="text-xs text-zinc-600">
                  vs last month
                </p>
              </div>
            ))}
          </div>

          {/* Revenue Section */}
          <div className="grid grid-cols-[1fr_340px] gap-5 mb-5">
            {/* Revenue Chart */}
            <div className="bg-[#22221a] border border-[#3a3a2a] rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold">
                    Revenue Trend
                  </h2>

                  <p className="text-sm text-zinc-500">
                    Monthly revenue 2026
                  </p>
                </div>

                <span className="text-2xl font-bold text-[#C9A84C]">
                  $24,560
                </span>
              </div>

              <div className="flex items-end gap-2 h-40 mb-3">
                {revenueMonthly.map((v, i) => (
                  <div
                    key={i}
                    className="flex-1 flex flex-col items-center justify-end"
                  >
                    <div
                      className={`w-full rounded-t-md ${
                        i === 11
                          ? "bg-gradient-to-b from-[#C9A84C] to-[#8B6914]"
                          : "bg-[#C9A84C]/20"
                      }`}
                      style={{ height: `${v}%` }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                {months.map((m, i) => (
                  <div
                    key={i}
                    className={`flex-1 text-center text-xs ${
                      i === 11
                        ? "text-[#C9A84C]"
                        : "text-zinc-600"
                    }`}
                  >
                    {m}
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue Sources */}
            <div className="bg-[#22221a] border border-[#3a3a2a] rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-6">
                Revenue Sources
              </h2>

              <div className="flex justify-center mb-6">
                <DonutChart segments={revenueSources} />
              </div>

              <div className="space-y-4">
                {revenueSources.map((s) => (
                  <div key={s.label}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-zinc-300">
                        {s.label}
                      </span>

                      <span
                        className="text-sm font-bold"
                        style={{ color: s.color }}
                      >
                        {s.value}%
                      </span>
                    </div>

                    <div className="w-full h-2 bg-[#1a1a14] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${s.value}%`,
                          background: s.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Attendance + Classes */}
          <div className="grid grid-cols-2 gap-5 mb-5">
            {/* Attendance */}
            <div className="bg-[#22221a] border border-[#3a3a2a] rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-6">
                Weekly Attendance
              </h2>

              <div className="flex items-end gap-3 h-36 mb-3">
                {attendanceWeekly.map((v, i) => (
                  <div
                    key={i}
                    className="flex-1 flex flex-col items-center justify-end gap-2"
                  >
                    <span className="text-xs text-zinc-500">
                      {v}%
                    </span>

                    <div
                      className={`w-full rounded-t-md ${
                        i === 5
                          ? "bg-gradient-to-b from-green-500 to-green-700"
                          : "bg-green-500/20"
                      }`}
                      style={{ height: `${v}%` }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                {weekDays.map((d, i) => (
                  <div
                    key={i}
                    className={`flex-1 text-center text-xs ${
                      i === 5
                        ? "text-green-500"
                        : "text-zinc-600"
                    }`}
                  >
                    {d}
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Classes */}
            <div className="bg-[#22221a] border border-[#3a3a2a] rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-6">
                Popular Classes
              </h2>

              <div className="space-y-5">
                {popularClasses.map((c, i) => (
                  <div key={c.name}>
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-500">
                          #{i + 1}
                        </span>

                        <span className="font-medium">
                          {c.name}
                        </span>
                      </div>

                      <span className="text-sm text-zinc-500">
                        {c.sessions} sessions
                      </span>
                    </div>

                    <div className="w-full h-2 bg-[#1a1a14] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${c.pct}%`,
                          background: c.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-2 gap-5">
            {/* Member Growth */}
            <div className="bg-[#22221a] border border-[#3a3a2a] rounded-2xl p-6">
              <div className="flex justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold">
                    Member Growth
                  </h2>

                  <p className="text-sm text-zinc-500">
                    New registrations per month
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-bold text-blue-500">
                    +31
                  </span>

                  <p className="text-xs text-green-500">
                    ↑29%
                  </p>
                </div>
              </div>

              <div className="flex items-end gap-2 h-28 mb-3">
                {newMembersMonthly.map((v, i) => (
                  <div key={i} className="flex-1">
                    <div
                      className={`w-full rounded-t-md ${
                        i === 11
                          ? "bg-gradient-to-b from-blue-500 to-blue-800"
                          : "bg-blue-500/20"
                      }`}
                      style={{
                        height: `${(v / 31) * 100}%`,
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                {months.map((m, i) => (
                  <div
                    key={i}
                    className={`flex-1 text-center text-xs ${
                      i === 11
                        ? "text-blue-500"
                        : "text-zinc-600"
                    }`}
                  >
                    {m}
                  </div>
                ))}
              </div>
            </div>

            {/* Top Members */}
            <div className="bg-[#22221a] border border-[#3a3a2a] rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-6">
                Top Members by Activity
              </h2>

              <div className="space-y-3">
                {topMembers.map((m, i) => (
                  <div
                    key={m.name}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#C9A84C]/5 transition cursor-pointer"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                        ${
                          i === 0
                            ? "bg-[#C9A84C]/20 text-[#C9A84C] border border-[#C9A84C]"
                            : "bg-[#2a2a1e] text-zinc-500 border border-[#3a3a2a]"
                        }`}
                    >
                      {i + 1}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-sm font-semibold">
                        {m.name}
                      </h3>

                      <p className="text-xs text-zinc-500">
                        {m.sessions} sessions
                      </p>
                    </div>

                    <div className="text-right">
                      <h3 className="text-sm font-bold text-[#C9A84C]">
                        LKR {m.spent.toLocaleString()}
                      </h3>

                      <p className="text-xs text-zinc-500">
                        {m.plan}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}