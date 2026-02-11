import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

const PublicWrapper = () => {
  const [auth, setAuth] = useState(null); // null = loading

  useEffect(() => {
    const check = async () => {
      try {
        const res = await axios.get(
          "https://mangement-system-backend.vercel.app/verifyToken",
          { withCredentials: true } // ✅ send cookies
        );
        setAuth(res.data.valid);
      } catch {
        setAuth(false); // token invalid
      }
    };

    check();
  }, []);

  // Loading state → wait
  if (auth === null) return <div>Loading...</div>;

  // If authenticated, redirect to main page
  return auth ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicWrapper;




