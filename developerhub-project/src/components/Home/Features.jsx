import { motion } from "framer-motion";

const services = [
  { title: "Web Development", desc: "Modern, responsive and high-performance websites." },
  { title: "Frontend Design", desc: "Beautiful UI/UX with smooth animations." },
  { title: "Backend Development", desc: "Secure and scalable backend systems." },
  { title: "Artificial Intelligence", desc: "AI solutions like chatbots and automation." },
  { title: "Cyber Security", desc: "Advanced protection and threat detection systems." },
  { title: "Cloud Computing", desc: "Scalable cloud infrastructure and deployment." },
];

// 🔥 Parent container animation (stagger effect)
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// 🔥 Card animation
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

function ServicesSection() {
  return (
    <section className="py-20 bg-white text-black px-6">

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-4xl text-gray-800 font-bold">
          What Our <span className="text-blue-600">Developer Hub</span> Offers
        </h2>
        <p className="text-gray-600 mt-3">
          Powerful services to grow your digital presence
        </p>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 max-w-6xl mx-auto"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ scale: 1.06, y: -8 }}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 transition duration-300"
          >
            <h3 className="text-xl text-gray-800 font-semibold mb-2">
              {service.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {service.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
}

export default ServicesSection;