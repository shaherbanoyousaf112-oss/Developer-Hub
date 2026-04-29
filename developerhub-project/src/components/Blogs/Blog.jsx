import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import blogHero from "../../assets/image 12.jpg";

const Blog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH BLOGS
  const fetchBlogs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/blogs");
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.log("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="bg-gray-50">

      {/* 🔴 HERO */}
      <section className="relative h-[70vh] flex items-center justify-center text-center text-white">

        <motion.img
          src={blogHero}
          alt="Blog"
          className="absolute w-full h-full object-cover"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
        />

        <div className="absolute w-full h-full bg-black/60"></div>

        <motion.div
          className="relative z-10 px-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Our Blogs
          </h2>

          <p className="mt-3 text-gray-200">
            Insights, tutorials, and latest trends in modern technology.
          </p>
        </motion.div>
      </section>

      {/* 🔵 HEADING */}
      <section className="py-12 md:py-16 px-4 text-center">

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-3xl font-bold leading-tight mb-2">
            Explore Our{" "}
            <span className="bg-blue-600 text-transparent bg-clip-text">
              Latest Articles
            </span>
          </h2>

          <p className="text-gray-600">
           Stay updated with the latest trends, ideas, and knowledge from DevelopersHub. Read helpful guides, easy tutorials, and updates that can help you learn and grow in technology.
          </p>
        </motion.div>
      </section>

      {/* 🔵 BLOG SECTION */}
<section className="max-w-4xl mx-auto px-4 py-16">

  {loading ? (
    <p className="text-center text-gray-500">Loading blogs...</p>
  ) : blogs.length === 0 ? (
    <p className="text-center text-gray-500">No blogs found</p>
  ) : (
    <div className="space-y-10 flex flex-col items-center">

      {blogs.map((blog) => (
        <motion.div
          key={blog._id}
          className="w-full bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >

          {/* IMAGE */}
          {blog.image ? (
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-72 object-cover"
            />
          ) : (
            <div className="w-full h-72 bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}

                {/* CONTENT */}
                <div className="p-6 md:p-8">

                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    {blog.title}
                  </h2>

                  <p className="text-sm text-gray-500 mb-4">
                    {blog.createdAt
                      ? new Date(blog.createdAt).toLocaleDateString()
                      : "No Date"}{" "}
                    • By {blog.author}
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    {blog.description}
                  </p>

                </div>

              </motion.div>
            ))}

          </div>
        )}

      </section>

      {/* ⚫ CTA SECTION (OUTSIDE MAP - FIXED STRUCTURE) */}
      <motion.div
        className="mt-12 p-6 bg-white rounded-xl shadow text-center max-w-4xl mx-auto mb-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-2xl font-bold mb-2">
          Want to Build Something Like This?
        </h3>

        <p className="text-gray-600 mb-4">
          Let our team help you create modern and scalable solutions.
        </p>

        <button
          onClick={() => navigate("/contact")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Contact Us
        </button>
      </motion.div>

    </div>
  );
};

export default Blog;