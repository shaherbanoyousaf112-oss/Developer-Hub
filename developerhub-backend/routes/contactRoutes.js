const express = require("express");
const router = express.Router();

const {
  createMessage,
  getMessages,
  markAsRead,
  deleteMessage,
  getUserMessages,
} = require("../controllers/contactController");

const verifyAdmin = require("../middleware/authMiddleware");

// USER
router.post("/", createMessage);
router.get("/user/:email", getUserMessages);

// ADMIN
router.get("/", verifyAdmin, getMessages);
router.put("/:id", verifyAdmin, markAsRead);
router.delete("/:id", verifyAdmin, deleteMessage);

module.exports = router;