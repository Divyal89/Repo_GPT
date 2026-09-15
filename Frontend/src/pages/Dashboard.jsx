import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "../components/layout/Navigation";
import { Button, Card } from "../components/common/BaseComponents";
import { useEffect, useState } from "react";

import axios from "axios";

import {
  RepositoryCard,
  StatsCard,
} from "../components/repository/RepositoryComponents";

import { mockStats, mockChatHistory } from "../data/mockData";

import { BookOpen, MessageSquare, Zap } from "lucide-react";

export default function Dashboard() {
  const location = useLocation();

  const [repositories, setRepositories] = useState([]);

  // Get logged-in user's repositories
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/repositories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Repositories:", response.data);

        setRepositories(response.data.repositories);
      })
      .catch((error) => {
        console.error(
          "Repository fetch error:",
          error.response?.data || error.message,
        );
      });
  }, []);

  // Get logged-in user's name
  const [user] = useState(() => {
    const storedUser = localStorage.getItem("user");

    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Calculate total files from all repositories
  const totalFiles = repositories.reduce(
    (total, repo) => total + (repo.files || 0),
    0,
  );

  return (
    <div className="flex h-screen bg-dark">
      <Sidebar currentPath={location.pathname} />

      <div className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.18),transparent_30%),linear-gradient(180deg,_#030712_0%,_#0b1120_100%)]">
        {/* Header */}
        <div className="border-b border-slate-800/80 bg-slate-950/40 px-8 py-6 backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-white">
            Good afternoon, {user?.name || "User"}
          </h1>

          <p className="mt-1 text-slate-300">
            Explore and understand your codebases with AI.
          </p>
        </div>

        <div className="space-y-8 p-8">
          {/* CTA Button */}
          <div className="rounded-[28px] bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.14),transparent_20%),linear-gradient(135deg,_rgba(124,58,237,0.95),_rgba(79,70,229,0.9),_rgba(14,165,233,0.8))] p-8 shadow-[0_30px_80px_rgba(76,29,149,0.35)]">
            <div className="flex items-center justify-between gap-6">
              <div>
                <h2 className="mb-2 text-2xl font-bold text-white">
                  Connect a New Repository
                </h2>

                <p className="text-violet-100">
                  Add another GitHub repository to analyze
                </p>
              </div>

              <Link to="/repositories/connect">
                <Button
                  variant="secondary"
                  size="lg"
                  className="border-white/10 bg-white/10 text-white hover:bg-white/15"
                >
                  + Connect Repository
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatsCard
              icon={BookOpen}
              label="Connected Repositories"
              value={repositories.length}
            />

            <StatsCard
              icon={Zap}
              label="Indexed Files"
              value={totalFiles.toLocaleString()}
            />

            <StatsCard
              icon={MessageSquare}
              label="Conversations"
              value={mockStats.conversations}
            />

            <StatsCard
              icon={BookOpen}
              label="Questions Asked"
              value={mockStats.questions}
            />
          </div>

          {/* Recent Repositories */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Recent Repositories</h2>

                <p className="text-gray-400">
                  Your most actively used projects
                </p>
              </div>

              <Link to="/repositories">
                <Button variant="ghost">View All</Button>
              </Link>
            </div>

            {repositories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {repositories.slice(0, 3).map((repo) => (
                  <RepositoryCard key={repo._id} repo={repo} />
                ))}
              </div>
            ) : (
              <Card className="text-center py-10">
                <h3 className="text-lg font-semibold mb-2">
                  No repositories connected
                </h3>

                <p className="text-gray-400 mb-5">
                  Connect your first GitHub repository to get started.
                </p>

                <Link to="/repositories/connect">
                  <Button variant="primary">+ Connect Repository</Button>
                </Link>
              </Card>
            )}
          </div>

          {/* Recent Conversations */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Recent Conversations</h2>

                <p className="text-gray-400">Your chat history</p>
              </div>

              <Link to="/chat">
                <Button variant="ghost">View All</Button>
              </Link>
            </div>

            <div className="space-y-2">
              {mockChatHistory.slice(0, 4).map((conv) => (
                <Card
                  key={conv.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex-1">
                    <h3 className="font-medium">{conv.title}</h3>

                    <p className="text-sm text-gray-400">
                      {conv.repository} • {conv.messageCount} messages •{" "}
                      {conv.date}
                    </p>
                  </div>

                  <Button variant="ghost" size="sm">
                    Open
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
