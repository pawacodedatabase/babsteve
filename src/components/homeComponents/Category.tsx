// CategoryPage.tsx

import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../pages/Products/products"; // Import products array and Product type

import male from '../../assets/male.jpg'
import fmale from '../../assets/female.jpg'

// ProductFilter Component (for showing category cards)
const ProductFilter: React.FC<{ products: Product[] }> = ({  }) => {
  return (
    <div className="flex justify-center mb-8 space-x-8">
      {/* Male Card */}
      <div
        className="cursor-pointer relative p-8 border rounded-md shadow-md bg-cover bg-center h-[600px] w-96 flex flex-col justify-center items-center transition-transform duration-300 transform hover:scale-105 hover:opacity-90"
        style={{
          backgroundImage: `url(${male})`, // Replace with your background image
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <Link to="/products/male" className="relative z-10 text-center text-white">
          <h2 className="font-semibold text-2xl mb-2">Male</h2>
          <p className="text-sm border  px-4 py-1 rounded-md hover:bg-black ">Click Here</p>
        </Link>
      </div>

      {/* Female Card */}
      <div
        className="cursor-pointer relative p-8 border rounded-md shadow-md bg-cover bg-center h-[600px] w-96 flex flex-col justify-center items-center transition-transform duration-300 transform hover:scale-105 hover:opacity-90"
        style={{
          backgroundImage: `url(${fmale})`, // Replace with your background image
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <Link to="/products/female" className="relative z-10 text-center text-white">
          <h2 className="font-semibold text-2xl mb-2">Female</h2>
          <p className="text-sm border  px-4 py-1 rounded-md hover:bg-black ">Click Here</p>
        </Link>
      </div>
    </div>
  );
};

// CategoryPage Component
const CategoryPage: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <div className="container mx-auto px-4 py-8">

      <Link to="products" className="border item-center flex justify-center px-2 py-2 m-4 bg-black text-[#fff] font-semibold  rounded-md  hover:bg-transparent hover:text-black">

      CLICK HERE FOR ALL PRODUCTS 
      
      </Link>

    
      
      <h1 className="text-center text-3xl font-thin mb-8">Category</h1>
      <ProductFilter products={products} />
    </div>
  );
};

export default CategoryPage;
