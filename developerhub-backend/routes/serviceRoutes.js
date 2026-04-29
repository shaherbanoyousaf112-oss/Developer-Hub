const express = require("express");
const router = express.Router();

const{
  getServices,
  createService,
  updateService,
  deleteService,
} = require ("../controllers/serviceController");

const verifyAdmin = require("../middleware/authMiddleware");

router.get("/", getServices);
router.post("/", verifyAdmin, createService);
router.put("/:id", verifyAdmin, updateService);
router.delete("/:id", verifyAdmin, deleteService);

module.exports = router;