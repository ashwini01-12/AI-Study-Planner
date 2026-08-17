import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import GoogleButton from "./GoogleButton";
import api from "../../api/axios.js";

function LoginForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear previous error while typing
    if (error) {
      setError("");
    }
  };

  // Login
  const handleSubmit = async (e) => {
    console.log("FRONTEND ORIGIN:", window.location.origin);
    console.log("API URL:", import.meta.env.VITE_API_URL);
    e.preventDefault();

    setError("");

    // Email validation
    if (!formData.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Password validation
    if (!formData.password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email: formData.email.trim(),
        password: formData.password,
      });

      console.log("LOGIN RESPONSE:", response.data);
      console.log("LOGIN STATUS:", response.status);

      const { token, user } = response.data;

      // Save authentication data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to dashboard
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      console.error("STATUS:", error.response?.status);
      console.error("BACKEND MESSAGE:", error.response?.data);

      setError(
        error.response?.data?.message ||
        "Login failed. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    window.location.href = `${apiUrl}/auth/google`;
  };

  return (
    <div>
      {/* Google Login */}
      <GoogleButton onClick={handleGoogleLogin} />

      {/* Divider */}
      <div className="flex items-center gap-4 my-6">
        <div className="h-px flex-1 bg-white/10" />

        <span className="text-xs text-gray-600">
          OR
        </span>

        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="mb-5 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/10 text-sm text-red-400"
        >
          {error}
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            autoComplete="email"
            disabled={loading}
            className="w-full h-12 px-4 rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder:text-gray-600 outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 transition disabled:opacity-60"
          />
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-300"
            >
              Password
            </label>

            <button
              type="button"
              disabled={loading}
              className="text-xs text-purple-400 hover:text-purple-300 transition disabled:opacity-50"
            >
              Forgot password?
            </button>
          </div>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              disabled={loading}
              className="w-full h-12 px-4 pr-12 rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder:text-gray-600 outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 transition disabled:opacity-60"
            />

            {/* Password visibility */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={loading}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition disabled:opacity-50"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "◉" : "◌"}
            </button>
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold shadow-lg shadow-purple-500/20 hover:scale-[1.01] active:scale-[0.99] transition disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loading ? "Signing in..." : "Login →"}
        </button>
      </form>

      {/* Register */}
      <p className="mt-7 text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-purple-400 hover:text-purple-300 font-medium transition"
        >
          Create one
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;