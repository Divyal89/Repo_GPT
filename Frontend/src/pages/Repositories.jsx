import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";

import { Sidebar } from "../components/layout/Navigation";
import { Button, Input } from "../components/common/BaseComponents";
import { RepositoryCard } from "../components/repository/RepositoryComponents";
import { Search } from "lucide-react";

export default function Repositories() {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [repositories, setRepositories] = useState([]);

  // Fetch repositories from backend
  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/repositories",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log("Repositories:", response.data);

        setRepositories(response.data.repositories);
      } catch (error) {
        console.error(
          "Repository fetch error:",
          error.response?.data || error.message,
        );
      }
    };

    fetchRepositories();
  }, []);

  // Search repositories
  const filteredRepos = repositories.filter(
    (repo) =>
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.fullName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex h-screen bg-dark">
      <Sidebar currentPath={location.pathname} />

      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="border-b border-gray-800 px-8 py-6">
          <h1 className="text-3xl font-bold">Repositories</h1>

          <p className="text-gray-400 mt-1">Manage your connected codebases.</p>
        </div>

        <div className="p-8 space-y-8">
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="w-full md:w-96 relative">
              <Search
                className="absolute left-3 top-3 text-gray-500"
                size={20}
              />

              <Input
                type="text"
                placeholder="Search repositories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Link to="/repositories/connect" className="flex-shrink-0">
              <Button variant="primary" size="lg">
                + Connect Repository
              </Button>
            </Link>
          </div>

          {/* Repositories Grid */}
          {filteredRepos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRepos.map((repo) => (
                <RepositoryCard key={repo._id} repo={repo} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">No repositories found</p>

              <Link to="/repositories/connect">
                <Button variant="primary">Connect Your First Repository</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
