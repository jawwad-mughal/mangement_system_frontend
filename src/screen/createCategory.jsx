import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBranch } from "../store/slices/branchSlice";
import { addCategory, resetMessage, getCategory } from "../store/slices/categorySlice";

export default function CreateCategory() {
  const dispatch = useDispatch()
  
  // branch useSelector list
  const { list } = useSelector((state) => state.branch);
  
  // category reducer 
  const {message, loader} = useSelector((state) => state.category)
  
  const [form, setForm] = useState({
    categoryname: "",
    branchCode: "",
    description: "",
  });
  // clear message reducer function call
  useEffect(() => {
    dispatch(resetMessage())
  },[form])

// selection option ky leya branch code get kr rha hu
useEffect(() => {
  dispatch(getAllBranch())
},[dispatch])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const Submit = (e) => {
    e.preventDefault();
    dispatch(addCategory(form))
    setForm({
      categoryname: "",
      branchCode: "",
      description: "",
    });
  }
 // Handle success message
  useEffect(() => {
    if (message === "Category Successfully Created") {
      dispatch(getCategory());    // Refresh list
       
    }
  }, [message, dispatch]);



  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border max-w-full mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Create Category</h2>

      <form onSubmit={Submit} className="grid gap-4">

        {/* Category Name */}
        <input
          name="categoryname"
          value={form.categoryname}
          onChange={handleChange}
          placeholder="Category Name"
          className="border p-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none"
        />

        {/* Branch Select */}
        <select
          name="branchCode"
          value={form.branchCode}
          onChange={handleChange}
          className="border p-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none"
          
        >
          <option value="">Select Branch</option>

          {list.map((b) => (
            <option key={b._id} value={b.branchCode}>
              {b.branchName}
            </option>
          ))}
        </select>

        {/* Description */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Category Description"
          className="border p-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none"
        />
        
          <p className="text-red-700 font-medium">{message}</p>
        

        <button className="py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
         {loader ? "Save Category..." : "Save Category"}
        </button>
      </form>
    </div>
  );
}

