import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBlog,
  FaEnvelope,
  FaTachometerAlt,
  FaCode,
  FaBriefcase,
  FaCalendarAlt,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";

// ⚠️ Dashboard.jsx wale TOKEN_KEY aur LOGIN_PATH jaisa hi rakho
const TOKEN_KEY = "token";
const LOGIN_PATH = "/admin/admin-login";

const navItems = [
  { name: "Dashboard", path: "/admin/admin-dashboard", icon: <FaTachometerAlt /> },
  { name: "Services", path: "/admin/admin-service", icon: <FaCode /> },
  { name: "Blogs", path: "/admin/admin-blog", icon: <FaBlog /> },
  { name: "Portfolio", path: "/admin/admin-portfolio", icon: <FaBriefcase /> },
  { name: "Messages", path: "/admin/admin-contact", icon: <FaEnvelope /> },
  { name: "Bookings", path: "/admin/admin-booking", icon: <FaCalendarAlt /> },
];

export default function AdminLayout({ title, subtitle, children }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    navigate(LOGIN_PATH);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 overflow-x-hidden">

      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-900 text-white flex items-center justify-between px-4 h-14 z-50">
        <h2 className="font-bold">DeveloperHub</h2>
        <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="p-2">
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-gray-300 shadow-lg flex flex-col z-40 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="px-6 pt-8 pb-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-white">DeveloperHub</h2>
          <p className="text-[10px] text-gray-500 tracking-[3px] uppercase mt-1">
            Admin Panel
          </p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition ${
                  isActive ? "bg-gray-800 text-white" : "hover:bg-gray-800"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* OVERLAY (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* MAIN */}
      <div className="flex-1 flex flex-col md:pl-64 pt-14 md:pt-0 min-w-0">
        <header className="bg-white shadow px-4 md:px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-lg md:text-2xl font-bold">{title}</h1>
            {subtitle && <p className="text-xs md:text-sm text-gray-500 mt-0.5">{subtitle}</p>}
          </div>
          <span className="text-sm text-gray-500 hidden sm:block">Admin Panel</span>
        </header>

        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}