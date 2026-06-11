import { Award, CheckCircle, Calendar, ArrowRight } from "lucide-react";

export default function WelcomeCard() {
  return (
    <section className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-2xl p-8 mb-8 relative overflow-hidden flex items-center justify-between">
      <div className="relative z-10 max-w-md">
        <h2 className="text-xl font-medium text-gray-300">Welcome Back,</h2>
        <div className="flex items-center gap-3 mt-1">
          <h1 className="text-5xl font-bold text-[#f2c94c]">Kajanika</h1>
          <span className="text-4xl">💪</span>
        </div>
        <p className="mt-6 text-gray-400 text-sm">Keep pushing your limits and achieve your best self!</p>
      </div>

      <div className="flex items-center gap-12 relative z-10 mr-12">
        <div className="text-center">
          <Award className="w-6 h-6 text-[#f2c94c] mx-auto mb-2" />
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">Current Plan</p>
          <p className="text-sm font-bold text-[#f2c94c]">Gold Membership</p>
        </div>
        <div className="text-center">
          <CheckCircle className="w-6 h-6 text-[#27ae60] mx-auto mb-2" />
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">Status</p>
          <p className="text-sm font-bold text-[#27ae60] bg-[#27ae60]/10 px-3 py-0.5 rounded-full inline-block">Active</p>
        </div>
        <div className="text-center">
          <Calendar className="w-6 h-6 text-[#f2c94c] mx-auto mb-2" />
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">Expiry Date</p>
          <p className="text-sm font-bold">25 Dec 2026</p>
        </div>
        <button className="border border-[#f2c94c] text-[#f2c94c] px-6 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-[#f2c94c] hover:text-black transition ml-4">
          Renew Membership <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Decorative Background Image */}
      <img
        alt=""
        className="absolute right-0 top-0 h-full w-1/3 object-cover opacity-20 pointer-events-none grayscale"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAHgtuPHl1zeC3YX2hGjGJVtfBz18FtVfrS5_sgh4KmuCv7QGbSYa57kD7lHnahYVzh-rb2-sWiB5gxO_D8GOnFovYZJsYMg2nmg_YEOxEUDnYUUP1kEIBx8USVi1jW2-6UYQR5Nn3y3PUTTvnjvuUgbl9jYis21lEIWAPjUGeIJGCD1CwDfvpQyfj4qkb_ap-kfYRxSCh64zLxHwdE0hm5OIBrshs3NY1wUtl9UOTjlA98m12jhzdrU3AGYdoJVjCUpXrDT7bbr4"
      />
    </section>
  );
}
