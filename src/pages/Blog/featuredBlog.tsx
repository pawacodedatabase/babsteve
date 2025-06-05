import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../../assets/logoo.png";
import { FaArrowAltCircleRight } from "react-icons/fa";

const JSON_BIN_ID = "6841952c8561e97a501ff3fd"; // Replace with your JSONBin bin ID
const API_KEY = "$2a$10$M/z2e.cKX1SUsOT62D4pk.gbhiuJhRx0u3VzNAe.DsTPIHHAQE6Zu"; // Replace with your JSONBin API Key
const BASE_URL = `https://api.jsonbin.io/v3/b/${JSON_BIN_ID}`;

interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

const FeaturedBlog: React.FC = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(BASE_URL, {
          headers: { "X-Master-Key": API_KEY },
        });

        const blogs: BlogPost[] = response.data.record || [];
        if (blogs.length > 0) {
          const shuffled = blogs.sort(() => 0.5 - Math.random()).slice(0, 2);
          setFeaturedBlogs(shuffled);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4 text-[#01aefb]">
        Featured Blogs
      </h2>

      {loading ? (
        // 🛑 Skeleton Loader while fetching data
        <div className="grid gap-6">
          {[1, 2].map((_, index) => (
            <div key={index} className="border p-4 rounded bg-gray-100 animate-pulse">
              <div className="w-24 h-10 bg-gray-300 mx-auto mb-3 rounded"></div>
              <div className="h-4 bg-gray-300 w-3/4 mb-2 rounded"></div>
              <div className="h-3 bg-gray-300 w-full mb-2 rounded"></div>
              <div className="h-3 bg-gray-300 w-5/6 mb-2 rounded"></div>
              <div className="h-3 bg-gray-300 w-4/6 mb-2 rounded"></div>
            </div>
          ))}
        </div>
      ) : featuredBlogs.length === 0 ? (
        <p className="text-gray-500 text-center">No featured blogs available.</p>
      ) : (
        <div className="grid gap-6">
          {featuredBlogs.map((blog) => (
            
            <div key={blog.id} className="border p-4 rounded bg-gray-100">
             <Link to={`/blog/${blog.id}`}>
             
             <img src={logo} alt="Blog Logo" className="w-24 mx-auto mb-3" />
              <h4 className="text-xl font-bold flex items-center gap-2">
                <FaArrowAltCircleRight className="text-[#01aefb]" />
                {blog.title}
              </h4>
              <p className="text-sm text-gray-600 mt-3">
                {blog.content.slice(0, 120)}...
                <Link to={`/blog/${blog.id}`} className="font-bold text-[#01aefb] ml-1">
                  Read More
                </Link>
              </p>
              </Link> 
              <div className="flex justify-between">
                 <p className="text-xs mt-2">
                Author: <span className="font-bold">{blog.author || "Unknown"} </span>
              </p> <p className="text-xs mt-2">at {blog.date}</p>
              </div>
             
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedBlog;
