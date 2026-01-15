import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { clearMessage, createBranch } from "../store/slices/branchSlice";

function CreateBranch() {
  const navigate = useNavigate();
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
  const [image, setImage] = useState(null); // selected file
  const [preview, setPreview] = useState(null); // preview URL
  const dispatch = useDispatch();
  const { loader, message } = useSelector((state) => state.branch);
// console.log(list)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file); // convert image to base64 for preview
    } else {
      setPreview(null); // remove preview if no file
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBranch({ ...branch, [name]: value });
  };

  const handleSubmit = () => {
    const formData = new FormData();
  formData.append("branchImage", image); // correct for multer
  formData.append("branchName", branch.branchName);
  formData.append("branchCode", branch.branchCode);
  formData.append("managerName", branch.managerName);
  formData.append("phone", branch.phone);
  formData.append("email", branch.email);
  formData.append("city", branch.city);
  formData.append("address", branch.address);
  formData.append("active", branch.active);

  dispatch(createBranch(formData))
  setBranch({
    branchName: "",
    branchCode: "",
    managerName: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    active: "",
  })
  };


  useEffect(() => {
    dispatch(clearMessage())
  },[branch])
  return (
    <div className="bg-white w-full mx-auto rounded-2xl border p-4">
      <h2 className="text-2xl font-bold mb-2 text-blue-700">Add Branch</h2>
      <div className="flex flex-col justify-center items-center mb-4">
        <div className="w-48 h-48 rounded-full overflow-hidden  border-[3px] ">
          <img src={preview} className="w-full h-full object-cover" />
        </div>

        <div className="mt-3">
          <label
            htmlFor="image"
            className="border w-32 text-center border-blue-500 bg-blue-500 text-white px-3 py-2 rounded cursor-pointer hover:bg-blue-600 transition duration-200"
          >
            Upload Branch Image
          </label>

          <input
            id="image"
            name="branchImage"
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
      {/* General Info */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <input
          className="border p-2 rounded"
          placeholder="Branch Name"
          value={branch.branchName}
          name="branchName"
          onChange={handleChange}
        />
        <input
          className="border p-2 rounded"
          placeholder="Branch Code"
          value={branch.branchCode}
          name="branchCode"
          onChange={handleChange}
        />

        <input
          className="border p-2 rounded"
          placeholder="Manager Name"
          value={branch.managerName}
          name="managerName"
          onChange={handleChange}
        />
        <input
          className="border p-2 rounded"
          placeholder="Phone Number"
          value={branch.phone}
          name="phone"
          onChange={handleChange}
        />

        <input
          className="border p-2 rounded"
          placeholder="Email Address"
          value={branch.email}
          name="email"
          onChange={handleChange}
        />
        <input
          className="border p-2 rounded"
          placeholder="City"
          value={branch.city}
          name="city"
          onChange={handleChange}
        />

        <textarea
          rows={2}
          className="border p-2 rounded col-span-2"
          placeholder="Full Address"
          value={branch.address}
          name="address"
          onChange={handleChange}
        ></textarea>

        <select
          value={branch.active}
          name="active"
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option  >Selected</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <div className="flex justify-between items-center">
      <p className="text-red-700 font-medium">{message}</p>
      {/* Buttons */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => navigate("/branch")}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded shadow"
          onClick={handleSubmit}
        >
          {loader ? "Save..." : "Save"}
        </button>
      </div>
      </div>
    </div>
  );
}

export default CreateBranch;
