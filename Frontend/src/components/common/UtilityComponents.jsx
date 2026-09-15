import { CheckCircle, Loader, Circle } from "lucide-react";

export const IndexingProgress = ({ steps, currentStep }) => {
  return (
    <div className="space-y-6">
      {steps.map((step, idx) => {
        const isCompleted = idx < currentStep;
        const isActive = idx === currentStep;
        const isPending = idx > currentStep;

        return (
          <div key={idx} className="flex gap-4">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isCompleted
                    ? "bg-green-600 text-white"
                    : isActive
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle size={24} />
                ) : isActive ? (
                  <Loader size={24} className="animate-spin" />
                ) : (
                  <Circle size={24} />
                )}
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`w-1 h-8 ${
                    isCompleted ? "bg-green-600" : "bg-gray-700"
                  }`}
                ></div>
              )}
            </div>

            <div className="py-2">
              <h4
                className={`font-medium ${isActive ? "text-white" : "text-gray-300"}`}
              >
                {step.name}
              </h4>
              <p className="text-sm text-gray-500">
                {isCompleted
                  ? "Completed"
                  : isActive
                    ? "In progress..."
                    : "Waiting"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const LoadingState = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <Loader size={32} className="animate-spin text-blue-600 mb-4" />
      <p className="text-gray-400">{message}</p>
    </div>
  );
};

export const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <Icon size={48} className="text-gray-600 mb-4" />
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 mb-4 max-w-md">{description}</p>
      {action}
    </div>
  );
};

export const SearchBar = ({ placeholder, onSearch }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={(e) => onSearch(e.target.value)}
      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
    />
  );
};

export const ThemeToggle = ({ isDark, onChange }) => {
  return (
    <button
      onClick={() => onChange(!isDark)}
      className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
};

export const UserMenu = ({ user, onLogout }) => {
  return (
    <div className="flex items-center gap-3">
      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-lg" />
      <div className="hidden sm:block">
        <p className="text-sm font-medium">{user.name}</p>
        <p className="text-xs text-gray-400">{user.email}</p>
      </div>
      <button
        onClick={onLogout}
        className="text-gray-400 hover:text-white transition-colors"
      >
        ↪
      </button>
    </div>
  );
};
