# RepoGPT - AI Codebase Assistant Frontend

A premium, modern developer SaaS interface for understanding codebases with AI.

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ (should already be installed)
- npm

### Installation & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# The app will open at http://localhost:5173/
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── assets/              # Images, SVGs, etc.
├── components/          # Reusable React components
│   ├── common/         # Base components (Button, Input, Card, etc.)
│   ├── layout/         # Layout components (Navbar, Sidebar, Footer)
│   ├── repository/     # Repository-related components
│   └── chat/           # Chat-related components
├── pages/              # Page components (one per route)
│   ├── Landing.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── Repositories.jsx
│   ├── ConnectRepository.jsx
│   ├── Workspace.jsx
│   ├── CodeExplorer.jsx
│   ├── ChatHistory.jsx
│   └── Settings.jsx
├── data/               # Mock data
│   └── mockData.js
├── App.jsx             # Main app with routing
├── main.jsx            # Entry point
└── index.css           # Global styles & Tailwind
```

---

## 🎨 Design System

### Colors

- **Background**: Dark theme (#0a0a0a, #050505, #1a1a1a)
- **Primary**: Blue (#2563eb)
- **Text**: Gray scale (100-900)
- **Accents**: Green (success), Yellow (warning), Red (danger)

### Components Used

- React Router for navigation
- Lucide React for icons
- Tailwind CSS for styling
- Clsx for conditional classes

---

## 📱 Pages & Routes

| Page               | Route                         | Description                    |
| ------------------ | ----------------------------- | ------------------------------ |
| Landing            | `/`                           | Homepage with features and CTA |
| Login              | `/login`                      | User authentication            |
| Register           | `/register`                   | New user registration          |
| Dashboard          | `/dashboard`                  | Main dashboard with stats      |
| Repositories       | `/repositories`               | List all repositories          |
| Connect Repository | `/repositories/connect`       | Add new repository             |
| Workspace          | `/repositories/:id/workspace` | IDE-like chat interface        |
| Code Explorer      | `/repositories/:id/code`      | File browser & code viewer     |
| Chat History       | `/chat`                       | Previous conversations         |
| Settings           | `/settings`                   | User settings & preferences    |

---

## 🔧 Technology Stack

- **React 18** - UI library
- **Vite 5** - Build tool & dev server
- **React Router 6** - Client-side routing
- **Tailwind CSS 3** - Utility-first CSS
- **Lucide React** - Icon library
- **Clsx** - Conditional classnames

---

## 📦 Dependencies

All dependencies are in `package.json`:

- `react` & `react-dom` - React framework
- `react-router-dom` - Routing
- `lucide-react` - Icon library
- `clsx` - Class name utilities
- `tailwindcss` - CSS framework
- `postcss` & `autoprefixer` - CSS processing

Development dependencies:

- `vite` - Build tool
- `@vitejs/plugin-react` - React integration
- `tailwindcss` & `postcss` - Tailwind setup

---

## 🎯 Features Implemented

✅ Landing page with hero, features, and CTA
✅ Authentication pages (Login & Register)
✅ Dashboard with statistics and quick actions
✅ Repository management (list, search, connect)
✅ IDE-like workspace with:

- File explorer (expandable folders)
- AI chat interface with mock responses
- Code viewer with syntax highlighting
- Source reference tracking
  ✅ Code explorer for browsing repository files
  ✅ Chat history management
  ✅ Settings with tabs (Profile, GitHub, Appearance, AI Preferences)
  ✅ Responsive design (Desktop, Tablet, Mobile)
  ✅ Dark theme with professional styling
  ✅ Reusable components throughout

---

## 🔌 Ready for Backend Integration

The frontend is structured to connect to a MERN + RAG + LLM backend:

1. **Authentication**: Login/Register pages ready for API calls
2. **Repository Management**: Connect endpoint ready for GitHub integration
3. **Chat System**: Mock responses can be replaced with API calls
4. **File Explorer**: Mock data can be replaced with repository data
5. **Code Viewer**: Ready to display actual file contents from backend

Replace mock data calls with actual API endpoints:

```javascript
// Example: Replace mock responses
// Before:
const messages = mockConversations[0]?.messages;

// After:
const { data: messages } = await fetchChatMessages(conversationId);
```

---

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to change the color scheme.

### Fonts

The app uses system fonts. To add custom fonts:

1. Add font imports to `src/index.css`
2. Update `tailwind.config.js` font family

### Icons

All icons are from Lucide React. Browse available icons at:
https://lucide.dev

---

## 🐛 Troubleshooting

### Port 5173 already in use?

```bash
npm run dev -- --port 5174
```

### Build errors?

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Hot reload not working?

Restart the dev server:

```bash
npm run dev
```

---

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)

---

## 📝 Notes

- All authentication is mocked (use mock login for demo)
- All API calls are mocked with sample data
- GitHub integration is not implemented (ready for backend)
- LLM and RAG features are not implemented (ready for backend)
- No real code analysis or embeddings (ready for backend)

---

## ✨ Next Steps for Backend Integration

1. Create authentication API endpoints
2. Implement GitHub OAuth/token connection
3. Create repository indexing/chunking pipeline
4. Set up vector database for embeddings
5. Integrate LLM for AI responses
6. Connect RAG retrieval system
7. Update frontend API calls to use real endpoints

---

## 📄 License

MIT License - Feel free to use for your project.

---

**Built with ❤️ for developers**
