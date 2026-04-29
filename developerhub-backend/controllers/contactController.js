const Contact = require("../models/Contact");

// CREATE
const createMessage = async (req, res) => {
  try {
    const message = new Contact({
      ...req.body,
      status: "sent",
    });

    const saved = await message.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error sending message" });
  }
};

// GET ALL (ADMIN)
const getMessages = async (req, res) => {
  const messages = await Contact.find().sort({ createdAt: -1 });
  res.json(messages);
};

// GET USER
const getUserMessages = async (req, res) => {
  const email = req.params.email;
  const messages = await Contact.find({ email }).sort({ createdAt: -1 });
  res.json(messages);
};

// MARK AS READ
const markAsRead = async (req, res) => {
  const updated = await Contact.findByIdAndUpdate(
    req.params.id,
    { status: "seen", read: true },
    { new: true }
  );

  res.json(updated);
};

// DELETE
const deleteMessage = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);

    res.json({ message: "Message permanently deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};

module.exports = {
  createMessage,
  getMessages,
  getUserMessages,
  markAsRead,
  deleteMessage,
};