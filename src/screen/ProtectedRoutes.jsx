import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = () => {
  const [auth, setAuth] = useState(null); // null = loading

  useEffect(() => {
    const verifyUser = async () => {
      try {
        // Backend middleware automatically refresh token if needed
        const res = await axios.post(
          "http://localhost:5000/verifyToken",
          {},
          {
            withCredentials: true,
          }
        );

        if (res.data.valid) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch (err) {
        // Token invalid or refresh failed → force logout
        setAuth(false);
      }
    };

    verifyUser();
  }, []);

  // Loading state
  if (auth === null) return <Navigate to="/" replace />;

  return auth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
