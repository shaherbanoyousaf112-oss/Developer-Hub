import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin, FaFacebook, FaTwitter } from 
"react-icons/fa";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-[#0b0f19] text-gray-400 pt-16 pb-8 border-t border-white/10">

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-white tracking-wide">
            DevelopersHub
          </h2>

          <p className="mt-4 leading-6 text-gray-400">
            We build modern, scalable, and high-performance digital solutions
            for startups and businesses worldwide.
          </p>

          {/* SOCIAL */}
          <div className="flex text-xl gap-4 mt-6">
            <FaFacebook className="text-blue-500 hover:text-white cursor-pointer transition" />
            <FaTwitter className="text-blue-400 hover:text-white cursor-pointer transition" />
            <FaLinkedin className="text-blue-600 hover:text-white cursor-pointer transition" />
            <FaGithub className="text-white cursor-pointer transition" />
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-bold mb-5">Quick Links</h3>

          <ul className="space-y-2">
            {[
              { name: "About", path: "/about" },
              { name: "Services", path: "/services" },
              { name: "Portfolio", path: "/portfolio" },
              { name: "Blog", path: "/blog" },
              { name: "Contact", path: "/contact" },
            ].map((item, i) => (
              <li key={i}>
                <Link
                  to={item.path}
                  className="hover:text-white transition hover:translate-x-1 inline-block duration-200"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="text-white font-bold mb-5">Services</h3>

          <ul className="space-y-2 ">
            <li className="hover:text-white transition cursor-pointer">Web Development</li>
            <li className="hover:text-white transition cursor-pointer">App Development</li>
            <li className="hover:text-white transition cursor-pointer">Cyber Security</li>
            <li className="hover:text-white transition cursor-pointer">AI Solutions</li>
            <li className="hover:text-white transition cursor-pointer">Cloud Systems</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-white font-bold mb-5">Get in Touch</h3>
<div className="space-y-4 text-sm">

  <p className="flex items-center gap-3 hover:text-white transition">
    <FaEnvelope className="text-blue-500" />
    support@developershub.com
  </p>

  <p className="flex items-center gap-3 hover:text-white transition">
    <FaPhoneAlt className="text-blue-500" />
    +92 300 1234567
  </p>

  <p className="flex items-center gap-3 hover:text-white transition">
    <FaMapMarkerAlt className="text-blue-500" />
    Pakistan
  </p>

</div>

          <button onClick={() => navigate("/home")} className="mt-6 w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg text-sm">
            Start a Project
          </button>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-center items-center text-gray-500">

        <p>© {new Date().getFullYear()} DevelopersHub. All rights reserved.</p>

      

      </div>

    </footer>
  );
}

export default Footer;