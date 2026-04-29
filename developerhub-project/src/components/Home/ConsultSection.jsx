import { motion } from "framer-motion";
import Image from "../../assets/image 3.jpg";
import { useNavigate } from "react-router-dom";

function ConsultationSection() {
   const navigate = useNavigate();
  return (
    <section className="relative h-[80vh] flex items-center justify-center text-center text-white">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${Image})`, // replace with your image
        }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-6">

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4"
        >
          Schedule A Free <br /> Consultation With Our Experts
        </motion.h1>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-4 text-gray-300"
        >
          We help you plan, build, and scale your digital solutions with expert guidance and modern technologies.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <button onClick={() => navigate("/booking")} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium shadow-lg hover:shadow-blue-500/50 transition duration-300">
            Book An Appointment
          </button>
        </motion.div>

      </div>
    </section>
  );
}

export default ConsultationSection;