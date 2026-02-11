import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const [auth, setAuth] = useState(null); // null = loading

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get(
          "https://mangement-system-backend.vercel.app/verifyToken",
          { withCredentials: true } // send cookies
        );

        setAuth(res.data.valid); // true or false
      } catch {
        setAuth(false);
      }
    };

    verifyUser();
  }, []);

  // While checking auth, show loading
  if (auth === null) return <div>Loading...</div>;

  // Authenticated → render protected routes
  if (auth) return <Outlet />;

  // Not authenticated → redirect to login
  return <Navigate to="/login" replace />;
};

export default ProtectedRoutes;

