import { Link } from "react-router-dom";
import { Card, Badge, Button } from "../common/BaseComponents";
import { Github, FileText, Calendar, Zap } from "lucide-react";

export const RepositoryCard = ({ repo, onOpen }) => {
  const getLanguageColor = (lang) => {
    const colors = {
      JavaScript: "text-yellow-400",
      Python: "text-blue-400",
      TypeScript: "text-blue-600",
      CSS: "text-pink-400",
      HTML: "text-orange-400",
    };
    return colors[lang] || "text-gray-400";
  };

  const getStatusColor = (status) => {
    if (status === "indexed") return "success";
    if (status === "indexing") return "warning";
    return "default";
  };

  return (
    <Card className="flex flex-col h-full">
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-bold text-lg hover:text-blue-400 transition-colors">
              {repo.name}
            </h3>
            <p className="text-sm text-gray-400">{repo.owner}</p>
          </div>
          <Github size={20} className="text-gray-400" />
        </div>
        <p className="text-sm text-gray-400 mb-3">{repo.description}</p>
      </div>

      <div className="mb-4 flex items-center gap-2 flex-wrap">
        <Badge variant="blue">{repo.language}</Badge>
        <Badge>{repo.fileCount} files</Badge>
      </div>

      <div className="mb-4 space-y-2 text-sm text-gray-400 flex-1">
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span>Indexed: {repo.lastIndexed}</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap size={16} />
          <Badge variant={getStatusColor(repo.status)}>
            {repo.status.charAt(0).toUpperCase() + repo.status.slice(1)}
          </Badge>
        </div>
      </div>

      <div className="flex gap-2 pt-4 border-t border-gray-800">
        <Link to={`/repositories/${repo.id}/workspace`} className="flex-1">
          <Button variant="primary" size="sm" className="w-full">
            Open Workspace
          </Button>
        </Link>
        <Link to={`/repositories/${repo.id}/code`} className="flex-1">
          <Button variant="secondary" size="sm" className="w-full">
            View Code
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export const FileTreeItem = ({ item, level = 0, expanded, onToggle }) => {
  const isFolder = item.type === "folder";
  const indent = level * 16;

  const icons = {
    jsx: "⚛️",
    js: "📜",
    json: "📋",
    md: "📝",
    css: "🎨",
    html: "🌐",
    py: "🐍",
    folder: "📁",
  };

  const getIcon = (name) => {
    const ext = name.split(".").pop();
    return icons[ext] || icons["file"] || "📄";
  };

  return (
    <div>
      <div
        className="flex items-center gap-1 px-2 py-1 hover:bg-gray-800 rounded cursor-pointer transition-colors"
        style={{ paddingLeft: `${indent}px` }}
        onClick={() => isFolder && onToggle?.(item)}
      >
        <span className="text-lg">
          {isFolder ? (expanded ? "📂" : "📁") : getIcon(item.name)}
        </span>
        <span className="text-sm text-gray-300">{item.name}</span>
      </div>

      {isFolder && expanded && item.children && (
        <div>
          {item.children.map((child, idx) => (
            <FileTreeItem
              key={idx}
              item={child}
              level={level + 1}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const SourceReference = ({ source, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-blue-400 hover:bg-gray-700 hover:border-blue-500 transition-colors"
    >
      <FileText size={16} />
      <span className="font-mono">{source.file}</span>
      {source.lines && (
        <span className="text-gray-400">:{source.lines[0]}</span>
      )}
    </button>
  );
};

export const StatsCard = ({ icon: Icon, label, value }) => {
  return (
    <Card className="flex items-center gap-4">
      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
        <Icon size={24} className="text-white" />
      </div>
      <div>
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </Card>
  );
};
