const express = require("express");
const router = express.Router();

const {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,
  getUserBookings, // 🔴 ADD THIS
} = require("../controllers/bookingController");

const verifyAdmin = require("../middleware/authMiddleware");

// USER: create booking
router.post("/", createBooking);

// USER: get bookings by email 🔥 ADD THIS
router.get("/user/:email", getUserBookings);

// ADMIN
router.get("/", verifyAdmin, getBookings);
router.put("/:id", verifyAdmin, updateBooking);
router.delete("/:id", verifyAdmin, deleteBooking);

module.exports = router;