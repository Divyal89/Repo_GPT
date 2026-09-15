import { Sidebar } from "../components/layout/Navigation";
import { Button, Input, Card } from "../components/common/BaseComponents";
import { IndexingProgress } from "../components/common/UtilityComponents";
import { mockIndexingSteps } from "../data/mockData";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ConnectRepository() {
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState("input");
  const [currentIndexStep, setCurrentIndexStep] = useState(0);
  const [repoUrl, setRepoUrl] = useState("");
  const [branch, setBranch] = useState("main");

  const handleConnect = async () => {
    if (!repoUrl.trim()) return;

    try {
      const token = localStorage.getItem("token");

      // Get repository name from URL
      const urlParts = repoUrl.split("/");

      const owner = urlParts[urlParts.length - 2];
      const repoName = urlParts[urlParts.length - 1];

      const response = await axios.post(
        "http://localhost:5000/api/repositories/connect",
        {
          githubUrl: repoUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Repository connected:", response.data);

      setStep("indexing");

      // Temporary indexing simulation
      let current = 0;

      const interval = setInterval(() => {
        current += 1;
        setCurrentIndexStep(current);

        if (current >= mockIndexingSteps.length - 1) {
          clearInterval(interval);

          setTimeout(() => {
            navigate("/repositories");
          }, 1000);
        }
      }, 1500);
    } catch (error) {
      console.error(
        "Repository connection error:",
        error.response?.data || error.message,
      );
    }
  };

  return (
    <div className="flex h-screen bg-dark">
      <Sidebar currentPath={location.pathname} />

      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="border-b border-gray-800 px-8 py-6">
          <h1 className="text-3xl font-bold">Connect a Repository</h1>
          <p className="text-gray-400 mt-1">
            Add a GitHub repository to start exploring with RepoGPT.
          </p>
        </div>

        <div className="p-8 max-w-2xl">
          {step === "input" && (
            <Card className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  GitHub Repository URL
                </label>
                <Input
                  type="text"
                  placeholder="https://github.com/user/project"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Enter the full URL of your GitHub repository (public or
                  private with access token)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Branch
                </label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="main">main</option>
                  <option value="develop">develop</option>
                  <option value="master">master</option>
                </select>
              </div>

              <div className="bg-blue-900 bg-opacity-20 border border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-200">
                  <strong>Tip:</strong> RepoGPT will analyze your codebase and
                  create embeddings for AI-powered querying. This typically
                  takes a few minutes.
                </p>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleConnect}
                disabled={!repoUrl.trim()}
              >
                Start Indexing
              </Button>
            </Card>
          )}

          {step === "indexing" && (
            <Card className="space-y-8">
              <div>
                <h2 className="text-xl font-bold mb-2">
                  Indexing Your Repository
                </h2>
                <p className="text-gray-400">
                  This may take a few minutes. Please don't close this window.
                </p>
              </div>

              <div className="space-y-6">
                <IndexingProgress
                  steps={mockIndexingSteps}
                  currentStep={currentIndexStep}
                />
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <p className="text-sm text-gray-300">
                  <strong>Current step:</strong>{" "}
                  {mockIndexingSteps[currentIndexStep]?.name}
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
