import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaTrash,
  FaTachometerAlt,
  FaCode,
  FaBlog,
  FaBriefcase,
  FaEnvelope,
} from "react-icons/fa";

const AdminBookings = () => {
  const [open, setOpen] = useState(false);

  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
  const token = localStorage.getItem("token");

  fetch("http://localhost:5000/api/bookings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then(data => {
      console.log("Admin Bookings:", data);

      if (Array.isArray(data)) {
        setMeetings(data);
      } else {
        setMeetings([]);
      }
    })
    .catch(err => console.log(err));
}, []);

  const deleteMeeting = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/bookings/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // 🔥 REMOVE FROM UI ONLY (NO REFRESH NEEDED)
    setMeetings(prev => prev.filter(m => m._id !== id));

  } catch (error) {
    console.log(error);
  }
};
const updateStatus = async (id, status) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:5000/api/bookings/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    const data = await res.json();
    console.log("Updated:", data);

    // update UI instantly
    setMeetings(prev =>
      prev.map(m =>
        m._id === id ? { ...m, status } : m
      )
    );

  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 overflow-x-hidden w-full">

      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-900 text-white flex justify-between items-center px-4 py-3 z-50">
        <h2 className="font-bold">DeveloperHub</h2>
        <button onClick={() => setOpen(!open)}>
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-68 bg-gray-900 text-gray-300 shadow-lg transform transition duration-300 z-40
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-10">
            DeveloperHub
          </h2>

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
    <div className="flex items-center gap-3 p-3 mb-2 rounded-lg hover:bg-gray-800 transition">
      <FaEnvelope />
      <span>Messages</span>
    </div>
  </Link>

  <Link to="/admin/admin-booking">
    <div className="flex items-center gap-3 mb-2 p-3 rounded-lg bg-gray-800 text-white">
      <FaCalendarAlt />
      <span>Bookings</span>
    </div>
  </Link>

</nav>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 md:pl-64 pt-16 md:pt-0">

        {/* HEADER */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg md:text-2xl font-bold">
            Manage Client Meeting Requests
          </h1>
          <span className="text-sm text-gray-500">Admin Panel</span>
        </header>

        {/* CONTENT */}
        <main className="p-4 md:p-6">

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(meetings) &&
            meetings.map((m, i) => (
              <motion.div
                key={m._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow p-5 border"
              >

                {/* CLIENT INFO */}
                <h2 className="text-lg font-bold">{m.name}</h2>
                <p className="text-sm text-gray-500">{m.email}</p>

                {/* MEETING DETAILS */}
                <div className="mt-3 text-sm text-gray-600 space-y-1">
                  <p><strong>Service:</strong> {m.service}</p>
                  <p><strong>Date:</strong> {m.date}</p>
                  <p><strong>Time:</strong> {m.time}</p>
                </div>

                {/* MESSAGE */}
                <p className="mt-3 text-sm text-gray-700 bg-gray-100 p-2 rounded">
                  {m.message}
                </p>

                {/* STATUS */}
                <div className="mt-4 flex items-center gap-2">
                  {m.status === "pending" && (
                    <span className="flex items-center gap-1 text-yellow-600">
                      <FaClock /> Pending
                    </span>
                  )}
                  {m.status === "confirmed" && (
                    <span className="flex items-center gap-1 text-blue-600">
                      <FaCheckCircle /> Confirmed
                    </span>
                  )}
                  {m.status === "cancelled" && (
                    <span className="flex items-center gap-1 text-red-600">
                      <FaTimesCircle /> Cancelled
                    </span>
                  )}
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2 mt-4 flex-wrap">

                  <button
                    onClick={() => updateStatus(m._id, "confirmed")}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm"
                  >
                    Confirm
                  </button>

                  <button
                    onClick={() => updateStatus(m._id, "cancelled")}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => deleteMeeting(m._id)}
                    className="px-3 py-1 bg-gray-800 text-white rounded-lg text-sm"
                  >
                    <FaTrash />
                  </button>

                </div>

              </motion.div>
            ))}

          </div>

        </main>
      </div>
    </div>
  );
};

export default AdminBookings;