import React from "react";
import { products } from "../pages/Products/products"; // Assuming the product data is here
import { FaHeart, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const OnSaleProducts: React.FC<{
  addToWishlist: (product: any) => void;
  wishlist: any[];
}> = ({ addToWishlist, wishlist }) => {
  // Filter products that are on sale
  const onSaleProducts = products.filter((product) => product.onSale);

  const isInWishlist = (productId: number) => {
    return wishlist.some((item) => item.id === productId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center mb-6">On Sale Products</h1>

      {/* Show message if no products are on sale */}
      {onSaleProducts.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No products on sale at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {onSaleProducts.map((product) => {
            // Determine the price to display
            const mainPrice = product.originalPrice || product.price;

            return (
              <div
                key={product.id}
                className="relative flex flex-col bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300"
              >
                {/* Sale Banner */}
                {product.onSale && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-sm font-bold px-7 py-1 shadow-md z-10">
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
                    <button
                      onClick={() => addToWishlist(product)}
                      className={`bg-white ${isInWishlist(product.id) ? "text-red-500" : "text-gray-500"} p-2 rounded-full shadow hover:animate-pulse`}
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

                {/* Product Details */}
                <div className="mt-4">
                  <h2 className="text-lg font-bold">{product.name}</h2>
                  <p className="text-sm text-gray-500">{product.description}</p>
                  <div className="flex items-baseline space-x-2">
                    <p className="text-2xl font-semibold text-red-600">₦{mainPrice}</p>
                    {product.originalPrice && (
                      <p className="text-xl text-gray-400 line-through">
                        ₦{product.price}
                      </p>
                    )}
                  </div>

                  {/* View Product Button */}
                  <div className="mt-4 flex justify-center">
                    <Link
                      to={`/product/${product.id}`}
                      className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-600"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OnSaleProducts;
