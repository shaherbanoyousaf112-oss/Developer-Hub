import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBlog,
  FaEnvelope,
  FaTachometerAlt,
  FaCode,
  FaBriefcase,
  FaCalendarAlt,
  FaBars,
  FaTimes
} from "react-icons/fa";

const stats = [
  { title: "Services", value: "6+", icon: <FaCode /> },
  { title: "Projects", value: "50+", icon: <FaBriefcase /> },
  { title: "Blogs", value: "10+", icon: <FaBlog /> },
  { title: "Bookings", value: "25+", icon: <FaCalendarAlt /> },
  { title: "Messages", value: "120+", icon: <FaEnvelope /> },
];

const activities = [
  "New service add",
  "Project submitted by client",
  "Delete booking made by client",
  "New blog published",
  "Message received from contact form",
];

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 overflow-x-hidden">

      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-900 text-white flex items-center justify-between px-4 py-3 z-50">
        <h2 className="font-bold">DeveloperHub</h2>
        <button onClick={() => setOpen(!open)}>
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside
        className={`fixed md:fixed top-0 left-0 h-full w-68 bg-gray-900 text-gray-300 shadow-lg transform transition-transform duration-300 z-40
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-10">
            DeveloperHub
          </h2>

         <nav className="space-y-2">

  <Link to="/admin/admin-dashboard">
    <div className="flex items-center gap-3 p-3 rounded-lg mb-2 bg-gray-800 text-white">
      <FaTachometerAlt />
      <span>Dashboard</span>
    </div>
  </Link>

  <Link to="/admin/admin-service">
    <div className="flex items-center gap-3 p-3 mb-2 rounded-lg hover:bg-gray-800 transition">
      <FaCode />
      <span>Services</span>
    </div>
  </Link>

  <Link to="/admin/admin-blog">
    <div className="flex items-center gap-3 p-3 mb-2 rounded-lg hover:bg-gray-800 transition">
      <FaBlog />
      <span>Blogs</span>
    </div>
  </Link>

  <Link to="/admin/admin-portfolio">
    <div className="flex items-center gap-3 p-3 mb-2 rounded-lg hover:bg-gray-800 transition">
      <FaBriefcase />
      <span>Portfolio</span>
    </div>
  </Link>

  <Link to="/admin/admin-contact">
    <div className="flex items-center gap-3 p-3 mb-2 rounded-lg hover:bg-gray-800 transition">
      <FaEnvelope />
      <span>Messages</span>
    </div>
  </Link>

  <Link to="/admin/admin-booking">
    <div className="flex items-center gap-3 mb-2 p-3 rounded-lg hover:bg-gray-800 transition">
      <FaCalendarAlt />
      <span>Bookings</span>
    </div>
  </Link>

</nav>
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
      <div className="flex-1 flex flex-col md:pl-64 pt-16 md:pt-0">

        {/* HEADER */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg md:text-2xl font-bold">Admin Dashboard</h1>
          <div className="text-sm text-gray-600 hidden sm:block">
            Welcome, Admin 👋
          </div>
        </header>

        <main className="p-4 md:p-6">

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 mb-10">
            {stats.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-4 md:p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="text-2xl md:text-3xl text-blue-600 mb-2">
                  {item.icon}
                </div>
                <h3 className="text-sm md:text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="text-xl md:text-2xl font-bold">
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ACTIVITY */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow p-4 md:p-6"
          >
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              Recent Activity
            </h2>

            <ul className="space-y-2 md:space-y-3">
              {activities.map((act, i) => (
                <li
                  key={i}
                  className="text-sm md:text-base text-gray-600 border-b pb-2"
                >
                  {act}
                </li>
              ))}
            </ul>
          </motion.div>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;
