const express = require("express");
const router = express.Router();

const {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const verifyAdmin = require("../middleware/authMiddleware");

router.get("/", getBlogs);
router.post("/", verifyAdmin, createBlog);
router.put("/:id", verifyAdmin, updateBlog);
router.delete("/:id", verifyAdmin, deleteBlog);

module.exports = router;