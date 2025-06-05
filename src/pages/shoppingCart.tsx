import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion"; // Importing framer-motion for animations
import { Link, useNavigate } from "react-router-dom";




const Cart: React.FC<{
  cart: any[];
  updateQuantity: (productId: number, action: "increase" | "decrease") => void;
  removeFromCart: (productId: number) => void;
}> = ({ cart, updateQuantity, removeFromCart }) => {
  const [promoCode, setPromoCode] = useState<string>(""); // State to track the entered promo code
  const [discountApplied, setDiscountApplied] = useState<boolean>(false); // Track if discount is applied
  const [error, setError] = useState<string>(""); // Track promo code error message
  const [selectedState, setSelectedState] = useState<string>(""); // Track selected delivery state

  // Mapping of Nigerian states to their delivery fees (in Naira)
  const deliveryFees: Record<string, number> = {
    Lagos: 2500,
    Abuja: 5000,
    Kano: 3500,
    PortHarcourt: 3400,
    Enugu: 1600,
    Ibadan: 1100,
    Benin: 6000,
    Ekiti: 3000,
    Akure: 2500,
    // Add other states as needed
  };

  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    navigate("/checkout", {
      state: {
        totalPrice,
        discountApplied,
        totalWithDiscount,
        
        deliveryFee: deliveryFees[selectedState] || 1500,
      },
    });
  };

  const totalPrice = cart.reduce((total, item) => {
    const effectivePrice = item.originalPrice || item.price; // Use originalPrice if it exists
    return total + effectivePrice * item.quantity;
  }, 0);

  const discount = 0.05; // 5% discount for valid promo code

  // Handle promo code validation and apply discount
  const handlePromoCode = () => {
    if (promoCode === "ATB5OFF") {
      setDiscountApplied(true);
      setError(""); // Reset error message
    } else {
      setError("Invalid promo code.");
      setDiscountApplied(false); // Reset discount if code is invalid
    }
  };

  // Calculate the total with discount
  const totalWithDiscount = discountApplied
    ? totalPrice * (1 - discount) + (deliveryFees[selectedState] || 1500)
    : totalPrice + (deliveryFees[selectedState] || 1500);

  return (
    <div className="container mx-auto px-4 py-8 bg-white text-black">
      {/* Cart Page Title with Animation */}
      <motion.h1
        className="text-center text-3xl font-semibold text-[#000] mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Your Shopping Cart
      </motion.h1>

      <div className="text-center font-thin mb-4">
        <p>
          Get 5% Off First Purchase. Use the code{" "}
          <span className="font-semibold">ATB5OFF</span>
        </p>
        <p className="mt-2 text-gray-700">
          If you're sure items should be in your cart, kindly{" "}
          <button
            onClick={() => window.location.reload()}
            className="text-red-500 underline"
          >
            refresh
          </button>
          .
        </p>
      </div>

      {cart.length === 0 ? (
        <motion.div
          className="text-center text-lg text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p>Your cart is empty.</p>
          <p className="mt-4 text-gray-700">
            {" "}
            <Link to="/products" className="text-[#000] underline">
              continue shopping
            </Link>
            .
          </p>
        </motion.div>
      ) : (
        <div className="overflow-x-auto max-w-full">
          <table className="min-w-full table-auto text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-sm text-gray-700">PRODUCT</th>
                <th className="py-3 px-4 text-sm text-gray-700">PRICE</th>
                <th className="py-3 px-4 text-sm text-gray-700">QUANTITY</th>
                <th className="py-3 px-4 text-sm text-gray-700">SUBTOTAL</th>
                <th className="py-3 px-4 text-sm text-gray-700">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => {
                const effectivePrice = item.originalPrice || item.price; // Use originalPrice if it exists

                return (
                  <motion.tr
                    key={item.id}
                    className="border-b border-gray-300 bg-gray-50 hover:bg-gray-100 transition duration-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-20 h-20 rounded-md object-cover"
                        />
                        <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                          <p className="font-thin text-gray-800 text-ellipsis overflow-hidden whitespace-nowrap w-60">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {item.size || "Size: n/a"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-lg text-red-500 ">
                      ₦{effectivePrice.toLocaleString()}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, "decrease")}
                          className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition duration-200 ease-in-out"
                        >
                          <span className="font-bold text-lg">-</span>
                        </button>
                        <span className="text-lg font-bold text-gray-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, "increase")}
                          className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition duration-200 ease-in-out"
                        >
                          <span className="font-bold text-lg">+</span>
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-lg text-black font-bold">
                      ₦{(effectivePrice * item.quantity).toLocaleString()}
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrashAlt size={20} />
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Promo Code Input */}
      <div className="mt-6 flex items-center justify-between bg-gray-100 p-4 rounded-md shadow-md">
        <input
          type="text"
          placeholder="Enter Promo Code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="p-2 border rounded-md w-full text-black"
        />
        <motion.button
          onClick={handlePromoCode}
          className="bg-red-500 text-[#fff] py-2 px-4 rounded-md ml-4"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Apply
        </motion.button>
      </div>
      {error && <p className="mt-2 text-red-500 text-center">{error}</p>}

      {/* Delivery State Selector */}
      <div className="mb-4 mt-7 text-center">
        <label className="text-lg font-medium ">Delivery Location</label>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="p-2 border rounded-md w-full text-black mt-2"
        >
          <option value="">Select a state</option>
          {Object.keys(deliveryFees).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      {/* Cart Summary */}
      <div className="mt-10 bg-gray-100 p-6 rounded-md shadow-md">
        <div className="flex justify-between text-lg text-gray-700">
          <p>Subtotal:</p>
          <p>₦{totalPrice.toLocaleString()}</p>
        </div>
        <div className="flex justify-between text-lg text-gray-700">
          <p>Delivery Fee:</p>
          <p>₦{(deliveryFees[selectedState] || 1500).toLocaleString()}</p>
        </div>
        {discountApplied && (
          <div className="flex justify-between text-sm text-green-500 font-bold">
            <p>Discount (5%):</p>
            <p>-₦{(totalPrice * 0.05).toLocaleString()}</p>
          </div>
        )}
        <div className="flex justify-between text-xl font-bold text-black">
          <p>Total:</p>
          <p>₦{totalWithDiscount.toLocaleString()}</p>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="text-center mt-8">
        <motion.button
          className="w-full py-3 bg-red-500 text-white font-semibold text-lg rounded-md hover:bg-red-400 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleProceedToCheckout}
        >
          Proceed to Checkout
        </motion.button>
      </div>
    </div>
  );
};

export default Cart;
