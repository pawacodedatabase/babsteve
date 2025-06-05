import React from "react";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
}

interface WishlistProps {
  wishlist: Product[];
}

const Wishlist: React.FC<WishlistProps> = ({ wishlist }) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-thin text-gray-900 mb-6 text-center">My Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {wishlist.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          wishlist.map((item) => (
            <div key={item.id} className="border p-4 rounded-md">
              <img src={item.images[0]} alt={item.name} className="w-full h-48 object-cover rounded-md" />
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-red-500">₦{item.price}</p>
              <Link
                to={`/product/${item.id}`}
                className="text-black text-center hover:underline mt-4 block"
              >
                View product
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;
