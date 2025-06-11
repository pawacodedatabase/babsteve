import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const JSON_BIN_ID = "684191cb8561e97a501ff2ad";
const API_KEY = "$2a$10$M/z2e.cKX1SUsOT62D4pk.gbhiuJhRx0u3VzNAe.DsTPIHHAQE6Zu";
const BASE_URL = `https://api.jsonbin.io/v3/b/${JSON_BIN_ID}`;

const EXCHANGE_RATE = 0.0013;

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

const PRODUCTS_PER_PAGE = 10;

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currency, setCurrency] = useState<"NGN" | "USD">("NGN");
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log(setCurrency)
        const response = await axios.get(BASE_URL, {
          headers: { "X-Master-Key": API_KEY },
        });
        setProducts(response.data.record.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const convertPrice = (price: number) => {
    return currency === "USD" ? price * EXCHANGE_RATE : price;
  };

  // Pagination logic
  const indexOfLast = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirst = indexOfLast - PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center mb-4">Our Products</h2>
      <p className="text-sm text-center mb-3 animate-bounce">
        What are you buying from us today?
      </p>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
      ) : currentProducts.length === 0 ? (
        <p className="text-gray-500 text-center">No products available.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className="relative border p-4 rounded bg-gray-100"
              >
                {product.onSale && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    OUT OF STOCK
                  </span>
                )}

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
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: currency,
                  }).format(convertPrice(product.price))}
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

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${
                currentPage === 1
                  ? "bg-[#00b1ed] hover:bg-[#404160] text-white cursor-not-allowed"
                  : "bg-black text-white"
              }`}
            >
              Previous
            </button>
            <span className="font-medium text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${
                currentPage === totalPages
                  ? "bg-[#00b1ed] hover:bg-[#404160] text-white cursor-not-allowed"
                  : "bg-black text-white"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Shop;
