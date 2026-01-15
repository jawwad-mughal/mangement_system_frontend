import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBranch } from "../store/slices/branchSlice";
import {
  resetMessage,
  getCategory,
  updateCategory,
} from "../store/slices/categorySlice";

export default function EditCategory() {
  const dispatch = useDispatch();
  const { editCategory, message, loader } = useSelector(
    (state) => state.category
  );

  // Load branches once
  useEffect(() => {
    dispatch(getAllBranch());
  }, [dispatch]);

  const { list } = useSelector((state) => state.branch);

  const [form, setForm] = useState({
    id: "",
    categoryname: "",
    branchCode: "",
    description: "",
  });

  
  // clear message reducer function call
  useEffect(() => {
    dispatch(resetMessage());
  }, [form]);

  // Load category initial data
  useEffect(() => {
    if (editCategory && list?.length > 0) {
      setForm({
        id: editCategory._id || "",
        categoryname: editCategory.categoryname || "",
        branchCode:
          list.find((b) => b._id === editCategory.branchRef)?.branchCode || "",
        description: editCategory.description || "",
      });
    }
  }, [editCategory, list]); // FIXED: list add kiya

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateCategory(form));
    setForm({
      id: "",
      categoryname: "",
      branchCode: "",
      description: "",
    });
  };

  // Handle success message
  useEffect(() => {
    if (message === "Category updated successfully") {
      dispatch(getCategory());
    }
  }, [message, dispatch]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border max-w-full mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Edit Category</h2>

      <form className="grid gap-4" onSubmit={handleSubmit}>
        <input
          name="categoryname"
          value={form.categoryname}
          onChange={handleChange}
          placeholder="Category Name"
          className="border p-3 rounded-lg"
        />

        <select
          name="branchCode"
          value={form.branchCode}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        >
          <option value="">Select Branch</option>
          {list.map((b) => (
            <option key={b._id} value={b.branchCode}>
              {b.branchName}
            </option>
          ))}
        </select>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Category Description"
          className="border p-3 rounded-lg"
        ></textarea>

        <p className="text-red-700 font-medium">{message}</p>

        <button className="py-2 bg-blue-600 text-white rounded-lg">
          {loader ? "Updating..." : "Update Category"}
        </button>
      </form>
    </div>
  );
}
