import React from 'react'
import { Outlet, useNavigate } from 'react-router'

function Inventory() {
    const navigate = useNavigate()
    
  return (
    <div className="p-5 bg-gray-100 rounded-xl ">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold  text-blue-700">Inventory Management</h1>

        <div className='flex gap-1'>
        <button
          onClick={() =>navigate("createcategory") }
          className="bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
         Create Category
        </button>
        <button
          onClick={() =>navigate("/inventory") }
          className="bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
         Stock List
        </button>

        <button
          onClick={() =>navigate("inventorylist") }
          className="bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
          Add Stock
        </button>
        </div>
      </div>

      <div className='border rounded-2xl p-6'>
        <Outlet />
      </div>

    </div>
  )
}

export default Inventory