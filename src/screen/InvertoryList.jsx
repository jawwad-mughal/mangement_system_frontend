import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getAllStock, deleteStock, getEditStock } from "../store/slices/inventorySlice";

function InvertoryList() {

  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loader } = useSelector((state) => state.inventory);
 
  // Fetch all stock on mount
  useEffect(() => {
    dispatch(getAllStock());
  }, [dispatch]);

  const handleEdit = (item) => {
    dispatch(getEditStock(item));
    navigate("inventorylist/editstock");
  };

  const handleDelete = (id) => {
      dispatch(deleteStock(id));
    
  };

  return (
    <>
      <Outlet />
      <div className="p-5 border rounded-2xl">
        <h2 className="text-2xl font-bold text-blue-700 mb-2">Stock List</h2>

        {/* Filter */}
        <div className="flex flex-wrap items-end gap-2 bg-white p-4 shadow rounded-t-xl border">
          <input
            type="text"
            className="border p-2 rounded-lg bg-gray-50"
            placeholder="Search Product"
          />
          <button className="px-4 py-2.5 bg-blue-600 text-white text-md font-medium rounded-lg shadow hover:bg-blue-700 transition">
            Search
          </button>
        </div>

        {/* Stock Table */}
        <div className="overflow-y-auto h-[55vh] small-scroll">
          <div className="bg-white shadow-lg rounded-b-xl">
            <table className="w-full text-sm">
              <thead className="bg-blue-600 text-white uppercase text-xs">
                <tr>
                  <th className="p-3 border text-center">Date</th>
                  <th className="p-3 border text-center">Product</th>
                  <th className="p-3 border text-center">Category</th>
                  <th className="p-3 border text-center">Quantity</th>
                  <th className="p-3 border text-center">Unit</th>
                  <th className="p-3 border text-center">Supplier</th>
                  <th className="p-3 border text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loader ? (
                  <tr>
                    <td colSpan={7} className="text-center p-4">Loading...</td>
                  </tr>
                ) : list.length === 0  ? (
                  <tr>
                    <td colSpan={7} className="text-center p-4">No stock found</td>
                  </tr>
                ) : (
                  list.map((item) => (
                    <tr key={item._id} className="border bg-gray-100">
                      <td className="p-3 border text-center">{item.date}</td>
                      <td className="p-3 border text-center">{item.productname}</td>
                      <td className="p-3 border text-center">{item.category?.categoryname|| "-"}</td>
                      <td className="p-3 border font-semibold text-center">{item.qty}</td>
                      <td className="p-3 border text-center">{item.unit}</td>
                      <td className="p-3 border text-center">{item.supplier}</td>
                      <td className="p-2 border text-center space-x-2">
                        
                        <button
                          onClick={() => handleEdit(item)}
                          className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded text-xs shadow"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs shadow"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default InvertoryList;

