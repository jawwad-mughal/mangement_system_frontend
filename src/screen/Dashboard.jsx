import { useEffect, useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import DashboardHome from "./DashboardHome";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import { logout } from "../store/slices/loginSlice";
import { checkSectionAccess } from "../store/slices/sectionSlice";

export default function Dashboard() {
  const navigate = useNavigate();
  const [hide, setHide] = useState(true);
  const dispatch = useDispatch();

  const { urlsection, employees, url } = useSelector(
    (state) => state.section
  );

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "https://mangement-system-backend.vercel.app/logout",
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
    navigate(url);
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

  // Optional: auto sync on resize (desktop = open, mobile = closed)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setHide(false);
      } else {
        setHide(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {/* Navbar */}
      <div className="bg-blue-800 shadow px-5 py-1 flex justify-between items-center w-full ">
        <div className="flex justify-center items-center gap-2 ">
          {/* Menu Icon only mobile */}
          <MdOutlineMenu
            className="text-[22px]  text-white cursor-pointer shrink-0 lg:hidden"
            onClick={() => setHide((prev) => !prev)}
          />
          <h1 className="text-[18px] font-bold py-[2.4px] text-white">
            Management System
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {/* <div className="relative px-2 py-1.4">
            <div className="bg-red-600 flex justify-center items-center w-3 h-3 rounded-full absolute top-0 right-1.5 ">
              <p className="font-bold text-white text-[10px]">1</p>
            </div>
            <IoMdNotifications className="text-[20px] text-white " />
          </div> */}
          <button
            onClick={() => handleLogout()}
            className="bg-red-500 text-white px-3 py-1 text-[12px] font-bold rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Sidebar + Page */}
      <div className="flex relative">
        {/* Overlay mobile */}
        {!hide && window.innerWidth < 1024 && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setHide(true)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
            absolute lg:static top-0 left-0 h-[92.5vh]
            bg-blue-600 shadow-md
            transition-all duration-300 ease-in-out
            z-50 overflow-x-hidden
            w-50 p-5
            ${hide ? "-translate-x-full lg:translate-x-0" : "translate-x-0"}
          `}
        >
          {[
            // { section: "Dashboard", url: "dashboard" },
            { section: "Branch", url: "branch" },
            { section: "Inventory", url: "inventory" },
            { section: "Product", url: "product" },
            { section: "Employees", url: "employees" },
            { section: "Banking", url: "banking" },
            // { section: "Invoice", url: "invoice" },
            // { section: "Order", url: "order" },
            // { section: "Customers", url: "customer" },
            // { section: "Reports", url: "report" },
            // { section: "Settings", url: "setting" },
          ].map((item) => {
            if (
              url === "admin" ||
              employees?.access?.[item.url]?.sectionaccess
            ) {
              return (
                <div
                  key={item.url}
                  className="text-white px-2 py-2 rounded mb-2 font-medium hover:bg-black cursor-pointer"
                  onClick={() => {
                    sectionUrl(item.url);
                    // Auto-hide sidebar only on small screen
                    if (window.innerWidth < 1024) {
                      setHide(true);
                    }
                  }}
                >
                  {item.section}
                </div>
              );
            }
          })}
        </div>

        {/* Page Body */}
        <div className="flex-1 p-3">
          <div className="border-2 bg-black/25 border-black border-dashed rounded-xl h-[90vh] overflow-x-auto p-7">
            <DashboardHome />
          </div>
        </div>
      </div>
    </div>
  );
}

