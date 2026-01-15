import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessage,
  getSingleEmployee,
  updateEmployee,
} from "../store/slices/employeeSlice";
import { getAllBranch } from "../store/slices/branchSlice";

export default function EditEmployee() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { list } = useSelector((state) => state.branch);
  const { singleEmployee, success, error, loading } = useSelector((state) => state.employees);
 

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    employeeName: "",
    email: "",
    password: "",
    position: "",
    phone: "",
    salary: "",
    branchName: "",
    access: {},
    image: null,
  });

  const [preview, setPreview] = useState(null);

  // Fetch employee on mount
  useEffect(() => {
    if (id) dispatch(getSingleEmployee(id));
  }, [id, dispatch]);

  // Populate form when singleEmployee is loaded
  useEffect(() => {
    if (singleEmployee) {
      const matched = list.find(
        (b) => b.branchName === singleEmployee.branchName
      );
      

      setForm({
        employeeName: singleEmployee.employeeName || "",
        email: singleEmployee.email || "",
        password: singleEmployee.password || "",
        position: singleEmployee.position || "",
        phone: singleEmployee.phone || "",
        salary: singleEmployee.salary || "",
        branchName: matched?.branchCode || "",
        access: singleEmployee.access || {},
        image: null,
      });
      if (singleEmployee.image) {
        setPreview(`http://localhost:5000/uploads/${singleEmployee.image}`);
      }
    }
  }, [singleEmployee,list]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      setForm((prev) => ({ ...prev, image: files[0] }));
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(files[0]);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const togglePermission = (section, action) => {
    setForm((prev) => ({
      ...prev,
      access: {
        ...prev.access,
        [section]: {
          ...prev.access[section],
          [action]: !prev.access?.[section]?.[action],
        },
      },
    }));
  };

  // console.log(list)
  useEffect(() => {
    dispatch(getAllBranch());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("employeeName", form.employeeName);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("position", form.position);
    formData.append("phone", form.phone);
    formData.append("salary", form.salary);
    formData.append("branchCode", form.branchName);
    formData.append("access", JSON.stringify(form.access));
    if (form.image) formData.append("image", form.image);
    dispatch(updateEmployee({ id, formData }));

    setForm({
      employeeName: "",
      email: "",
      password: "",
      position: "",
      phone: "",
      salary: "",
      branchName: "",
      access: {},
      image: null,
    });
    setPreview(null)
  };

  useEffect(() => {
    dispatch(clearMessage());
  }, [form]);


  return (
    <div className="max-w-full mx-auto bg-white shadow-lg rounded-xl p-6 mt-6 mb-5 border">
      <h2 className="text-2xl font-bold mb-3 text-blue-700">Edit Employee</h2>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center mb-3">
          <div className="w-48 h-48 rounded-full overflow-hidden border-[3px] ">
            <img
              src={preview}
              alt="Employee Preview"
              className="w-full h-full object-cover"
            />
          </div>

          <label className="mt-3 border w-32 text-center border-blue-500 bg-blue-500 text-white px-3 py-2 rounded cursor-pointer hover:bg-blue-600 transition duration-200">
            Upload Image
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="employeeName"
            value={form.employeeName}
            onChange={handleChange}
            placeholder="Full Name"
            className="border p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 rounded"
            required
          />
          <div className="relative w-full ">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border p-2 rounded pr-10"
            />
            <button
              type="button"
              onClick={() => {
                setShowPassword((prev) => !prev);
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <input
            type="text"
            name="position"
            value={form.position}
            onChange={handleChange}
            placeholder="Position"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="salary"
            value={form.salary}
            onChange={handleChange}
            placeholder="Salary"
            className="border p-2 rounded"
            required
          />
          <select
            name="branchName"
            value={form.branchName}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option disabled>Select Branch</option>
            <option value="adminbranch">Admin Branch</option>

            {list?.map((b) => (
              <option key={b._id} value={b.branchCode}>
                {b.branchName}
              </option>
            ))}
          </select>
        </div>

        {/* Access Table */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2 text-blue-600">
            Access Permissions
          </h3>
          <table className="w-full border text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="border p-2">Section</th>
                <th className="border p-2">Section Access</th>
                <th className="border p-2">View</th>
                <th className="border p-2">Create</th>
                <th className="border p-2">Edit</th>
                <th className="border p-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(form.access).map((section) => (
                <tr key={section} className="hover:bg-gray-50">
                  <td className="border p-2 font-medium">{section}</td>
                  {["sectionaccess", "view", "create", "edit", "delete"].map(
                    (action) => (
                      <td key={action} className="border text-center p-2">
                        <input
                          type="checkbox"
                          checked={form.access[section][action]}
                          onChange={() => togglePermission(section, action)}
                        />
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="text-red-700 font-medium">
            <p>
              {error}
              {success}
            </p>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => navigate("/employees")}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              {loading ? "Saving..." : "Update Employee"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
