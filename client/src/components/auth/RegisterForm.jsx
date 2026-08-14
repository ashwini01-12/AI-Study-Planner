import { useState } from "react";
import { Link } from "react-router-dom";
import GoogleButton from "./GoogleButton";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return "Please enter your full name.";
    }

    if (formData.name.trim().length < 2) {
      return "Name must contain at least 2 characters.";
    }

    if (!formData.email.trim()) {
      return "Please enter your email.";
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return "Please enter a valid email address.";
    }

    if (!formData.password) {
      return "Please create a password.";
    }

    if (formData.password.length < 8) {
      return "Password must contain at least 8 characters.";
    }

    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    // Backend registration API will be connected here
    setTimeout(() => {
      console.log("Registration data:", formData);
      setLoading(false);
    }, 800);
  };

  const handleGoogleRegister = () => {
    console.log("Google registration");
  };

  return (
    <div>
      {/* Google Register */}
      <GoogleButton onClick={handleGoogleRegister} />

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
        <div className="mb-5 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/10 text-sm text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Full Name
          </label>

          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            autoComplete="name"
            className="w-full h-12 px-4 rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder:text-gray-600 outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 transition"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="register-email"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Email
          </label>

          <input
            id="register-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            autoComplete="email"
            className="w-full h-12 px-4 rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder:text-gray-600 outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 transition"
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="register-password"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Password
          </label>

          <div className="relative">

            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              autoComplete="new-password"
              className="w-full h-12 px-4 pr-12 rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder:text-gray-600 outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 transition"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
            >
              {showPassword ? "◉" : "◌"}
            </button>

          </div>

          {/* Password Hint */}
          <p className="mt-2 text-xs text-gray-600">
            Use at least 8 characters.
          </p>
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Confirm Password
          </label>

          <div className="relative">

            <input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              autoComplete="new-password"
              className="w-full h-12 px-4 pr-12 rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder:text-gray-600 outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 transition"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword((prev) => !prev)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
            >
              {showConfirmPassword ? "◉" : "◌"}
            </button>

          </div>
        </div>

        {/* Terms */}
        <label className="flex items-start gap-3 cursor-pointer">

          <input
            type="checkbox"
            required
            className="mt-1 accent-purple-500"
          />

          <span className="text-xs leading-5 text-gray-500">
            I agree to the{" "}
            <span className="text-purple-400">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-purple-400">
              Privacy Policy
            </span>
            .
          </span>

        </label>

        {/* Register */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold shadow-lg shadow-purple-500/20 hover:scale-[1.01] active:scale-[0.99] transition disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loading ? "Creating account..." : "Create Account →"}
        </button>

      </form>

      {/* Login */}
      <p className="mt-7 text-center text-sm text-gray-500">
        Already have an account?{" "}

        <Link
          to="/login"
          className="text-purple-400 hover:text-purple-300 font-medium transition"
        >
          Login
        </Link>
      </p>

    </div>
  );
}

export default RegisterForm;