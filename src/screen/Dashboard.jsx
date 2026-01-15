import { useEffect, useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import DashboardHome from "./DashboardHome";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import { logout } from "../store/slices/loginSlice";
import {
  checkSectionAccess,
  resetSections,
} from "../store/slices/sectionSlice";

export default function Dashboard() {
  const navigate = useNavigate();
  const [hide, setHide] = useState(true);
  const dispatch = useDispatch();

  // const { user } = useSelector((state) => state.login);

  const { urlsection, employees, url } = useSelector((state) => state.section);
  // console.log(employees)
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/logout",
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(logout());
        navigate("/login"); 
      }
    } catch (err) {
      console.log("Logout failed:", err);
    }
  };

  const sectionUrl = (url) => {
    dispatch(checkSectionAccess(url));
    navigate(url)
  };

  // Load employee access 
  useEffect(() => {
    dispatch(checkSectionAccess());
  }, []);

  // Navigate only after backend confirmation
  useEffect(() => {
    if (urlsection) {
      navigate(`/${urlsection}`);
    }
  }, [urlsection]);


  return (
    <div>
      {/* Navbar */}
      <div className="bg-blue-800 shadow px-8 py-5 flex justify-between items-center ">
        <div className="flex justify-center items-center gap-2">
          <MdOutlineMenu
            className="text-3xl text-white"
            onClick={() => setHide((prev) => !prev)}
          />
          <h1 className="text-2xl font-bold pl-12 text-white">
            Management System
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative p-2">
            <div className="bg-red-600 flex justify-center items-center w-[17px] h-[17px] rounded-full  absolute top-1 right-1.5 ">
              <p className="font-bold text-white text-[10px]">1</p>
            </div>
            <IoMdNotifications className="text-2xl text-white " />
          </div>
          <button
            onClick={() => handleLogout()}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="flex ">
        <div
          className={`bg-blue-600 shadow-md ${hide ? "p-5" : "p-0"} ${hide ? "w-64" : "w-0"} transition-all overflow-x-hidden`}
        >
          {[
            { section: "Dashboard", url: "dashboard" },
            { section: "Branch", url: "branch" },
            { section: "Inventory", url: "inventory" },
            { section: "Product", url: "product" },
            { section: "Employees", url: "employees" },
            { section: "Banking", url: "banking" },
            { section: "Invoice", url: "invoice" },
            { section: "Order", url: "order" },
            { section: "Customers", url: "customer" },
            { section: "Reports", url: "report" },
            { section: "Settings", url: "setting" },
          ].map((item) => {
            if (url === "admin" || employees?.access?.[item.url]?.sectionaccess) {
              return (
                <div
                  key={item.url}
                  className="block text-white px-2 py-2 rounded mb-2 font-medium hover:bg-black cursor-pointer"
                  onClick={() => sectionUrl(item.url)}
                >
                  {item.section}
                </div>
              );
            }
          })}
        </div>
        {/* Page Body */}
        <div className="p-3 w-full ">
          <div className="border-2 bg-black/25 border-black  border-dashed rounded-xl mx-auto h-[90vh] overflow-y-auto scroll-screen  p-7">
            <DashboardHome />
          </div>
        </div>
      </div>
    </div>
  );
}
