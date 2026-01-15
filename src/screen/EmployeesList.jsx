import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees, deleteEmployee } from "../store/slices/employeeSlice";
import { useNavigate } from "react-router";

export default function EmployeesList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list, loading, hasMore } = useSelector(state => state.employees);
  const [page, setPage] = useState(1);
  const limit = 5;

  // ✅ Load first page
  useEffect(() => {
    dispatch(fetchEmployees({ page: 1, limit }));
  }, []);

  // ✅ Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (!hasMore || loading) return;
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
        setPage(prev => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  // ✅ Load next page
  useEffect(() => {
    if (page === 1) return; // first page already loaded
    dispatch(fetchEmployees({ page, limit }));
  }, [page]);

  const handleEdit = (id) => {
    navigate(`/employees/editemployee/${id}`)
  };
  const handleDelete = (id) => {
    dispatch(deleteEmployee(id));
  };

  return (
    <div className="max-w-full mx-auto bg-white shadow-lg rounded-xl p-6 border">
      <h2 className="text-2xl font-bold text-blue-700 mb-3">Employees List</h2>

      <div className="overflow-x-auto rounded-lg border h-[65vh] border-gray-200 shadow">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="p-3 border">#</th>
              <th className="p-3 border">Profile</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Password</th>
              <th className="p-3 border">Position</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Salary</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((emp, index) => (
              <tr key={index + 1} className="hover:bg-gray-50">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border"> <img
            src={ `http://localhost:5000/uploads/${emp.image}`}
            className="w-20 h-20 object-cover"
          /></td>
                <td className="p-3 text-lg border">{emp.employeeName}</td>
                <td className="p-3 border text-lg ">{emp.email}</td>
                <td className="p-3 border text-lg ">{emp.password}</td>
                <td className="p-3 border text-lg ">{emp.position}</td>
                <td className="p-3 border text-lg ">{emp.phone}</td>
                <td className="p-3 border text-lg ">{emp.salary}</td>
                <td className="p-3 text-center text-lg  border ">
                  <button onClick={() => handleEdit(emp._id)} className="bg-green-500 text-white px-3 py-1 mr-3 rounded">Edit</button>
                  <button onClick={() => handleDelete(emp._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
            {list.length === 0 && !loading && (
              <tr>
                <td colSpan="9" className="text-center p-4 text-gray-500 italic border">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {loading && <p className="text-center p-4 text-blue-600">Loading...</p>}
        {!hasMore && list.length > 0 && <p className="text-center p-4 text-gray-500">No more employees.</p>}
      </div>
    </div>
  );
}


