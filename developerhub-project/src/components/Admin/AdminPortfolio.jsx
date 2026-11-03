import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaTimes,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import AdminLayout from "./AdminLayout";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const TOKEN_KEY = "token"; // AdminLayout wale jaisa rakho

const emptyForm = { title: "", description: "", tech: "", image: "" };

const authHeaders = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// "React, Node" ya ["React, Node"] ya ["React", "Node"] -> ["React", "Node"]
const toTechList = (tech) =>
  (Array.isArray(tech) ? tech : [tech || ""])
    .flatMap((t) => String(t).split(","))
    .map((t) => t.trim())
    .filter(Boolean);

const AdminPortfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [notice, setNotice] = useState(null);

  const showNotice = (type, text) => {
    setNotice({ type, text });
    setTimeout(() => setNotice(null), 3500);
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/projects`);
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      showNotice("error", "Projects load nahi ho sakay. Kya backend chal raha hai?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const techList = toTechList(form.tech);

    if (!form.title.trim() || !form.description.trim() || techList.length === 0) {
      showNotice("error", "Title, technologies aur description zaroori hain.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(
        editId ? `${API_URL}/projects/${editId}` : `${API_URL}/projects`,
        {
          method: editId ? "PUT" : "POST",
          headers: authHeaders(),
          body: JSON.stringify({ ...form, tech: techList }),
        }
      );
      if (!res.ok) throw new Error("Save failed");

      showNotice("success", editId ? "Project update ho gaya." : "Project add ho gaya.");
      resetForm();
      fetchProjects();
    } catch (err) {
      showNotice("error", "Save nahi ho saka. Dobara koshish karo.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Kya tum is project ko delete karna chahti ho?")) return;

    try {
      const res = await fetch(`${API_URL}/projects/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error("Delete failed");

      if (editId === id) resetForm();
      showNotice("success", "Project delete ho gaya.");
      fetchProjects();
    } catch (err) {
      showNotice("error", "Delete nahi ho saka.");
    }
  };

  const handleEdit = (project) => {
    setForm({
      title: project.title || "",
      description: project.description || "",
      tech: toTechList(project.tech).join(", "),
      image: project.image || "",
    });
    setEditId(project._id || project.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AdminLayout
      title="Manage Portfolio Projects"
      subtitle={loading ? "Loading..." : `${projects.length} projects`}
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
            {editId ? "Edit Project" : "Add New Project"}
          </h2>
          {editId && (
            <span className="text-xs font-medium bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
              Editing
            </span>
          )}
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Project Title
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. E-commerce Website"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Technologies (comma se alag karo)
              </label>
              <input
                type="text"
                name="tech"
                value={form.tech}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Short description of the project"
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
              value={form.image}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {form.image && (
            <img
              src={form.image}
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

      {/* PROJECT LIST */}
      {loading ? (
        <p className="text-center text-gray-500">Loading projects...</p>
      ) : projects.length === 0 ? (
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-10 text-center text-gray-500">
          Abhi koi project nahi hai. Upar form se pehla project add karo.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project._id || project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-48 w-full object-cover"
                />
              ) : (
                <div className="h-48 w-full bg-gray-100 text-gray-400 text-sm flex items-center justify-center">
                  No Image
                </div>
              )}

              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-lg">{project.title}</h3>

                <div className="flex flex-wrap gap-2 mt-3">
                  {toTechList(project.tech).map((t) => (
                    <span
                      key={t}
                      className="bg-blue-50 text-blue-600 text-xs font-medium px-2.5 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-gray-600 mt-3 mb-5 line-clamp-3 flex-1">
                  {project.description}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(project)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                  >
                    <FaEdit /> Edit
                  </button>

                  <button
                    onClick={() => handleDelete(project._id || project.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminPortfolio;