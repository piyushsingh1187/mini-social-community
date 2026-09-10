# Mini Social Community

A simple full-stack **MERN Social/Community Application** built to revise and practice core MERN stack concepts such as authentication, authorization, REST APIs, CRUD operations, React state management, Context API, React Router, MongoDB/Mongoose, JWT cookies, likes, and comments.

## 🚀 Live Demo

**[Visit Mini Social Community](https://mini-social-community-izixzcvj2-piyush1187.vercel.app)**

---

## 📌 Features

### Authentication

* User registration
* User login/logout
* JWT-based authentication
* HTTP-only cookies
* Persistent authentication using `/auth/me`

### Posts

* Create posts
* View all posts
* View individual posts
* Edit your own posts
* Delete your own posts
* Admin can delete any post

### Likes

* Like posts
* Unlike posts
* Single toggle API for like/unlike

### Comments

* Add comments to posts
* Delete your own comments
* Admin can delete any comment

### Authorization

* User-based ownership authorization
* Admin role authorization
* Backend-enforced permissions

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* React Router
* Axios
* Context API
* JavaScript
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Cookie Parser
* CORS
* dotenv

### Deployment

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas

---

## 📂 Project Structure

```text
mini-social-community/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── PostCard.jsx
│   │   │   └── PostForm.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── PostDetails.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── models/
│   │   ├── User.js
│   │   ├── Post.js
│   │   └── Comment.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── posts.js
│   │   └── comments.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── postController.js
│   │   └── commentController.js
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── app.js
│   └── server.js
│
└── README.md
```

---

## 🔐 Authentication Flow

```text
React Login Form
       ↓
Axios
       ↓
POST /api/auth/login
       ↓
Express Route
       ↓
Authentication Controller
       ↓
Find User in MongoDB
       ↓
bcrypt.compare()
       ↓
Generate JWT
       ↓
HTTP-only Cookie
       ↓
Response
       ↓
React AuthContext
```

When the application starts:

```text
React
  ↓
GET /api/auth/me
  ↓
JWT Cookie
  ↓
Auth Middleware
  ↓
Verify JWT
  ↓
Find User
  ↓
Return User
  ↓
AuthContext
```

---

## 🔄 MERN Request Flow

For example, when creating a post:

```text
React PostForm
      ↓
onSubmit()
      ↓
Axios POST request
      ↓
Express Route
      ↓
Authentication Middleware
      ↓
Post Controller
      ↓
Mongoose
      ↓
MongoDB
      ↓
JSON Response
      ↓
React
      ↓
Update State
      ↓
UI Re-render
```

---

## 🌐 API Endpoints

### Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |
| POST   | `/api/auth/logout`   | Logout user         |
| GET    | `/api/auth/me`       | Get current user    |

### Posts

| Method | Endpoint              | Description        |
| ------ | --------------------- | ------------------ |
| GET    | `/api/posts`          | Get all posts      |
| GET    | `/api/posts/:id`      | Get a single post  |
| POST   | `/api/posts`          | Create a post      |
| PUT    | `/api/posts/:id`      | Update a post      |
| DELETE | `/api/posts/:id`      | Delete a post      |
| POST   | `/api/posts/:id/like` | Like/unlike a post |

### Comments

| Method | Endpoint                      | Description      |
| ------ | ----------------------------- | ---------------- |
| POST   | `/api/posts/:postId/comments` | Add a comment    |
| DELETE | `/api/comments/:id`           | Delete a comment |

---

## ⚙️ Environment Variables

### Backend

Create `server/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

### Frontend

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

> Do not commit `.env` files or secrets to GitHub.

---

## 💻 Run Locally

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd mini-social-community
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Configure backend environment variables

Create:

```text
server/.env
```

and add your MongoDB URI and JWT secret.

### 4. Start the backend

```bash
npm run dev
```

or:

```bash
npm start
```

### 5. Install frontend dependencies

Open another terminal:

```bash
cd client
npm install
```

### 6. Configure frontend environment variables

Create:

```text
client/.env
```

```env
VITE_API_URL=http://localhost:5000/api
```

### 7. Start the frontend

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

---

## 🧠 Concepts Practiced

This project was built primarily as a **MERN revision project**.

### JavaScript

* Async/await
* Promises
* Destructuring
* Spread operator
* Array methods
* ES modules
* try/catch

### React

* Components
* Props
* State
* `useState`
* `useEffect`
* `useContext`
* Controlled forms
* Conditional rendering
* Lists and keys
* React Router
* Re-rendering

### Node.js / Express

* Express routes
* Controllers
* Middleware
* Request/Response
* `req.params`
* `req.body`
* HTTP status codes
* Error handling
* CORS

### MongoDB / Mongoose

* Database
* Collections
* Documents
* ObjectId
* Schemas
* Models
* CRUD operations
* References
* `populate()`

### Authentication & Authorization

* bcrypt
* JWT
* HTTP-only cookies
* Authentication
* Authorization
* Role-based authorization
* Resource ownership
* CORS

---

## 🎯 Project Goal

The main goal of this project was not to build a production-scale social network.

The goal was to understand the complete **MERN application flow**:

```text
React
  ↓
Axios / HTTP
  ↓
Express
  ↓
Middleware
  ↓
Controller
  ↓
Mongoose
  ↓
MongoDB
  ↓
JSON Response
  ↓
React
  ↓
State Update
  ↓
UI Re-render
```

---

## 👨‍💻 Author

**Piyush Singh**

Built as a hands-on MERN Stack revision project.

---

## ⭐ Live Project

**[Open the Live Application →](https://mini-social-community-izixzcvj2-piyush1187.vercel.app)**
