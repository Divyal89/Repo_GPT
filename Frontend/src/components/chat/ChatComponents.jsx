import { useState } from "react";
import { Send, Loader, Copy, CheckCircle } from "lucide-react";
import { Card, Button } from "../common/BaseComponents";
import { SourceReference } from "../repository/RepositoryComponents";

export const ChatMessage = ({ message, onSourceClick }) => {
  const isUser = message.type === "user";

  return (
    <div
      className={`flex gap-3 mb-6 ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`flex-1 max-w-2xl ${isUser ? "text-right" : ""}`}>
        <div
          className={`rounded-lg p-4 inline-block text-left max-w-full ${
            isUser
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-100 border border-gray-700"
          }`}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>

          {message.sources && message.sources.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-700 space-y-2">
              <p className="text-xs text-gray-400 font-semibold uppercase">
                Sources:
              </p>
              <div className="flex flex-wrap gap-2">
                {message.sources.map((source, idx) => (
                  <SourceReference
                    key={idx}
                    source={source}
                    onClick={() => onSourceClick?.(source)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const ChatWindow = ({ messages, onSendMessage, isLoading }) => {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(null);

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-gray-950 rounded-lg border border-gray-800">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <h3 className="font-bold text-lg">RepoGPT Assistant</h3>
        <p className="text-sm text-gray-400">
          Ask anything about this repository.
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-3">💬</div>
              <p className="text-gray-400">No messages yet</p>
              <p className="text-sm text-gray-500">
                Start by asking a question about the codebase
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <ChatMessage
              key={idx}
              message={msg}
              onSourceClick={(source) => {
                // This will be handled by parent component
              }}
            />
          ))
        )}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex gap-2 items-center">
                <Loader size={16} className="animate-spin text-blue-400" />
                <span className="text-gray-300">Analyzing codebase...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask RepoGPT anything about this codebase..."
            className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <Button
            variant="primary"
            size="md"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
          >
            <Send size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export const SuggestedQuestion = ({ question, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-3 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 rounded-lg text-sm text-gray-300 hover:text-white transition-all"
    >
      {question}
    </button>
  );
};

export const CodeViewer = ({ file, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(file.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-gray-950 rounded-lg border border-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-wide">File</p>
          <p className="font-mono text-sm text-white">{file.filename}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
            title="Copy code"
          >
            {copied ? (
              <CheckCircle size={18} className="text-green-500" />
            ) : (
              <Copy size={18} />
            )}
          </button>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Code */}
      <div className="flex-1 overflow-auto p-4 bg-gray-900">
        <pre className="font-mono text-sm text-gray-300 leading-relaxed">
          <code>
            {file.code.split("\n").map((line, idx) => {
              const lineNumber = idx + 1;
              const isHighlighted = file.highlightedLines?.includes(lineNumber);
              return (
                <div
                  key={idx}
                  className={`flex gap-4 ${
                    isHighlighted ? "bg-blue-900 bg-opacity-30" : ""
                  }`}
                >
                  <span className="text-gray-600 select-none w-8 text-right flex-shrink-0">
                    {lineNumber}
                  </span>
                  <span>{line}</span>
                </div>
              );
            })}
          </code>
        </pre>
      </div>
    </div>
  );
};
