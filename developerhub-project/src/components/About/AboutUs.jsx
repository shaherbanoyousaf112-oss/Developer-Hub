import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import aboutHero from "../../assets/image 5.jpg";
import Hero from "../../assets/image 6.jpg";
import myImage from "../../assets/image 7.jpg";
import Iimage from "../../assets/image 8.jpg";
import mage from "../../assets/image 9.jpg";
import age from "../../assets/image 10.jpg";
const teamMembers = [
  {
     name: "Alyan Khan",
    role: "Project Lead & Documentation",
    img : myImage,
  },
  {
    name: "Sara Ahmed",
    role: "Frontend Developer",
    img: Iimage,
  },
  {
    name: "Alizay Umar",
    role: "UI/UX Designer",
    img: mage,
  },
  {
    name: "Ali Raza",
    role: "Backend Developer",
    img: age,
  }
];

const AboutUs = () => {
  const navigate = useNavigate();

  return (
   <div className="bg-gray-50 overflow-hidden">

  {/* 🔴 HERO */}
  <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-white px-4">

    <motion.img
      src={aboutHero}
      alt="About"
      className="absolute w-full h-full object-cover"
      initial={{ scale: 1.2 }}
      animate={{ scale: 1 }}
      transition={{ duration: 2 }}
    />

    <div className="absolute w-full h-full bg-black/60"></div>

    <motion.div
      className="relative z-10 max-w-3xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
        About DevelopersHub
      </h2>

      <p className="mt-4 text-sm sm:text-base md:text-lg">
        We are a development agency delivering modern digital solutions 
        to help businesses grow and succeed in the digital world.
      </p>
    </motion.div>
  </section>

      {/* 🔵 WHO WE ARE */}
     <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">

    <motion.div
      initial={{ opacity: 0, x: -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        Who We Are
      </h2>

      <p className="text-gray-600 mb-4 text-sm md:text-base">
        DevelopersHub is a modern software development agency providing 
        high-quality web and application solutions tailored to business needs.
      </p>

      <p className="text-gray-600 mb-6 text-sm md:text-base">
        We help clients manage projects and connect with our team easily.
      </p>

      <button
        onClick={() => navigate("/contact")}
        className="px-5 py-2 md:px-6 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Contact Us
      </button>
    </motion.div>

    <motion.img
      src={Hero}
      alt="About"
      className="rounded-xl shadow-lg w-full h-[250px] sm:h-[300px] md:h-full object-cover"
      initial={{ opacity: 0, x: 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    />
  </section>

      {/* 🟡 MISSION & VISION */}
      <section className="bg-white py-12 md:py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

      <motion.div className="p-5 md:p-6 shadow-lg rounded-xl">
        <h3 className="text-lg md:text-xl font-semibold mb-3">Our Mission</h3>
        <p className="text-gray-600 text-sm md:text-base">
         To deliver reliable, scalable, and innovative digital solutions that help businesses achieve their goals efficiently.
        </p>
      </motion.div>

      <motion.div className="p-5 md:p-6 shadow-lg rounded-xl">
        <h3 className="text-lg md:text-xl font-semibold mb-3">Our Vision</h3>
        <p className="text-gray-600 text-sm md:text-base">
         To become a leading digital agency known for quality, innovation, and client satisfaction worldwide.
        </p>
      </motion.div>

    </div>
  </section>

      {/* 🟣 TEAM */}
       <section className="py-12 md:py-16 text-center">
    <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10">
      Meet Our Professional Team
    </h2>

    <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      
      {teamMembers.map((member, i) => (
        <motion.div
          key={i}
          className="relative group overflow-hidden rounded-xl shadow-lg"
        >
          <img
            src={member.img}
            alt={member.name}
            className="w-full h-64 sm:h-72 md:h-80 object-cover group-hover:scale-110 transition duration-500"
          />

          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-center items-center text-white px-2">
            
            <h4 className="text-base md:text-lg font-bold">
              {member.name}
            </h4>

            <p className="text-xs md:text-sm text-gray-300 mt-1 text-center">
              {member.role}
            </p>

          </div>
        </motion.div>
      ))}

    </div>
  </section>

      {/* 🔴 CTA */}
   <section className="bg-gray-100 py-16 px-4">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

    {/* LEFT CONTENT */}
    <div>
      <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
        Let’s Work Together on Your Next Project
      </h2>

      <p className="text-gray-600 mb-6">
        Have an idea in mind? We help businesses design and build scalable 
        digital solutions with modern technologies.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("/booking")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Book Meeting
        </button>

      </div>
    </div>

    {/* RIGHT IMAGE */}
    <div className="hidden md:block">
      <img
        src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
        alt="Team"
        className="rounded-xl shadow-md"
      />
    </div>

  </div>
</section>
</div>
  );
};

export default AboutUs;