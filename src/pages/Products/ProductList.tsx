import React, { useState, useEffect } from "react";
import { products as productData } from "./products"; // Assuming product data is here
import { FaShoppingCart, FaHeart, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import EmailPopup from "../../components/Banner";

const shuffleArray = (array: any[]) => {
  return array
    .map((item) => ({ ...item, sortKey: Math.random() }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(({ sortKey, ...item }) => item);
};

const ProductList: React.FC<{
  addToCart: (product: any) => void;
  updateQuantity: (productId: number, action: "increase" | "decrease") => void;
  cart: any[];
  addToWishlist: (product: any) => void;
  wishlist: any[];
}> = ({ addToCart, updateQuantity, cart, addToWishlist, wishlist }) => {
  const [products, setProducts] = useState(productData); // Add state for products
  const [filters, setFilters] = useState({
    size: "",
    name: "",
    category: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Shuffle products when the component mounts
  useEffect(() => {
    setProducts(shuffleArray(productData));
  }, []);

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
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (direction: "next" | "previous") => {
    setCurrentPage((prev) => {
      if (direction === "next" && prev < totalPages) return prev + 1;
      if (direction === "previous" && prev > 1) return prev - 1;
      return prev;
    });
  };

  const getItemQuantity = (productId: number) => {
    const item = cart.find((product) => product.id === productId);
    return item ? item.quantity : 0;
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some((item) => item.id === productId);
  };

  return (
    <>
      <EmailPopup />
      <div className="container mx-auto px-4 py-8 font-sans text-gray-800">
        <h1 className="text-4xl font-semibold text-center mb-6">
          Shop Our Collection
        </h1>

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
          {paginatedProducts.map((product) => (
            <div
              key={product.id}
              className="relative flex flex-col bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300"
            >
              {product.onSale && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-sm font-bold px-7 py-1 shadow-md z-10">
                  On Sale
                </div>
              )}

              <div className="relative group">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-60 object-cover rounded-md"
                />
                <div className="absolute inset-0 flex items-center justify-center space-x-4 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300">
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-white text-black p-2 rounded-full shadow hover:animate-bounce"
                    aria-label="Add to Cart"
                  >
                    <FaShoppingCart />
                  </button>
                  <button
                    onClick={() => addToWishlist(product)}
                    className={`bg-white ${
                      isInWishlist(product.id)
                        ? "text-red-500"
                        : "text-gray-500"
                    } p-2 rounded-full shadow hover:animate-pulse`}
                    aria-label="Add to Wishlist"
                  >
                    <FaHeart />
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    className="bg-white text-gray-500 p-2 rounded-full shadow hover:animate-spin"
                  >
                    <FaEye />
                  </Link>
                </div>
              </div>

              <div className="mt-4">
                <h2 className="text-lg font-bold">{product.name}</h2>
                <p className="text-sm text-gray-500">{product.description}</p>
                <div className="flex items-baseline space-x-2">
                  <p className="text-2xl font-semibold text-red-600">
                    ₦{product.price}
                  </p>
                  {product.originalPrice && (
                    <p className="text-xl text-gray-400 line-through">
                      {product.originalPrice}
                    </p>
                  )}
                </div>
                <div className="mt-4">
                  {getItemQuantity(product.id) > 0 ? (
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => updateQuantity(product.id, "decrease")}
                        className="px-3 py-1 bg-gray-300 rounded-md"
                      >
                        -
                      </button>
                      <span className="text-lg font-bold">
                        {getItemQuantity(product.id)}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, "increase")}
                        className="px-3 py-1 bg-gray-300 rounded-md"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-4 justify-center">
                      <button
                        onClick={() => addToCart(product)}
                        className="mt-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                      >
                        Add to Cart
                      </button>
                      <Link
                        to={`/product/${product.id}`}
                        className="mt-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-600"
                      >
                        View Product
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => changePage("previous")}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            Previous
          </button>
          <span className="text-lg font-bold">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => changePage("next")}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            Next
          </button>
        </div>

        <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-full shadow-md">
          <Link to="/cart">
            <button className="flex items-center space-x-2">
              <FaShoppingCart />
              <span className="text-xl">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductList;
