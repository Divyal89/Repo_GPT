import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { Sidebar } from "../components/layout/Navigation";

export default function ChatConversation() {
  const { chatId } = useParams();
  const navigate = useNavigate();

  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:5000/api/chat/${chatId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log("Chat conversation:", response.data);

        setChat(response.data.chat);
        setMessages(response.data.messages);
      } catch (error) {
        console.error("Failed to load conversation:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChat();
  }, [chatId]);

  if (loading) {
    return (
      <div className="flex h-screen bg-dark">
        <Sidebar currentPath="/chat" />

        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-400">Loading conversation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-dark">
      <Sidebar currentPath="/chat" />

      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="border-b border-gray-800 px-8 py-6">
          <button
            onClick={() => navigate("/chat")}
            className="text-gray-400 hover:text-white mb-4"
          >
            ← Back to Chat History
          </button>

          <h1 className="text-3xl font-bold">
            {chat?.title || "Conversation"}
          </h1>
        </div>

        {/* Messages */}
        <div className="p-8 max-w-4xl space-y-6">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`rounded-xl p-4 ${
                message.role === "user"
                  ? "bg-violet-600/20 border border-violet-500/30"
                  : "bg-slate-900 border border-slate-700"
              }`}
            >
              <p className="text-sm text-gray-400 mb-2">
                {message.role === "user" ? "You" : "RepoGPT"}
              </p>

              <p className="text-white whitespace-pre-wrap">
                {message.content}
              </p>

              {/* Sources */}
              {message.role === "assistant" && message.sources?.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-400 mb-2">Sources:</p>

                  {message.sources.map((source, index) => (
                    <p key={index} className="text-xs text-gray-500">
                      {source.path}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
