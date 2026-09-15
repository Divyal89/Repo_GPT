import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Input, Card } from "../components/common/BaseComponents";

import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.email &&
      formData.password === formData.confirmPassword
    )
      try {
        await axios.post("http://localhost:5000/api/users/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
      } catch (error) {
        console.error("err occur");
        console.log(error.response?.data);
        console.error(error.message);
      }

    {
      navigate("/login");
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
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-gray-400 mt-2">
            Join us to start analyzing your codebases
          </p>
        </div>

        <Card className="mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>

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

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            <Button variant="primary" size="lg" className="w-full">
              Create Account
            </Button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-4">
            By creating an account, you agree to our Terms of Service and
            Privacy Policy
          </p>
        </Card>

        <p className="text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-400 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
