import React, { useEffect, useState } from "react";

import proj1 from '../../assets/proj2.jpg'
import proj3 from '../../assets/proj3.jpg'
import proj4 from '../../assets/proj4.jpg'
import proj5 from '../../assets/proj5.mp4'
import proj6 from '../../assets/proj6.jpg'
import proj7 from '../../assets/proj7.jpg'
import proj8 from '../../assets/proj8.jpg'
import proj9 from '../../assets/proj9.jpg'
import proj10 from '../../assets/proj10.jpg'
import proj11 from '../../assets/proj11.jpg'
import proj12 from '../../assets/proj12.jpg'
import proj13 from '../../assets/proj13.jpg'
import proj14 from '../../assets/proj14.mp4'
import proj2 from '../../assets/solar1.jpg'
import proj15 from '../../assets/solar2.jpg'
import proj16 from '../../assets/b735c257b82d984ab37b0cb0e6517bc3.jpg'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type ProjectMedia = {
  type: "image" | "video";
  src: string;
  title: string;
};

const mediaItems: ProjectMedia[] = [
  { type: "image", src: proj1, title: "Solar Panel Installation" },
  { type: "image", src: proj2, title: "Inverter Setup" },
  { type: "image", src: proj3, title: "Battery Backup System" },
  { type: "image", src: proj4, title: "Control Panel Overview" },
  { type: "image", src: proj5, title: "Ground Mount System" },
  { type: "image", src: proj6, title: "Wiring Setup" },
  { type: "image", src: proj7, title: "Roof-Mount Array" },
  { type: "image", src: proj8, title: "Battery Enclosure" },
  { type: "image", src: proj9, title: "Client Review Snapshot" },
  { type: "image", src: proj10, title: "Safety Check" },
  { type: "image", src: proj11, title: "Time-lapse Progress" },
  { type: "image", src: proj12, title: "Power Output Test" },
  { type: "image", src: proj13, title: "Installation Team" },
  { type: "video", src: proj14, title: "System Walkthrough" },
  { type: "video", src: proj15, title: "Client Testimonial" },
  { type: "image", src: proj16, title: "Final Setup Showcase" },
];


const OurProjects: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === mediaItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? mediaItems.length - 1 : prevIndex - 1
    );
  };

  const currentItem = mediaItems[currentIndex];

  return (
    <section className="bg-gray-100 py-12 px-4 md:px-12">
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">Our Projects</h2>
      <div className="relative max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="w-full h-[400px] flex justify-center items-center">
          {currentItem.type === "image" ? (
            <img
              src={currentItem.src}
              alt={currentItem.title}
              className="w-full h-full object-cover transition-all duration-700"
            />
          ) : (
            <video
              src={currentItem.src}
              controls
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="p-4 text-center bg-gray-50">
          <h3 className="text-sm font-semibold text-gray-700">Have a review of our random projects</h3>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex justify-between items-center px-4">
          <button
            onClick={handlePrev}
            className="bg-white p-2 rounded-full shadow hover:bg-gray-200 transition"
          >
           <FaArrowLeft/>
          </button>
          <button
            onClick={handleNext}
            className="bg-white p-2 rounded-full shadow hover:bg-gray-200 transition"
          >
           <FaArrowRight/>         </button>
        </div>
      </div>
    </section>
  );
};

export default OurProjects;
