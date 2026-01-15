import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import {
  resetBranch,
  singleBranch,
  updateBranch,
} from "../store/slices/branchSlice";

function EditBranch() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [branch, setBranch] = useState({
    branchName: "",
    branchCode: "",
    managerName: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    active: "",
  });

  const { singleBranchData, message, loader } = useSelector(
    (state) => state.branch
  );

  // 1️⃣ Get branch data from API
  useEffect(() => {
    dispatch(resetBranch());
    dispatch(singleBranch(id));
  }, []);

  // 2️⃣ Set received data to UI fields
  useEffect(() => {
    if (singleBranchData) {
      setBranch({
        branchName: singleBranchData.branchName,
        branchCode: singleBranchData.branchCode,
        managerName: singleBranchData.managerName,
        phone: singleBranchData.phone,
        email: singleBranchData.email,
        city: singleBranchData.city,
        address: singleBranchData.address,
        active: singleBranchData.active,
      });

      if (singleBranchData.branchImage) {
        setPreview(
          `http://localhost:5000/uploads/${singleBranchData.branchImage}`
        );
      }
    }
  }, [singleBranchData]);

  // 3️⃣ Handle image file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file)); // preview show
    }
  };

  // 4️⃣ Controlled input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBranch({ ...branch, [name]: value });
  };

  // 5️⃣ Submit updated branch
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("branchId", id);

    if (image) formData.append("branchImage", image);

    formData.append("branchName", branch.branchName);
    formData.append("branchCode", branch.branchCode);
    formData.append("managerName", branch.managerName);
    formData.append("phone", branch.phone);
    formData.append("email", branch.email);
    formData.append("city", branch.city);
    formData.append("address", branch.address);
    formData.append("active", branch.active);

    dispatch(updateBranch(formData));
  };

  return (
    <div className="bg-white w-full mx-auto rounded-2xl mb-2 p-4 border">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Edit Branch</h2>

      <div className="flex flex-col justify-center items-center mb-4">
        <div className="w-48 h-48 rounded-full overflow-hidden border-[3px]">
          <img src={preview} className="w-full h-full object-cover" />
        </div>

        <div className="mt-3">
          <label
            htmlFor="image"
            className="border w-32 text-center border-blue-500 bg-blue-500 text-white px-3 py-2 rounded cursor-pointer hover:bg-blue-600 transition"
          >
            Upload Branch Image
          </label>

          <input
            id="image"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <input
          className="border p-2 rounded"
          placeholder="Branch Name"
          name="branchName"
          value={branch.branchName}
          onChange={handleChange}
        />

        <input
          className="border p-2 rounded"
          placeholder="Branch Code"
          name="branchCode"
          value={branch.branchCode}
          onChange={handleChange}
        />

        <input
          className="border p-2 rounded"
          placeholder="Manager Name"
          name="managerName"
          value={branch.managerName}
          onChange={handleChange}
        />

        <input
          className="border p-2 rounded"
          placeholder="Phone Number"
          name="phone"
          value={branch.phone}
          onChange={handleChange}
        />

        <input
          className="border p-2 rounded"
          placeholder="Email Address"
          name="email"
          value={branch.email}
          onChange={handleChange}
        />

        <input
          className="border p-2 rounded"
          placeholder="City"
          name="city"
          value={branch.city}
          onChange={handleChange}
        />

        <textarea
          rows={2}
          className="border p-2 rounded col-span-2"
          placeholder="Full Address"
          name="address"
          value={branch.address}
          onChange={handleChange}
        ></textarea>

        <select
          className="border p-2 rounded"
          name="active"
          value={branch.active}
          onChange={handleChange}
        >
          <option disabled>Select Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-green-700">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => navigate("/branch")}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow"
          >
            {loader ? "Updating..." : "Update"}
          </button>
        </div>

      </div>

    </div>
  );
}

export default EditBranch;

