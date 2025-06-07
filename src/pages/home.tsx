import React from 'react';
import HeroSection from '../components/homeComponents/Hero';
// import CategoryPage from '../components/homeComponents/Category';
// import { products } from "../pages/Products/products";
// import RandomProducts from './Products/RelatedProd';
// import BlogBanner from './Blog/blogBanner';
import FeaturedBlog from './Blog/featuredBlog';
import FeaturedProducts from './Products/RelatedProd';
import ceoImg from "../assets/tk.jpg"; 
import { Link } from 'react-router-dom';
import HomeSectiom from '../components/homeComponents/homeSection';


const Home: React.FC = () => {
  return (
<>
<HeroSection/>
{/* <CategoryPage products={products}/> */}
<FeaturedProducts/>
<HomeSectiom/>
<FeaturedBlog/>
{/* <BlogBanner/> */}

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
    <div className=" m-auto">
          <Link
            to={`/about`}
            className="mt-2 px-4 py-2 bg-[#01aefb] text-white rounded-md hover:bg-gray-600"
          >
            Read More
          </Link>
        </div>
  </div>
</section>


</>
  );
};

export default Home;
