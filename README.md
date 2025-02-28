# Blog Publishing Platform

## 🚀 Project Overview
This is a **blog publishing platform** built with **Next.js** (frontend) and **Strapi** (backend). The platform allows creators to publish blogs, while admins review and approve them. It includes role-based access, SEO-friendly metadata, and user interaction features like comments and likes.

## 📌 Features
- **User Authentication** (Login & Register)
- **Role-Based Access**
  - **Creators**: Create blogs.
  - **Admins**: Approve blogs and comments.
- **Versioning System**: Editing a blog creates a new version instead of modifying the original.
- **SEO Optimized Metadata**
- **Guest Interactions**
  - **Commenting & Liking** (without login, but admin approval required for comments)
- **Fully Responsive UI**

## 🛠️ Tech Stack
### Frontend:
- **Next.js** (TypeScript)
- **Axios** (API calls)
- **React Hook Form** (Form handling)
- **React Toastify** (Notifications)

### Backend:
- **Strapi.js** (Headless CMS)
- **PostgreSQL / SQLite** (Database)
- **JWT Authentication**
- **Role & Permission Management**

## 📂 Project Structure
```
📦 blog-frontend
 ┣ 📂 components
 ┃ ┣ 📜 Navbar.tsx
 ┃ ┣ 📜 Footer.tsx
 ┃ ┣ 📜 BlogCard.tsx
 ┣ 📂 pages
 ┃ ┣ 📜 index.tsx
 ┃ ┣ 📜 login.tsx
 ┃ ┣ 📜 register.tsx
 ┃ ┣ 📜 blog.tsx
 ┃ ┣ 📜 dashboard.tsx
 ┃ ┣ 📜 [id].tsx  (Blog Details)
 ┣ 📂 services
 ┃ ┣ 📜 api.ts
 ┣ 📂 context
 ┃ ┣ 📜 AuthContext.tsx
 ┣ 📂 types
 ┃ ┣ 📜 blog.ts
 ┃ ┣ 📜 user.ts
 ┣ 📂 utils
 ┃ ┣ 📜 auth.ts
 ┣ 📜 .env.local
 ┣ 📜 next.config.js
 ┣ 📜 package.json
 ┗ 📜 tsconfig.json
```

## 🔧 Setup & Installation
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Gurdeep75way/Next-Strapi-JS.git
cd backend
```

### 2️⃣ Backend (Strapi Setup)
```sh
cd backend
npm install
npm run develop
```

- **Admin Dashboard:** `http://localhost:1337/admin`
- **API Endpoint:** `http://localhost:1337/api`

### 3️⃣ Frontend (Next.js Setup)
```sh
cd frontend
npm install
npm run dev
```
- **Frontend URL:** `http://localhost:3000`

### 4️⃣ Environment Variables
Create a `.env.local` file in the frontend:
```sh
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_TOKEN=API_TOKEN
NEXT_PUBLIC_API_URL=http://localhost:1337/api
```

## 📌 API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/auth/local/register` | Register a new user |
| POST | `/api/auth/local` | User login |
| GET | `/api/blogs` | Fetch all blogs |
| POST | `/api/blogs` | Create a new blog (Creator) |
| PUT | `/api/blogs/:id` | Edit a blog (Creates a new version) |
| PUT | `/api/blogs/:id/approve` | Approve a blog (Admin) |
| POST | `/api/comments` | Post a comment (Guest) |
| PUT | `/api/comments/:id/approve` | Approve a comment (Admin) |

## ✨ Future Improvements
- **Search & Filter Blogs**
- **User Profiles**
- **Dark Mode UI**
- **Social Media Sharing**

## 📜 License
This project is **open-source** under the **MIT License**.

## 🤝 Contributing
Pull requests are welcome! Feel free to improve the project.

---

> **Author:** Gurdeep Singh  
> **GitHub:** [yourgithub](https://github.com/Gurdeep75way)  
