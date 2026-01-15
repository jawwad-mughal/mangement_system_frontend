import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function ProductViewCard() {
  const navigate = useNavigate();
  const { singleProducts } = useSelector((state) => state.product);

  if (!singleProducts?.object) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  const product = singleProducts.object;
  const [mainImage, setMainImage] = useState(product.images[0]?.url);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto  border">
      <h3 className="text-2xl font-bold mb-3 text-blue-700">Product Card</h3>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Images */}
        <div className="md:w-1/2">
          <img
            src={mainImage}
            alt="Product"
            className="w-full h-64 object-cover rounded border"
          />

          <div className="flex flex-wrap gap-2 mt-3">
            {product.images.map((img) => (
              <img
                key={img._id}
                src={img.url}
                className="w-20 h-20 object-cover border rounded cursor-pointer hover:opacity-80"
                onClick={() => setMainImage(img.url)}
              />
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="md:w-1/2 flex flex-col gap-2">
          <h3 className="text-2xl font-bold text-blue-700">{product.name}</h3>
          <p><b>Title:</b> {product.title}</p>
          <p><b>Description:</b> {product.description}</p>

          <p>
            <b>Category:</b>{" "}
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
              {product.category}
            </span>
          </p>

          <p>
            <b>Price:</b>{" "}
            <span className="text-green-600 font-bold">
              Rs {product.price}
            </span>
          </p>

          <p>
            <b>Stock:</b>{" "}
            <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </p>

          <button
            className="bg-red-500 text-white px-4 py-2 rounded mt-2"
            onClick={() => navigate("/product")}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}


