import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth/authAPI";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // Updates formData as the user types
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await login(formData);
      // Save token and user to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Login successful!");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "An error occurred");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#0F1F0F] mb-6">Sign In</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0F1F0F]"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0F1F0F]"
            required
          />
          <button
            type="submit"
            className="bg-[#0F1F0F] text-white py-3 rounded-lg font-semibold hover:bg-[#1a3a1a] transition-colors"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-[#C8922A] font-semibold">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
