import { Link, useNavigate } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";
import logo from "../../assets/logo.png";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

const services = [
  "Web Development",
  "App Development",
  "Cyber Security",
  "AI Solutions",
  "Cloud Systems",
];

const socials = [
  { icon: FaLinkedin, label: "LinkedIn", href: "https://linkedin.com"
              },
  { icon: FaGithub, label: "GitHub", href: "https://github.com"
               },
];

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#0b0f19] text-gray-400 border-t border-white/10">

      {/* CTA BAND */}
      <div className="max-w-7xl mx-auto px-6 pt-16">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-blue-600/20 via-blue-500/10 to-transparent px-6 py-8 sm:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Have a project in mind?
            </h3>
            <p className="mt-2 text-sm sm:text-base text-gray-400">
              Let's turn your idea into a scalable, high-quality product.
            </p>
          </div>

          <button
            onClick={() => navigate("/booking")}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-lg transition"
          >
            Start a Project
            <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">

        {/* BRAND */}
        <div className="lg:col-span-4">
          <Link to="/" className="flex items-center gap-3 w-fit">
            <img src={logo} alt="DevelopersHub logo" className="w-11 h-11 object-contain" />
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-extrabold tracking-wide text-white">
                Developers<span className="text-blue-500">Hub</span>
              </span>
              <span className="text-[10px] text-gray-500 tracking-[3px] uppercase">
                Corporation
              </span>
            </div>
          </Link>

          <p className="mt-5 text-sm leading-6 max-w-sm">
            We build modern, scalable, and high-performance digital solutions
            for startups and businesses worldwide.
          </p>

          {/* SOCIAL */}
          <div className="flex gap-3 mt-6">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:-translate-y-1 transition duration-200"
              >
                <Icon className="text-base" />
              </a>
            ))}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="lg:col-span-2">
          <h3 className="text-white font-semibold mb-5">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            {quickLinks.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="inline-block hover:text-white hover:translate-x-1 transition duration-200"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* SERVICES */}
        <div className="lg:col-span-3">
          <h3 className="text-white font-semibold mb-5">
            Services
          </h3>
          <ul className="space-y-3 text-sm">
            {services.map((name) => (
              <li key={name}>
                <Link
                  to="/services"
                  className="inline-block hover:text-white hover:translate-x-1 transition duration-200"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div className="lg:col-span-3">
          <h3 className="text-white font-semibold mb-5">
            Get in Touch
          </h3>

          <ul className="space-y-4 text-sm">
            <li>
              <a
                href="mailto:support@developershub.com"
                className="flex items-start gap-3 hover:text-white transition"
              >
                <FaEnvelope className="text-blue-500 mt-0.5 shrink-0" />
                support@developershub.com
              </a>
            </li>
            <li>
              <a
                href="tel:+923001234567"
                className="flex items-start gap-3 hover:text-white transition"
              >
                <FaPhoneAlt className="text-blue-500 mt-0.5 shrink-0" />
                +92 300 1234567
              </a>
            </li>
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-blue-500 mt-0.5 shrink-0" />
              Pakistan
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-center gap-3 text-xs sm:text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} DevelopersHub Corporation. All rights reserved.
          </p>

         
        </div>
      </div>
    </footer>
  );
}

export default Footer;