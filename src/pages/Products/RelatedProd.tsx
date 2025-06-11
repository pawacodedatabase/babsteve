import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: "male" | "female" | "unisex";
  sizes: string[];
  onSale?: true;
  originalPrice?: number;
}

const JSON_BIN_ID = "684191cb8561e97a501ff2ad";
const API_KEY = "$2a$10$M/z2e.cKX1SUsOT62D4pk.gbhiuJhRx0u3VzNAe.DsTPIHHAQE6Zu";
const BASE_URL = `https://api.jsonbin.io/v3/b/${JSON_BIN_ID}`;

const FeaturedProducts: React.FC = () => {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(BASE_URL, {
          headers: {
            "X-Master-Key": API_KEY,
          },
        });
        const allProducts: Product[] = response.data.record.products || [];
        const shuffled = allProducts.sort(() => 0.5 - Math.random());
        setFeatured(shuffled.slice(0, 4));
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="py-12 px-4 lg:px-20 bg-white">
       <h2 className="text-2xl font-semibold text-center mb-4 text-[#01aefb]">
        Featured Products
      </h2>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="border p-4 rounded bg-gray-100 animate-pulse"
              >
                <div className="w-full h-40 bg-gray-300 rounded-md"></div>
                <div className="mt-3 h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="mt-2 h-3 bg-gray-300 rounded w-1/2"></div>
                <div className="mt-2 h-3 bg-gray-300 rounded w-1/3"></div>
              </div>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <div key={product.id} className="border p-4 rounded bg-gray-100">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h4 className="text-xl font-bold mt-3">{product.name}</h4>
              <p className="text-sm text-gray-600 mt-2">
                {product.description.split(" ").slice(0, 20).join(" ")}...
              </p>
              <p className="font-semibold mt-2 text-[#00b1ed] text-2xl">
                ₦{product.price.toLocaleString()}
              </p>
              <Link
                to={`/shop/${product.id}`}
                className="block bg-[#00b1ed] hover:bg-[#404160] text-white text-center mt-3 py-2 rounded"
              >
                View Product
              </Link>
            </div>
          ))}
        </div>
       
      )} <Link
                to={`/shop`}
                className="block bg-[#00b1ed] hover:bg-[#404160] w-[300px] m-auto text-white text-center mt-3 py-2 rounded"
              >
                View All Products
              </Link>
    </div>
  );
};

export default FeaturedProducts;
