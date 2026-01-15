import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

const PublicWrapper = () => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const check = async () => {
      try {
        const res = await axios.post("http://localhost:5000/verifyToken",{}, {
          withCredentials: true,
        });
console.log(res.data.valid)
        setAuth(res.data.valid);
      } catch {
        // Token invalid or refresh failed
        setAuth(false);
      }
    };

    check();
  }, []);

  if (auth === null) return <Navigate to="/login" replace />;

  return auth ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicWrapper;



