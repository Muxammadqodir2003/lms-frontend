# LMS Frontend (Next.js)

Frontend application for a **Learning Management System (LMS)** built with **Next.js and TypeScript**.
This project focuses on clean architecture, authentication flow, and real-world frontend practices.

🚧 **Status:** Work in Progress (actively developed in parallel with backend)

---

## 🚀 Features

### 🔐 Authentication
- Login & Register pages
- JWT-based authentication
- Protected routes
- Role-based UI (Admin / Instructor / Student)
- Forgot password UI flow

### 📚 LMS Functionality
- Course listing
- Course details pages
- Enrollment UI
- User dashboard (in progress)
- API integration with backend

---

## 🛠 Tech Stack

- Next.js
- React
- TypeScript
- REST API
- CSS / ChakraUI

---


---

## ⚙️ Environment Variables

Create a `.env.local` file based on `.env.example`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

▶️ Getting Started
```bash
npm install
npm run dev
