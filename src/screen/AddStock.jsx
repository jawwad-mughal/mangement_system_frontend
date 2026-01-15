import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../store/slices/categorySlice";
import { addStock, getAllStock, resetMessage } from "../store/slices/inventorySlice";

export default function AddStock() {
  const dispatch = useDispatch();

  // Categories
  const { List } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  // Stock form
  const [form, setForm] = useState({
    productname: "",
    category: "",
    qty: "",
    unit: "",
    supplier: "",
    date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Inventory state
  const { loader, message } = useSelector((state) => state.inventory);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addStock(form)); // Backend saving

    setForm({
      productname: "",
      category: "",
      qty: "",
      unit: "",
      supplier: "",
      date: "",
    });
  };

  // Whenever message changes to success, fetch all stock and clear message
  useEffect(() => {
    if (message) {
      // Fetch updated stock list
      dispatch(getAllStock());

      // Clear message after a short delay (optional)
      const timer = setTimeout(() => {
        dispatch(resetMessage());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  return (
    <div className="bg-white p-6 rounded-2xl border mb-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Add Stock</h2>

      <form className="grid grid-cols-3 gap-4 bg-white shadow-lg rounded-xl" onSubmit={handleSubmit}>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50"
          required
        />

        <input
          name="productname"
          value={form.productname}
          onChange={handleChange}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50"
          placeholder="Product Name"
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50"
          required
        >
          <option value="">Select Category</option>
          {List?.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.categoryname}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="qty"
          value={form.qty}
          onChange={handleChange}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50"
          placeholder="Quantity"
          required
        />

        <input
          name="unit"
          value={form.unit}
          onChange={handleChange}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50"
          placeholder="Unit (kg, ltr, pcs)"
          required
        />

        <input
          name="supplier"
          value={form.supplier}
          onChange={handleChange}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50"
          placeholder="Supplier Name"
          required
        />
      {message && <p className="text-red-700 font-medium mt-2">{message}</p>}

        <button className="col-span-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md">
          {loader ? "Saving..." : "Save Stock"}
        </button>
      </form>

    </div>
  );
}

