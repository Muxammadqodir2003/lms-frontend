# 🎓 LMS Frontend - Modern Learning Management System

> A professional, fully-featured Learning Management System frontend built with **Next.js 16**, **React 19**, and **TypeScript**. Delivers seamless experience for Students, Instructors, and Administrators with real-time updates via WebSocket integration.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Usage & Scripts](#-usage--scripts)
- [Project Structure](#-project-structure)
- [API Integration](#-api-integration)
- [Real-time Features](#-real-time-features)
- [Authentication & Security](#-authentication--security)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🎯 Core Features

- **Multi-Role Dashboard System**
  - **Admin Dashboard**: Real-time control center with WebSocket event listeners for instructor requests
  - **Instructor Studio**: Comprehensive course creation and management environment
  - **Student Portal**: Personalized learning dashboard with enrolled courses and progress tracking

- **🏗️ Advanced Course Builder**
  - Drag-and-drop curriculum management for reordering sections and lessons
  - Rich text editing powered by **Quill.js** with formatting support
  - Media embedding and styling capabilities
  - Hierarchical course structure (Sections → Lessons → Content)

- **📱 Responsive & Modern UI**
  - Built with **Chakra UI** for consistent, accessible components
  - **SCSS** styling for custom design patterns
  - Mobile-first responsive design
  - Dark/Light theme support via **next-themes**

- **🔐 Security & Authentication**
  - Social login integration (Google OAuth, GitHub OAuth)
  - JWT token management with automatic refresh token logic
  - Protected routes with role-based access control (RBAC)
  - Rate limiting and security ban handling
  - Secure authentication middleware

- **🔄 Real-time Communication**
  - **Socket.io** integration for live notifications
  - Instant toaster notifications for system events
  - Real-time data synchronization across clients
  - WebSocket event handling for admin monitoring

- **🛠️ Developer-Friendly**
  - TypeScript strict mode for type safety
  - ESLint configuration for code quality
  - Hot module replacement (HMR) during development
  - Optimized image loading with Next.js Image component
  - Server-side rendering (SSR) for performance

---

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16.0.8 (App Router) |
| **Runtime** | React 19.2.1 with React DOM 19.2.1 |
| **Language** | TypeScript 5+ |
| **Styling** | SCSS (3.9%), Chakra UI, TailwindCSS |
| **UI Components** | Chakra UI, Radix UI, Lucide Icons, React Icons |
| **State Management** | Zustand, Redux Toolkit, Context API |
| **Real-time** | Socket.io-client 4.8.3 |
| **Rich Text** | Quill 2.0.3, Tiptap 3.19.0 |
| **HTTP Client** | Axios 1.13.2 |
| **Form Validation** | Formik, Yup |
| **Utilities** | date-fns, lodash.throttle, html-react-parser, dompurify |
| **Drag & Drop** | @dnd-kit (sortable, utilities) |
| **Dev Tools** | ESLint 9, Node 20, Sass 1.97.3 |

### Language Composition
- **TypeScript**: 95.8%
- **SCSS**: 3.9%
- **Other**: 0.3%

---

## 🏗 Project Architecture

The frontend follows modern React architecture patterns with clear separation of concerns:

```
lms-frontend/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout wrapper
│   ├── page.tsx             # Landing/Home page
│   ├── dashboard/           # Dashboard routes (admin, instructor, student)
│   ├── courses/             # Course management pages
│   ├── auth/                # Authentication pages
│   ├── api/                 # API route handlers (if used)
│   └── ...                  # Other route segments
│
├── components/              # Reusable React components
│   ├── Navbar/              # Navigation bar
│   ├── Sidebar/             # Sidebar navigation
│   ├── CourseBuilder/       # Course creation components
│   ├── Dashboard/           # Dashboard-specific components
│   ├── Cards/               # Reusable card components
│   ├── Forms/               # Form components
│   └── ...                  # Additional components
│
├── hooks/                   # Custom React hooks
│   ├── useApi.ts           # API request hook
│   ├── useSocket.ts        # WebSocket hook
│   ├── useAuth.ts          # Authentication hook
│   └── ...                 # Other custom hooks
│
├── services/                # API integration & business logic
│   ├── api/                # API client configuration
│   ├── auth.ts             # Authentication service
│   ├── courses.ts          # Course API service
│   ├── users.ts            # User API service
│   └── ...                 # Other services
│
├── store/                   # State management
│   ├── useAuthStore.ts     # Auth store (Zustand/Redux)
│   ├── useCourseStore.ts   # Course store
│   ├── useUIStore.ts       # UI state store
│   └── ...                 # Other stores
│
├── types/                   # TypeScript types & interfaces
│   ├── index.ts            # Type exports
│   ├── models/             # Data models
│   ├── api.ts              # API response types
│   └── ...                 # Other type definitions
│
├── styles/                  # Global styles
│   ├── globals.scss        # Global stylesheet
│   ├── variables.scss      # CSS variables
│   └── ...                 # Component styles
│
├── lib/                     # Utility functions & helpers
│   ├── axiosInstance.ts    # Configured Axios client
│   ├── validators.ts       # Validation helpers
│   ├── formatters.ts       # Data formatters
│   └── ...                 # Other utilities
│
├── public/                  # Static assets
│   ├── images/             # Image assets
│   ├── icons/              # Icon assets
│   └── ...                 # Other static files
│
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── eslint.config.mjs       # ESLint configuration
├── package.json            # Project dependencies
└── scss.d.ts               # SCSS type definitions
```

---

## 💻 Installation & Setup

### Prerequisites
- **Node.js** 18+ or higher
- **npm** 9+ or **yarn** 8+
- **Git** for version control

### Step 1: Clone the Repository
```bash
git clone https://github.com/Muxammadqodir2003/lms-frontend.git
cd lms-frontend
```

### Step 2: Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### Step 3: Configure Environment Variables
Create a `.env.local` file in the root directory (see [Environment Variables](#-environment-variables) section).

### Step 4: Run Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at **`http://localhost:3000`**

### Step 5: Build for Production
```bash
npm run build
npm run start
```

---

## 🔧 Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://muhammadqodir.duckdns.org
NEXT_PUBLIC_API_BASE_URL=https://muhammadqodir.duckdns.org

# WebSocket Configuration
NEXT_PUBLIC_SOCKET_URL=https://muhammadqodir.duckdns.org

# OAuth Configuration (Optional)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id

# Storage Configuration
NEXT_PUBLIC_SUPABASE_URL=https://oexxjgoquntwjxvtzbaw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# Other configurations
NEXT_PUBLIC_APP_NAME=LMS Frontend
NODE_ENV=development
```

### Important Notes:
- **`NEXT_PUBLIC_*`** variables are exposed to the browser (safe for public values)
- Update API URLs according to your backend deployment
- Store sensitive keys in `.env.local` (never commit to version control)

---

## 📦 Usage & Scripts

Available npm scripts:

| Command | Description |
|---------|------------|
| `npm run dev` | Start development server with Webpack (port 3000) |
| `npm run build` | Create optimized production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint to check code quality |

### Development Workflow

```bash
# 1. Start dev server
npm run dev

# 2. Make code changes
# 3. Changes hot reload automatically (HMR)

# 4. Run linting before committing
npm run lint

# 5. Build and test production build
npm run build
npm run start
```

---

## 📁 Project Structure

### Key Directories Explained

#### `/app` - Next.js App Router
Contains all route segments and layouts. Each folder represents a route.
- Pages use `page.tsx`
- Shared layouts use `layout.tsx`
- API routes in `api/` directory

#### `/components` - Reusable UI Components
All React components that are reused across pages:
- **Navbar**: Top navigation component
- **Sidebar**: Side navigation with role-based links
- **CourseBuilder**: Drag-drop course editor
- **Dashboard**: Role-specific dashboard layouts

#### `/hooks` - Custom React Hooks
Encapsulates component logic:
- **useApi()**: Handle HTTP requests with loading/error states
- **useSocket()**: Manage WebSocket connections
- **useAuth()**: Access authentication state

#### `/services` - API Integration Layer
Centralized API communication:
- API client configuration (Axios instance with interceptors)
- Request/response transformation
- Error handling

#### `/store` - State Management
Global application state:
- **Zustand stores** for lightweight state
- **Redux slices** for complex state
- Context providers for theme/UI state

#### `/types` - TypeScript Definitions
All TypeScript interfaces and types:
- API response models
- Component prop types
- Domain models (User, Course, Lesson, etc.)

#### `/styles` - Global Styling
SCSS stylesheets for global styles and CSS variables.

---

## 🔌 API Integration

### HTTP Client Configuration

The frontend uses **Axios** with interceptors for:
- Automatic JWT token injection in headers
- Refresh token logic on 401 responses
- Global error handling
- Request/response interceptors

### Example API Service

```typescript
// services/api/courses.ts
import axiosInstance from '@/lib/axiosInstance';

export const coursesAPI = {
  getAll: async (page = 1, limit = 10) => {
    const response = await axiosInstance.get('/courses', {
      params: { page, limit }
    });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await axiosInstance.get(`/courses/${id}`);
    return response.data;
  },

  create: async (courseData) => {
    const response = await axiosInstance.post('/courses', courseData);
    return response.data;
  }
};
```

### Backend Compatibility

This frontend is fully compatible with **NestJS LMS Backend**:
- RESTful API endpoints
- JWT authentication
- Real-time WebSocket support
- CORS configuration

---

## ⚡ Real-time Features

### Socket.io Integration

WebSocket connection for real-time updates:

```typescript
// hooks/useSocket.ts
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const useSocket = () => {
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('newInstructorRequest', (data) => {
      // Handle new instructor requests
    });

    return () => socket.disconnect();
  }, []);
};
```

### Real-time Event Types
- **Instructor Requests**: Admins receive notifications for new instructor applications
- **Course Updates**: Real-time course content changes
- **User Status**: Online/offline user indicators
- **Chat Messages**: Live messaging between users

---

## 🔐 Authentication & Security

### Authentication Flow

1. **Login**: User submits credentials or uses OAuth
2. **Token Generation**: Backend returns JWT + Refresh Token
3. **Token Storage**: Securely stored in HTTP-only cookies (or localStorage)
4. **Protected Routes**: Middleware checks authentication before rendering
5. **Token Refresh**: Automatic refresh when JWT expires
6. **Logout**: Clear tokens and redirect to login

### Security Features

- ✅ **JWT Authentication**: Stateless, secure token-based auth
- ✅ **Refresh Token Rotation**: Automatic token refresh on expiry
- ✅ **Protected Routes**: Middleware-level route protection
- ✅ **Role-Based Access**: Different UI/features per user role
- ✅ **HTTPS Only**: All API calls use HTTPS
- ✅ **CSRF Protection**: Built-in Next.js security headers
- ✅ **XSS Prevention**: Input sanitization with dompurify
- ✅ **Rate Limiting**: Backend rate limits on sensitive endpoints
- ✅ **Security Bans**: Temporary bans for repeated failed attempts

---

## 🚀 Deployment

### Deployment Platform: **Vercel**

The application is optimized for Vercel deployment:

#### Production Features
- **Domain**: https://lms-frontend-one-wine.vercel.app
- **Secure HTTPS**: Enabled by default
- **DuckDNS Domain**: Custom domain via duckdns.org
- **Environment Variables**: Configured in Vercel dashboard
- **Auto-deployments**: Deploy on push to main branch

#### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

#### Performance Optimizations
- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic code splitting per route
- **SSR**: Server-side rendering for initial page load speed
- **Caching**: Browser and CDN caching configured

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards
- Follow TypeScript strict mode
- Run ESLint before committing: `npm run lint`
- Write clear commit messages
- Add comments for complex logic
- Test your changes

---

## 📄 License

This project is licensed under the **MIT License**. See the LICENSE file for details.

---

## 📞 Support & Contact

- **Repository**: https://github.com/Muxammadqodir2003/lms-frontend
- **Live Demo**: https://lms-frontend-one-wine.vercel.app
- **Issues**: Report bugs on [GitHub Issues](https://github.com/Muxammadqodir2003/lms-frontend/issues)

---

## 🎯 Roadmap & Future Features

- [ ] Advanced course analytics dashboard
- [ ] Video streaming integration
- [ ] Quiz and assessment system
- [ ] Certificate generation
- [ ] Discussion forums
- [ ] Email notification system
- [ ] Mobile app version
- [ ] AI-powered course recommendations

---

## 📊 Project Metrics

- **Last Updated**: February 26, 2026
- **Total Commits**: Ongoing development
- **Active Contributors**: 1
- **Repository Size**: ~7.2 MB
- **Dependencies**: 30+ production, 4 dev
- **TypeScript Coverage**: 95.8%

---

## 🙏 Acknowledgments

Built with ❤️ using modern web technologies. Special thanks to:
- [Next.js](https://nextjs.org/) - React framework
- [Chakra UI](https://chakra-ui.com/) - Component library
- [Vercel](https://vercel.com/) - Deployment platform
- [Socket.io](https://socket.io/) - Real-time communication
- All open-source contributors

---

**Made by Muxammadqodir2003** | [GitHub](https://github.com/Muxammadqodir2003)