import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {  products } from "../../pages/Products/products"; // Import the products array
import {  FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "./pagination"; // Import Pagination component

const ProductListPage: React.FC = () => {
  const { category } = useParams<{ category: string }>(); // Get category from the URL
  const [currentPage, setCurrentPage] = useState(1);
 
  const itemsPerPage = 20; // Number of items per page
  const [filters, setFilters] = useState({
    size: "",
    name: "",
    category: category || "", // If category exists in URL, set it in filters
  });

  useEffect(() => {
    // Update filters when category changes in URL
    if (category) {
      setFilters((prev) => ({ ...prev, category }));
    }
  }, [category]);

  // Filter logic
  const filteredProducts = products.filter((product) => {
    const matchesSize = filters.size ? product.sizes?.includes(filters.size) : true;
    const matchesName = filters.name
      ? product.name.toLowerCase().includes(filters.name.toLowerCase())
      : true;
    const matchesCategory = filters.category
      ? product.category === filters.category
      : true;
    return matchesSize && matchesName && matchesCategory;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Add to cart function


  



  return (
    <div className="container mx-auto px-4 py-8 font-sans text-gray-800">
      <h1 className="text-4xl font-semibold text-center mb-6">Shop Our Collection</h1>

      {/* Filter Section */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-1 justify-evenly">
          <input
            type="text"
            placeholder="Search by name"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            className="border border-gray-300 rounded-md px-4 py-2 w-72"
          />
          <input
            type="text"
            placeholder="Filter by size (e.g., M, L)"
            value={filters.size}
            onChange={(e) => setFilters({ ...filters, size: e.target.value })}
            className="border border-gray-300 rounded-md px-4 py-2 w-72"
          />
        </div>
        <div className="flex justify-center">
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="border border-gray-300 rounded-md px-4 py-2 w-60 mt-4"
          >
            <option value="">All Categories</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {currentProducts.map((product) => (
    <div
      key={product.id}
      className="flex flex-col bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 relative"
    >
      {/* On Sale Tag */}
      {product.onSale && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-sm font-bold px-4 py-1 shadow-md z-10">
          On Sale
        </div>
      )}

      {/* Product Image */}
      <div className="relative group">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-60 object-cover rounded-md"
        />
        <div className="absolute inset-0 flex items-center justify-center space-x-4 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300">
          <Link
            to={`/product/${product.id}`}
            className="bg-white text-gray-500 p-2 rounded-full shadow hover:animate-spin"
          >
            <FaEye />
          </Link>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-4">
        <h2 className="text-lg font-bold">{product.name}</h2>
        <p className="text-sm text-gray-500">{product.category}</p>
        <div className="flex items-baseline space-x-2 mt-2">
          {product.onSale ? (
            <>
              <p className="text-2xl font-semibold text-red-600">
                ₦{product.originalPrice}
              </p>
              <p className="text-lg text-gray-400 line-through">
                ₦{product.price}
              </p>
            </>
          ) : (
            <p className="text-2xl font-semibold text-black">₦{product.price}</p>
          )}
        </div>
        <div className="mt-4">
          <Link
            to={`/product/${product.id}`}
            className="mt-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-600"
          >
            View Product
          </Link>
        </div>
      </div>
    </div>
  ))}
</div>


      {/* Pagination */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage} // Passing setCurrentPage directly
      />
    </div>
   
  );
};

export default ProductListPage;
