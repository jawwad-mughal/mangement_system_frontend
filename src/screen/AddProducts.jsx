import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../store/slices/productSlice";
export default function AddProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    images: [], // preview URLs
    files: [], // actual File objects for backend
  });

  const categories = ["Fruit", "Dairy", "Beverage", "Snacks"];
  const { message, loading } = useSelector((state) => state.product);
  const handleSubmit = () => {
    if (
      !form.name ||
      !form.title ||
      !form.category ||
      !form.price ||
      !form.stock
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const price = parseFloat(form.price);
    const stock = parseInt(form.stock);

    if (isNaN(price) || isNaN(stock) || price < 0 || stock < 0) {
      alert("Price and Stock must be valid numbers.");
      return;
    }

    // FormData create
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("price", price);
    formData.append("stock", stock);

    // Multiple images
    form.files.forEach((file) => formData.append("images", file));

    // Dispatch createProduct thunk
    dispatch(createProduct(formData))
        setForm({
          name: "",
          title: "",
          description: "",
          category: "",
          price: "",
          stock: "",
          images: [],
          files: [],
        });
     
  };

  const resetForm = () => {
    setForm({
      name: "",
      title: "",
      description: "",
      category: "",
      price: "",
      stock: "",
      images: [],
      files: [],
    });
  };

  const removeImage = (index) => {
    setForm({
      ...form,
      images: form.images.filter((_, i) => i !== index),
      files: form.files.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow  border">
      <h3 className="text-2xl font-bold mb-3 text-blue-700">New Product</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Name */}
        <div>
          <label className="block font-medium mb-1 text-blue-700">
            Product Name *
          </label>
          <input
            className="border p-2 rounded w-full"
            placeholder="Enter Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {/* Title */}
        <div>
          <label className="block font-medium mb-1 text-blue-700">
            Title *
          </label>
          <input
            className="border p-2 rounded w-full"
            placeholder="Enter Product Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        {/* Description */}
        <div className="col-span-full">
          <label className="block font-medium mb-1 text-blue-700">
            Description
          </label>
          <textarea
            className="border p-2 rounded w-full h-24 resize-none"
            placeholder="Enter Description"
            rows="2"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1 text-blue-700">
            Category *
          </label>
          <select
            className="border p-2 rounded w-full"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-1 text-blue-700">
            Price *
          </label>
          <input
            type="number"
            className="border p-2 rounded w-full"
            placeholder="Enter Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block font-medium mb-1 text-blue-700">
            Stock *
          </label>
          <input
            type="number"
            className="border p-2 rounded w-full"
            placeholder="Enter Stock Quantity"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />
        </div>

        {/* Image Upload */}
        <div className="col-span-full flex flex-col gap-2">
          <label className="font-medium text-blue-700">
            Upload Images (multiple allowed)
          </label>
          <input
            type="file"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files);
              const previews = files.map((file) => URL.createObjectURL(file));
              setForm({
                ...form,
                images: [...form.images, ...previews],
                files: [...form.files, ...files],
              });
            }}
            className="border p-2 rounded cursor-pointer"
          />

          {/* Preview */}
          {form.images.length > 0 && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {form.images.map((img, i) => (
                <div key={i} className="relative w-24 h-24">
                  <img
                    src={img}
                    alt={`preview-${i}`}
                    className="w-full h-full object-cover rounded border"
                  />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center mt-3 mx-2">
        {message && (
          <p className="text-green-600 font-medium ">{message}</p>
        )}

        <div className="flex justify-end gap-2 ">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => navigate("/product")}
          >
            Close
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={resetForm}
          >
            Reset
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
          {loading ? "Save..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
