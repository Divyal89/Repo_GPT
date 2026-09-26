import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

import { Sidebar } from "../components/layout/Navigation";

import { Button, Badge } from "../components/common/BaseComponents";

import { FileTreeItem } from "../components/repository/RepositoryComponents";

import {
  ChatWindow,
  SuggestedQuestion,
  CodeViewer,
} from "../components/chat/ChatComponents";

import {
  mockRepositories,
  mockFileTree,
  mockChatSuggestions,
  mockCodeFile,
} from "../data/mockData";

import { Settings, Search } from "lucide-react";

export default function Workspace() {
  // --------------------------------------------------
  // Repository ID from URL
  // Example:
  // /repositories/6aacc480.../workspace
  //
  // id = 6aacc480...
  // --------------------------------------------------
  const { id } = useParams();
  console.log("Workspace repository ID:", id);

  const location = useLocation();

  // --------------------------------------------------
  // UI STATE
  // --------------------------------------------------

  // Stores expanded/collapsed folders
  const [expandedFolders, setExpandedFolders] = useState({});

  // Stores chat messages displayed in ChatWindow
  const [messages, setMessages] = useState([]);

  // Shows loading state while AI is generating answer
  const [isLoading, setIsLoading] = useState(false);

  // Stores the chat ID created by backend
  //
  // First question:
  // chatId = null
  //
  // Backend creates a new Chat and returns chatId.
  //
  // Next question:
  // We send that same chatId so messages
  // continue inside the same conversation.
  const [chatId, setChatId] = useState(null);

  // Stores selected source file
  const [selectedSource, setSelectedSource] = useState(null);

  // Controls left file explorer
  const [filePanelOpen, setFilePanelOpen] = useState(true);

  // Controls right code viewer
  const [codePanelOpen, setCodePanelOpen] = useState(true);

  // --------------------------------------------------
  // TEMPORARY REPOSITORY DISPLAY DATA
  // --------------------------------------------------
  //
  // Your repository UI is still using mock data.
  //
  // We are NOT changing that yet.
  //
  // The important part is that the real MongoDB
  // repository ID comes from `id` above.
  //
  const repo = mockRepositories.find((r) => r.id === id) || mockRepositories[0];

  // --------------------------------------------------
  // TOGGLE FILE TREE FOLDER
  // --------------------------------------------------

  const handleToggleFolder = (item) => {
    const key = item.name;

    setExpandedFolders((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // --------------------------------------------------
  // SEND MESSAGE TO REAL BACKEND
  // --------------------------------------------------

  const handleSendMessage = async (content) => {
    try {
      // ----------------------------------------------
      // STEP 1: Prevent empty messages
      // ----------------------------------------------

      if (!content || !content.trim()) {
        return;
      }

      if (!id) {
        console.error("Repository ID is missing");

        const errorMessage = {
          id: Date.now(),
          type: "assistant",
          content:
            "Repository ID is missing. Please open this workspace from the Repositories page.",
          sources: [],
        };

        setMessages((prev) => [...prev, errorMessage]);

        return;
      }

      // ----------------------------------------------
      // STEP 2: Start loading state
      // ----------------------------------------------

      setIsLoading(true);

      // ----------------------------------------------
      // STEP 3: Get JWT token
      //
      // Login stores the token in localStorage.
      //
      // Backend protect middleware expects:
      //
      // Authorization: Bearer <token>
      // ----------------------------------------------

      const token = localStorage.getItem("token");

      // ----------------------------------------------
      // STEP 4: Show user's message immediately
      //
      // This makes the UI feel responsive while
      // the backend is processing the request.
      // ----------------------------------------------

      const userMessage = {
        id: Date.now(),
        type: "user",
        content: content,
      };

      setMessages((prev) => [...prev, userMessage]);

      // ----------------------------------------------
      // STEP 5: Send question to backend
      //
      // First message:
      //
      // {
      //   repositoryId: id,
      //   message: content
      // }
      //
      // Later messages:
      //
      // {
      //   repositoryId: id,
      //   message: content,
      //   chatId: existingChatId
      // }
      //
      // Backend endpoint:
      //
      // POST /api/chat
      // ----------------------------------------------

      const response = await axios.post(
        "http://localhost:5000/api/chat",
        {
          repositoryId: id,
          message: content,

          // Only send chatId after the first message.
          ...(chatId && {
            chatId: chatId,
          }),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // ----------------------------------------------
      // STEP 6: Check backend response
      // ----------------------------------------------

      console.log("Chat API response:", response.data);

      // ----------------------------------------------
      // STEP 7: Save chat ID
      //
      // Backend creates a Chat document when the
      // first question is sent.
      //
      // Example:
      //
      // chatId:
      // 6ab689b406b3eb6d6919c0c7
      //
      // We save it so future questions use
      // the same conversation.
      // ----------------------------------------------

      if (!chatId && response.data.chatId) {
        setChatId(response.data.chatId);
      }

      // ----------------------------------------------
      // STEP 8: Convert backend AI response into
      // the format expected by ChatWindow
      // ----------------------------------------------

      const assistantMessage = {
        id: Date.now() + 1,

        type: "assistant",

        content: response.data.answer,

        // Backend returns:
        //
        // sources: [
        //   {
        //     path: "Student-score-predictor.py",
        //     score: 0.28
        //   }
        // ]
        //
        // Your existing UI expects:
        //
        // {
        //   file: "..."
        // }
        //
        sources:
          response.data.sources?.map((source) => ({
            file: source.path,

            // Keep score too.
            // It may be useful later.
            score: source.score,
          })) || [],
      };

      // ----------------------------------------------
      // STEP 9: Add AI answer to the UI
      // ----------------------------------------------

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      // ----------------------------------------------
      // ERROR HANDLING
      // ----------------------------------------------

      console.error(
        "Chat request failed:",
        error.response?.data || error.message,
      );

      // ----------------------------------------------
      // Show error inside chat
      // ----------------------------------------------

      const errorMessage = {
        id: Date.now() + 1,

        type: "assistant",

        content:
          "Sorry, I couldn't generate an answer. Please make sure the backend and AI service are running, then try again.",

        sources: [],
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      // ----------------------------------------------
      // Stop loading state
      // ----------------------------------------------

      setIsLoading(false);
    }
  };

  // --------------------------------------------------
  // SOURCE CLICK
  // --------------------------------------------------
  //
  // When user clicks a source returned by RAG,
  // open the code viewer.
  // --------------------------------------------------

  const handleSourceClick = (source) => {
    setSelectedSource(source);

    setCodePanelOpen(true);
  };

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div className="flex h-screen bg-dark">
      {/* ============================================
          SIDEBAR
          ============================================ */}

      <Sidebar currentPath={location.pathname} />

      {/* ============================================
          MAIN AREA
          ============================================ */}

      <div className="flex-1 flex flex-col">
        {/* ==========================================
            TOP BAR
            ========================================== */}

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

        {/* ==========================================
            MAIN CONTENT
            ========================================== */}

        <div className="flex-1 flex gap-4 p-4 overflow-hidden">
          {/* ========================================
              LEFT PANEL
              FILE EXPLORER
              ======================================== */}

          <div
            className={`flex flex-col bg-gray-900 border border-gray-800 rounded-lg overflow-hidden transition-all ${
              filePanelOpen ? "w-64" : "w-0"
            }`}
          >
            {filePanelOpen && (
              <>
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
              </>
            )}
          </div>

          {/* ========================================
              CENTER PANEL
              CHAT
              ======================================== */}

          <div className="flex-1 flex flex-col overflow-hidden">
            {/* ======================================
                EMPTY CHAT STATE
                ====================================== */}

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

                  {/* Suggested Questions */}

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
              /* ====================================
                 CHAT WINDOW
                 ==================================== */

              <ChatWindow
                messages={messages}
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
                onSourceClick={handleSourceClick}
              />
            )}
          </div>

          {/* ========================================
              RIGHT PANEL
              CODE VIEWER
              ======================================== */}

          {codePanelOpen && (
            <div
              className={`flex flex-col bg-gray-900 border border-gray-800 rounded-lg overflow-hidden transition-all ${
                codePanelOpen ? "w-96" : "w-0"
              }`}
            >
              <CodeViewer
                file={
                  selectedSource
                    ? {
                        ...mockCodeFile,
                        filename: selectedSource.file,
                      }
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
