import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee, clearMessage } from "../store/slices/employeeSlice";
import { getAllBranch } from "../store/slices/branchSlice";

export default function AddEmployee() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState(null); // selected file
  const [preview, setPreview] = useState(null); // preview URL
  const [showPassword, setShowPassword] = useState(false);

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
  const [form, setForm] = useState({
    employeeName: "",
    email: "",
    password: "",
    position: "",
    phone: "",
    salary: "",
    branchName: "",
    access: {},
  });

  // ✅ Toggle Access Permission
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
  const { loading, success, error } = useSelector((state) => state.employees);

  const { list } = useSelector((state) => state.branch);

  useEffect(() => {
    dispatch(getAllBranch());
  }, [dispatch]);

  // ✅ Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Add normal fields
    formData.append("employeeName", form.employeeName);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("position", form.position);
    formData.append("phone", form.phone);
    formData.append("salary", form.salary);
    formData.append("branchCode", form.branchName);

    // Add access object as JSON string
    formData.append("access", JSON.stringify(form.access));

    // Add image file
    if (image) {
      formData.append("image", image);
    }

    // dispatch action
    dispatch(addEmployee(formData));

    // Reset form
    setForm({
      employeeName: "",
      email: "",
      password: "",
      position: "",
      phone: "",
      salary: "",
      branchName: "",
      access: {},
    });
    setImage(null);
    setPreview(null);
  };

  useEffect(() => {
    dispatch(clearMessage());
  }, [form]);

  return (
    <div className="p-6 bg-white shadow rounded-xl max-w-full mx-auto mt-8 mb-8 border">
      <h1 className="text-2xl font-bold text-blue-700 ">Add New Employee</h1>

      {/* ✅ Employee Info Form */}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center ">
          <div className="w-48 h-48 rounded-full overflow-hidden mt-3 border-[3px] ">
            <img src={preview} className="w-full h-full object-cover" />
          </div>

          <div className="mt-3">
            <label
              htmlFor="image"
              className="border w-32 text-center border-blue-500 bg-blue-500 text-white px-3 py-2 rounded cursor-pointer hover:bg-blue-600 transition duration-200"
            >
              Upload Image
            </label>

            <input
              id="image"
              name="image"
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Full Name"
              value={form.employeeName}
              onChange={(e) =>
                setForm({ ...form, employeeName: e.target.value })
              }
              className="border p-2 rounded"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="border p-2 rounded"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative w-full ">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="border p-2 rounded w-full pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Position
            </label>
            <input
              type="text"
              placeholder="Position"
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
              className="border p-2 rounded"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="border p-2 rounded"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Salary</label>
            <input
              type="number"
              placeholder="Salary"
              value={form.salary}
              onChange={(e) => setForm({ ...form, salary: e.target.value })}
              className="border p-2 rounded"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Branch Name
            </label>

            <select
              value={form.branchName}
              onChange={(e) => setForm({ ...form, branchName: e.target.value })}
              className="border p-2 rounded"
              required
            >
              <option disabled>Select Branch</option>
              <option value="adminBranch">admin Branch</option>

              {list?.map((b) => (
                <option key={b._id} value={b.branchCode}>
                  {b.branchName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ✅ Access Permissions Table (NO map used) */}
        <div className="overflow-x-auto w-full">
          <h2 className="text-lg font-bold mb-2 text-blue-700">
            Access Permissions
          </h2>

          <table className="min-w-full border border-gray-300 text-sm">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="border p-2 text-left">Section Name</th>
                <th className="border">Section Access</th>
                <th className="border p-2">View</th>
                <th className="border p-2">Create</th>
                <th className="border p-2">Edit</th>
                <th className="border p-2">Delete</th>
              </tr>
            </thead>

            <tbody>
              {/* ✅ Dashboard */}
              <tr className="hover:bg-gray-50">
                <td className="border p-2 font-medium">Dashboard</td>
                {["sectionaccess", "view", "create", "edit", "delete"].map(
                  (action) => (
                    <td key={action} className="border text-center p-2">
                      <input
                        type="checkbox"
                        checked={form.access?.dashboard?.[action] || false}
                        onChange={(e) =>
                          togglePermission("dashboard", action, e)
                        }
                      />
                    </td>
                  )
                )}
              </tr>

              {/* ✅ Branches */}
              <tr className="hover:bg-gray-50">
                <td className="border p-2 font-medium">Branches</td>
                {["sectionaccess", "view", "create", "edit", "delete"].map(
                  (action) => (
                    <td key={action} className="border text-center p-2">
                      <input
                        type="checkbox"
                        checked={form.access?.branch?.[action] || false}
                        onChange={() => togglePermission("branch", action)}
                      />
                    </td>
                  )
                )}
              </tr>

              {/* ✅ Inventory */}
              <tr className="hover:bg-gray-50">
                <td className="border p-2 font-medium">Inventory</td>
                {["sectionaccess", "view", "create", "edit", "delete"].map(
                  (action) => (
                    <td key={action} className="border text-center p-2">
                      <input
                        type="checkbox"
                        checked={form.access?.inventory?.[action] || false}
                        onChange={() => togglePermission("inventory", action)}
                      />
                    </td>
                  )
                )}
              </tr>

              {/* ✅ Product */}
              <tr className="hover:bg-gray-50">
                <td className="border p-2 font-medium">Product</td>
                {["sectionaccess", "view", "create", "edit", "delete"].map(
                  (action) => (
                    <td key={action} className="border text-center p-2">
                      <input
                        type="checkbox"
                        checked={form.access?.product?.[action] || false}
                        onChange={() => togglePermission("product", action)}
                      />
                    </td>
                  )
                )}
              </tr>

              {/* ✅ Employees */}
              <tr className="hover:bg-gray-50">
                <td className="border p-2 font-medium">Employees</td>
                {["sectionaccess", "view", "create", "edit", "delete"].map(
                  (action) => (
                    <td key={action} className="border text-center p-2">
                      <input
                        type="checkbox"
                        checked={form.access?.employees?.[action] || false}
                        onChange={() => togglePermission("employees", action)}
                      />
                    </td>
                  )
                )}
              </tr>

              {/* ✅ Banking */}
              <tr className="hover:bg-gray-50">
                <td className="border p-2 font-medium">Banking</td>
                {["sectionaccess", "view", "create", "edit", "delete"].map(
                  (action) => (
                    <td key={action} className="border text-center p-2">
                      <input
                        type="checkbox"
                        checked={form.access?.banking?.[action] || false}
                        onChange={() => togglePermission("banking", action)}
                      />
                    </td>
                  )
                )}
              </tr>

              {/* ✅ Invoice */}
              <tr className="hover:bg-gray-50">
                <td className="border p-2 font-medium">Invoice</td>
                {["sectionaccess", "view", "create", "edit", "delete"].map(
                  (action) => (
                    <td key={action} className="border text-center p-2">
                      <input
                        type="checkbox"
                        checked={form.access?.invoice?.[action] || false}
                        onChange={() => togglePermission("invoice", action)}
                      />
                    </td>
                  )
                )}
              </tr>

              {/* ✅ Order */}
              <tr className="hover:bg-gray-50">
                <td className="border p-2 font-medium">Order</td>
                {["sectionaccess", "view", "create", "edit", "delete"].map(
                  (action) => (
                    <td key={action} className="border text-center p-2">
                      <input
                        type="checkbox"
                        checked={form.access?.order?.[action] || false}
                        onChange={() => togglePermission("order", action)}
                      />
                    </td>
                  )
                )}
              </tr>

              {/* ✅ Customers */}
              <tr className="hover:bg-gray-50">
                <td className="border p-2 font-medium">Customers</td>
                {["sectionaccess", "view", "create", "edit", "delete"].map(
                  (action) => (
                    <td key={action} className="border text-center p-2">
                      <input
                        type="checkbox"
                        checked={form.access?.customer?.[action] || false}
                        onChange={() => togglePermission("customer", action)}
                      />
                    </td>
                  )
                )}
              </tr>

              {/* ✅ Reports */}
              <tr className="hover:bg-gray-50">
                <td className="border p-2 font-medium">Reports</td>
                {["sectionaccess", "view", "create", "edit", "delete"].map(
                  (action) => (
                    <td key={action} className="border text-center p-2">
                      <input
                        type="checkbox"
                        checked={form.access?.report?.[action] || false}
                        onChange={() => togglePermission("report", action)}
                      />
                    </td>
                  )
                )}
              </tr>

              {/* ✅ Settings */}
              <tr className="hover:bg-gray-50">
                <td className="border p-2 font-medium">Settings</td>
                {["sectionaccess", "view", "create", "edit", "delete"].map(
                  (action) => (
                    <td key={action} className="border text-center p-2">
                      <input
                        type="checkbox"
                        checked={form.access?.setting?.[action] || false}
                        onChange={() => togglePermission("setting", action)}
                      />
                    </td>
                  )
                )}
              </tr>
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
          <div className="flex justify-end gap-3 ">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={() => navigate("/employees")}
            >
              Close
            </button>
            <button
              type="reset"
              onClick={() =>
                setForm({
                  name: "",
                  email: "",
                  password: "",
                  position: "",
                  phone: "",
                  salary: "",
                  access: {},
                })
              }
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Clear
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {loading ? "Save Employee ..." : "Save Employee "}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
