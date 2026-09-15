import { useState, useLocation } from "react";
import { useParams } from "react-router-dom";
import { Sidebar } from "../components/layout/Navigation";
import { Button, Badge, Card } from "../components/common/BaseComponents";
import {
  FileTreeItem,
  SourceReference,
} from "../components/repository/RepositoryComponents";
import {
  ChatWindow,
  SuggestedQuestion,
  CodeViewer,
} from "../components/chat/ChatComponents";
import {
  mockRepositories,
  mockFileTree,
  mockConversations,
  mockChatSuggestions,
  mockCodeFile,
} from "../data/mockData";
import { Settings, Search, ChevronDown } from "lucide-react";

export default function Workspace() {
  const { id } = useParams();
  const location = useLocation();
  const [expandedFolders, setExpandedFolders] = useState({});
  const [messages, setMessages] = useState(
    mockConversations[0]?.messages || [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSource, setSelectedSource] = useState(null);
  const [filePanelOpen, setFilePanelOpen] = useState(true);
  const [codePanelOpen, setCodePanelOpen] = useState(true);

  const repo = mockRepositories.find((r) => r.id === id) || mockRepositories[0];

  const handleToggleFolder = (item) => {
    const key = item.name;
    setExpandedFolders((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSendMessage = (content) => {
    const userMessage = { id: Date.now(), type: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        type: "assistant",
        content:
          "Based on my analysis of your codebase, I can see that " +
          content.toLowerCase() +
          " This is implemented in several files across your project.",
        sources: [
          { file: "server/controllers/userController.js", lines: [45, 78] },
          { file: "client/src/hooks/useAuth.js", lines: [1, 35] },
        ],
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSourceClick = (source) => {
    setSelectedSource(source);
    setCodePanelOpen(true);
  };

  return (
    <div className="flex h-screen bg-dark">
      <Sidebar currentPath={location.pathname} />

      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <h2 className="font-bold text-lg">{repo.name}</h2>
            <Badge>main</Badge>
            <Badge variant="success">Indexed</Badge>
            <div className="ml-auto flex items-center gap-2 text-sm text-gray-400">
              <span>Last indexed: {repo.lastIndexed}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Search size={18} />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings size={18} />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex gap-4 p-4 overflow-hidden">
          {/* Left Panel - File Explorer */}
          <div
            className={`flex flex-col bg-gray-900 border border-gray-800 rounded-lg overflow-hidden transition-all ${filePanelOpen ? "w-64" : "w-0"}`}
          >
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <h3 className="font-bold">File Explorer</h3>
              <button
                onClick={() => setFilePanelOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              <FileTreeItem
                item={mockFileTree}
                expanded={expandedFolders[mockFileTree.name]}
                onToggle={handleToggleFolder}
              />
            </div>
          </div>

          {/* Center Panel - Chat */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {messages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="text-center max-w-2xl">
                  <div className="text-5xl mb-4">💬</div>
                  <h3 className="text-2xl font-bold mb-2">
                    Ask RepoGPT anything
                  </h3>
                  <p className="text-gray-400 mb-8">
                    Ask questions about this repository's architecture, specific
                    functions, dependencies, or how different parts work
                    together.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                    {mockChatSuggestions.slice(0, 4).map((question, idx) => (
                      <SuggestedQuestion
                        key={idx}
                        question={question}
                        onClick={() => handleSendMessage(question)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <ChatWindow
                messages={messages}
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
              />
            )}
          </div>

          {/* Right Panel - Code Viewer */}
          {codePanelOpen && (
            <div
              className={`flex flex-col bg-gray-900 border border-gray-800 rounded-lg overflow-hidden transition-all ${codePanelOpen ? "w-96" : "w-0"}`}
            >
              <CodeViewer
                file={
                  selectedSource
                    ? { ...mockCodeFile, filename: selectedSource.file }
                    : mockCodeFile
                }
                onClose={() => setCodePanelOpen(false)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
