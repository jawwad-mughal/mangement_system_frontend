import React from "react";
import EmployeesList from "./EmployeesList";
import { Outlet, useNavigate } from "react-router";


export default function Employees() {
  const naviagte = useNavigate()
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex flex-wrap justify-between items-center mb-4 ">
        <h1 className="text-2xl font-bold  text-blue-700">
          Employees Management
        </h1>
        <div className="flex gap-2"> 
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => naviagte("/employees")}
          >
            Employee List
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => naviagte("addemployee")}
          >
            Add Employee
          </button>

        </div>
      </div>

     
      <Outlet />

      {/* ✅ Employee List Table
      <EmployeesList/> */}
      
    </div>
  );
}

