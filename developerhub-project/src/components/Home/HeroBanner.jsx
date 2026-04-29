import React from "react";
import bannerImage from "../../assets/image 1.jpg";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HeroBanner = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 py-16 px-6 md:px-16">
      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <img
            src={bannerImage}
            alt="team"
            className="rounded-2xl shadow-lg"
          />

         
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
         

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight mb-4">
            Building Modern Digital Solutions for Your Business
          </h1>

          <p className="text-gray-600 mb-6">
            DevelopersHub Agency provides web development and software solutions to help businesses grow. 
  Our platform allows clients to explore services, connect with our team, and manage their project needs easily.
          </p>

          {/* Buttons */}
          <div className="flex gap-4">
            <button onClick={() => navigate("/services")} className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition items-center cursor-pointer">
              Explore Services
            </button>
            
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroBanner;