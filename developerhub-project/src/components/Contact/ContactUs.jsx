import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaEye, FaTrashAlt } from "react-icons/fa";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import contactHero from "../../assets/image 20.jpg";

const cards = [
  {
    icon: <FaEnvelope />,
    title: "Email",
    value: "developershub@email.com",
  },
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    value: "+92 300 1234567",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Location",
    value: "Pakistan",
  },
  {
    icon: <FaClock />,
    title: "Working Hours",
    value: "Mon - Fri : 9AM - 6PM",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
const [myMessages, setMyMessages] = useState([]);
  const [errors, setErrors] = useState({});
const [loading, setLoading] = useState(false);

const fetchMessages = async () => {
    const email = formData.email || localStorage.getItem("email");

    if (!email) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/contacts/user/${email}`
      );

      const data = await res.json();
      setMyMessages(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMessages();

    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill all fields ❌");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          status: "sent", // 🔴 IMPORTANT
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed ❌");
        return;
      }

      localStorage.setItem("email", formData.email);

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      fetchMessages(); // refresh instantly

      alert("Message Sent ✅");
    } catch (err) {
      console.log(err);
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-gray-50 text-gray-800">

      {/* 🔴 HERO */}
      <section className="relative h-[60vh] sm:h-[65vh] md:h-[60vh] flex items-center justify-center text-center text-white">
        
        <motion.img
          src={contactHero}
          alt="Contact"
          className="absolute w-full h-full object-cover"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
        />

        <div className="absolute w-full h-full bg-black/60"></div>

        <motion.div
          className="relative z-10 px-4 sm:px-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Contact Us
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-gray-200 max-w-xl mx-auto">
            Let’s build something amazing together
          </p>
        </motion.div>
      </section>

      {/* 🟢 CONTACT CARDS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {cards.map((card, i) => (
            <motion.div
              key={i}
              className="bg-white p-5 sm:p-6 rounded-xl shadow-md text-center hover:shadow-xl transition"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="text-2xl sm:text-3xl mb-3 text-blue-600">
                {card.icon}
              </div>

              <h3 className="font-semibold text-base sm:text-lg mb-1">
                {card.title}
              </h3>

              <p className="text-gray-600 text-xs sm:text-sm">
                {card.value}
              </p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* 🔵 CONTACT FORM */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-center">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
            Get in Touch
          </h2>

          <p className="text-gray-600 mb-8 text-sm sm:text-base max-w-xl mx-auto">
            Have a project idea or need help? Fill the form and we’ll get back to you.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white p-5 sm:p-6 md:p-8 rounded-xl shadow-lg space-y-4 text-left"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-center mb-4">
            Send Message
          </h3>

          {/* NAME */}
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-gray-800"
            />
            {errors.name && <p className="text-red-500 text-xs sm:text-sm">{errors.name}</p>}
          </div>

          {/* EMAIL */}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-gray-800"
            />
            {errors.email && <p className="text-red-500 text-xs sm:text-sm">{errors.email}</p>}
          </div>

          {/* SUBJECT */}
          <div>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full p-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-gray-800"
            />
            {errors.subject && <p className="text-red-500 text-xs sm:text-sm">{errors.subject}</p>}
          </div>

          {/* MESSAGE */}
          <div>
            <textarea
              rows="4"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full p-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-gray-800"
            ></textarea>
            {errors.message && <p className="text-red-500 text-xs sm:text-sm">{errors.message}</p>}
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
      </section>

<div className="max-w-3xl mx-auto px-4 py-10">

  <h2 className="text-2xl font-bold text-center mb-6">
    Your Messages Status
  </h2>

  <div className="space-y-4">
    {myMessages.map((m) => (
      <div
        key={m._id}
        className="bg-white p-5 rounded-xl shadow-md border hover:shadow-lg transition duration-300"
      >

        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {m.subject}
        </h3>

        <p className="text-sm text-gray-600">
          {m.message}
        </p>

        <div className="mt-4">
          {m.status === "sent" && (
            <span className="inline-flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">
              <FaPaperPlane /> Sent
            </span>
          )}

          {m.status === "seen" && (
            <span className="inline-flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-600 rounded-full">
              <FaEye /> Seen by Admin
            </span>
          )}

          {m.status === "deleted" && (
            <span className="inline-flex items-center gap-2 px-3 py-1 text-sm bg-red-100 text-red-600 rounded-full">
              <FaTrashAlt /> Removed by Admin
            </span>
          )}
        </div>

      </div>
    ))}
  </div>

</div>

      {/* 🟡 MAP */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="map"
            src="https://maps.google.com/maps?q=Pakistan&t=&z=5&ie=UTF8&iwloc=&output=embed"
            className="w-full h-[250px] sm:h-[300px] md:h-[400px] border-0"
          ></iframe>
        </div>
      </section>

    </div>
  );
};

export default Contact;