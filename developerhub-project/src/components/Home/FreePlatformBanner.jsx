import React from "react";
import freeImage from "../../assets/image 2.jpg";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HeroRightOverlay = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-[80vh] sm:h-[90vh] md:h-screen">

      {/* BACKGROUND IMAGE */}
      <img
        src={freeImage}
        alt="background"
        className="w-full h-full object-cover"
      />

      {/* FULL CENTER OVERLAY */}
      <div className="absolute inset-0 flex items-start justify-center bg-black/75 pt-32">

        {/* TEXT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white text-center px-4 sm:px-6 md:px-12 max-w-2xl"
        >

          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            Empower Your Developer Journey Free
          </h2>

          <p className="text-gray-300 mb-6 text-sm sm:text-base">
            Explore our services, read insightful tech blogs, connect with our team,
            and book your next project with ease — all in one place at Developer Hub Agency.
          </p>

          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Get Started
          </button>

        </motion.div>
      </div>

      {/* STATS BAR */}
      <div className="absolute bottom-0 w-full bg-blue-600 py-4 sm:py-6 grid grid-cols-2 md:grid-cols-4 text-center text-white">
        {[
          { value: "120+", label: "Developers" },
          { value: "25+", label: "Technologies" },
          { value: "400+", label: "Project Delivered" },
          { value: "100%", label: "Free Platform" },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="py-2"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
              {item.value}
            </h3>
            <p className="text-xs sm:text-sm mt-1">{item.label}</p>
          </motion.div>
        ))}
      </div>

    </div>
  );
};

export default HeroRightOverlay;