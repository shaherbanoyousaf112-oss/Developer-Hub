import heroImage from "../../assets/image.jpg";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center px-4 sm:px-6 pt-[65px] md:pt-[70px] overflow-hidden text-white">

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="hero background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* glow */}
      <div className="absolute w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] bg-blue-500/10 blur-[120px] rounded-full top-[-120px] right-[-100px] z-10" />

      {/* CONTENT */}
      <div className="w-full max-w-6xl mx-auto relative z-20">

        {/* HEADING */}
        <h1 className="text-[2rem] sm:text-[3rem] md:text-[5rem] lg:text-[6rem] font-extrabold leading-[1.1]">
          We Build <br />
          <span className="text-blue-400">
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
          </span>
        </h1>

        {/* SUBTEXT */}
        <p className="max-w-xl text-gray-200 mt-4 leading-relaxed text-sm sm:text-base">
          DevelopersHub is a development agency delivering high-quality web
          applications and software solutions. We help businesses grow by
          providing scalable, secure, and user-friendly digital services that
          fulfill your needs.
        </p>

        {/* CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 md:mt-10">
          {/* PRIMARY */}
          <button
            onClick={() => navigate("/services")}
            className="w-full sm:w-auto text-center px-6 py-3 rounded-full bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 hover:shadow-2xl hover:scale-105 transition duration-300"
          >
            Our Services
          </button>

          {/* SECONDARY */}
          <button
            onClick={() => navigate("/contact")}
            className="w-full sm:w-auto text-center px-6 py-3 rounded-full border border-white text-white hover:bg-white hover:text-black transition duration-300"
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;