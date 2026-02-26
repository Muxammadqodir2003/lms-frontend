# 🎓 Modern LMS Frontend (Next.js 14+)

This is the interactive and responsive frontend for the Learning Management System, built with **Next.js**. It provides a seamless experience for Students, Instructors, and Admins with real-time updates and dynamic UI components.

---

## 🏗 Project Architecture
The frontend is built using a modern React-based stack, focusing on performance, SEO, and developer experience:

```text
src/
├── app/                # Next.js App Router (Pages & Layouts)
├── components/         # Reusable UI components (Navbar, Sidebar, Cards)
├── hooks/              # Custom React hooks for API and Sockets
├── services/           # API integration logic (Axios/Fetch)
├── store/              # State management (Zustand/Redux)
├── types/              # TypeScript interfaces and types
```

✨ Key Frontend Features
🖥️ Dynamic Dashboards
Admin Dashboard: A real-time control center that listens to WebSocket events. It shows instant Toaster notifications when new instructor requests arrive.

Instructor Studio: A specialized environment for course creation.

Student Portal: Personalized dashboard to track enrolled courses and learning progress.

🏗️ Advanced Course Builder
Drag & Drop Curriculum: Built-in support for reordering course sections and lessons using an intuitive drag-and-drop interface.

Rich Text Editing: Integrated with Quill.js to allow instructors to write formatted descriptions, embed links, and style their content.

Video Player: Custom video integration for a smooth learning experience.

🛡️ Security & Auth Integration
Social Login: Ready-to-use buttons for Google and GitHub OAuth.

Protected Routes: Middleware-level protection to ensure users only access pages authorized for their role.

Smart Error Handling: Friendly UI alerts for security blocks (e.g., notifying the user if they are temporarily blocked due to failed login attempts).

🛠 Tech Stack
Framework: Next.js (App Router)

Styling: Tailwind CSS / Shadcn UI

Real-time: Socket.io-client

State Management: Zustand / Context API

Icons & UI: Lucide React, Framer Motion (for animations)

Rich Text: React-Quill

⚙️ Environment Configuration (.env)
The frontend is configured to communicate with the production API:

Code snippet

NEXT_PUBLIC_API_URL=[https://muhammadqodir.duckdns.org](https://muhammadqodir.duckdns.org)
🚀 Deployment & Production
The frontend is deployed with the following production-grade setup:

Domain: Secured with HTTPS via duckdns.org.

Deployment: Hosted on AWS EC2 (via Docker) or Vercel.

Optimization: Optimized image loading and server-side rendering (SSR) for fast performance.

⚙️ Installation & Setup
Clone the repository:

Bash

git clone [https://github.com/Muxammadqodir2003/lms-frontend.git](https://github.com/Muxammadqodir2003/lms-frontend.git)
cd lms-frontend
Install dependencies:

Bash

npm install
Run the development server:

Bash

npm run dev
Build for production:

Bash

npm run build
npm run start
🤝 Connection with Backend
This frontend is fully compatible with the LMS Backend (NestJS). It handles:

Automatic JWT token injection in requests.

Refresh token logic.

Global error handling for rate limits and security bans.
