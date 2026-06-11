import gymImage from "../assets/hero.png";

export default function MemberDashboard() {
  return (
    <div className="min-h-screen bg-black text-white flex">

      
      {/* Sidebar */}
<aside className="w-[280px] bg-[#0B0B0B] border-r border-yellow-500/10 flex flex-col">

  {/* Logo */}
  <div className="px-6 pt-7 pb-6 border-b border-yellow-500/10">

    <div className="flex items-center gap-3">

      <img
        src="https://via.placeholder.com/100"
        alt="Power Zone"
        className="w-12 h-12"
      />

      <div>
        <h1 className="text-[20px] font-bold leading-none">
          <span className="text-white">POWER </span>
          <span className="text-yellow-400">ZONE</span>
        </h1>

        <p className="text-[11px] text-gray-400 tracking-[2px] mt-1">
          PREMIUM GYM
        </p>
      </div>

    </div>

  </div>

  {/* Menu */}
  <div className="px-6 pt-12">

    <div className="space-y-6">

      <button className="w-full bg-yellow-500 text-black py-4 rounded-xl font-semibold text-left px-6">
        Dashboard
      </button>

      <button className="w-full py-2 px-6 rounded-xl text-left hover:bg-white/5">
        Membership
      </button>

      <button className="w-full py-2 px-6 rounded-xl text-left hover:bg-white/5">
        Orders
      </button>

      <button className="w-full py-2 px-6 rounded-xl text-left hover:bg-white/5">
        Payments
      </button>

      <button className="w-full py-2 px-6 rounded-xl text-left hover:bg-white/5">
        Trainers
      </button>

      <button className="w-full py-2 px-6 rounded-xl text-left hover:bg-white/5">
        Profile
      </button>

      <button className="w-full py-2 px-6 rounded-xl text-left text-red-400 hover:bg-red-500/10">
        Logout
      </button>

    </div>

  </div>

  {/* Push image card to bottom */}
  <div className="flex-1"></div>

  {/* Advertisement Card */}
  <div className="px-5 pb-5">

    <div className="bg-[#111111] rounded-3xl overflow-hidden border border-yellow-500/10">

      <img
        src={gymImage}
        alt="Gym"
        className="w-full h-60 object-cover"
      />

      <div className="p-5">

        <h2 className="text-3xl font-bold leading-tight">
          BE STRONGER
        </h2>

        <h2 className="text-3xl font-bold text-yellow-400 leading-tight">
          THAN YOUR
        </h2>

        <h2 className="text-3xl font-bold leading-tight">
          EXCUSES
        </h2>

        <p className="text-gray-300 mt-4">
          Keep Pushing 💪
        </p>

      </div>

    </div>

  </div>

</aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <header className="h-20 border-b border-yellow-500/20 bg-[#0A0A0A] flex items-center justify-between px-10">

          <div className="flex gap-12 font-medium">

            <span className="text-yellow-400 border-b-2 border-yellow-400 pb-1">
              Dashboard
            </span>

            <span>Membership</span>
            <span>Orders</span>
            <span>Payments</span>
            <span>Trainers</span>
            <span>Supplements</span>

          </div>

          <div className="flex items-center gap-4">

            <div className="relative">

              <span className="text-yellow-400 text-xl">
                🔔
              </span>

              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-yellow-500 text-black text-xs flex items-center justify-center font-bold">
                3
              </div>

            </div>

            <img
              src="https://i.pravatar.cc/100"
              alt="profile"
              className="w-12 h-12 rounded-full border-2 border-yellow-500"
            />

            <span>Kajanika</span>

          </div>

        </header>

        {/* Content */}
        <main className="p-8">

          {/* Hero Card */}
          <div className="rounded-3xl border border-yellow-500/20 bg-[#111111] px-10 py-10">

            <div className="grid grid-cols-5 items-center gap-8">

              <div className="col-span-2">

                <p className="text-2xl text-gray-300">
                  Welcome Back,
                </p>

                <h1 className="text-6xl font-bold text-yellow-400 mt-2">
                  Kajanika 💪
                </h1>

              </div>

              <div className="border-l border-white/10 pl-8">

                <p className="text-gray-400">
                  Current Plan
                </p>

                <h3 className="text-3xl text-yellow-400 font-bold mt-2">
                  Gold Membership
                </h3>

              </div>

              <div className="border-l border-white/10 pl-8">

                <p className="text-gray-400">
                  Status
                </p>

                <p className="text-green-400 text-2xl font-bold mt-2">
                  Active
                </p>

              </div>

              <div className="border-l border-white/10 pl-8">

                <p className="text-gray-400">
                  Expiry Date
                </p>

                <p className="text-yellow-400 text-2xl font-bold mt-2">
                  25 Dec 2026
                </p>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}