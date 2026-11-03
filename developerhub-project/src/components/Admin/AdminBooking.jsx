import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaTrash,
  FaEnvelope,
  FaExclamationCircle,
} from "react-icons/fa";
import AdminLayout from "./AdminLayout";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const TOKEN_KEY = "token"; // AdminLayout wale jaisa rakho

const authHeaders = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const STATUS = {
  pending: {
    label: "Pending",
    icon: <FaClock />,
    badge: "bg-yellow-50 text-yellow-700",
  },
  confirmed: {
    label: "Confirmed",
    icon: <FaCheckCircle />,
    badge: "bg-blue-50 text-blue-600",
  },
  cancelled: {
    label: "Cancelled",
    icon: <FaTimesCircle />,
    badge: "bg-red-50 text-red-600",
  },
};

const getStatus = (m) => {
  const s = String(m.status || "pending").toLowerCase();
  return STATUS[s] ? s : "pending";
};

const formatMeetingDate = (value) => {
  if (!value) return "—";
  const str = String(value);
  const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(str);
  const d = dateOnly
    ? new Date(+dateOnly[1], +dateOnly[2] - 1, +dateOnly[3])
    : new Date(str);
  if (isNaN(d)) return str;
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getCreated = (m) => new Date(m.createdAt || 0).getTime() || 0;

const errorText = (err, fallback) =>
  err.message === "auth" ? "Session expire ho gayi. Dobara login karo." : fallback;

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [notice, setNotice] = useState(null);

  const showNotice = (type, text) => {
    setNotice({ type, text });
    setTimeout(() => setNotice(null), 3500);
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`${API_URL}/bookings`, { headers: authHeaders() });
        if (res.status === 401 || res.status === 403) throw new Error("auth");
        if (!res.ok) throw new Error("failed");

        const data = await res.json();
        const list = Array.isArray(data) ? data : [];
        setBookings([...list].sort((a, b) => getCreated(b) - getCreated(a)));
      } catch (err) {
        showNotice(
          "error",
          errorText(err, "Bookings load nahi ho sakin. Kya backend chal raha hai?")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    setBusyId(id);
    try {
      const res = await fetch(`${API_URL}/bookings/${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ status }),
      });
      if (res.status === 401 || res.status === 403) throw new Error("auth");
      if (!res.ok) throw new Error("failed");

      setBookings((prev) => prev.map((m) => (m._id === id ? { ...m, status } : m)));
      showNotice("success", `Booking ${STATUS[status].label.toLowerCase()} ho gayi.`);
    } catch (err) {
      showNotice("error", errorText(err, "Status update nahi ho saka."));
    } finally {
      setBusyId(null);
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Kya tum is booking ko delete karna chahti ho?")) return;

    setBusyId(id);
    try {
      const res = await fetch(`${API_URL}/bookings/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (res.status === 401 || res.status === 403) throw new Error("auth");
      if (!res.ok) throw new Error("failed");

      setBookings((prev) => prev.filter((m) => m._id !== id));
      showNotice("success", "Booking delete ho gayi.");
    } catch (err) {
      showNotice("error", errorText(err, "Delete nahi ho saka."));
    } finally {
      setBusyId(null);
    }
  };

  const counts = {
    all: bookings.length,
    pending: bookings.filter((m) => getStatus(m) === "pending").length,
    confirmed: bookings.filter((m) => getStatus(m) === "confirmed").length,
    cancelled: bookings.filter((m) => getStatus(m) === "cancelled").length,
  };

  const visible =
    filter === "all" ? bookings : bookings.filter((m) => getStatus(m) === filter);

  const tabs = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "confirmed", label: "Confirmed" },
    { key: "cancelled", label: "Cancelled" },
  ];

  return (
    <AdminLayout
      title="Manage Client Meeting Requests"
      subtitle={
        loading ? "Loading..." : `${counts.all} bookings • ${counts.pending} pending`
      }
    >
      {/* NOTICE */}
      {notice && (
        <div
          className={`mb-6 flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
            notice.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {notice.type === "success" ? <FaCheckCircle /> : <FaExclamationCircle />}
          {notice.text}
        </div>
      )}

      {loading ? (
        <p className="text-center text-gray-500">Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
          Abhi koi meeting request nahi aayi.
        </div>
      ) : (
        <>
          {/* FILTER TABS */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-2 text-sm rounded-lg font-medium transition ${
                  filter === tab.key
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
                }`}
              >
                {tab.label} ({counts[tab.key]})
              </button>
            ))}
          </div>

          {visible.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
              Is category mein koi booking nahi hai.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visible.map((m, i) => {
                const status = getStatus(m);
                const info = STATUS[status];
                const busy = busyId === m._id;

                return (
                  <motion.div
                    key={m._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i, 8) * 0.06 }}
                    className="bg-white rounded-2xl shadow hover:shadow-lg transition border border-gray-100 p-5 flex flex-col"
                  >
                    {/* CLIENT + STATUS */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="text-lg font-bold truncate">{m.name}</h2>
                        <a
                          href={`mailto:${m.email}`}
                          className="text-sm text-gray-500 hover:text-blue-600 break-all"
                        >
                          {m.email}
                        </a>
                      </div>

                      <span
                        className={`shrink-0 flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${info.badge}`}
                      >
                        {info.icon} {info.label}
                      </span>
                    </div>

                    {/* MEETING DETAILS */}
                    <div className="mt-4 text-sm text-gray-600 space-y-2">
                      <p>
                        <strong className="text-gray-800">Service:</strong>{" "}
                        {m.service || "—"}
                      </p>
                      <p className="flex items-center gap-2">
                        <FaCalendarAlt className="text-gray-400" />
                        {formatMeetingDate(m.date)}
                      </p>
                      <p className="flex items-center gap-2">
                        <FaClock className="text-gray-400" />
                        {m.time || "—"}
                      </p>
                    </div>

                    {/* MESSAGE */}
                    {m.message && (
                      <p className="mt-4 text-sm text-gray-700 bg-gray-50 border border-gray-100 p-3 rounded-lg line-clamp-4 whitespace-pre-line flex-1">
                        {m.message}
                      </p>
                    )}

                    {/* ACTIONS */}
                    <div className="flex gap-2 mt-5 flex-wrap">
                      <button
                        onClick={() => updateStatus(m._id, "confirmed")}
                        disabled={busy || status === "confirmed"}
                        className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Confirm
                      </button>

                      <button
                        onClick={() => updateStatus(m._id, "cancelled")}
                        disabled={busy || status === "cancelled"}
                        className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </button>

                      <a
                        href={`mailto:${m.email}?subject=${encodeURIComponent(
                          "Your meeting with DevelopersHub"
                        )}`}
                        aria-label="Email client"
                        title="Email client"
                        className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition flex items-center"
                      >
                        <FaEnvelope />
                      </a>

                      <button
                        onClick={() => deleteBooking(m._id)}
                        disabled={busy}
                        aria-label="Delete booking"
                        title="Delete booking"
                        className="px-3 py-2 bg-gray-800 text-white rounded-lg text-sm hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </>
      )}
    </AdminLayout>
  );
};

export default AdminBookings;