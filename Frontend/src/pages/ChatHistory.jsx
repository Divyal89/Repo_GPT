import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { Sidebar } from "../components/layout/Navigation";
import { Button, Card, Input } from "../components/common/BaseComponents";

import { Search, Trash2, MessageSquare } from "lucide-react";

export default function ChatHistory() {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [conversations, setConversations] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user's chats from backend
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("http://localhost:5000/api/chat", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Chats received:", response.data);

        setConversations(response.data.chats);
      } catch (error) {
        console.error("Failed to fetch chats:", error);

        setError("Failed to load chat history");
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  // Search conversations
  const filteredConversations = conversations.filter(
    (conv) =>
      conv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.repository?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex h-screen bg-dark">
      <Sidebar currentPath={location.pathname} />

      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="border-b border-gray-800 px-8 py-6">
          <h1 className="text-3xl font-bold">Chat History</h1>

          <p className="text-gray-400 mt-1">
            View and manage your previous conversations.
          </p>
        </div>

        <div className="p-8 max-w-4xl">
          {/* Search */}
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-3 text-gray-500" size={20} />

            <Input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Loading */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Loading chat history...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-400">{error}</p>
            </div>
          ) : filteredConversations.length > 0 ? (
            <div className="space-y-3">
              {filteredConversations.map((conv) => (
                <Card
                  key={conv._id}
                  className="flex items-center justify-between hover:border-gray-600"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <MessageSquare
                      size={20}
                      className="text-blue-500 flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white truncate">
                        {conv.title}
                      </h3>

                      <p className="text-sm text-gray-400">
                        {conv.repository?.name || "Unknown repository"} •{" "}
                        {new Date(conv.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => navigate(`/chat/${conv._id}`)}
                    >
                      Open
                    </Button>

                    <button
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MessageSquare size={48} className="text-gray-600 mx-auto mb-4" />

              <p className="text-gray-400 mb-2">No conversations found</p>

              <p className="text-sm text-gray-500">
                Start a new conversation by opening a repository workspace
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
