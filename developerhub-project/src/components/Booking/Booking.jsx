import React, { useState, useEffect} from "react";
import { motion } from "framer-motion";
import bookingHero from "../../assets/image 21.jpg";
import { FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Booking = () => {
 const [myBookings, setMyBookings] = useState([]); 

 const fetchBookings = () => {
  const userEmail = localStorage.getItem("email");

  if (!userEmail) return;

  fetch(`http://localhost:5000/api/bookings/user/${userEmail}`)
    .then(res => res.json())
    .then(data => {
      console.log("Fetched:", data);
      setMyBookings(data);
    })
    .catch(err => console.log(err));
};
useEffect(() => {
  const fetchBookings = () => {
    const userEmail = localStorage.getItem("email");

    if (!userEmail) return;

    fetch(`http://localhost:5000/api/bookings/user/${userEmail}`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched:", data);
        setMyBookings(data);
      })
      .catch(err => console.log(err));
  };

  // first load
  fetchBookings();

  // ✅ auto refresh every 3 seconds
  const interval = setInterval(fetchBookings, 3000);

  // cleanup (important)
  return () => clearInterval(interval);

}, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !formData.name ||
    !formData.email ||
    !formData.service ||
    !formData.date ||
    !formData.time
  ) {
    alert("Please fill all required fields ❌");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    // ✅ STORE EMAIL HERE (IMPORTANT)
    localStorage.setItem("email", formData.email);

    console.log("Booking Saved:", data);
 // ✅ RE-FETCH DATA
    fetchBookings();
    alert("Booking Successful ✅");

    setFormData({
      name: "",
      email: "",
      service: "",
      date: "",
      time: "",
      message: "",
    });

  } catch (error) {
    console.log(error);
    alert("Something went wrong ❌");
  }
};

  return (
    <div className="bg-gray-50 text-gray-800 overflow-x-hidden">

      {/* HERO */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white">
        <motion.img
          src={bookingHero}
          alt="Booking"
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
            Book a Meeting
          </h2>
          <p className="mt-3 text-gray-200">
            Schedule a session with our development team
          </p>
        </motion.div>
      </section>

      {/* FORM */}
      <section className="max-w-3xl mx-auto px-4 py-16">

        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold">
            Schedule Your Meeting
          </h2>
          <p className="text-gray-600 mt-2">
            Fill the form and our team will connect with you shortly.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white p-6 md:p-8 rounded-xl shadow-lg space-y-5"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
        >

          <input required
            type="text"
            name="name"
            value={formData.name}
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input required
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <select required
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Select Service</option>
            <option>Web Development</option>
            <option>App Development</option>
            <option>AI Solutions</option>
            <option>Cloud Computing</option>
            <option>Cyber Security</option>
          </select>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required type="date" name="date" value={formData.date} onChange={handleChange} className="p-3 border rounded-lg" />
            <input required type="time" name="time" value={formData.time} onChange={handleChange} className="p-3 border rounded-lg" />
          </div>

          <textarea required
            name="message"
            rows="4"
            value={formData.message}
            placeholder="Additional Notes (optional)"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <motion.button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg">
            Book Meeting
          </motion.button>

        </motion.form>
      </section>
     {/* STATUS SECTION */}
<div className="max-w-3xl mx-auto px-4 py-10">

  {/* Heading (same style as form heading) */}
  <motion.h2
    className="text-2xl md:text-3xl font-bold text-center mb-8"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
  >
    Your Booking Status
  </motion.h2>

  {/* Cards */}
  <div className="space-y-5">

    {myBookings.map((b) => (
      <motion.div
        key={b._id}
        className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.01 }}
      >

        {/* TOP INFO */}
        <div className="space-y-1 text-gray-700">
          <p><b>Name:</b> {b.name}</p>
          <p><b>Email:</b> {b.email}</p>
          <p><b>Service:</b> {b.service}</p>
          <p><b>Date:</b> {b.date}</p>
          <p><b>Time:</b> {b.time}</p>
        </div>

        {/* STATUS BADGE */}
        <div className="mt-4">
          {b.status === "pending" && (
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-yellow-100 text-yellow-600 font-medium">
              <FaClock /> Pending
            </span>
          )}

          {b.status === "confirmed" && (
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-green-100 text-green-600 font-medium">
              <FaCheckCircle /> Confirmed
            </span>
          )}

          {b.status === "cancelled" && (
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-red-100 text-red-600 font-medium">
              <FaTimesCircle /> Cancelled
            </span>
          )}
        </div>

      </motion.div>
    ))}

  </div>
</div>

    </div>
  );
};

export default Booking;