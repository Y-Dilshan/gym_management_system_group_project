import { Bell, ChevronDown } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="h-16 border-b border-[#2d2d2d] flex items-center justify-between px-6 sticky top-0 z-50 bg-[#0c0c0c]">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 flex items-center justify-center">
          <svg className="w-8 h-8 text-[#f2c94c]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.57 14.86L22 13.43L20.57 12L17 15.57L8.43 7L12 3.43L10.57 2L9.14 3.43L7.71 2L6.28 3.43L4.86 2L3.43 3.43L2 2L2 22L3.43 20.57L4.86 22L6.28 20.57L7.71 22L9.14 20.57L10.57 22L12 18.57L8.43 15L17 6.43L20.57 10L22 8.57L20.57 7.14L22 5.71L20.57 4.29L19.14 5.71L17.71 4.29L16.28 5.71L14.86 4.29L13.43 5.71L12 4.29L10.57 5.71L12 9.14L15.57 12.71L12 16.28L13.43 17.71L14.86 16.28L16.28 17.71L17.71 16.28L19.14 17.71L20.57 16.28L22 17.71L20.57 19.14L22 20.57L20.57 22L19.14 20.57L17.71 22L16.28 20.57L14.86 22L13.43 20.57L12 22V22Z" />
          </svg>
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-widest leading-none">POWER ZONE</h1>
          <p className="text-[10px] text-gray-400">PREMIUM GYM</p>
        </div>
      </div>

      {/* Top Navigation */}
      <nav className="hidden lg:flex items-center gap-8">
        <a className="text-xs font-semibold text-[#f2c94c] border-b-2 border-[#f2c94c] pb-1" href="#">DASHBOARD</a>
        <a className="text-xs font-semibold text-gray-400 hover:text-white" href="#">MEMBERSHIP</a>
        <a className="text-xs font-semibold text-gray-400 hover:text-white" href="#">ORDERS</a>
        <a className="text-xs font-semibold text-gray-400 hover:text-white" href="#">PAYMENTS</a>
        <a className="text-xs font-semibold text-gray-400 hover:text-white" href="#">TRAINERS</a>
        <a className="text-xs font-semibold text-gray-400 hover:text-white" href="#">SUPPLEMENTS</a>
      </nav>

      {/* User Profile & Notifications */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Bell className="w-5 h-5 text-gray-400" />
          <span className="absolute -top-1 -right-1 bg-[#f2c94c] text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">3</span>
        </div>
        <div className="flex items-center gap-2">
          <img
            alt="User Avatar"
            className="w-8 h-8 rounded-full border border-[#f2c94c]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCd9Y4m-ZFXLISHx6S-qt7tKJSzx6qw-X8YAqI5mn3xm9uvlknyLVIyaQCE5sQtlwdbBd3lnM4ao-6TGrnVAsqfBlnjJyyqXkM2d83Ujwxb5_UBHEBCdU8QUZpAbZitMc4V6Sp-21-iBzSFmIscgAv2m1C912fzZl8mFlg_OxuYxmAMGBee5jWC9Ijtsb4lk-LB76wOjcxhZ1LeUqA6gv8Zh6yD-jlQ3mnnPF9F8lTFCD3oXEtFpSAtoGkTrut5UisJoRCAwnbxjfk"
          />
          <span className="text-xs font-semibold">Kajanika</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </header>
  );
}
