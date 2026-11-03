import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaTimes,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import AdminLayout from "./AdminLayout";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const TOKEN_KEY = "token"; // AdminLayout wale jaisa rakho

const emptyForm = { title: "", description: "", image: "" };

const authHeaders = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [notice, setNotice] = useState(null);

  const showNotice = (type, text) => {
    setNotice({ type, text });
    setTimeout(() => setNotice(null), 3500);
  };

  const fetchServices = async () => {
    try {
      const res = await fetch(`${API_URL}/services`);
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (err) {
      showNotice("error", "Services load nahi ho sakin. Kya backend chal raha hai?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      showNotice("error", "Title aur description zaroori hain.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(
        editId ? `${API_URL}/services/${editId}` : `${API_URL}/services`,
        {
          method: editId ? "PUT" : "POST",
          headers: authHeaders(),
          body: JSON.stringify(formData),
        }
      );
      if (!res.ok) throw new Error("Save failed");

      showNotice("success", editId ? "Service update ho gayi." : "Service add ho gayi.");
      resetForm();
      fetchServices();
    } catch (err) {
      showNotice("error", "Save nahi ho saka. Dobara koshish karo.");
    } finally {
      setSaving(false);
    }
  };

  const deleteService = async (id) => {
    if (!window.confirm("Kya tum is service ko delete karna chahti ho?")) return;

    try {
      const res = await fetch(`${API_URL}/services/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error("Delete failed");

      if (editId === id) resetForm();
      showNotice("success", "Service delete ho gayi.");
      fetchServices();
    } catch (err) {
      showNotice("error", "Delete nahi ho saka.");
    }
  };

  const handleEdit = (service) => {
    setFormData({
      title: service.title,
      description: service.description,
      image: service.image || "",
    });
    setEditId(service._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AdminLayout
      title="Manage Services"
      subtitle={loading ? "Loading..." : `${services.length} services`}
    >
      {/* NOTICE */}
      {notice && (
        <div
          className={`max-w-5xl mx-auto mb-6 flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
            notice.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {notice.type === "success" ? <FaCheckCircle /> : <FaExclamationCircle />}
          {notice.text}
        </div>
      )}

      {/* FORM */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-5 md:p-6 rounded-xl shadow mb-10 max-w-5xl w-full mx-auto"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold">
            {editId ? "Edit Service" : "Add New Service"}
          </h2>
          {editId && (
            <span className="text-xs font-medium bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
              Editing
            </span>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Service Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Web Development"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Short description of the service"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Image URL (optional)
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {formData.image && (
            <img
              src={formData.image}
              alt="preview"
              onError={(e) => (e.currentTarget.style.display = "none")}
              onLoad={(e) => (e.currentTarget.style.display = "block")}
              className="w-full h-52 object-cover rounded-lg"
            />
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center justify-center gap-2 px-10 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <FaPlus />
              {saving ? "Saving..." : editId ? "Update" : "Add"}
            </button>

            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center justify-center gap-2 px-10 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
              >
                <FaTimes />
                Cancel
              </button>
            )}
          </div>
        </div>
      </motion.form>

      {/* SERVICE CARDS */}
      {loading ? (
        <p className="text-center text-gray-500">Loading services...</p>
      ) : services.length === 0 ? (
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-10 text-center text-gray-500">
          Abhi koi service nahi hai. Upar form se pehli service add karo.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition flex flex-col"
            >
              {service.image ? (
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 text-gray-400 text-sm rounded-lg mb-4 flex items-center justify-center">
                  No Image
                </div>
              )}

              <h3 className="font-semibold text-lg mb-2">{service.title}</h3>

              <p className="text-gray-600 text-sm mb-5 line-clamp-3 flex-1">
                {service.description}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(service)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  <FaEdit /> Edit
                </button>

                <button
                  onClick={() => deleteService(service._id)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminServices;