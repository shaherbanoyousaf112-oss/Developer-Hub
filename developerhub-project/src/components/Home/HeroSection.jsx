import heroImage from "../../assets/image.jpg";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";;
function Hero() {
  const navigate = useNavigate();
  return (
    <div className="relative h-screen w-full">

      {/* Background Image */}
      <img
        src={heroImage}
        alt="image"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      {/* Overlay (dark effect for text visibility) */}
       <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight ">
          We Build
        </h1>
        {/* Typing Animation */}
        <h2 className="text-4xl md:text-5xl font-bold leading-tight mt-2 text-blue-400">
          <TypeAnimation
            sequence={[
              "Modern Websites", 2000,
              "Web Applications", 2000,
              "Mobile Apps", 2000,
              "Digital Solutions", 2000,
            ]}
            speed={50}
            repeat={Infinity}
          />
        </h2>
        <p className="mt-4 text-lg md:text-xl max-w-2xl">
          DevelopersHub is a development agency delivering high-quality web applications
    and software solutions. We help businesses grow by providing scalable, secure, 
    and user-friendly digital services that fulfill your needs.
        </p>
 
        <div className="mt-6 space-x-4">
          <button onClick={() => navigate("/services")} className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
            Our Services
          </button>
          <button onClick={() => navigate("/contact")} className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-black transition">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;