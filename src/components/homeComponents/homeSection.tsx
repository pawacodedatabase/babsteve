import React, { useEffect } from "react";
import solarPanel1 from "../../assets/solar1.jpg";
import solarPanel2 from "../../assets/solar2.jpg";
import panelGrid from "../../assets/panel.png";
import { Link } from "react-router-dom";
import solarGuarantee from "../../../src/assets/so.jpg";
import solarBackup from "../../../src/assets/so.jpg";
import solarIntegration from "../../../src/assets/so.jpg";
import solarShifting from "../../../src/assets/so.jpg";
import solarDemand from "../../../src/assets/so.jpg";
import solarReserve from "../../../src/assets/so.jpg";



const HomeSectiom: React.FC = () => {

     useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".fade-section").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const offers = [
    {
      title: "25-Year Warranty",
      desc: "Enjoy peace of mind with our industry-leading 25-year performance and product warranty.",
      img: solarGuarantee,
    },
    {
      title: "Emergency Backup Systems",
      desc: "Keep your home powered during outages with our reliable solar battery backups.",
      img: solarBackup,
    },
    {
      title: "Smart Home Integration",
      desc: "Integrate solar with smart home systems for better control and efficiency.",
      img: solarIntegration,
    },
    {
      title: "Load Shifting Technology",
      desc: "Maximize energy savings by shifting usage to periods of peak solar output.",
      img: solarShifting,
    },
    {
      title: "Demand Response Ready",
      desc: "Support the grid and earn rewards by using solar storage during peak demand.",
      img: solarDemand,
    },
    {
      title: "Capacity Reserve Options",
      desc: "Keep your essentials running with dedicated battery reserve configurations.",
      img: solarReserve,
    },
  ];


  return (
    <div className="font-sans bg-[#f8f9fc] text-[#0a0a0a]">

      {/* Hero Section */}
      <section className="px-6 py-12 md:py-20">
        <h2 className="text-3xl text-center md:text-6xl font-bold">
          Solar Panels <span className="text-[#01aefb]">designed</span> for you.
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mt-10 items-center">
          <img src={solarPanel1} alt="Solar Panel" className="w-full rounded-xl" />
          <div>
            <p className="mb-4 text-gray-700">
              For business professionals caught between high OEM price and mediocre print and
              graphic output, there's a solution. Business Express is EclipseLine of compatible laser toner.
            </p>
             <Link
            to={`/shop`}>
            <button className="bg-[#0a0a0a] text-white px-4 py-2 text-sm">Shop Now!</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="grid md:grid-cols-2 gap-6 bg-[#0a0a0a] text-white px-6 py-16">
        <div>
          <h3 className="text-3xl font-semibold mb-4 text-[#01aefb]">We outclassed our competition.</h3>
          <p className="mb-6">
            We made it happen. Currently #1 in the market in terms of durability and efficiency. Custom Designed
            for your needs. We provide all the necessary items.
          </p>
          <button className="bg-[#01aefb] px-4 py-2 text-sm">Get an offer</button>
        </div>
        <img src={solarPanel2} alt="Solar Panel Forest" className="w-full rounded-xl" />
      </section>

  
<section className="text-center px-6 py-20 bg-gray-50 fade-section opacity-0 transition-opacity duration-[1200ms] ease-in">
      <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Our Solution For You</p>
      <h3 className="text-3xl md:text-4xl font-bold mb-14 text-gray-800">
        What do we offer to you.
      </h3>

      <img
        src={panelGrid}
        alt="Solar Panel Grid"
        className="mx-auto mb-16 w-full max-w-4xl rounded-lg"
      />

      <div className="grid md:grid-cols-3 gap-10 text-left">
        {offers.map((offer, index) => (
          <div
            key={index}
            className="bg-[#f8f9fc] p-8 rounded-2xl transition duration-300 ease-in text-center"
          >
            <div className="flex justify-center mb-5">
              <img
                src={offer.img}
                alt={offer.title}
                className="w-20 h-20 object-cover rounded-full"
              />
            </div>
            <h4 className="text-lg font-semibold text-[#01aefb] mb-3">{offer.title}</h4>
            <p className="text-sm text-gray-600 leading-relaxed">{offer.desc}</p>
          </div>
        ))}
      </div>
    </section>

     
    </div>
  );
};

export default HomeSectiom;
