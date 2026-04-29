import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaEnvelope,
  FaTrash,
  FaEye,
  FaCheckCircle,
  FaTachometerAlt,
  FaCode,
  FaBlog,
  FaBriefcase,
  FaCalendarAlt,
} from "react-icons/fa";

const AdminContacts = () => {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([]);

  const [selected, setSelected] = useState(null);

  useEffect(() => {
  const token = localStorage.getItem("token");

  fetch("http://localhost:5000/api/contacts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then(data => setMessages(data))
    .catch(err => console.log(err));
}, []);

  const markAsRead = async (id) => {
  const token = localStorage.getItem("token");

  await fetch(`http://localhost:5000/api/contacts/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  setMessages(prev =>
    prev.map(m => (m._id === id ? { ...m, read: true } : m))
  );
};

  const deleteMessage = async (id) => {
  const token = localStorage.getItem("token");

  await fetch(`http://localhost:5000/api/contacts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  setMessages(prev => prev.filter(m => m._id !== id));
};
// ✅ CLOSE MESSAGE
  const closeMessage = () => {
    setSelected(null);
  };
  
  return (
  <div className="flex min-h-screen bg-gray-50 text-gray-800 w-full relative">

    {/* MOBILE TOP BAR */}
    <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-900 text-white flex items-center justify-between px-4 py-3 z-50">
      <h2 className="font-bold">DeveloperHub</h2>
      <button onClick={() => setOpen(!open)}>
        {open ? <FaTimes /> : <FaBars />}
      </button>
    </div>

    {/* SIDEBAR */}
    <aside
      className={`fixed top-0 left-0 h-full w-68 bg-gray-900 text-gray-300 shadow-lg transform transition-transform duration-300 z-40
      ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
    >
      <div className="p-6 pt-16 md:pt-6">
        <h2 className="text-2xl font-bold text-white mb-10">DeveloperHub</h2>

        <nav className="space-y-2">

  <Link to="/admin/admin-dashboard">
    <div className="flex items-center gap-3 p-3 rounded-lg mb-2 hover:bg-gray-800 transition">
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
    <div className="flex items-center gap-3 p-3 mb-2 rounded-lg bg-gray-800 text-white">
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

    {/* OVERLAY */}
    {open && (
      <div
        className="fixed inset-0 bg-black/50 md:hidden z-30"
        onClick={() => setOpen(false)}
      />
    )}

    {/* MAIN */}
   <div className="flex-1 md:pl-64 w-full min-h-screen">

      {/* HEADER */}
      <header className="bg-white shadow px-4 md:px-6 py-4 flex justify-between items-center mt-14 md:mt-0">
        <h1 className="text-base md:text-2xl font-bold">
          Manage Client Messages
        </h1>
        <span className="text-xs md:text-sm text-gray-500">Admin Panel</span>
      </header>

      {/* CONTENT */}
      <main className="p-3 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 w-full">

        {/* MESSAGE LIST */}
        <div className="lg:col-span-1 space-y-3 pr-1">
          {messages.map((msg, i) => (
            <motion.div
              key={msg._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelected(msg)}
              className={`p-3 md:p-4 rounded-xl shadow cursor-pointer border transition
              ${msg.read ? "bg-white" : "bg-blue-50 border-blue-200"}`}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-sm md:text-base">
                  {msg.name}
                </h3>

                {!msg.read && (
                  <span className="text-xs text-blue-600">New</span>
                )}
              </div>

              <p className="text-xs text-gray-500">{msg.email}</p>

              <p className="text-xs md:text-sm text-gray-600 truncate">
                {msg.message}
              </p>
            </motion.div>
          ))}
        </div>

        {/* MESSAGE VIEW */}
        <div className="lg:col-span-2">
          {selected ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-4 md:p-6 rounded-2xl shadow-lg"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg md:text-xl font-bold">
                  {selected.name}
                </h2>

                <button
                  onClick={closeMessage}
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  ✕ Close
                </button>
              </div>

              <p className="text-xs md:text-sm text-gray-500 mb-4">
                {selected.email} • {selected.date}
              </p>

              <p className="text-gray-700 mb-6 text-sm md:text-base leading-relaxed">
                {selected.message}
              </p>

              <div className="flex flex-wrap gap-3">
                {!selected.read && (
                  <button
                    onClick={() => markAsRead(selected._id)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
                  >
                    <FaCheckCircle /> Mark Read
                  </button>
                )}

                <button
                  onClick={() => deleteMessage(selected._id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg text-sm"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="text-center text-gray-500 mt-10 lg:mt-20">
             
            </div>
          )}
        </div>

      </main>
    </div>
  </div>
);
};

export default AdminContacts;
