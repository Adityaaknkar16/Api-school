# 🧪 API Playground (MongoDB Atlas Edition)

API Playground is a complete, production-ready, security-hardened browser-based environment where developers (freshers and experienced) can practice REST API and CRUD operations in the browser without installing anything locally.

Think of it as **"LeetCode for APIs & CRUD"**.

---

## 🚀 Key Features
- **Zero Local Installs**: Users pick a language, see ready-to-run API examples, execute them in the browser, and see actual responses in real-time.
- **Support for Multiple Languages**: JavaScript (Runnable in browser), Python, PHP, Java (Syntax-highlighted reference templates).
- **Interactive Code Editor**: Monaco Editor (VS Code themed) embedded.
- **60 Code Templates**: Combinations of 3 datasets (Students, Courses, Teachers) × 4 languages × 5 operations (GET ALL, GET ONE, POST, PUT, DELETE).
- **Security-Hardened Design**: Includes Helmet, CORS lockouts, Express Rate Limiting, request body constraints, input sanitation (XSS, HPP, Mongo-Sanitize), database security, and parameterized SQL queries.
- **Progress Tracking**: Tracks operation completions (GET ALL, GET ONE, POST, PUT, DELETE) inside the browser's `localStorage` with a progress bar and checklists.
- **Automated Database Seeding & Recovery**: Fully seeded database with 50 students, 8 courses, and 10 teachers. Database has a secure `/api/reset` rate-limited endpoint to restore data to original state.

---

## 🗂 Project Structure
```
api-playground/
├── .env                          ← Never commit (ignored)
├── .env.example                  ← Safe configuration reference
├── .gitignore
├── docker-compose.yml            ← Multi-container startup config
├── nginx.conf                    ← SSL & Security proxies
├── deploy.sh                     ← PM2 & static folder automation
├── README.md
│
├── backend/
│   ├── server.js                 ← Main Express entry with secure middlewares
│   ├── database.js               ← MongoDB connection using Mongoose
│   ├── Dockerfile
│   ├── package.json
│   ├── models/                   ← Mongoose Data Models
│   │   ├── Student.js
│   │   ├── Course.js
│   │   └── Teacher.js
│   ├── routes/
│   │   ├── students.js           ← Students endpoint controllers
│   │   ├── courses.js            ← Courses endpoint controllers
│   │   └── teachers.js           ← Teachers endpoint controllers
│   ├── middleware/
│   │   ├── validate.js           ← express-validator schemas
│   │   └── errorHandler.js       ← Secure production error handler
│   └── seed/
│       ├── students.json         ← 50 Student seed records
│       ├── courses.json          ← 8 Course seed records
│       ├── teachers.json         ← 10 Teacher seed records
│       └── seed.js               ← Seeder script
│
└── frontend/
    ...
```

---

## 🛠 Setup & Run Instructions

### Prerequisites
- Node.js (>= 18) (using `nvm` is recommended for managing Node versions) or Docker.
- A **MongoDB Atlas** database cluster (or local MongoDB database >= 6.0).

### Database Configuration
Set the `MONGODB_URI` connection string inside your `.env` file:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/api_playground?retryWrites=true&w=majority
```

### Method 1: Docker Compose (Recommended)
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Insert your `MONGODB_URI` in `.env`.
3. Build and run containers:
   ```bash
   docker-compose up --build
   ```
4. Open your browser and navigate to `http://localhost`.

### Method 2: Manual Local Running (For Development)

#### 1. Start the Backend
1. Go to the `backend` folder:
   ```bash
   cd backend
   ```
2. Create your `.env` file containing `MONGODB_URI`.
3. Install dependencies and start:
   ```bash
   npm install
   npm start
   ```
   *The server will connect to MongoDB Atlas and automatically seed collections if they are empty.*

#### 2. Start the Frontend
1. Go to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies and start Vite dev server:
   ```bash
   npm install
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Adityaaknkar16/Api-school/issues).

## 📄 License
This project is licensed under the MIT License. Feel free to use, modify, and distribute it as needed.
