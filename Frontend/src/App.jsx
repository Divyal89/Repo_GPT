import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Repositories from "./pages/Repositories";
import ConnectRepository from "./pages/ConnectRepository";
import Workspace from "./pages/Workspace";
import CodeExplorer from "./pages/CodeExplorer";
import ChatHistory from "./pages/ChatHistory";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import ChatConversation from "./pages/ChatConversation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/repositories"
          element={
            <ProtectedRoute>
              <Repositories />
            </ProtectedRoute>
          }
        />

        <Route
          path="/repositories/connect"
          element={
            <ProtectedRoute>
              <ConnectRepository />
            </ProtectedRoute>
          }
        />

        <Route
          path="/repositories/:id/workspace"
          element={
            <ProtectedRoute>
              <Workspace />
            </ProtectedRoute>
          }
        />

        <Route
          path="/repositories/:id/code"
          element={
            <ProtectedRoute>
              <CodeExplorer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat/:chatId"
          element={
            <ProtectedRoute>
              <ChatConversation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
