import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaTwitter } from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import { FiChevronRight } from "react-icons/fi";

const quickLinks = [
  "Home",
  "About Us",
  "Our Services",
  "Trainers",
  "Membership Plans",
  "BMI Calculator",
  "Contact Us",
];

const services = [
  "Schedules",
  "Personal Training",
  "Diet Plans",
  "Supplements",
  "Modern Equipment",
  "Group Classes",
];

const hours = [
  { day: "Mon – Fri", time: "5:00 AM – 11:00 PM" },
  { day: "Saturday", time: "6:00 AM – 10:00 PM" },
  { day: "Sunday", time: "7:00 AM – 8:00 PM" },
];

const socialLinks = [
  { icon: <FaFacebookF />, label: "Facebook" },
  { icon: <FaInstagram />, label: "Instagram" },
  { icon: <FaYoutube />, label: "YouTube" },
  { icon: <FaTiktok />, label: "TikTok" },
  { icon: <FaTwitter />, label: "Twitter" },
];

const contactInfo = [
  {
    icon: <MdLocationOn size={18} />,
    label: "Location",
    value: "123 Fitness Avenue, Colombo 03, Sri Lanka",
  },
  {
    icon: <MdPhone size={18} />,
    label: "Call Us",
    value: "+94 77 123 4567",
  },
  {
    icon: <MdEmail size={18} />,
    label: "Email",
    value: "info@powerzone.lk",
  },
];

function ColHeading({ children }) {
  return (
    <div className="mb-5">
      <h3
        className="text-[#d4a017] font-bold tracking-widest uppercase text-base"
        style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "18px" }}
      >
        {children}
      </h3>
      <div className="mt-1.5 w-7 h-0.5 bg-[#d4a017] opacity-50" />
    </div>
  );
}

export default function Footer() {
  return (
    <>
      {/* Google Font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;500;600&display=swap');
        .pz-footer * { font-family: 'Barlow', sans-serif; }
        .pz-logo { font-family: 'Bebas Neue', sans-serif !important; }
        .pz-heading { font-family: 'Bebas Neue', sans-serif !important; }
        .pz-live-dot {
          animation: pzPulse 2s infinite;
        }
        @keyframes pzPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>

      <footer className="pz-footer bg-[#0d0d0d] text-[#c9c9c9] border-t-[3px] border-[#d4a017] w-full">

        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-8 md:px-12 py-14 border-b border-[#1f1f1f]">

          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="pz-logo text-[#d4a017] text-4xl tracking-widest mb-1">
              ⚡ Power Zone
            </div>
            <p className="text-[11px] tracking-[3px] uppercase text-[#666] mb-4">
              Unleash Your Potential
            </p>
            <p className="text-[13.5px] text-[#777] leading-relaxed font-light mb-6">
              Your ultimate fitness destination — built for those who push limits,
              break barriers, and pursue greatness every single day.
            </p>
            {/* Social Icons */}
            <div className="flex gap-2.5">
              {socialLinks.map(({ icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-md border border-[#2e2e2e] text-[#777] text-sm transition-all duration-200 hover:border-[#d4a017] hover:text-[#d4a017] hover:bg-[#d4a01710]"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <ColHeading>Quick Links</ColHeading>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="flex items-center gap-1.5 text-[13.5px] text-[#777] font-light transition-colors duration-200 hover:text-[#d4a017] group"
                  >
                    <FiChevronRight
                      size={13}
                      className="text-[#d4a017] opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <ColHeading>Our Services</ColHeading>
            <ul className="flex flex-col gap-2.5">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#"
                    className="flex items-center gap-1.5 text-[13.5px] text-[#777] font-light transition-colors duration-200 hover:text-[#d4a017] group"
                  >
                    <FiChevronRight
                      size={13}
                      className="text-[#d4a017] opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <ColHeading>Contact & Hours</ColHeading>

            <div className="flex flex-col gap-4 mb-5">
              {contactInfo.map(({ icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-md bg-[#d4a01715] border border-[#d4a01740] flex items-center justify-center text-[#d4a017] shrink-0">
                    {icon}
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest text-[#555] mb-0.5">
                      {label}
                    </span>
                    <span className="text-[13px] text-[#888] font-light leading-snug">
                      {value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Hours */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[12.5px]">
              {hours.map(({ day, time }, i) => (
                <>
                  {i > 0 && (
                    <div key={`div-${i}`} className="col-span-2 h-px bg-[#1f1f1f] my-1" />
                  )}
                  <span key={`day-${i}`} className="text-[#555] font-light">{day}</span>
                  <span key={`time-${i}`} className="text-[#888] text-right">{time}</span>
                </>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-8 md:px-12 py-5">
          <p className="text-xs text-[#3a3a3a] font-light">
            © 2026 <span className="text-[#d4a017]">Power Zone Gym</span>. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-[#333]">
            <span className="pz-live-dot w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            Gym is open today
          </div>

          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Use", "Sitemap"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-[#3a3a3a] font-light hover:text-[#d4a017] transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}