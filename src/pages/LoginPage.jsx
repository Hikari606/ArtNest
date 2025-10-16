import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState("");

  const validate = () => {
    const next = {};
    if (!username.trim()) next.username = "Username is required";
    if (!password) next.password = "Password is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setAuthError("");
    const ok = login(username.trim(), password);
    if (ok) navigate("/");
    else setAuthError("Invalid credentials. Try admin/admin123 or superadmin/super123.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7fb] via-[#ffe6e0] to-[#bde0fe] p-6 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-[#bf4b6a]">Login</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          {authError && (
            <div className="text-red-600 text-sm">{authError}</div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`mt-1 w-full rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.username ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-[#f6a5b5]"
              }`}
              placeholder="yourname"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          <div className="text-xs text-gray-500">
            Demo accounts: admin/admin123 (shop-1) • superadmin/super123
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 w-full rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-[#f6a5b5]"
              }`}
              placeholder="********"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button type="submit" className="w-full px-5 py-3 rounded-xl bg-[#bf4b6a] text-white hover:bg-[#d76b91]">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}


