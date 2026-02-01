import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import {
  deleteCategory,
  getCategory,
  getEditCategory,
  resetMessage,
} from "../store/slices/categorySlice";

export default function CategoryList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message, List } = useSelector((state) => state.category);
  const { list } = useSelector((state) => state.branch);
 
  useEffect(() => {
    dispatch(resetMessage());
    dispatch(getCategory());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteCategory({ id }));
  };

  useEffect(() => {
    if (message == "Category deleted successfully") {
      dispatch(getCategory());
    }
  }, [message]);

  const handleEdit = (id) => {
    navigate("editcategory");
    dispatch(getEditCategory(id));
  };

  return (
    <div>
      <Outlet />
      <div className="bg-white p-6 rounded-2xl shadow-lg border h-[46vh] overflow-y-auto mt-4">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Category List</h2>

        <table className="w-full text-sm border">
          <thead className="bg-blue-600 text-white uppercase text-xs">
            <tr>
              <th className="p-1 border text-left">#</th>
              <th className="p-1 border text-left">Category Name</th>
              <th className="p-1 border text-left">Description</th>
              <th className="p-1 border text-left">Branch Name</th>
              <th className="p-1 border text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {!List ? (
              <tr>
                <td colSpan="4" className="text-center p-2 text-gray-500">
                  No category found!
                </td>
              </tr>
            ) : (
              List.map((cat, index) => (
                <tr key={cat._id} className="bg-gray-100 border-b">
                  <td className="p-3 border">{index + 1}</td>
                  <td className="p-3 border font-semibold">
                    {cat.categoryname}
                  </td>
                  <td className="p-3 border">{cat.description}</td>
                  <td className="p-3 border">
                    {list.find((branch) => branch._id === cat.branchRef)
                      ?.branchName || "N/A"}
                  </td>

                  <td className="p-3 border text-center space-x-2">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 
                    text-white rounded text-xs shadow"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 
                    text-white rounded text-xs shadow"
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
  );
}
