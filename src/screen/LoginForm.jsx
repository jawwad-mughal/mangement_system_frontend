import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loginUser } from "../store/slices/loginSlice"; // path adjust karo

export default function LoginForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, url } = useSelector((state) => state.login);

  // ⚡ Redirect jab login successful ho
  useEffect(() => {
    if (url) {
      navigate(url); // yahan redirect ho raha hai
    }
  }, [url, navigate]);
  
  useEffect(() => {
    dispatch(clearError())
  },[form])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, role } = form;
    // 🔥 Redux async thunk dispatch
    dispatch(loginUser({ email, password, role }))
      
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-700">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Please login to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-sm text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Forgot Password */}
          <div className="text-sm text-center text-gray-500 mt-2">
            Forgot your password?{" "}
            <Link to={"/forgetpassword"} className="text-blue-600 hover:underline">
              Reset here
            </Link>
          </div>
        </form>

        <hr className="my-6 border-gray-300" />

        {/* Signup link */}
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to={"/signup"} className="text-blue-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}


