import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Input, Card } from "../components/common/BaseComponents";
import { Github } from "lucide-react";

import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("HANDLE SUBMIT RUNNING");
    try {
      // API request will go here
      console.log("Sending login request...");
      const response = await axios.post(
        "http://localhost:5000/api/users/login",

        {
          email: formData.email,
          password: formData.password,
        },
      );

      console.log("Response received:", response.data);

      // Save JWT token
      localStorage.setItem("token", response.data.token);

      // To get user info from backend and DB
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Login successful → go to dashboard
      navigate("/dashboard");
    } catch (error) {
      // error handling will go here
      console.error("err occur");
      console.log(error.response?.data);
      console.error(error.message);
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">RG</span>
            </div>
            <span className="font-bold text-xl">RepoGPT</span>
          </Link>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-gray-400 mt-2">
            Sign in to your account to continue
          </p>
        </div>

        <Card className="mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
            >
              Sign In
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            variant="secondary"
            size="lg"
            className="w-full flex items-center justify-center gap-2"
          >
            <Github size={20} />
            Continue with GitHub
          </Button>
        </Card>

        <div className="space-y-2 text-center">
          <a
            href="#"
            className="text-blue-500 hover:text-blue-400 transition-colors"
          >
            Forgot password?
          </a>
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 hover:text-blue-400 transition-colors"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
