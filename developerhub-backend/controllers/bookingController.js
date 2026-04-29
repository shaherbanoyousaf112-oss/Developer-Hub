const Booking = require("../models/Booking");

// ✅ CREATE BOOKING
const createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(500).json({ message: "Error creating booking", error: err });
  }
};

// ✅ GET ALL BOOKINGS (Admin)
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

// ✅ GET USER BOOKINGS (IMPORTANT FIX)
const getUserBookings = async (req, res) => {
  try {
    const email = req.params.email;

    const bookings = await Booking.find({ email }).sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user bookings" });
  }
};

// ✅ UPDATE STATUS (Admin)
const updateBooking = async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating booking" });
  }
};

// ✅ DELETE BOOKING (Admin)
const deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting booking" });
  }
};

// ✅ EXPORT ALL (ONLY ONCE)
module.exports = {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,
  getUserBookings,
};