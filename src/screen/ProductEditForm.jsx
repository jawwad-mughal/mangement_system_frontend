import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { editProduct } from "../store/slices/productSlice";
export default function ProductEditForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleProducts } = useSelector((state) => state.product);
// console.log(singleProducts)
  // ---------------- FORM STATE ----------------
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    images: [], // URLs only
  });

  const [imageInput, setImageInput] = useState("");

  // ---------------- REDUX → FORM SYNC ----------------
  useEffect(() => {
    if (singleProducts) {
      const p = singleProducts;
      setForm({
        name: p.name || "",
        title: p.title || "",
        description: p.description || "",
        category: p.category || "",
        price: p.price || "",
        stock: p.stock || "",
        images: p.images?.map((img) => img.url) || [],
      });
    }
  }, [singleProducts]);

  // ---------------- IMAGE HANDLERS ----------------
  const addImage = () => {
    if (!imageInput.trim()) return;
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, imageInput.trim()],
    }));
    setImageInput("");
  };

  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async () => {
    if (!form.name || !form.title || !form.category || !form.price || !form.stock) {
      alert("❌ Please fill all required fields");
      return;
    }

    // ---------------- FormData prepare ----------------
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("images", JSON.stringify(form.images)); // URLs

    try {
      await dispatch(editProduct({ id: singleProducts._id, formData })).unwrap();
      navigate("/product");
    } catch (err) {
      console.log("❌ " + (err?.message || "Failed to update product"));
    }
  };

  // ---------------- UI ----------------
  if (!singleProducts) {
    return <div className="text-center mt-10">Loading product...</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow border max-w-5xl mx-auto">
      <h3 className="text-2xl font-bold mb-4 text-blue-700">Edit Product</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="text-sm font-medium text-blue-700">Product Name *</label>
          <input
            className="border p-2 rounded w-full"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {/* Title */}
        <div>
          <label className="text-sm font-medium text-blue-700">Title *</label>
          <input
            className="border p-2 rounded w-full"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        {/* Description */}
        <div className="col-span-full">
          <label className="text-sm font-medium text-blue-700">Description *</label>
          <textarea
            className="border p-2 rounded w-full h-24 resize-none"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-sm font-medium text-blue-700">Category *</label>
          <input
            className="border p-2 rounded w-full"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        </div>

        {/* Price */}
        <div>
          <label className="text-sm font-medium text-blue-700">Price *</label>
          <input
            type="number"
            className="border p-2 rounded w-full"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </div>

        {/* Stock */}
        <div>
          <label className="text-sm font-medium text-blue-700">Stock *</label>
          <input
            type="number"
            className="border p-2 rounded w-full"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />
        </div>

        {/* Images */}
        <div className="col-span-full">
          <label className="text-sm font-medium text-blue-700">Images *</label>

          <div className="flex gap-2 mt-1">
            <input
              className="border p-2 rounded flex-1"
              placeholder="Paste image URL"
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
            />
            <button
              onClick={addImage}
              className="bg-blue-600 text-white px-4 rounded"
            >
              Add
            </button>
          </div>

          {form.images.length > 0 && (
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 mt-3">
              {form.images.map((img, i) => (
                <div key={i} className="relative">
                  <img
                    src={img}
                    className="w-full h-20 object-cover rounded border"
                  />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
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
      <div className="flex justify-end gap-3 mt-6">
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded"
          onClick={() => navigate("/product")}
        >
          Cancel
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          Update Product
        </button>
      </div>
    </div>
  );
}


