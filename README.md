# 🚀 Blog API (Production-Ready Backend)

A secure and scalable REST API built using Node.js, Express, and MongoDB.
This project demonstrates real-world backend development practices including authentication, authorization, CRUD operations, pagination, and search.

---

## 📌 Features

* 🔐 User Authentication (Register & Login)
* 🔑 JWT-based Authorization (Protected Routes)
* ✍️ Create, Update, Delete Posts (Owner Only)
* 📄 Get All Posts with Pagination
* 🔍 Search Posts (Title & Content)
* 👤 Get Posts by User
* 🛡️ Password Hashing using bcrypt
* 🔄 Consistent API Response Structure
* ⚙️ Environment-based Configuration

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JSON Web Token (JWT)
* bcrypt.js

---

## 📂 Project Structure

```
src/
│
├── config/        # Database connection
├── controllers/   # Business logic
├── middleware/    # Authentication middleware
├── models/        # Mongoose schemas
├── routes/        # API routes
├── app.js
└── server.js
```

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-username/blog-api.git
cd blog-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run Server

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

| Method | Endpoint                | Description                         |
| ------ | ----------------------- | ----------------------------------- |
| POST   | /api/posts/createPost   | Create post (Protected)             |
| GET    | /api/posts              | Get all posts (Pagination + Search) |
| GET    | /api/posts/:id          | Get single post                     |
| PUT    | /api/posts/:id          | Update post (Owner only)            |
| DELETE | /api/posts/:id          | Delete post (Owner only)            |

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

Include JWT token in headers:

```
Authorization: Bearer YOUR_TOKEN
```

---

## 📬 Postman Collection

You can import and test all APIs using the provided Postman collection:

```
postman/BlogAPI.postman_collection.json
```

### Steps:

1. Open Postman
2. Click **Import**
3. Select the JSON file
4. Start testing APIs

---

## 🧪 Testing

* Use Postman / Thunder Client
* Token-based authentication required for protected routes

---

## 🚀 Deployment

* Backend: Render / Railway
* Database: MongoDB Atlas

---

## 🔐 Security Improvements

* Prevented SQL Injection using safe queries
* Password hashing using bcrypt
* JWT secret stored in environment variables
* Authorization checks for protected actions
* Proper error handling implemented

---

## 👨‍💻 Author

**Muhammad Adnan**

---

## ⭐ Notes

This project is built as a real-world backend system and demonstrates:

* Clean architecture
* Secure authentication system
* Scalable API design
* Industry-standard practices

---
