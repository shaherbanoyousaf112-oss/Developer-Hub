import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaTrash,
  FaCheckCircle,
  FaExclamationCircle,
  FaArrowLeft,
  FaReply,
  FaEnvelopeOpenText,
} from "react-icons/fa";
import AdminLayout from "./AdminLayout";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const TOKEN_KEY = "token"; // AdminLayout wale jaisa rakho

const authHeader = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const formatDate = (value) => {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d)) return String(value);
  return d.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const getTime = (m) => new Date(m.createdAt || m.date || 0).getTime() || 0;

const AdminContacts = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [notice, setNotice] = useState(null);

  const showNotice = (type, text) => {
    setNotice({ type, text });
    setTimeout(() => setNotice(null), 3500);
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API_URL}/contacts`, { headers: authHeader() });

      if (res.status === 401 || res.status === 403) throw new Error("auth");
      if (!res.ok) throw new Error("failed");

      const data = await res.json();
      const list = Array.isArray(data) ? data : [];
      setMessages([...list].sort((a, b) => getTime(b) - getTime(a)));
    } catch (err) {
      showNotice(
        "error",
        err.message === "auth"
          ? "Session expire ho gayi. Dobara login karo."
          : "Messages load nahi ho sakay. Kya backend chal raha hai?"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const selected = messages.find((m) => m._id === selectedId) || null;
  const unreadCount = messages.filter((m) => !m.read).length;
  const visible = filter === "unread" ? messages.filter((m) => !m.read) : messages;

  const markAsRead = async (id) => {
    try {
      const res = await fetch(`${API_URL}/contacts/${id}`, {
        method: "PUT",
        headers: authHeader(),
      });
      if (!res.ok) throw new Error("failed");

      setMessages((prev) => prev.map((m) => (m._id === id ? { ...m, read: true } : m)));
    } catch (err) {
      showNotice("error", "Mark read nahi ho saka.");
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Kya tum is message ko delete karna chahti ho?")) return;

    try {
      const res = await fetch(`${API_URL}/contacts/${id}`, {
        method: "DELETE",
        headers: authHeader(),
      });
      if (!res.ok) throw new Error("failed");

      setMessages((prev) => prev.filter((m) => m._id !== id));
      if (selectedId === id) setSelectedId(null);
      showNotice("success", "Message delete ho gaya.");
    } catch (err) {
      showNotice("error", "Delete nahi ho saka.");
    }
  };

  return (
    <AdminLayout
      title="Manage Client Messages"
      subtitle={
        loading ? "Loading..." : `${messages.length} messages • ${unreadCount} unread`
      }
    >
      {/* NOTICE */}
      {notice && (
        <div
          className={`max-w-6xl mx-auto mb-6 flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
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
        <p className="text-center text-gray-500">Loading messages...</p>
      ) : messages.length === 0 ? (
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-10 text-center text-gray-500">
          Abhi koi message nahi aaya.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">

          {/* MESSAGE LIST */}
          <div className={`lg:col-span-1 ${selected ? "hidden lg:block" : "block"}`}>
            {/* FILTER TABS */}
            <div className="flex gap-2 mb-4">
              {[
                { key: "all", label: `All (${messages.length})` },
                { key: "unread", label: `Unread (${unreadCount})` },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`px-4 py-2 text-sm rounded-lg font-medium transition ${
                    filter === tab.key
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="space-y-3 lg:max-h-[calc(100vh-17rem)] lg:overflow-y-auto lg:pr-1">
              {visible.length === 0 ? (
                <div className="bg-white rounded-xl shadow p-6 text-center text-sm text-gray-500">
                  Koi unread message nahi hai.
                </div>
              ) : (
                visible.map((msg, i) => (
                  <motion.div
                    key={msg._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i, 10) * 0.04 }}
                    onClick={() => setSelectedId(msg._id)}
                    className={`p-4 rounded-xl shadow-sm cursor-pointer border transition hover:shadow-md ${
                      msg._id === selectedId
                        ? "border-blue-600 bg-white"
                        : msg.read
                        ? "bg-white border-gray-200"
                        : "bg-blue-50 border-blue-200"
                    }`}
                  >
                    <div className="flex justify-between items-center gap-2">
                      <h3 className="font-semibold text-sm md:text-base truncate">
                        {msg.name}
                      </h3>
                      {!msg.read && (
                        <span className="shrink-0 text-[11px] font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                          New
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-gray-500 truncate">{msg.email}</p>
                    <p className="text-sm text-gray-600 truncate mt-1">{msg.message}</p>
                    <p className="text-[11px] text-gray-400 mt-2">
                      {formatDate(msg.createdAt || msg.date)}
                    </p>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* MESSAGE VIEW */}
          <div className={`lg:col-span-2 ${selected ? "block" : "hidden lg:block"}`}>
            {selected ? (
              <motion.div
                key={selected._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-5 md:p-7 rounded-2xl shadow-lg"
              >
                {/* Back (mobile) */}
                <button
                  onClick={() => setSelectedId(null)}
                  className="lg:hidden flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-4"
                >
                  <FaArrowLeft /> Back to messages
                </button>

                <div className="flex items-start justify-between gap-3 mb-2">
                  <h2 className="text-xl md:text-2xl font-bold break-words">
                    {selected.name}
                  </h2>

                  <span
                    className={`shrink-0 text-xs font-semibold px-3 py-1 rounded-full ${
                      selected.read
                        ? "bg-gray-100 text-gray-500"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {selected.read ? "Read" : "New"}
                  </span>
                </div>

                <p className="text-xs md:text-sm text-gray-500 mb-6 break-all">
                  {selected.email}
                  {(selected.createdAt || selected.date) &&
                    ` • ${formatDate(selected.createdAt || selected.date)}`}
                </p>

                <p className="text-gray-700 mb-8 text-sm md:text-base leading-relaxed whitespace-pre-line break-words">
                  {selected.message}
                </p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={`mailto:${selected.email}?subject=${encodeURIComponent(
                      "Re: Your message to DevelopersHub"
                    )}`}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
                  >
                    <FaReply /> Reply
                  </a>

                  {!selected.read && (
                    <button
                      onClick={() => markAsRead(selected._id)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition"
                    >
                      <FaCheckCircle /> Mark Read
                    </button>
                  )}

                  <button
                    onClick={() => deleteMessage(selected._id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-400 hidden lg:flex flex-col items-center justify-center min-h-[320px]">
                <FaEnvelopeOpenText className="text-4xl mb-3" />
                <p>Message will show in this place.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminContacts;