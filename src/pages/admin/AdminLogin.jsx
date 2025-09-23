import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ADMIN_CONFIG } from "../../config/adminConfig";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic matching with config
    if (form.email === ADMIN_CONFIG.email && form.password === ADMIN_CONFIG.password) {
      // mock session
      localStorage.setItem(
        "alumnnet_admin_session",
        JSON.stringify({ email: form.email, collegeId: ADMIN_CONFIG.collegeId, ts: Date.now() })
      );
      navigate("/admin/dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Admin Panel Login</h1>
          <p className="mt-2 text-gray-400">Use the configured demo credentials.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              placeholder={ADMIN_CONFIG.email}
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button type="submit" className="w-full px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors">
            Sign In
          </button>
        </form>

        <div className="text-xs text-gray-500">
          Demo: {ADMIN_CONFIG.email} / {ADMIN_CONFIG.password}
        </div>
      </div>
    </div>
  );
}
