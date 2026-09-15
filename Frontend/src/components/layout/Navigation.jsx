import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../common/BaseComponents";

export const Navbar = ({ hideAuthButtons = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/75 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-indigo-500 to-sky-400 shadow-lg shadow-violet-900/30">
              <span className="text-sm font-bold text-white">RG</span>
            </div>

            <span className="hidden text-lg font-bold text-white sm:inline">
              RepoGPT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="text-gray-300 hover:text-white transition-colors"
            >
              How It Works
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {!hideAuthButtons && (
              <>
                <Link to="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>

                <Link to="/register">
                  <Button variant="primary">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-800">
            <a
              href="#features"
              className="block py-2 text-gray-300 hover:text-white"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="block py-2 text-gray-300 hover:text-white"
            >
              How It Works
            </a>

            <Link to="/login" className="block py-2">
              <Button variant="ghost" className="w-full">
                Sign In
              </Button>
            </Link>

            <Link to="/register" className="block py-2">
              <Button variant="primary" className="w-full">
                Get Started
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export const Sidebar = ({ currentPath }) => {
  // --------------------------- Logout ---------------------------
  const navigate = useNavigate();

  const [user] = useState(() => {
    const storedUser = localStorage.getItem("user");

    return storedUser ? JSON.parse(storedUser) : null;
  });

  const handleLogout = () => {
    // Remove JWT token
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to login page
    navigate("/login");
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "📊",
    },
    {
      name: "Repositories",
      path: "/repositories",
      icon: "📚",
    },
    {
      name: "Chat History",
      path: "/chat",
      icon: "💬",
    },
    {
      name: "Settings",
      path: "/settings",
      icon: "⚙️",
    },
  ];

  return (
    <div className="sticky top-0 flex h-screen w-64 flex-col border-r border-slate-800/80 bg-slate-950/70 backdrop-blur-xl">
      {/* Logo */}
      <div className="border-b border-slate-800/80 p-6">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-indigo-500 to-sky-400 shadow-lg shadow-violet-900/30">
            <span className="text-sm font-bold text-white">RG</span>
          </div>

          <span className="text-lg font-bold text-white">RepoGPT</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
              currentPath === item.path
                ? "bg-gradient-to-r from-violet-600/90 to-indigo-600/90 text-white shadow-lg shadow-violet-900/20"
                : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
            }`}
          >
            <span className="text-lg">{item.icon}</span>

            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* User Section */}
      <div className="border-t border-slate-800/80 p-4">
        {/* User Information */}
        <div className="flex items-center gap-3 mb-3">
          <img
            src={
              user?.avatar ||
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop"
            }
            alt="Avatar"
            className="w-10 h-10 rounded-lg"
          />

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {user?.name || "User"}
            </p>

            <p className="text-xs text-gray-400 truncate">
              {user?.email || "Userabcxxx@gmail.com"}
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full rounded-xl px-4 py-3 text-left text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};
