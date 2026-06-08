import {
  LayoutGrid, Award, ShoppingCart, CreditCard,
  CalendarCheck2, Users, UserCircle, Settings, LogOut,
} from "lucide-react";

const navItems = [
  { icon: LayoutGrid, label: "Dashboard", active: true },
  { icon: Award, label: "Membership" },
  { icon: ShoppingCart, label: "Orders" },
  { icon: CreditCard, label: "Payments" },
  { icon: CalendarCheck2, label: "Attendance" },
  { icon: Users, label: "Trainers" },
  { icon: UserCircle, label: "Profile" },
  { icon: Settings, label: "Settings" },
];

export default function DashboardSidebar() {
  return (
    <aside className="w-64 border-r border-[#2d2d2d] flex flex-col p-4 gap-2 bg-[#0c0c0c]">
      {navItems.map(({ icon: Icon, label, active }) => (
        <a
          key={label}
          href="#"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
            active
              ? "text-[#f2c94c] bg-[rgba(242,201,76,0.1)] border-r-[3px] border-[#f2c94c]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Icon className="w-5 h-5" />
          {label}
        </a>
      ))}

      <div className="mt-auto border-t border-[#2d2d2d] pt-2">
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white text-sm font-medium">
          <LogOut className="w-5 h-5" />
          Logout
        </a>
      </div>

      {/* Promotional Banner Card */}
      <div className="mt-6 rounded-2xl overflow-hidden relative group">
        <img
          alt="Gym Promo"
          className="w-full h-80 object-cover opacity-50"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJmLcPJtasuJ1I0FtFl5qLtHRXBLX2-z-GbelzQSP9GW9OTghZ63tLyPE8U8pVzgCrehtIPbnxKkDfUxP3hHuuaqUJox8RGQyQ_HBg_KPm3YhO519iGeVf28Xn-Rf3vPKmIjpnmEeQis-MhXdkNAIxxI8cUpSqkb7fpWFQMZ9jIzby6LVxTnGrWg6jUQCHKVCXXrEAdLnIoof2X4e0OW5ISF5SfpBVMo_rmPAUhP9fr9zQmjX_8jaFDBy7pZoCizpHNZ6WjqR80mo"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-4">
          <h3 className="text-lg font-bold uppercase leading-tight">
            BE STRONGER<br />THAN YOUR<br />EXCUSES
          </h3>
          <button className="mt-4 border border-[#f2c94c] text-[#f2c94c] px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#f2c94c] hover:text-black transition flex items-center justify-center gap-2">
            Keep Pushing
          </button>
        </div>
      </div>
    </aside>
  );
}
