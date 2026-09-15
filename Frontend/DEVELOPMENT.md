# Development Workflow & Deployment Guide

## Development Workflow

### Starting Development

```bash
# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# The app opens at http://localhost:5173/
```

### Project Structure

```
RepoGpt/
├── src/
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── data/             # Mock data
│   ├── App.jsx           # Main app with routes
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
└── index.html            # HTML entry point
```

---

## Common Development Tasks

### Adding a New Page

1. Create file in `src/pages/MyPage.jsx`:

```jsx
import { useLocation } from "react-router-dom";
import { Sidebar } from "../components/layout/Navigation";

export default function MyPage() {
  const location = useLocation();

  return (
    <div className="flex h-screen">
      <Sidebar currentPath={location.pathname} />
      <div className="flex-1">{/* Your page content */}</div>
    </div>
  );
}
```

2. Add route in `src/App.jsx`:

```jsx
import MyPage from "./pages/MyPage";

<Route path="/my-page" element={<MyPage />} />;
```

### Adding a New Component

1. Create in appropriate folder `src/components/category/MyComponent.jsx`:

```jsx
export const MyComponent = ({ prop1, prop2 }) => {
  return (
    <div>
      {prop1} {prop2}
    </div>
  );
};
```

2. Use in page:

```jsx
import { MyComponent } from "../components/category/MyComponent";

<MyComponent prop1="value1" prop2="value2" />;
```

### Adding New Styles

Use Tailwind classes directly in JSX:

```jsx
<div className="bg-blue-600 text-white px-4 py-2 rounded-lg">
  Styled with Tailwind
</div>
```

Add global styles in `src/index.css`:

```css
@layer components {
  .custom-class {
    @apply bg-gray-900 text-white rounded-lg;
  }
}
```

### Modifying Colors

Edit `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      'primary': '#your-color',
      'secondary': '#your-color',
    }
  }
}
```

---

## Building for Production

### Build Command

```bash
# Build optimized production bundle
npm run build

# Creates dist/ folder with optimized files
```

### Preview Production Build

```bash
# Serve the production build locally
npm run preview

# Opens on http://localhost:5173/ (same as dev)
```

### Check Build Output

```bash
# The dist folder contains:
dist/
├── index.html              # Main HTML file
├── assets/
│   ├── index-[hash].js    # Bundled JavaScript
│   └── index-[hash].css   # Bundled CSS
```

---

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is optimized for Vite/React projects:

1. Install Vercel CLI:

```bash
npm install -g vercel
```

2. Deploy:

```bash
vercel
```

3. Or connect GitHub repo:

- Push to GitHub
- Go to https://vercel.com
- Import GitHub repository
- Vercel automatically deploys on push

### Option 2: Netlify

1. Install Netlify CLI:

```bash
npm install -g netlify-cli
```

2. Build and deploy:

```bash
npm run build
netlify deploy --prod --dir=dist
```

3. Or connect GitHub:

- Push to GitHub
- Connect repo on https://app.netlify.com
- Netlify auto-deploys on push

### Option 3: GitHub Pages

1. Add to `package.json`:

```json
{
  "homepage": "https://yourusername.github.io/repogpt",
  "scripts": {
    "build": "vite build",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

2. Install gh-pages:

```bash
npm install --save-dev gh-pages
```

3. Deploy:

```bash
npm run deploy
```

### Option 4: Self-Hosted (Server/VPS)

1. Build locally:

```bash
npm run build
```

2. Upload `dist/` folder to server:

```bash
scp -r dist/* user@server:/var/www/repogpt/
```

3. Configure web server (Nginx example):

```nginx
server {
    listen 80;
    server_name repogpt.com;
    root /var/www/repogpt;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Option 5: Docker

1. Create `Dockerfile`:

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. Build and run:

```bash
docker build -t repogpt .
docker run -p 80:80 repogpt
```

---

## Environment Variables

### Development (.env.local)

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_USE_MOCK_DATA=true
VITE_APP_NAME=RepoGPT Dev
```

### Production (.env.production)

```env
VITE_API_BASE_URL=https://api.repogpt.com
VITE_USE_MOCK_DATA=false
VITE_APP_NAME=RepoGPT
```

### Use in Code

```javascript
const API_URL = import.meta.env.VITE_API_BASE_URL;
const IS_PRODUCTION = import.meta.env.PROD;
```

---

## Performance Optimization

### Code Splitting (Lazy Loading)

```jsx
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./pages/Dashboard"));

<Suspense fallback={<LoadingState />}>
  <Dashboard />
</Suspense>;
```

### Image Optimization

```jsx
<img src="/image.webp" alt="description" loading="lazy" />
```

### CSS Optimization

Tailwind CSS automatically purges unused styles in production.

---

## Debugging

### Browser DevTools

1. Open DevTools: `F12` or `Ctrl+Shift+I`
2. React DevTools browser extension recommended
3. Network tab shows API calls (when connected)

### Console Logging

```jsx
console.log("Debug:", data);
console.warn("Warning:", issue);
console.error("Error:", error);
```

### React DevTools Extension

Install from:

- Chrome: React Developer Tools
- Firefox: React Developer Tools

### Network Inspection

In DevTools Network tab:

- Check API responses
- See request/response headers
- Test API endpoints

---

## Testing (Future)

### Unit Tests (Example with Vitest)

```bash
npm install -D vitest
```

```jsx
// component.test.jsx
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

test("renders button", () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText("Click me")).toBeInTheDocument();
});
```

Run tests:

```bash
npm run test
```

---

## CI/CD Pipeline (GitHub Actions Example)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Install Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        run: npx vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

---

## Troubleshooting

### Dev Server Issues

```bash
# Port 5173 already in use
npm run dev -- --port 5174

# Clear cache
rm -rf node_modules package-lock.json
npm install

# Restart dev server
npm run dev
```

### Build Errors

```bash
# Clear dist folder
rm -rf dist

# Rebuild
npm run build

# Check for TypeScript errors (if using TS)
npx tsc --noEmit
```

### Memory Issues

```bash
# Increase Node memory
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

---

## Monitoring in Production

### Error Tracking (Sentry Example)

```bash
npm install @sentry/react
```

In `src/main.jsx`:

```jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_DSN_HERE",
  environment: import.meta.env.VITE_ENVIRONMENT,
});
```

### Analytics (Google Analytics Example)

```bash
npm install react-ga4
```

In `src/main.jsx`:

```jsx
import ReactGA from "react-ga4";

ReactGA.initialize("GA_TRACKING_ID");
```

---

## Version Control

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push to GitHub
git push origin feature/my-feature

# Create Pull Request on GitHub
```

### Commit Message Format

```
feat: add new feature
fix: fix bug
docs: update documentation
style: format code
refactor: refactor code
perf: improve performance
test: add tests
```

---

## Useful Commands Summary

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Code quality
npm run lint             # Lint code (if configured)
npm run format           # Format code (if configured)

# Dependencies
npm install              # Install all dependencies
npm update               # Update dependencies
npm outdated             # Show outdated packages
```

---

## Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel Deployment](https://vercel.com/docs)
- [Netlify Deployment](https://docs.netlify.com/)

---

**Happy coding! 🚀**
