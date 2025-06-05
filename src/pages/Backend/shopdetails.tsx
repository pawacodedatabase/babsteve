import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
// import RandomProducts from "../Products/RelatedProd";
import { FaWhatsapp } from "react-icons/fa";
import FeaturedProducts from "../Products/RelatedProd";

const JSON_BIN_ID = "684191cb8561e97a501ff2ad";
const API_KEY = "$2a$10$M/z2e.cKX1SUsOT62D4pk.gbhiuJhRx0u3VzNAe.DsTPIHHAQE6Zu";
const BASE_URL = `https://api.jsonbin.io/v3/b/${JSON_BIN_ID}`;

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

const ShopDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(BASE_URL, {
          headers: { "X-Master-Key": API_KEY },
        });
        const products: Product[] = response.data.record.products || [];

        const selectedProduct = products.find((p) => p.id === Number(id)) || null;
        setProduct(selectedProduct);

        // Set the first image as the default selected image
        if (selectedProduct) {
          setSelectedImage(selectedProduct.images[0]);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg animate-pulse">
        <div className="w-full h-64 bg-gray-300 rounded-md"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4 mt-4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
        <div className="h-6 bg-gray-300 rounded w-1/4 mt-4"></div>
      </div>
    );
  }

  if (!product) return <p className="text-center text-red-500">Product not found.</p>;

  return (
    <>
    <div className="max-w-2xl mx-auto p-6 bg-white">
   <div className="space-y-4 mb-8">
  <p className="font-thin text-gray-800 text-center">How to Order This Product</p>
  <p className="text-gray-500 text-center p-3">
    This product is not available for direct checkout. To place your order, please click the WhatsApp button below to chat with a BABSTEVE SOLAR representative. Our solar products are built for efficiency, durability, and energy independence customized to meet your power needs.
  </p>
</div>



      {/* Main Image Display */}
      <img
        src={selectedImage}
        alt={product.name}
        className="w-full h-72 object-cover rounded-md border"
      />

      {/* Thumbnail Image Gallery */}
      <div className="flex gap-2 mt-4 overflow-x-auto">
        {product.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`w-20 h-20 object-cover rounded-md border cursor-pointer ${
              selectedImage === image ? "border-2 border-black" : "border-gray-300"
            }`}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
      <button
        className="text-white font-semibold text-sm bg-black hover:bg-transparent hover:border-2 hover:border-black hover:text-black p-2 mt-5 mb-5"
        onClick={() => window.history.back()}
      >
        Back to Shop
      </button>

      {/* Product Info */}
      <h2 className="text-3xl font-thin text-gray-900 mb-3">{product.name}</h2>
      <p className="text-xl text-[#19a5e1] mt-5 ">₦{product.price}</p>

{/* <p className="text-sm text-center ">We are offering a  <span className="font-bold text-gray-500">20% discount, </span> so the price you will be paying is  <span className=" text-red-600">₦{product.originalPrice}</span></p> */}

{/* <p className="text-sm text-gray-500 mb-4 mt-5">{product.category}</p> */}

<div className="space-y-4">
  {/* <p className="font-thin text-gray-800 text-center">Available Sizes</p> */}
  <div className="flex flex-wrap gap-4 justify-center ">
    {product.sizes?.map((size, index) => (
      <button
        key={index}
        className="w-12 h-12 flex items-center justify-center text-gray-900 font-thin border border-gray-300 rounded-md hover:bg-gray-100 hover:border-black transition-all duration-200"
      >
        {size}
      </button>
    ))}
  </div>
</div>

<div className="space-y-4 mt-5">
  <p className="font-thin text-gray-800 text-center">Description</p>
  <p className="text-gray-500 text-center p-3 ">{product.description}</p>
</div>

<div className="space-y-4">
  <p className="font-thin text-gray-800 text-center">About Our Brand</p>
  <p className="text-gray-500 text-center p-3">
    At BABSTEVE SOLAR, we are committed to delivering reliable, high-performance solar energy solutions. Our products are designed to help homes and businesses achieve energy independence while reducing electricity costs. From solar panels to inverters and complete installation services, we combine innovation, quality, and sustainability to power a brighter future for all.
  </p>
</div>


     
    </div>

    <div className="flex justify-center items-center ">
  <Link
    to={`https://wa.me/+2348067679019?text=Hi,%20I'm%20interested%20in%20the%20${encodeURIComponent(
      product.name
    )}%20for%20₦${product.price}.`}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-2 w-[80%] max-w-sm px-2 bg-[#19a5e1] text-white py-2 text-lg font-semibold shadow-lg hover:border-2 hover:border-black hover:bg-white hover:text-black transition duration-300"
  >
    <FaWhatsapp size={24} />
    Contact Us
  </Link>
</div>

{/* <Link
  to={`https://wa.me/+2349086471660?text=Hi,%20I'm%20interested%20in%20the%20${encodeURIComponent(
    product.name
  )}%20for%20₦${product.price}.`}
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 right-6 flex items-center gap-2 bg-green-500 text-white py-3 px-5 rounded-full shadow-lg hover:border-2 hover:border-black hover:bg-white hover:text-black transition duration-300"
>
  <FaWhatsapp size={24} />
  <span className="text-sm font-semibold">Contact Us</span>
</Link> */}

    {/* <RandomProducts/> */}
    <FeaturedProducts/>
    </>
    
   
  );
};

export default ShopDetails;
