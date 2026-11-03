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

const emptyForm = { title: "", author: "", description: "", image: "" };

const authHeaders = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

const AdminBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [notice, setNotice] = useState(null);

  const showNotice = (type, text) => {
    setNotice({ type, text });
    setTimeout(() => setNotice(null), 3500);
  };

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${API_URL}/blogs`);
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (err) {
      showNotice("error", "Blogs load nahi ho sakin. Kya backend chal raha hai?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
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
      showNotice("error", "Title aur blog content zaroori hain.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(
        editId ? `${API_URL}/blogs/${editId}` : `${API_URL}/blogs`,
        {
          method: editId ? "PUT" : "POST",
          headers: authHeaders(),
          body: JSON.stringify(formData),
        }
      );
      if (!res.ok) throw new Error("Save failed");

      showNotice("success", editId ? "Blog update ho gaya." : "Blog publish ho gaya.");
      resetForm();
      fetchBlogs();
    } catch (err) {
      showNotice("error", "Save nahi ho saka. Dobara koshish karo.");
    } finally {
      setSaving(false);
    }
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Kya tum is blog ko delete karna chahti ho?")) return;

    try {
      const res = await fetch(`${API_URL}/blogs/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error("Delete failed");

      if (editId === id) resetForm();
      showNotice("success", "Blog delete ho gaya.");
      fetchBlogs();
    } catch (err) {
      showNotice("error", "Delete nahi ho saka.");
    }
  };

  const handleEdit = (blog) => {
    setFormData({
      title: blog.title || "",
      author: blog.author || "",
      description: blog.description || "",
      image: blog.image || "",
    });
    setEditId(blog._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AdminLayout
      title="Manage Blog Posts"
      subtitle={loading ? "Loading..." : `${blogs.length} posts`}
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
        className="bg-white p-5 md:p-8 rounded-2xl shadow mb-10 max-w-5xl w-full mx-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg md:text-xl font-semibold">
            {editId ? "Edit Blog Post" : "Create Blog Post"}
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
                Blog Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Why React is Great"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Author (optional)
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Author name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Blog Content
            </label>
            <textarea
              rows={8}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write full blog content here..."
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
              className="flex items-center justify-center gap-2 px-10 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <FaPlus />
              {saving ? "Saving..." : editId ? "Update Post" : "Publish Post"}
            </button>

            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center justify-center gap-2 px-10 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition"
              >
                <FaTimes />
                Cancel
              </button>
            )}
          </div>
        </div>
      </motion.form>

      {/* BLOG POSTS */}
      {loading ? (
        <p className="text-center text-gray-500">Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-10 text-center text-gray-500">
          Abhi koi blog nahi hai. Upar form se pehla blog publish karo.
        </div>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {blogs.map((blog) => (
            <motion.article
              key={blog._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow overflow-hidden hover:shadow-lg transition"
            >
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-56 object-cover"
                />
              )}

              <div className="p-5 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold mb-2">{blog.title}</h2>

                <p className="text-xs text-gray-400 mb-3">
                  {formatDate(blog.createdAt)}
                  {blog.createdAt && " • "}By {blog.author || "Admin"}
                </p>

                <p className="text-gray-700 leading-relaxed mb-6 line-clamp-4 whitespace-pre-line">
                  {blog.description}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                  >
                    <FaEdit /> Edit
                  </button>

                  <button
                    onClick={() => deleteBlog(blog._id)}
                    className="flex items-center gap-2 px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminBlog;