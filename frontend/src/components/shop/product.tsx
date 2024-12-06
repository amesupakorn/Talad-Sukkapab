import React, { useState } from "react";
import Navbar from "../nav/navbar";
const Product = () => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div>
    <Navbar />

    <div className="h-[100px]"></div>
    <div className="container max-w-5xl mx-auto p-6 md:p-24 flex flex-col md:flex-row gap-8 ">
    {/* Left Section: Product Images */}
            <div className="flex flex-col items-center md:items-start">
                    <div className="w-64 h-64 border rounded-lg overflow-hidden">
                    <img
                        src="/images/home/product/ath31.png"
                        alt="Main Product"
                        className="object-cover w-full h-full"
                    />
                    </div>
                    <div className="flex gap-4 mt-4">
                    <div className="w-16 h-16 border rounded-lg overflow-hidden cursor-pointer">
                        <img
                        src="/images/home/product/ath31-2.png"
                        alt="Product Thumbnail"
                        className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </div>

            {/* Right Section: Product Details */}
            <div className="flex flex-col flex-grow">
                {/* Product Header */}
                <div className="flex flex-col items-start">
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full mb-2">Nutrilite </span>
                <h1 className="text-2xl font-bold">Mushroom Mixed Truffle Chips PLANT TO TABLE </h1>
                <p className="mt-2 text-gray-600 leading-relaxed md:w-[600px]">
                    Crispy fried mixed mushrooms mixed with truffles (Oringi mushroom, black shimeji mushroom, oyster mushroom, lotus root, eggplant, real white truffle powder) carefully selected quality Vegan and vegetarian products containing all natural ingredients.
                </p>
                </div>

                {/* Price Section */}
                <div className="mt-6">
                <div className="flex items-center gap-4">
                    <p className="text-3xl font-bold text-gray-800">฿ 297</p>
                    {/* <p className="text-gray-400 line-through">฿ 1,650</p> */}
                    {/* <button className="bg-blue-100 text-blue-500 text-sm px-4 py-1 rounded-lg">
                    15% off | Register
                    </button> */}
                </div>
                </div>

                <div className="mt-6 flex mb-2 space-x-4 text-red-500 mb-4">
                    <div className="flex items-center space-x-2">
                        <svg className="h-5 w-5"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="7" cy="17" r="2" />  <circle cx="17" cy="17" r="2" />  <path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />  <line x1="3" y1="9" x2="7" y2="9" /></svg>
                        <p>Free delivery</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <svg className="h-5 w-5"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />  <polyline points="22 4 12 14.01 9 11.01" /></svg>
                        <p>Guarantee</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <svg className="h-5 w-5"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />  <line x1="12" y1="22.08" x2="12" y2="12" /></svg>
                        <p>In Stock</p>
                    </div>
                </div>
                <div className="border-b border-gray-400"></div>

                {/* Quantity and Add to Cart */}
                <div className="mt-6 flex flex-col md:flex-row items-center gap-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center border rounded-lg overflow-hidden w-full md:w-auto">
                        <button
                        className="px-4 py-3 bg-gray-100 text-gray-600 w-1/3 md:w-auto"
                        onClick={decreaseQuantity}
                        >
                        -
                        </button>
                        <span className="px-6 py-3 text-center w-1/3 md:w-auto">{quantity}</span>
                        <button
                        className="px-4 py-3 bg-gray-100 text-gray-600 w-1/3 md:w-auto"
                        onClick={increaseQuantity}
                        >
                        +
                        </button>
                    </div>

                    {/* Add to Cart Button */}
                    <button className="flex justify-center items-center bg-black text-white px-6 py-3 rounded-full hover:bg-gray-700 w-full md:w-auto">
                        <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                        </svg>
                        <p className="hidden md:flex ml-2">Add to Cart</p>
                    </button>
                    </div>
       
                 </div>
            </div>
    
        </div>
   

  );

};

export default Product;
