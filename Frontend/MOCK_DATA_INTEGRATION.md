# Mock Data Integration Guide

This document explains how to replace mock data with real API calls.

---

## Current Mock Data Files

All mock data is in `src/data/mockData.js`:

```javascript
export const mockUser = { ... }
export const mockRepositories = [ ... ]
export const mockFileTree = { ... }
export const mockConversations = [ ... ]
export const mockChatSuggestions = [ ... ]
export const mockCodeFile = { ... }
export const mockIndexingSteps = [ ... ]
export const mockStats = { ... }
export const mockChatHistory = [ ... ]
```

---

## Replacing Mock Data with API Calls

### 1. User Data (Dashboard, Settings)

**Current (Mock):**

```jsx
import { mockUser } from "../data/mockData";

export default function Dashboard() {
  return <h1>Welcome, {mockUser.name}</h1>;
}
```

**Replace with API:**

```jsx
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrentUser()
      .then((data) => setUser(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingState />;
  return <h1>Welcome, {user.name}</h1>;
}

// In your API service:
async function fetchCurrentUser() {
  const response = await fetch("/api/users/me", {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.json();
}
```

---

### 2. Repositories List

**Current (Mock):**

```jsx
import { mockRepositories } from "../data/mockData";

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {mockRepositories.map((repo) => (
    <RepositoryCard key={repo.id} repo={repo} />
  ))}
</div>;
```

**Replace with API:**

```jsx
useEffect(() => {
  async function fetchRepos() {
    const response = await fetch("/api/repositories", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = await response.json();
    setRepositories(data);
  }
  fetchRepos();
}, []);
```

---

### 3. Repository Connection

**Current (Mock):**

```jsx
const handleConnect = () => {
  if (repoUrl.trim()) {
    setStep("indexing");
    // Simulate indexing...
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setCurrentIndexStep(current);
      if (current >= mockIndexingSteps.length - 1) {
        clearInterval(interval);
      }
    }, 1500);
  }
};
```

**Replace with API:**

```jsx
const handleConnect = async () => {
  if (repoUrl.trim()) {
    setStep("indexing");
    try {
      const response = await fetch("/api/repositories", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: repoUrl,
          branch: branch,
        }),
      });

      const data = await response.json();
      const repositoryId = data.id;

      // Poll for indexing status
      const checkIndexing = setInterval(async () => {
        const statusResponse = await fetch(
          `/api/repositories/${repositoryId}/indexing-status`,
          { headers: { Authorization: `Bearer ${getToken()}` } },
        );
        const status = await statusResponse.json();
        setCurrentIndexStep(status.currentStep);

        if (status.completed) {
          clearInterval(checkIndexing);
          navigate("/repositories");
        }
      }, 2000);
    } catch (err) {
      console.error("Failed to connect repository:", err);
    }
  }
};
```

---

### 4. Chat Messages

**Current (Mock):**

```jsx
const handleSendMessage = (content) => {
  const userMessage = { id: Date.now(), type: "user", content };
  setMessages((prev) => [...prev, userMessage]);
  setIsLoading(true);

  setTimeout(() => {
    const aiMessage = {
      id: Date.now() + 1,
      type: "assistant",
      content: "Based on my analysis...",
      sources: [
        { file: "server/controllers/userController.js", lines: [45, 78] },
      ],
    };
    setMessages((prev) => [...prev, aiMessage]);
    setIsLoading(false);
  }, 1500);
};
```

**Replace with API:**

```jsx
const handleSendMessage = async (content) => {
  const userMessage = { id: Date.now(), type: "user", content };
  setMessages((prev) => [...prev, userMessage]);
  setIsLoading(true);

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        repositoryId: params.id,
        message: content,
      }),
    });

    const data = await response.json();
    const aiMessage = {
      id: Date.now() + 1,
      type: "assistant",
      content: data.response,
      sources: data.sources,
    };
    setMessages((prev) => [...prev, aiMessage]);
  } catch (err) {
    console.error("Failed to send message:", err);
  } finally {
    setIsLoading(false);
  }
};
```

---

### 5. File Tree

**Current (Mock):**

```jsx
import { mockFileTree } from "../data/mockData";

<FileTreeItem item={mockFileTree} />;
```

**Replace with API:**

```jsx
useEffect(() => {
  async function fetchFileTree() {
    const response = await fetch(`/api/repositories/${repoId}/file-tree`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = await response.json();
    setFileTree(data);
  }
  fetchFileTree();
}, [repoId]);

<FileTreeItem item={fileTree} />;
```

---

### 6. Code File Content

**Current (Mock):**

```jsx
import { mockCodeFile } from "../data/mockData";

<CodeViewer file={mockCodeFile} />;
```

**Replace with API:**

```jsx
const handleSourceClick = async (source) => {
  const response = await fetch(
    `/api/repositories/${repoId}/files?path=${source.file}`,
    { headers: { Authorization: `Bearer ${getToken()}` } },
  );
  const data = await response.json();
  setSelectedSource({
    filename: source.file,
    language: "javascript",
    code: data.content,
    highlightedLines: source.lines,
  });
};

<CodeViewer file={selectedSource} />;
```

---

### 7. Chat History

**Current (Mock):**

```jsx
import { mockChatHistory } from "../data/mockData";

{
  mockChatHistory.map((conv) => <ConversationCard key={conv.id} conv={conv} />);
}
```

**Replace with API:**

```jsx
useEffect(() => {
  async function fetchHistory() {
    const response = await fetch("/api/chat-history", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = await response.json();
    setConversations(data);
  }
  fetchHistory();
}, []);

{
  conversations.map((conv) => <ConversationCard key={conv.id} conv={conv} />);
}
```

---

## API Endpoints Required

Create these endpoints in your backend:

### Authentication

- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register user
- `POST /api/auth/logout` - Logout user
- `GET /api/users/me` - Get current user

### Repositories

- `GET /api/repositories` - List user's repositories
- `POST /api/repositories` - Connect new repository
- `GET /api/repositories/:id` - Get repository details
- `DELETE /api/repositories/:id` - Disconnect repository
- `GET /api/repositories/:id/file-tree` - Get file structure
- `GET /api/repositories/:id/indexing-status` - Get indexing progress
- `GET /api/repositories/:id/files?path=...` - Get file content

### Chat

- `POST /api/chat` - Send chat message
- `GET /api/chat-history` - Get conversation history
- `GET /api/chat/:conversationId` - Get specific conversation
- `DELETE /api/chat/:conversationId` - Delete conversation

### Code

- `GET /api/search?query=...&repo=...` - Search codebase
- `GET /api/code-analysis/:id` - Analyze code

---

## Authentication Token Management

Store the JWT token securely:

```javascript
// Save token after login
const token = response.data.token;
localStorage.setItem('auth_token', token);

// Create a helper for API calls
function getToken() {
  return localStorage.getItem('auth_token');
}

// Use in fetch headers
headers: {
  'Authorization': `Bearer ${getToken()}`,
}

// Clear on logout
localStorage.removeItem('auth_token');
```

---

## Error Handling

Wrap API calls with error handling:

```jsx
const handleFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (response.status === 401) {
      // Token expired, redirect to login
      navigate("/login");
      localStorage.removeItem("auth_token");
    }

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};
```

---

## Loading & Error States

Update components to handle loading and error states:

```jsx
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [data, setData] = useState(null);

useEffect(() => {
  async function fetch() {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchData();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  fetch();
}, []);

if (loading) return <LoadingState />;
if (error) return <ErrorState message={error} />;
return <Component data={data} />;
```

---

## Testing with Mock Data

Keep the mock data while developing:

```jsx
// In your API service
const USE_MOCK_DATA = true; // Set to false for production

async function fetchRepositories() {
  if (USE_MOCK_DATA) {
    return mockRepositories;
  }

  const response = await fetch("/api/repositories");
  return response.json();
}
```

---

## Environment Variables

Store API endpoints in `.env`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_USE_MOCK_DATA=false
```

Use in code:

```jsx
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === "true";

async function fetchRepositories() {
  const url = `${API_BASE_URL}/repositories`;
  // ...
}
```

---

**Start replacing mock data gradually, testing each API endpoint as you go!**
