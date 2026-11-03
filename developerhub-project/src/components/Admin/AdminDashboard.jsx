import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
  FaPlus,
  FaArrowRight,
} from "react-icons/fa";

// ⚠️ Apne login system ke hisaab se in do ko theek karo
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

// Sample data: baad mein backend API se connect karna hai
const stats = [
  { title: "Services", value: "6+", icon: <FaCode />, path: "/admin/admin-service" },
  { title: "Projects", value: "50+", icon: <FaBriefcase />, path: "/admin/admin-portfolio" },
  { title: "Blogs", value: "10+", icon: <FaBlog />, path: "/admin/admin-blog" },
  { title: "Bookings", value: "25+", icon: <FaCalendarAlt />, path: "/admin/admin-booking" },
  { title: "Messages", value: "120+", icon: <FaEnvelope />, path: "/admin/admin-contact" },
];

// Sample data
const activities = [
  { text: "New service added", time: "2 hours ago", icon: <FaCode /> },
  { text: "Project submitted by client", time: "5 hours ago", icon: <FaBriefcase /> },
  { text: "Booking cancelled by client", time: "Yesterday", icon: <FaCalendarAlt /> },
  { text: "New blog published", time: "Yesterday", icon: <FaBlog /> },
  { text: "Message received from contact form", time: "2 days ago", icon: <FaEnvelope /> },
];

const quickActions = [
  { label: "Add Service", path: "/admin/admin-service" },
  { label: "Write Blog", path: "/admin/admin-blog" },
  { label: "Add Project", path: "/admin/admin-portfolio" },
  { label: "View Bookings", path: "/admin/admin-booking" },
];

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
};

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

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
                  isActive
                    ? "bg-gray-800 text-white"
                    : "hover:bg-gray-800"
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

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col md:pl-64 pt-14 md:pt-0 min-w-0">

        {/* HEADER */}
        <header className="bg-white shadow px-4 md:px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-lg md:text-2xl font-bold">
              {getGreeting()}, Admin 
            </h1>
            <p className="text-xs md:text-sm text-gray-500 mt-0.5">{today}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-gray-800">Admin</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              A
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8 space-y-8">

          {/* STATS */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
              Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
              {stats.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={item.path}
                    className="group block bg-white p-5 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition duration-200"
                  >
                    <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-lg group-hover:bg-blue-600 group-hover:text-white transition">
                      {item.icon}
                    </div>
                    <p className="mt-4 text-sm text-gray-500">{item.title}</p>
                    <p className="text-2xl md:text-3xl font-bold text-gray-900">
                      {item.value}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ACTIVITY + QUICK ACTIONS */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ACTIVITY */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 bg-white rounded-xl shadow p-5 md:p-6"
            >
              <h2 className="text-lg font-semibold mb-5">Recent Activity</h2>

              <ul className="divide-y divide-gray-100">
                {activities.map((act, i) => (
                  <li key={i} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-sm">
                      {act.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm md:text-base text-gray-700 truncate">
                        {act.text}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{act.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* QUICK ACTIONS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow p-5 md:p-6"
            >
              <h2 className="text-lg font-semibold mb-5">Quick Actions</h2>

              <div className="space-y-3">
                {quickActions.map((action) => (
                  <Link
                    key={action.label}
                    to={action.path}
                    className="group flex items-center justify-between px-4 py-3 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:border-blue-600 hover:bg-blue-600 hover:text-white transition"
                  >
                    <span className="flex items-center gap-3">
                      <FaPlus className="text-xs" />
                      {action.label}
                    </span>
                    <FaArrowRight className="text-xs opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;