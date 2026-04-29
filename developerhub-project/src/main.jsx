import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css"


// Pages
import Home from "./pages/Home.jsx";
import AboutUs from './pages/AboutUs.jsx';
import ServiceDetail from './pages/Service.jsx';
import Blog from './pages/Blog.jsx';
import Portfolio from './pages/Portfolio.jsx';
import ContactUs from './pages/ContactUs.jsx';
import Booking from './pages/Booking.jsx';

// Admin Pages
import Login from './pages/Admin/AdminLogin.jsx';
import Dashboard from './pages/Admin/AdminDashboard.jsx';
import Service from './pages/Admin/AdminService.jsx';
import Blogs from './pages/Admin/AdminBlog.jsx';
import Portfoli from './pages/Admin/AdminPortfolio.jsx';
import Contact from './pages/Admin/AdminContact.jsx';
import Bookings from './pages/Admin/AdminBooking.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<ServiceDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/booking" element={<Booking />} />

            {/* Admin Side */}
            <Route path="/admin/admin-login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
  <Route path="/admin/admin-dashboard" element={<Dashboard />} />
  <Route path="/admin/admin-service" element={<Service />} />
  <Route path="/admin/admin-blog" element={<Blogs />} />
  <Route path="/admin/admin-contact" element={<Contact />} />
  <Route path="/admin/admin-portfolio" element={<Portfoli />} />
  <Route path="/admin/admin-booking" element={<Bookings />} />
</Route>
            
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
