import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      const data = res.data;

      // 🔐 SAVE TOKEN HERE
      localStorage.setItem("token", data.token);

      // 🚀 REDIRECT HERE
      navigate("/admin/admin-dashboard");

    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-xl px-8 py-12 min-h-[500px] flex flex-col justify-between"
      >

        <div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-center text-gray-800 mb-2"
          >
            Admin Login
          </motion.h1>

          <p className="text-center text-gray-500 mb-8 text-sm">
            Welcome back to Developer Hub Dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* EMAIL */}
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input
                type="email"
                name="email"
                placeholder="Admin Email"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* BUTTON */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md"
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>

          </form>
        </div>

        <p className="text-xs text-center text-gray-400 mt-6">
          Secure admin access only
        </p>

      </motion.div>
    </div>
  );
}