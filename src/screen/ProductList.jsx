import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { deleteProduct, fetchProducts, getSingleProducts } from "../store/slices/productSlice";

export default function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, error } = useSelector((state) => state.product);

  const [search, setSearch] = useState("");

  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filtered products based on search
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleView = (object) => {
    dispatch(getSingleProducts({object}))
    navigate(`viewcardproduct`)
  }

  const handleEdit = (p) => {
    dispatch(getSingleProducts(p))
    navigate(`editproduct/${p._id}`)
  }

  const handleDelete = (id) => {
    dispatch(deleteProduct(id))
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow border h-[72vh] overflow-y-auto small-scroll">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-2xl font-bold text-blue-700">Products List</h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search product..."
            className="border px-3 py-2 rounded w-full sm:w-60"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-auto">
          <table className="w-full border text-sm">
            <thead>
              <tr className="border bg-blue-700 text-white">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Stock</th>
                <th className="p-2 border">Images</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center p-3 text-gray-500">
                    No products found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p, i) => (
                  <tr key={p._id || i} className="border hover:bg-gray-50">
                    <td className="p-2 border text-center">{i + 1}</td>
                    <td className="p-2 border text-center">{p.name}</td>
                    <td className="p-2 border text-center">{p.category}</td>
                    <td className="p-2 border text-center">Rs {p.price}</td>
                    <td className="p-2 border text-center">{p.stock}</td>
                    <td className="p-2 border">
                      {p.images && p.images.length > 0 && (
                        <img
                          src={p.images[0].url}
                          className="w-10 h-10 object-cover mx-auto rounded border"
                          alt={p.name}
                        />
                      )}
                    </td>

                    <td className="p-2 flex justify-center items-center gap-2 mt-2">
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                        onClick={() => handleView(p) }
                      >
                        View
                      </button>
                      <button
                        className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                        onClick={() => handleEdit(p) }
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 text-white px-2 py-1 rounded text-xs"
                        onClick={() => handleDelete(p._id)}
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
      )}
    </div>
  );
}

