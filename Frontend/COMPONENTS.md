# RepoGPT Component Documentation

## Base Components (`components/common/BaseComponents.jsx`)

### Button

```jsx
<Button variant="primary" size="md">
  Click me
</Button>
```

Props:

- `variant`: "primary" | "secondary" | "ghost" | "danger" (default: "primary")
- `size`: "sm" | "md" | "lg" (default: "md")

### Input

```jsx
<Input type="email" placeholder="Enter email" />
```

All HTML input props are supported.

### Card

```jsx
<Card className="p-6">Content here</Card>
```

Container with styling. Works with any children.

### Badge

```jsx
<Badge variant="success">Status</Badge>
```

Props:

- `variant`: "default" | "success" | "warning" | "error" | "blue"

### Modal

```jsx
<Modal isOpen={open} onClose={() => setOpen(false)} title="Dialog">
  Content here
</Modal>
```

---

## Navigation Components (`components/layout/Navigation.jsx`)

### Navbar

```jsx
<Navbar hideAuthButtons={true} />
```

Top navigation bar with logo, links, and auth buttons.

### Sidebar

```jsx
<Sidebar currentPath={location.pathname} />
```

Left sidebar navigation for authenticated pages.

---

## Utility Components (`components/common/UtilityComponents.jsx`)

### IndexingProgress

```jsx
<IndexingProgress steps={steps} currentStep={currentStep} />
```

Shows progress through indexing steps with animations.

### LoadingState

```jsx
<LoadingState message="Loading..." />
```

Loading spinner with message.

### EmptyState

```jsx
<EmptyState
  icon={MessageSquare}
  title="No messages"
  description="Start a conversation"
  action={<Button>Start</Button>}
/>
```

### SearchBar

```jsx
<SearchBar placeholder="Search..." onSearch={(term) => handleSearch(term)} />
```

### ThemeToggle

```jsx
<ThemeToggle isDark={true} onChange={() => setIsDark(!isDark)} />
```

### UserMenu

```jsx
<UserMenu user={currentUser} onLogout={() => handleLogout()} />
```

---

## Repository Components (`components/repository/RepositoryComponents.jsx`)

### RepositoryCard

```jsx
<RepositoryCard repo={repo} onOpen={() => navigate(`/workspace/${repo.id}`)} />
```

Displays repository information with action buttons.

### FileTreeItem

```jsx
<FileTreeItem
  item={fileItem}
  level={0}
  expanded={expandedFolders["src"]}
  onToggle={(item) => handleToggle(item)}
/>
```

Hierarchical file tree with expand/collapse.

### SourceReference

```jsx
<SourceReference
  source={{ file: "path/to/file.js", lines: [10, 20] }}
  onClick={() => handleSourceClick(source)}
/>
```

Clickable reference to a source file.

### StatsCard

```jsx
<StatsCard icon={BookOpen} label="Repositories" value={3} />
```

Displays a statistic with icon.

---

## Chat Components (`components/chat/ChatComponents.jsx`)

### ChatMessage

```jsx
<ChatMessage
  message={msg}
  onSourceClick={(source) => handleSourceClick(source)}
/>
```

Renders a single message (user or AI) with optional source references.

### ChatWindow

```jsx
<ChatWindow
  messages={messages}
  onSendMessage={(text) => handleSend(text)}
  isLoading={false}
/>
```

Complete chat interface with message history and input.

### SuggestedQuestion

```jsx
<SuggestedQuestion
  question="Explain authentication"
  onClick={() => handleQuestion(question)}
/>
```

Clickable suggested question button.

### CodeViewer

```jsx
<CodeViewer
  file={{
    filename: "app.js",
    code: "console.log(...)",
    highlightedLines: [1, 3],
  }}
  onClose={() => closeViewer()}
/>
```

Syntax-highlighted code viewer with line numbers.

---

## Layout Components (`components/layout/Footer.jsx`)

### Footer

```jsx
<Footer />
```

Footer with links and branding. No props required.

---

## Mock Data (`data/mockData.js`)

### Available Mock Objects

- `mockUser` - Current user object
- `mockRepositories` - Array of repositories
- `mockFileTree` - Nested file/folder structure
- `mockConversations` - Chat history with messages
- `mockChatSuggestions` - Suggested questions
- `mockCodeFile` - Sample code file with highlighting
- `mockIndexingSteps` - Repository indexing steps
- `mockStats` - Dashboard statistics
- `mockChatHistory` - Conversation list

---

## How to Use Components

### Basic Pattern

```jsx
import { Button, Card, Input } from "./components/common/BaseComponents";
import { RepositoryCard } from "./components/repository/RepositoryComponents";
import { ChatWindow } from "./components/chat/ChatComponents";

export default function MyPage() {
  const [data, setData] = useState(null);

  return (
    <div className="space-y-4 p-6">
      <Card>
        <Input type="text" placeholder="Search..." />
        <Button onClick={() => handleSearch()}>Search</Button>
      </Card>

      {data && <RepositoryCard repo={data} />}
    </div>
  );
}
```

### Styling with Tailwind

All components support Tailwind CSS classes:

```jsx
<Button className="w-full md:w-auto">Button</Button>
<Card className="bg-blue-900 p-8">Custom styling</Card>
```

---

## Customizing Components

### Add new Button variant

1. Edit `components/common/BaseComponents.jsx`
2. Add variant to `variants` object:

```jsx
const variants = {
  primary: "...",
  custom: "bg-purple-600 text-white hover:bg-purple-700",
};
```

### Extend Card styling

```jsx
<Card className="hover:shadow-lg border-2 border-blue-500">
  Custom styled card
</Card>
```

---

## Common Patterns

### Loading State

```jsx
{
  isLoading ? <LoadingState /> : <YourComponent />;
}
```

### Empty State

```jsx
{
  items.length === 0 ? <EmptyState icon={Icon} /> : <List items={items} />;
}
```

### Conditional Rendering

```jsx
{
  isOpen && <Modal>...</Modal>;
}
```

### Form with Validation

```jsx
<form onSubmit={handleSubmit}>
  <Input required />
  <Button type="submit">Submit</Button>
</form>
```

---

**For more details, check the component source files in `src/components/`**
