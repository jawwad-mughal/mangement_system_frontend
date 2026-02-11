import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
  const [auth, setAuth] = useState(null); // null = loading
  const location = useLocation();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get(
          "https://mangement-system-backend.vercel.app/verifyToken",
          { withCredentials: true } // ✅ send cookies
        );

        if (res.data.valid) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch (err) {
        setAuth(false);
      }
    };

    verifyUser();
  }, []);

  // Loading state → show spinner or blank
  if (auth === null) return <div>Loading...</div>;

  // If not authenticated → redirect to /login, but prevent redirect loop
  return auth ? (
    <Outlet />
  ) : location.pathname !== "/login" ? (
    <Navigate to="/login" replace />
  ) : null;
};

export default ProtectedRoutes;

