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

const AdminServices = () => {
const [open, setOpen] = useState(false);
const [services, setServices] = useState([]);
const [preview, setPreview] = useState(null);
const [editId, setEditId] = useState(null);

const [formData, setFormData] = useState({
  title: "",
  description: "",
  image: "",
});

const fetchServices = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/services");
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.log("Error fetching services:", err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editId
      ? `http://localhost:5000/api/services/${editId}`
      : "http://localhost:5000/api/services";

    const method = editId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    fetchServices();

    setFormData({ title: "", description: "", image: "" });
    setPreview(null);
    setEditId(null);
  };
 
  // ✅ DELETE FIX (_id not id)
  const deleteService = async (id) => {
    await fetch(`http://localhost:5000/api/services/${id}`, {
      method: "DELETE",
    });

    fetchServices();
  };

  
  // ✅ EDIT
  const handleEdit = (service) => {
    setFormData({
      title: service.title,
      description: service.description,
      image: service.image || "",
    });

    setEditId(service._id); // FIXED
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
        className={`fixed top-0 left-0 h-full w-68 bg-gray-900 text-gray-300 shadow-lg transform transition-transform duration-300 z-40
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
    <div className="flex items-center gap-3 p-3 mb-2 rounded-lg bg-gray-800 text-white ">
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

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* 🟢 MAIN CONTENT */}
      <div className="flex-1 flex flex-col md:pl-64 pt-16 md:pt-0">

        {/* HEADER */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg md:text-2xl font-bold">
            Manage Services
          </h1>
          <span className="text-sm text-gray-500 hidden sm:block">
            Admin Panel
          </span>
        </header>

        <main className="p-4 md:p-6">

          {/* 🔵 FORM */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
           className="bg-white p-6 rounded-xl shadow mb-10 max-w-5xl w-full mx-auto"
          >
            <h2 className="text-lg font-semibold mb-4">
              {editId ? "Edit Service" : "Add New Service"}
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Service Title"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-900"
              />
 
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Service Description"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-900"
              />
             <input
  type="text"
  name="image"
  value={formData.image}
  onChange={handleChange}
  placeholder="Image URL (https://...)"
  className="w-full p-3 border rounded-lg"
/>

{/* ✅ PREVIEW IMAGE */}
{formData.image && (
  <img
    src={formData.image}
    alt="preview"
    className="w-full h-52 object-cover rounded-lg"
  />
)}
              <div className="flex justify-center">
  <button className="flex items-center gap-2 px-12 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
    <FaPlus />
    {editId ? "Update" : "Add"}
  </button>
</div>
            </div>
          </motion.form>

          {/* 🟡 SERVICE CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                   {/* ✅ IMAGE ADDED HERE */}
               {service.image ? (
  <img
    src={service.image}
    alt="service"
    className="w-full h-50 object-cover rounded-lg mb-3"
  />
) : (
  <div className="w-full h-50 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
    No Image
  </div>
)}
                <h3 className="font-semibold text-lg mb-2">
                  {service.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(service)}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    <FaEdit /> Edit
                  </button>

                  <button
                    onClick={() => deleteService(service._id)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <FaTrash /> Delete
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

export default AdminServices;