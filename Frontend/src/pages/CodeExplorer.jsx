import { useState, useLocation } from "react";
import { Sidebar } from "../components/layout/Navigation";
import { Button, Input, Card } from "../components/common/BaseComponents";
import { FileTreeItem } from "../components/repository/RepositoryComponents";
import { mockFileTree, mockCodeFile } from "../data/mockData";
import { Search, Copy, ExternalLink, CheckCircle } from "lucide-react";

export default function CodeExplorer() {
  const location = useLocation();
  const [expandedFolders, setExpandedFolders] = useState({});
  const [selectedFile, setSelectedFile] = useState(mockCodeFile);
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleToggleFolder = (item) => {
    const key = item.name;
    setExpandedFolders((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-screen bg-dark">
      <Sidebar currentPath={location.pathname} />

      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="border-b border-gray-800 px-8 py-6">
          <h1 className="text-3xl font-bold">Code Explorer</h1>
          <p className="text-gray-400 mt-1">
            Browse and explore your repository files.
          </p>
        </div>

        <div className="flex gap-4 p-8 h-[calc(100vh-120px)]">
          {/* File Tree */}
          <div className="w-80 bg-gray-900 border border-gray-800 rounded-lg flex flex-col">
            <div className="p-4 border-b border-gray-800">
              <Input
                type="text"
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              <FileTreeItem
                item={mockFileTree}
                expanded={expandedFolders[mockFileTree.name]}
                onToggle={handleToggleFolder}
              />
            </div>
          </div>

          {/* Code Viewer */}
          <div className="flex-1 flex flex-col bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
            {/* File Header */}
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wide">
                    File
                  </p>
                  <p className="font-mono text-white">
                    {selectedFile.filename}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    title="Copy code"
                  >
                    {copied ? (
                      <>
                        <CheckCircle size={16} className="text-green-500" />
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                      </>
                    )}
                  </Button>
                  <Button variant="ghost" size="sm" title="Open on GitHub">
                    <ExternalLink size={16} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Code Content */}
            <div className="flex-1 overflow-auto p-4">
              <pre className="font-mono text-sm text-gray-300 leading-relaxed">
                <code>
                  {selectedFile.code.split("\n").map((line, idx) => {
                    const lineNumber = idx + 1;
                    const isHighlighted =
                      selectedFile.highlightedLines?.includes(lineNumber);
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
        </div>
      </div>
    </div>
  );
}
