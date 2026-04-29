import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto flex items-center px-6 py-4 relative">

        {/* Logo (Left) */}
        <h1 className="text-white text-2xl font-bold">
          DevelopersHub
        </h1>

        {/* Center Menu */}
        <ul className="hidden md:flex space-x-8 text-white font-medium absolute left-1/2 transform -translate-x-1/2">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/portfolio">Portfolio</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        {/* Right Side (Button + Mobile Menu) */}
        <div className="ml-auto flex items-center gap-4">

          {/* Book Button */}
          <Link
            to="/booking"
            className="hidden md:block px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:opacity-90 hover:bg-blue-700 transition"
          >
            Book Meeting
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black bg-opacity-80 backdrop-blur-md">
          <ul className="flex flex-col items-center space-y-4 py-6 text-white">
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
            <li><Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link></li>
            <li><Link to="/portfolio" onClick={() => setMenuOpen(false)}>Portfolio</Link></li>
            <li><Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link></li>
            <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
            <li>
              <Link
                to="/booking"
                className="px-5 py-2 rounded-lg bg-blue-600"
                onClick={() => setMenuOpen(false)}
              >
                Book Meeting
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;