import React, { useState } from "react";
import ProductList from "./ProductList";
import { Outlet, useNavigate } from "react-router";

export default function Products() {
  const navigate = useNavigate()

  return (
    <div className="p-6 bg-white rounded-2xl h-[85.5vh] overflow-y-auto small-scroll ">
      {/* Header */}
      <div className="flex  justify-between items-center gap-3 mb-4">
        <h2 className="text-2xl font-bold text-blue-700">Products Mangement</h2>
        <div className="flex gap-2">
          
          <button
            onClick={() => navigate("/product")}
            className="bg-blue-600 text-white px-4 py-2 rounded whitespace-nowrap"
          >
            Product List
          </button>
          <button
            onClick={() => navigate("addproduct")}
            className="bg-blue-600 text-white px-4 py-2 rounded whitespace-nowrap"
          >
            Add Product
          </button>
        </div>
      </div>

    {/* Outlet */}
    <div className='border rounded-2xl p-6 '>
        <Outlet />
    </div>

    </div>
  );
}
