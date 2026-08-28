<div align="center">

# 📝 Notebook App

### Full-Stack Personal Notes Management Application

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](#)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)](#)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](#)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)](#)
[![Deployed on Render](https://img.shields.io/badge/Deployed-Render-46E3B7?style=flat-square&logo=render&logoColor=white)](#)

</div>

<br/>

The **Notebook App** is a full-stack web application that lets users create, manage, and organize personal notes through a secure web interface. It's built on a **Node.js** and **Express.js** backend with **MongoDB** for data persistence, and uses **JWT-based authentication** to keep each user's notes private and protected.

<br/>

## ✨ Features

| | |
|---|---|
| 🔐 User authentication | 🪪 JWT-based authorization |
| 📝 Create notes | 📖 View notes |
| ✏️ Update notes | 🗑️ Delete notes |
| 👤 User-specific note management | 🔌 REST API |
| 🗄️ MongoDB data persistence | |

<br/>

## 🛠️ Technologies

| Technology | Purpose |
|---|---|
| **Node.js** | Backend runtime |
| **Express.js** | Server and REST API |
| **MongoDB** | Database |
| **JavaScript** | Application logic |
| **JWT** | Authentication and authorization |

<br/>

## 🏗️ Architecture

```text
                    User
                     │
                     ▼
             Web Application
                     │
                REST API
                     ▼
             ┌───────────────┐
             │  Express.js   │
             ├───────────────┤
             │ Auth  → JWT   │
             │ Notes → CRUD  │
             └───────┬───────┘
                     ▼
                MongoDB
```

<br/>

## 🔐 Authentication

The application uses JWT-based authentication to identify authenticated users and protect note-related operations:

```text
Register / Login → Authentication → JWT Token
     → Protected API → User's Notes
```

<br/>

## 🗄️ CRUD Operations

The application supports the fundamental CRUD operations:

| Operation | Function |
|---|---|
| **Create** | Add a new note |
| **Read** | Retrieve notes |
| **Update** | Modify an existing note |
| **Delete** | Remove a note |

<br/>

## 🚀 Getting Started

**1. Clone the repository**
```bash
git clone https://github.com/janrelle24/note.git
```

**2. Install dependencies**
```bash
npm install
```

**3. Configure environment variables**

Create a `.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> ⚠️ **Never commit `.env` files or secret credentials to GitHub.**

**4. Run the application**
```bash
npm start
```

For development:
```bash
npm run dev
```

<br/>

## ☁️ Deployment

The Notebook App backend is deployed on **Render**, with **MongoDB** used for persistent storage.

<br/>

## 🎯 Project Highlights

This project demonstrates practical experience in:

- Backend development
- REST API development
- MongoDB database design
- CRUD operations
- JWT authentication & authorization
- User-specific data management
- Environment configuration
- Backend deployment

<br/>

## 🔮 Future Improvements

- [ ] Note search
- [ ] Note categories and tags
- [ ] Rich-text editing
- [ ] Note archiving
- [ ] Password recovery
- [ ] Improved validation
- [ ] Automated testing

<br/>

## 👨‍💻 Author

**Janrelle L. Lubiano**
Computer Science Graduate · Full-Stack Developer
Backend Development · AI Applications
📍 Philippines

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/janrelle24)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](www.linkedin.com/in/janrelle-lubiano-69074b222)

<br/>

<div align="center">

⭐ If you find this project useful, consider giving the repository a star.

</div>
