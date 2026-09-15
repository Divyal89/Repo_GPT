import { useState, useLocation } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/layout/Navigation";
import {
  Button,
  Card,
  Input,
  Badge,
} from "../components/common/BaseComponents";
import { mockUser } from "../data/mockData";

export default function Settings() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    name: mockUser.name,
    email: mockUser.email,
  });
  const [theme, setTheme] = useState("dark");
  const [responseStyle, setResponseStyle] = useState("balanced");
  const [codeExplanation, setCodeExplanation] = useState("intermediate");

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "github", label: "GitHub" },
    { id: "appearance", label: "Appearance" },
    { id: "ai", label: "AI Preferences" },
    { id: "account", label: "Account" },
  ];

  const handleSave = () => {
    // Mock save
    alert("Settings saved successfully!");
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-dark">
      <Sidebar currentPath={location.pathname} />

      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="border-b border-gray-800 px-8 py-6">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-gray-400 mt-1">
            Manage your account and preferences.
          </p>
        </div>

        <div className="p-8 max-w-4xl">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b border-gray-800 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-white border-blue-500"
                    : "text-gray-400 border-transparent hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <Card>
                <div className="flex items-center gap-6 mb-6">
                  <img
                    src={mockUser.avatar}
                    alt={mockUser.name}
                    className="w-16 h-16 rounded-lg"
                  />
                  <Button variant="secondary">Change Avatar</Button>
                </div>
              </Card>

              <Card className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>

                <Button variant="primary" onClick={handleSave}>
                  Save Changes
                </Button>
              </Card>
            </div>
          )}

          {/* GitHub Tab */}
          {activeTab === "github" && (
            <Card className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  GitHub Connection
                </h3>
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium">Connected Account</p>
                    <p className="text-sm text-gray-400">john-dev</p>
                  </div>
                  <Badge variant="success">Connected</Badge>
                </div>
              </div>
              <Button variant="secondary" className="w-full">
                Disconnect GitHub
              </Button>
              <p className="text-sm text-gray-400">
                Your GitHub account is used to access private repositories and
                manage connections.
              </p>
            </Card>
          )}

          {/* Appearance Tab */}
          {activeTab === "appearance" && (
            <Card className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  Theme
                </label>
                <div className="space-y-2">
                  {["dark", "light", "system"].map((t) => (
                    <label
                      key={t}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="theme"
                        value={t}
                        checked={theme === t}
                        onChange={(e) => setTheme(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="capitalize">{t}</span>
                    </label>
                  ))}
                </div>
              </div>
              <Button variant="primary" onClick={handleSave}>
                Save Changes
              </Button>
            </Card>
          )}

          {/* AI Preferences Tab */}
          {activeTab === "ai" && (
            <div className="space-y-6">
              <Card className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Response Style
                  </label>
                  <select
                    value={responseStyle}
                    onChange={(e) => setResponseStyle(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="concise">
                      Concise - Short and to the point
                    </option>
                    <option value="balanced">
                      Balanced - Detailed but concise
                    </option>
                    <option value="detailed">
                      Detailed - Comprehensive explanations
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Code Explanation Level
                  </label>
                  <select
                    value={codeExplanation}
                    onChange={(e) => setCodeExplanation(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="beginner">
                      Beginner - Explain fundamentals
                    </option>
                    <option value="intermediate">
                      Intermediate - Assume basic knowledge
                    </option>
                    <option value="advanced">
                      Advanced - Technical deep dives
                    </option>
                  </select>
                </div>

                <Button variant="primary" onClick={handleSave}>
                  Save Changes
                </Button>
              </Card>
            </div>
          )}

          {/* Account Tab */}
          {activeTab === "account" && (
            <div className="space-y-6">
              <Card className="space-y-4">
                <h3 className="text-lg font-semibold">Danger Zone</h3>
                <p className="text-sm text-gray-400">
                  Irreversible actions on your account
                </p>
                <Button variant="danger" className="w-full">
                  Delete Account
                </Button>
              </Card>

              <Card className="p-6">
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
