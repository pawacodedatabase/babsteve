import React from "react";
import ceoImg from "../assets/tk.jpg"; 
import bgImage from "../assets/b735c257b82d984ab37b0cb0e6517bc3.jpg"; 
const AboutUs: React.FC = () => {
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen font-sans">
      {/* Hero Section */}
   <section
  className="bg-cover bg-center text-white py-20 text-center shadow-lg"
  style={{
    backgroundImage: `url(${bgImage})`,
  }}
>
  <div className="bg-black/50 py-10 px-4">
    <h1 className="text-4xl md:text-5xl font-bold">About Babsteve Solar</h1>
    <p className="mt-4 text-lg md:text-xl">
      Powering a brighter, sustainable future
    </p>
  </div>
</section>



      {/* Company Overview */}
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold mb-6 text-[#01aefb]">Who We Are</h2>
        <p className="text-lg leading-7">
          Babsteve Solar is a pioneering renewable energy company committed to
          delivering reliable and sustainable solar power solutions across
          Nigeria and beyond. We focus on harnessing solar energy to provide
          clean, affordable electricity to homes, businesses, and communities.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-16 px-6 md:px-20">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-[#01aefb]">Our Mission</h3>
            <p className="text-gray-700 leading-7">
              To empower lives through clean and renewable solar energy,
              ensuring energy independence and sustainability for future
              generations.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-[#01aefb]">Our Vision</h3>
            <p className="text-gray-700 leading-7">
              To become the leading provider of innovative solar solutions in
              Africa by delivering excellence, affordability, and reliability.
            </p>
          </div>
        </div>
      </section>

      {/* CEO Section */}
   <section className="py-20 px-6 md:px-20 bg-gradient-to-br from-gray-50 to-gray-100">
  <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 hover:shadow-[0_20px_50px_rgba(1,174,251,0.2)] transition-all duration-500">
    <div className="relative">
      <div className="w-48 h-48 rounded-full border-4 border-[#01aefb] shadow-xl overflow-hidden">
        <img
          src={ceoImg}
          alt="Sobowale Babatokunbo Stephen"
          className="w-full h-full object-cover"
        />
      </div>
      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#01aefb] text-white text-sm px-4 py-1 rounded-full shadow-md">
        CEO
      </span>
    </div>

    <div>
      <h3 className="text-2xl  text-center font-bold text-[#01aefb] mb-1">Sobowale Babatokunbo Stephen</h3>
      <p className="text-gray-500 text-lg text-center mb-4 font-medium">Founder & Visionary Leader, Babsteve Solar</p>
      <p className="text-gray-700 leading-relaxed max-w-2xl">
        With deep expertise in renewable energy and years of hands-on leadership, Sobowale Babatokunbo Stephen has
        established Babsteve Solar as a beacon of sustainable innovation. His vision is rooted in community
        empowerment, green technology, and scalable energy solutions that transform lives across Africa.
        <br />
        <br />
        As the driving force behind the company, he inspires a team of dedicated engineers, technicians, and energy
        experts committed to excellence and environmental impact.
      </p>

      {/* Optional Social Icons */}
      <div className="flex gap-4 mt-6">
        <a href="#" className="text-[#01aefb] hover:text-[#007bb5] transition">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761...Z" />
          </svg>
        </a>
        <a href="#" className="text-[#01aefb] hover:text-[#333] transition">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22.46 6c-.77.35...Z" />
          </svg>
        </a>
        {/* Add more icons like LinkedIn, Twitter, etc. */}
      </div>
    </div>
  </div>
</section>

    </div>
  );
};

export default AboutUs;
