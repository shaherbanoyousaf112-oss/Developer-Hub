import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import portfolioHero from "../../assets/image 17.jpg";

const Portfolio = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchProjects = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.log("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchProjects();
}, []);

  return (
    <div className="bg-gray-50">

      {/* 🔴 HERO */}
      <section className="relative h-[60vh] md:h-[75vh] flex items-center justify-center text-center text-white">
        
        <motion.img
          src={portfolioHero}
          alt="Portfolio"
          className="absolute w-full h-full object-cover"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
        />

        <div className="absolute w-full h-full bg-black/60"></div>

        <motion.div
          className="relative z-10 px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Our Portfolio
          </h2>

          <p className="mt-3 text-gray-200">
            Explore our latest projects and innovative digital solutions.
          </p>
        </motion.div>
      </section>

      {/* 🔵 HEADING */}
      <section className="py-12 text-center px-4">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl md:text-3xl font-bold leading-tight mb-2">
            Our{" "}
            <span className="bg-blue-600 text-transparent bg-clip-text">
              Featured Projects
            </span>
          </h2>

          <p className="text-gray-600">
            We deliver high-quality, scalable, and modern solutions across multiple industries.
          </p>
        </motion.div>
      </section>

      {/* 🟢 PROJECTS */}
      <section className="max-w-6xl mx-auto px-4 py-10 space-y-16">
         {loading ? (
    <p className="text-center text-gray-500">Loading projects...</p>
  ) : Array.isArray(projects) && projects.length > 0 ? (
        projects.map((project, i) => (
          <motion.div
            key={project._id || i}
            className={`grid md:grid-cols-2 gap-10 items-center ${
              i % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >

            {/* IMAGE */}
            <div className="overflow-hidden rounded-xl shadow-lg">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-72 object-cover hover:scale-105 transition duration-500"
              />
            </div>

            {/* CONTENT */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">
                {project.title}
              </h3>

              <p className="text-gray-600 mb-4">
                {project.description}
              </p>

              {/* TECH STACK */}
             <div className="flex flex-wrap gap-2 mb-4">
  {Array.isArray(project.tech)
    ? project.tech.map((tech, index) => (
        <span
          key={index}
          className="px-3 py-1 text-sm bg-gray-200 rounded-full"
        >
          {tech}
        </span>
      ))
    : typeof project.tech === "string"
    ? project.tech.split(",").map((tech, index) => (
        <span
          key={index}
          className="px-3 py-1 text-sm bg-gray-200 rounded-full"
        >
          {tech.trim()}
        </span>
      ))
    : null}
</div>

            
            </div>

          </motion.div>
        ))
         ) : (
    <p className="text-center text-gray-500">No projects found</p>
  )}

      </section>

      {/* ⚫ CTA */}
      <section className="bg-gray-100 py-16 text-center px-4">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          Have a Project Idea?
        </h2>

        <p className="text-gray-600 mb-6">
          Let’s work together to build something amazing.
        </p>

        <button onClick={() => navigate("/contact")} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Contact Us
        </button>
      </section>

    </div>
  );
};

export default Portfolio;