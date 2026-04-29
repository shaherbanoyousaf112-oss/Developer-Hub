import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ✅ FIXED image name (rename file: image11.jpg)
import serviceImg from "../../assets/image 11.jpg";

const Services = () => {
  const navigate = useNavigate();
const [services, setServices] = useState([]);

useEffect(() => {
  fetch("http://localhost:5000/api/services")
    .then(res => res.json())
    .then(data => setServices(data))
    .catch(err => console.log("Error:", err));
}, []);
  return (
    <div className="bg-gray-50">

      {/* 🔴 HERO */}
      <section className="relative h-[60vh] md:h-[75vh] flex items-center justify-center text-center text-white">

        <motion.img
          src={serviceImg}
          alt="Services"
          className="absolute w-full h-full object-cover"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
        />

        <div className="absolute w-full h-full bg-black/60"></div>

        <motion.div
          className="relative z-10 px-4 max-w-3xl"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Our Services
          </h2>

          <p className="mt-4 text-sm md:text-lg text-gray-200">
            We provide modern digital solutions to help your business grow.
          </p>
        </motion.div>
      </section>
{/* 🔷 INTRO / HEADING */}
<section className="py-12 md:py-12 px-4 text-center">
  
  <motion.div
    className="max-w-3xl mx-auto"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <h2 className="text-3xl md:text-3xl font-bold leading-tight mb-2">
      Explore Our <span className="bg-blue-600 text-transparent bg-clip-text">Professional Services</span>
    </h2>

    <p className="text-gray-600">
      At DevelopersHub, we provide a wide range of modern digital solutions 
      designed to help businesses grow, scale, and succeed in the competitive 
      digital world. From web development to advanced technologies like AI 
      and cloud computing, we deliver quality and innovation.
    </p>
  </motion.div>

</section>
      {/* 🔵 SERVICES CARDS */}
      <section className="py-16 px-4">

        <div className="max-w-7xl mx-auto">

  {services.length === 0 ? (
    <p className="text-center text-gray-500">
      Loading services...
    </p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {services.map((service, i) => (
        <motion.div
          key={service._id || i}
          className="bg-white rounded-xl overflow-hidden shadow-md group cursor-pointer hover:shadow-lg transition"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2 }}
        >
          <div className="overflow-hidden">
            {service.image ? (
  <img
    src={service.image}
    alt={service.title}
    className="w-full h-52 object-cover group-hover:scale-105 transition duration-500"
  />
) : (
  <div className="w-full h-52 bg-gray-200 flex items-center justify-center text-gray-500">
    No Image
  </div>
)}
          </div>

          <div className="p-5">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              {service.title}
            </h3>

            <p className="text-gray-600 text-sm mb-4">
              {service.description}
            </p>

            <button
              onClick={() => navigate("/contact")}
              className="text-blue-600 font-medium hover:underline"
            >
              Contact Us →
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  )}

</div>

      </section>
    </div>
  );
};

export default Services;