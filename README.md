# 🚀 Blog API (Backend)

A production-ready REST API built using Node.js, Express, and MongoDB.
This project includes authentication, authorization, CRUD operations, pagination, and search.

---

## 📌 Features

* 🔐 User Authentication (Register / Login)
* 🔑 JWT-based Authorization
* ✍️ Create, Update, Delete Posts (Protected)
* 📄 Get All Posts with Pagination
* 🔍 Search Posts (Title & Content)
* 👤 User-specific authorization (only owner can edit/delete)
* 🛡️ Password hashing using bcrypt
* ⚙️ Environment variable configuration

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT (jsonwebtoken)
* bcrypt.js

---

## 📂 Project Structure

```
src/
│
├── config/        # Database connection
├── controllers/   # Business logic
├── middleware/    # Auth middleware
├── models/        # Mongoose schemas
├── routes/        # API routes
├── app.js
└── server.js
```

---

## ⚙️ Installation & Setup

### 1. Clone the repo

```bash
git clone https://github.com/your-username/blog-api.git
cd blog-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

### 4. Run the server

```bash
npm run dev
```

---

## 🔗 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register user |
| POST   | /api/auth/login    | Login user    |

---

### 📝 Post Routes

| Method | Endpoint              | Description                         |
| ------ | --------------------- | ----------------------------------- |
| POST   | /api/posts/createPost | Create post (Protected)             |
| GET    | /api/posts            | Get all posts (Pagination + Search) |
| GET    | /api/posts/:id        | Get single post                     |
| PUT    | /api/posts/:id        | Update post (Owner only)            |
| DELETE | /api/posts/:id        | Delete post (Owner only)            |

---

## 🔍 Pagination Example

```
GET /api/posts?page=1&limit=5
```

---

## 🔎 Search Example

```
GET /api/posts?search=javascript
```

---

## 🔐 Authorization

Add token in headers:

```
Authorization: Bearer YOUR_TOKEN
```

---

## 🧪 Testing

Use Postman / Thunder Client to test APIs.

---

## 🚀 Deployment

* Backend: Render / Railway
* Database: MongoDB Atlas

---

## 👨‍💻 Author

**Muhammad Adnan**

---

## ⭐ Notes

This project demonstrates real-world backend practices:

* Secure authentication
* Protected routes
* Clean API structure
* Error handling

---
