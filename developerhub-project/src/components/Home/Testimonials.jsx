import { motion } from "framer-motion";
import user1 from "../../assets/user1.jpg";
import user2 from "../../assets/user2.jpg";
import user3 from "../../assets/user3.jpg";

const testimonials = [
  {
    name: "Ali Khan",
    role: "Startup Founder",
    image: user1,
    feedback:
      "This developer hub completely transformed our online presence. The team delivered beyond expectations!",
  },
  {
    name: "Sara Ahmed",
    role: "UI/UX Designer",
    image: user2,
    feedback:
      "Amazing experience! The design and performance improvements were outstanding.",
  },
  {
    name: "Usman Tariq",
    role: "Business Owner",
    image: user3,
    feedback:
      "Highly professional team. Their support and communication were top-notch throughout the project.",
  },
];

// Animations
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50 px-6">

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight mb-4">
          What Our Clients Say
        </h2>
        <p className="text-gray-600 mt-3">
          Real feedback from our satisfied clients
        </p>
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 max-w-6xl mx-auto"
      >
        {testimonials.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ scale: 1.05, y: -8 }}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 transition"
          >
            {/* Avatar */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-full object-cover "
              />
              <div>
                <h4 className="font-semibold text-black-900">
                  {item.name}
                </h4>
                <span className="text-gray-500 text-sm">
                  {item.role}
                </span>
              </div>
            </div>

            {/* Feedback */}
            <p className="text-gray-600 text-sm">
              “{item.feedback}”
            </p>
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
}

export default TestimonialsSection;