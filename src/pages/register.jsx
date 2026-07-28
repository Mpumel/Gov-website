import { useState } from "react";
import { registration } from "../api/auth/authAPI";

export default function Register() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await registration(formData);
      alert("Account created! Please sign in.");
      window.location.href = "/login";
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#0F1F0F] mb-6">
          Create Account
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="full_name"
            placeholder="Full name"
            value={formData.full_name}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0F1F0F]"
            required
          />
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
            Create Account
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-[#C8922A] font-semibold">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
