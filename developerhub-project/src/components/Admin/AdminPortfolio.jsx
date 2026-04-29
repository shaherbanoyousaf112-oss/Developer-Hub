import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaCode,
  FaBlog,
  FaBriefcase,
  FaEnvelope,
  FaCalendarAlt,
} from "react-icons/fa";

const AdminPortfolio = () => {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [preview, setPreview] = useState(null);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    tech: "",
    image: "",
  });

  // =========================
  // FETCH PROJECTS
  // =========================
  const fetchProjects = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.log("Error fetching projects:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // =========================
  // INPUT HANDLER
  // =========================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 
  // =========================
  // SUBMIT (CREATE / UPDATE)
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.tech) return;

    try {
      const url = editId
        ? `http://localhost:5000/api/projects/${editId}`
        : "http://localhost:5000/api/projects";

      const method = editId ? "PUT" : "POST";

      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      fetchProjects();

      setForm({ title: "", description: "", tech: "", image: "" });
      setPreview(null);
      setEditId(null);
    } catch (err) {
      console.log("Error saving project:", err);
    }
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: "DELETE",
      });

      fetchProjects();
    } catch (err) {
      console.log("Error deleting:", err);
    }
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (project) => {
  setForm({
    title: project.title,
    description: project.description,
    tech: project.tech,
    image: project.image,
  });

  setPreview(project.image);
  setEditId(project._id || project.id);
};

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 overflow-x-hidden">

      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-900 text-white flex justify-between px-4 py-3 z-50">
        <h2 className="font-bold">DeveloperHub</h2>
        <button onClick={() => setOpen(!open)}>
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-68 bg-gray-900 text-gray-300 shadow-lg transition duration-300 z-40
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-10">
            DeveloperHub
          </h2>

          <nav className="space-y-2">

            <Link to="/admin/admin-dashboard">
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 mb-2">
                <FaTachometerAlt /> Dashboard
              </div>
            </Link>

            <Link to="/admin/admin-service">
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 mb-2">
                <FaCode /> Services
              </div>
            </Link>

            <Link to="/admin/admin-blog">
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 mb-2">
                <FaBlog /> Blogs
              </div>
            </Link>

            <Link to="/admin/admin-portfolio">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800 text-white mb-2">
                <FaBriefcase /> Portfolio
              </div>
            </Link>

            <Link to="/admin/admin-contact">
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 mb-2">
                <FaEnvelope /> Messages
              </div>
            </Link>

            <Link to="/admin/admin-booking">
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 mb-2">
                <FaCalendarAlt /> Bookings
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
      <div className="flex-1 md:pl-64 pt-16 md:pt-0">

        {/* HEADER */}
        <header className="bg-white shadow px-6 py-4">
          <h1 className="text-xl md:text-2xl font-bold">
            Manage Portfolio Projects
          </h1>
        </header>

        <main className="p-6">

          {/* FORM */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow mb-10 max-w-5xl mx-auto"
          >
            <h2 className="text-lg font-semibold mb-4">
              {editId ? "Edit Project" : "Add Project"}
            </h2>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Project Title"
              className="w-full p-3 border rounded-lg mb-3"
            />

            <input
              type="text"
              name="tech"
              value={form.tech}
              onChange={handleChange}
              placeholder="Technologies"
              className="w-full p-3 border rounded-lg mb-3"
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full p-3 border rounded-lg mb-3"
            />
            <input
  type="text"
  name="image"
  value={form.image}
  onChange={handleChange}
  placeholder="Enter Image URL (https://...)"
  className="w-full p-3 border rounded-lg mb-3"
/>
{form.image && (
  <img
    src={form.image}
    alt="preview"
    className="w-full h-52 object-cover rounded-lg mt-3"
  />
)}

            <div className="flex justify-center mt-4">
              <button className="flex items-center gap-2 px-12 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <FaPlus />
                {editId ? "Update" : "Add"}
              </button>
            </div>
          </motion.form>

          {/* PROJECT LIST */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {projects.map((project) => (
              <motion.div
                key={project._id || project.id}
                className="bg-white rounded-xl shadow overflow-hidden"
              >
              {project.image ? (
  <img
    src={project.image}
    className="h-48 w-full object-cover"
    alt={project.title}
  />
) : (
  <div className="h-48 w-full bg-gray-200 flex items-center justify-center text-gray-500">
    No Image
  </div>
)}
                <div className="p-4">
                  <h3 className="font-bold">{project.title}</h3>
                  <p className="text-sm text-gray-600">{project.tech}</p>
                  <p className="text-sm mt-2">{project.description}</p>

                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => handleEdit(project)}
                      className="px-3 py-1 bg-gray-200 rounded flex items-center gap-1"
                    >
                      <FaEdit /> Edit
                    </button>

                    <button
                      onClick={() => handleDelete(project._id || project.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded flex items-center gap-1"
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

export default AdminPortfolio;