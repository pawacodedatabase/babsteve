import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaCreditCard, FaMoneyBillWave } from "react-icons/fa";
import { useLocation } from "react-router-dom";


const Checkout: React.FC<{ cart: any[] }> = ({ cart }) => {
  const navigate = useNavigate(); // Initialize the navigate function
  // Flat delivery fee in Naira (₦)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    paymentMethod: "bankTransfer", // Default to Bank Transfer
    senderName: "",
    amount: "",
    senderBank: "",
    bitcoinAddress: "", // To store Bitcoin address
  });

  const location = useLocation();
  const { totalPrice, totalWithDiscount, deliveryFee } = location.state || {};

  localStorage.setItem("checkoutFormData", JSON.stringify(formData));

  const [loading, setLoading] = useState(false); 
  const [orderId] = useState(generateOrderId()); // Generate a unique Order ID

  const today = new Date();
  const expectedDeliveryDate = new Date();
  expectedDeliveryDate.setDate(today.getDate() + 9); // Add 9 working days (excluding weekends)

  // Calculate the total price of items in the cart
   const grandTotal = totalPrice + deliveryFee;

  // Handle form data changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for payment notification and redirect to confirmation page
  const handlePaymentConfirmation = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);


    const formSubmissionData = {
      access_key: "5f614b1b-3538-4a5a-81e0-ba90ad8545d0", // Replace with your Web3Form Access Key
      subject: "New Payment Confirmation!",
      from_name: formData.name,
      email: formData.email,

      message: `\n\nPayment Details:\n\n Order ID : ${orderId} \n\n - Sender's Name: ${formData.senderName}\n- Amount: ₦${formData.amount}\n- Shoe Size: ${formData.zip}\n- Sender's Bank: ${formData.senderBank}\n\nShipping Details:\n\n- Address: ${formData.address}, ${formData.city}\n- Phone: ${formData.phone}\n\nOrder Summary:\n${cart
        .map(
          (item) => `- ${item.name} (Qty: ${item.quantity}) - ₦${(item.price * item.quantity).toLocaleString()}`
        )
        .join("\n")}`,
    };

    try {
      await axios.post("https://api.web3forms.com/submit", formSubmissionData, {
        headers: { "Content-Type": "application/json" },
      });
  
    

      setTimeout(() => {
        navigate("/contact", { state: { orderId, name: formData.senderName, totalAmount: grandTotal } });
      }, 3000); // 3 seconds delay
    } catch (error) {
      console.error("Error sending payment confirmation:", error);
      alert("There was an issue notifying the admin.");
      setLoading(false); // Hide loading if error occurs
    }
  };

  // Function to generate a unique Order ID
  function generateOrderId(): string {
    return "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-semibold text-center mb-6 text-gray-800">Checkout</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Order Summary */}
        <div className="flex-1 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-4 border-b">
              <div className="flex items-center space-x-4">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-16 h-16 rounded-md"
                />
              
              </div>
              <p className="text-red-600 font-semibold">
              {item.name}
              </p>
              <div>
                  
                  <p className="text-gray-500">Qty: {item.quantity}</p>
                </div>
            </div>
          ))}
     


<div className="mt-6 text-1xl">
        <div className="flex justify-between">
          <p className="font-semibold text-gray-800">Subtotal:</p>
          <p className="text-gray-800">₦{totalPrice?.toLocaleString()}</p>
        </div>
        <div className="flex justify-between mt-2">
          <p className="font-semibold text-gray-800">Delivery Fee:</p>
          <p className="text-gray-800">₦{deliveryFee?.toLocaleString()}</p>
        </div>
        <div className="flex justify-between mt-4 font-semibold text-xl">
          <p className="text-gray-800">Total:</p>
          <p className="text-red-600">₦{totalWithDiscount?.toLocaleString()}</p>
        </div>
      </div>

            
            <div className="mt-6">
              <p className="text-gray-600 underline font-semibold">Expected Delivery Date:</p>
              <p className="font-semibold text-red-400">{expectedDeliveryDate.toDateString()}</p>
            </div>
          </div>
        </div>

        {/* Right: Customer Details and Payment Form */}
        <div className="flex-1 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4">Shipping Details</h2>
          <form onSubmit={handlePaymentConfirmation} className="space-y-6">
            {/* Shipping Details */}
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute right-3 top-3 text-red-600">
                  <FaUser />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-b focus:outline-none"
                  placeholder="Full Name"
                />
              </div>

              <div className="relative">
                <div className="absolute right-3 top-3 text-red-600">
                  <FaPhoneAlt />
                </div>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-b focus:outline-none"
                  placeholder="Phone Number"
                />
              </div>

              <div className="relative">
                <div className="absolute right-3 top-3 text-red-600">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address "
                  className="w-full px-4 py-3 border-b focus:outline-none"
                />
              </div>

              <div className="relative">
                <div className="absolute right-3 top-3 text-red-600">
                  <FaMapMarkerAlt />
                </div>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-b focus:outline-none "
                  placeholder="Address"
                />
              </div>

              <div className="relative">
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City (Optional)"
                  className="w-full px-4 py-3 border-b focus:outline-none"
                />
              </div>

              <div className="relative">
                <input
                  type="number"
                  
                  id="zip"
                  name="zip"
                  required
                  value={formData.zip}
                  onChange={handleInputChange}
                  placeholder="Shoe Size"
                  className="w-full px-4 py-3 border-b focus:outline-none"
                />
              </div>
            </div>

            <div className="relative mb-4">
              <label htmlFor="paymentMethod" className="block text-gray-800 mb-2 text-2xl font-semibold">Payment Method</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-b focus:outline-none"
              >
                <option value="bankTransfer">Bank Transfer</option>
                <option value="bitcoin">Bitcoin</option>
              </select>
            </div>

            <div className="flex gap-8">
              {/* Bank Transfer Details */}
              {formData.paymentMethod === "bankTransfer" && (
                <div className="flex-1 bg-gray-100 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg">Bank Transfer Details</h3>
                  <div className="mt-4">
                    <div className="relative mb-4">
                      <input
                        type="text"
                        
                        onChange={handleInputChange}
                        value="Bank Name: Monie Point"
                        readOnly
                        className="w-full px-4 py-3 border-b focus:outline-none"
                      />
                    </div>
                    <div className="relative mb-4">
                      <input
                       
                        
                        value='Account Number: 6669071253'
                        
                       
                        readOnly
                        className="w-full px-4 py-3 border-b focus:outline-none"
                      />
                    </div>
                    <div className="relative mb-4">
                      <input
                        
                      
                        value="Receiver's Name: James Anuoluwapo"
                        readOnly
                        className="w-full px-4 py-3 border-b focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Bitcoin Payment Details */}
              {formData.paymentMethod === "bitcoin" && (
                <div className="flex-1 bg-gray-100 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg">Bitcoin Payment Details</h3>
                  <div className="mt-4">
                    <div className="relative mb-4">
                      <input
                        value="Not available yet"
                        required
                        className="w-full px-4 py-3 border-b focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            
            {formData.paymentMethod === "bankTransfer" && (
              <div className="flex-1 bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Confirm Payment</h3>
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute right-3 top-3 text-red-600">
                      <FaUser />
                    </div>
                    <input
                      type="text"
                      id="senderName"
                      name="senderName"
                      value={formData.senderName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-b focus:outline-none"
                      placeholder="Sender's Name"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute right-3 top-3 text-red-600">
                      <FaMoneyBillWave />
                    </div>
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-b focus:outline-none"
                      placeholder="Amount"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute right-3 top-3 text-red-600">
                    <FaCreditCard/>
                    </div>
                    <input
                      type="text"
                      id="senderBank"
                      name="senderBank"
                      value={formData.senderBank}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-b focus:outline-none"
                      placeholder="Sender's Bank"
                    />
                  </div>
                </div>
              </div>
            )}

            {formData.paymentMethod === "bitcoin" && (
              <div className="flex-1 bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold text-lg">Bitcoin Payment Details</h3>
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      id="bitcoinAddress"
                      name="bitcoinAddress"
                      value={formData.bitcoinAddress}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-b focus:outline-none"
                      placeholder="Bitcoin Address"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg mt-6"
              disabled={loading} 
            >
              {loading ? "Processing..." : "Confirm Payment"}
            </button>
          </form>
          {loading && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-t-red-600 rounded-full animate-spin"></div>
      <div className="text-white text-2xl font-semibold">Processing your payment...</div>
      <p className="text-white text-lg">Please wait while we finalize your order.</p>
    </div>
  </div>
)}

        </div>
      </div>

      
    
  
 
  );
};

export default Checkout;
