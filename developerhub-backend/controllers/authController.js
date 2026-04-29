const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// LOGIN ADMIN
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const admin = await Admin.findOne({ email });

    if (!admin || !admin.password) {
      return res.status(400).json({ message: "Invalid admin data" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT_SECRET missing in .env" });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
console.log("TOKEN:", token);
    res.json({ token, admin });

  } catch (err) {
    console.log("LOGIN ERROR:", err); // 👈 IMPORTANT
    res.status(500).json({ message: err.message });
  }
};
module.exports = { loginAdmin };