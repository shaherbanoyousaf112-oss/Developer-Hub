import React, { useState, useEffect } from "react";
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
  FaTimes,
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

const AdminBlog = () => {
  const [open, setOpen] = useState(false);

  // ✅ BLOG STATE
  const [blogs, setBlogs] = useState([]);
 const [editId, setEditId] = useState(null);
  

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    author: "",
  });

  // ✅ FETCH BLOGS
  const fetchBlogs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/blogs");
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.log(err);
    }
  };

 useEffect(() => {
  fetchBlogs();
}, []);

  // ✅ HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


   // ✅ SUBMIT (CREATE + UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editId
      ? `http://localhost:5000/api/blogs/${editId}`
      : "http://localhost:5000/api/blogs";

    const method = editId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    fetchBlogs();

    setFormData({
      title: "",
      description: "",
      image: "",
      author: "",
    });

    setEditId(null);
  };

   //  DELETE BLOG
  const deleteBlog = async (id) => {
    await fetch(`http://localhost:5000/api/blogs/${id}`, {
      method: "DELETE",
    });

    fetchBlogs();
  };
//  EDIT BLOG
  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      description: blog.description,
      image: blog.image,
      author: blog.author,
    });

    setEditId(blog._id);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 overflow-x-hidden">

      {/* 🔵 MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-900 text-white flex justify-between px-4 py-3 z-50">
        <h2 className="font-bold">DeveloperHub</h2>
        <button onClick={() => setOpen(!open)}>
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* 🔵 SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-68 bg-gray-900 text-gray-300 transform transition duration-300 z-40
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
    <div className="flex items-center gap-3 p-3 mb-2 rounded-lg bg-gray-800 text-white">
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

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* 🟢 MAIN CONTENT */}
      <div className="flex-1 md:pl-64 pt-16 md:pt-0">

        {/* HEADER */}
        <header className="bg-white shadow px-6 py-4">
          <h1 className="text-xl md:text-2xl font-bold">
            Manage Blog Posts
          </h1>
        </header>

        <main className="p-4 md:p-6">

          {/* 🔵 FORM */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-2xl shadow mb-10 max-w-5xl w-full mx-auto"
          >
            <h2 className="text-xl font-semibold mb-6 text-center">
              {editId ? "Edit Blog Post" : "Create Blog Post"}
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Blog Title"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-900"
              />

              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Author Name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-900"
              />

              <textarea
                rows="6"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write full blog content here..."
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-900"
              />

                <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-3 border rounded-lg"
        />

        {formData.image && (
          <img
            src={formData.image}
            alt="preview"
            className="w-full h-48 object-cover rounded-lg"
          />
        )}

              <div className="flex justify-center">
                <button className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
                  <FaPlus />
                  {editId ? "Update Post" : "Publish Post"}
                </button>
              </div>

            </div>
          </motion.form>

          {/* 🟡 BLOG POSTS */}
          <div className="space-y-8 max-w-4xl mx-auto">

            {blogs.map((blog) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow overflow-hidden"
              >

                
            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-40 object-cover"
              />
            )}

                <div className="p-6">

                  <h2 className="text-2xl font-bold mb-2">
                    {blog.title}
                  </h2>

                  <p className="text-xs text-gray-400 mb-3">
                    {new Date(blog.createdAt).toLocaleDateString()} • By {blog.author}
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    {blog.description}
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="px-4 py-1 bg-gray-200 rounded"
                    >
                      <FaEdit /> Edit
                    </button>

                    <button
                      onClick={() => deleteBlog(blog._id)}
                      className="px-4 py-1 bg-red-500 text-white rounded"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>

                </div>
              </motion.div>
            ))}

          </div>

        </main>
      </div>
    </div>
  );
};

export default AdminBlog;