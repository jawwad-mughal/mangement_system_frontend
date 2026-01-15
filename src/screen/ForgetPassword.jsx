import React, { useState } from "react";
import { Link } from "react-router";

export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resendPassword, setResendPassword] = useState(""); // Toggle reset form
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  

  const handleResetPassword = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!newPassword || !confirmPassword) {
      setError("Please fill in all password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage("✅ Password has been reset successfully!");
      setEmail("");
      setNewPassword("");
      setConfirmPassword("");
      setResendPassword("");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-700">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">
          Reset Password
        </h2>
          <form onSubmit={handleResetPassword } className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resend Password
              </label>
              <input
                type="resend password"
                value={resendPassword}
                onChange={(e) => setResendPassword(e.target.value)}
                placeholder="New password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>


            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-500 text-sm">{message}</p>}

            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading ? "Updateing Password..." : "Update Password"}
            </button>

            <div className="text-sm text-center text-gray-500 mt-2">
              Remember your password?{" "}
              <Link to="/" className="text-blue-600 hover:underline">
                Login
              </Link>
            </div>
          </form>
      
         

            
          
        
      </div>
    </div>
  );
}
