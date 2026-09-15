export const mockUser = {
  id: "1",
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  theme: "dark",
};

export const mockRepositories = [
  {
    id: "1",
    name: "mern-ecommerce",
    owner: "john-dev",
    description: "Full-stack e-commerce platform built with MERN stack",
    language: "JavaScript",
    fileCount: 287,
    lastIndexed: "2024-01-15",
    status: "indexed",
    url: "https://github.com/john-dev/mern-ecommerce",
    branch: "main",
    languages: {
      JavaScript: 45,
      CSS: 20,
      HTML: 15,
      JSON: 10,
      Others: 10,
    },
  },
  {
    id: "2",
    name: "ai-interview-platform",
    owner: "tech-startup",
    description: "Platform for AI-powered technical interviews",
    language: "Python",
    fileCount: 156,
    lastIndexed: "2024-01-18",
    status: "indexed",
    url: "https://github.com/tech-startup/ai-interview-platform",
    branch: "develop",
    languages: {
      Python: 50,
      JavaScript: 25,
      CSS: 15,
      Others: 10,
    },
  },
  {
    id: "3",
    name: "portfolio-website",
    owner: "alex-portfolio",
    description: "Personal portfolio website with Next.js and animations",
    language: "TypeScript",
    fileCount: 89,
    lastIndexed: "2024-01-10",
    status: "indexed",
    url: "https://github.com/alex-portfolio/portfolio-website",
    branch: "main",
    languages: {
      TypeScript: 60,
      CSS: 25,
      Others: 15,
    },
  },
];

export const mockFileTree = {
  name: "mern-ecommerce",
  type: "folder",
  children: [
    {
      name: "client",
      type: "folder",
      children: [
        {
          name: "src",
          type: "folder",
          children: [
            {
              name: "components",
              type: "folder",
              children: [
                { name: "Navbar.jsx", type: "file" },
                { name: "ProductCard.jsx", type: "file" },
                { name: "Cart.jsx", type: "file" },
              ],
            },
            {
              name: "pages",
              type: "folder",
              children: [
                { name: "Home.jsx", type: "file" },
                { name: "Products.jsx", type: "file" },
                { name: "Cart.jsx", type: "file" },
                { name: "Checkout.jsx", type: "file" },
              ],
            },
            {
              name: "hooks",
              type: "folder",
              children: [
                { name: "useCart.js", type: "file" },
                { name: "useAuth.js", type: "file" },
              ],
            },
            { name: "App.jsx", type: "file" },
            { name: "main.jsx", type: "file" },
            { name: "index.css", type: "file" },
          ],
        },
        { name: "package.json", type: "file" },
        { name: "vite.config.js", type: "file" },
      ],
    },
    {
      name: "server",
      type: "folder",
      children: [
        {
          name: "controllers",
          type: "folder",
          children: [
            { name: "userController.js", type: "file" },
            { name: "productController.js", type: "file" },
            { name: "orderController.js", type: "file" },
          ],
        },
        {
          name: "routes",
          type: "folder",
          children: [
            { name: "userRoutes.js", type: "file" },
            { name: "productRoutes.js", type: "file" },
            { name: "orderRoutes.js", type: "file" },
          ],
        },
        {
          name: "models",
          type: "folder",
          children: [
            { name: "User.js", type: "file" },
            { name: "Product.js", type: "file" },
            { name: "Order.js", type: "file" },
          ],
        },
        {
          name: "middleware",
          type: "folder",
          children: [
            { name: "auth.js", type: "file" },
            { name: "errorHandler.js", type: "file" },
          ],
        },
        { name: "server.js", type: "file" },
        { name: "package.json", type: "file" },
      ],
    },
    { name: "README.md", type: "file" },
    { name: "package.json", type: "file" },
    { name: ".gitignore", type: "file" },
    { name: ".env.example", type: "file" },
  ],
};

export const mockConversations = [
  {
    id: "1",
    title: "How does authentication work?",
    repository: "mern-ecommerce",
    lastMessage: "JWT tokens are stored in localStorage after login.",
    date: "2024-01-20",
    messageCount: 8,
    messages: [
      {
        id: "1",
        type: "user",
        content: "How does authentication work in this project?",
      },
      {
        id: "2",
        type: "assistant",
        content:
          "Authentication is implemented using JWT (JSON Web Tokens). Here's how the flow works:\n\n1. User submits credentials (email/password) via the login form\n2. userController.js validates credentials against the MongoDB database\n3. If valid, a JWT token is generated with user data\n4. Token is sent back to the client and stored in localStorage\n5. For protected routes, the auth middleware verifies the token in request headers\n\nThe authentication middleware checks if the token exists and is valid before allowing access to protected endpoints.",
        sources: [
          { file: "server/controllers/userController.js", lines: [45, 78] },
          { file: "server/middleware/auth.js", lines: [1, 35] },
          { file: "server/routes/userRoutes.js", lines: [1, 20] },
        ],
      },
      {
        id: "3",
        type: "user",
        content: "Where is the JWT token stored?",
      },
      {
        id: "4",
        type: "assistant",
        content:
          "The JWT token is stored in localStorage on the client side. You can see this implemented in the login flow where after receiving the token from the server, it's stored using localStorage.setItem(). This allows the token to persist across browser sessions.",
        sources: [{ file: "client/src/pages/Login.jsx", lines: [42, 52] }],
      },
    ],
  },
  {
    id: "2",
    title: "Explain payment architecture",
    repository: "mern-ecommerce",
    lastMessage: "Stripe integration handles payment processing.",
    date: "2024-01-19",
    messageCount: 5,
  },
  {
    id: "3",
    title: "Where is MongoDB connected?",
    repository: "mern-ecommerce",
    lastMessage: "Connection happens in server.js using Mongoose.",
    date: "2024-01-18",
    messageCount: 3,
  },
];

export const mockChatSuggestions = [
  "Explain this project architecture",
  "How does authentication work?",
  "Where is the database connected?",
  "Explain the payment flow",
  "Find potential problems",
  "Where should I add a new feature?",
  "What are the main dependencies?",
  "How does the frontend connect to the backend?",
];

export const mockCodeFile = {
  filename: "server/middleware/auth.js",
  language: "javascript",
  code: `const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = auth;
`,
  highlightedLines: [3, 4, 5],
};

export const mockIndexingSteps = [
  { name: "Fetching repository", status: "completed" },
  { name: "Analyzing files", status: "completed" },
  { name: "Processing code", status: "completed" },
  { name: "Generating embeddings", status: "in-progress" },
  { name: "Building knowledge base", status: "pending" },
  { name: "Ready", status: "pending" },
];

export const mockStats = {
  repositories: 3,
  files: 1284,
  conversations: 27,
  questions: 156,
};

export const mockChatHistory = [
  {
    id: "1",
    title: "Authentication Flow",
    repository: "mern-ecommerce",
    date: "2024-01-20",
    messageCount: 8,
  },
  {
    id: "2",
    title: "Database Schema",
    repository: "mern-ecommerce",
    date: "2024-01-19",
    messageCount: 5,
  },
  {
    id: "3",
    title: "Redux Store Setup",
    repository: "ai-interview-platform",
    date: "2024-01-18",
    messageCount: 12,
  },
  {
    id: "4",
    title: "Error Handling",
    repository: "portfolio-website",
    date: "2024-01-17",
    messageCount: 3,
  },
];
