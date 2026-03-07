# 🚀 AlgoNitro – Competitive Programming Analytics Platform

AlgoNitro is a full-stack web application that helps competitive programmers track and analyze their performance across multiple coding platforms in one place.

Users can connect their profiles from **LeetCode**, **Codeforces**, and **CodeChef** and instantly view their statistics on a unified dashboard.

-------------------------------------------------------------------------------------------------

**Why AlgoNitro?**

Competitive programmers often use multiple platforms like LeetCode, Codeforces, and CodeChef, but tracking performance across all of them can be inconvenient and scattered.

AlgoNitro solves this problem by providing a single unified dashboard for competitive programming analytics.

⭐ Advantages of AlgoNitro

Unified Platform
View statistics from LeetCode, Codeforces, and CodeChef in one place.

Clutter-Free Dashboard
No need to open multiple websites or tabs — everything is displayed on a clean, single interface.

Quick Stats Access
Simply enter your username for each platform and instantly retrieve your statistics.

Centralized Performance Tracking
Monitor your progress across multiple platforms without switching between different websites.

Easy to Use
Minimal input required — just provide usernames and the platform fetches all relevant stats.

Productivity Boost
Saves time for competitive programmers who frequently analyze their performance.

Developer-Friendly Architecture
Built using modern technologies like React, Node.js, Express, and MongoDB.

Live Cloud Deployment
Fully deployed using modern cloud infrastructure for real-world usage.



--------------------------------------------------------------------------------------------------------


## 🌐 Live Demo

Frontend (Live Website):
https://algonitro.vercel.app

Backend API:
https://algonitro-backend.onrender.com

---------------------------------------------------------------------------------------------------------

## ✨ Features

* 🔐 User authentication (Register & Login)
* 📊 Dashboard displaying coding statistics
* 📈 LeetCode statistics integration
* 🏆 Codeforces rating and stats tracking
* 🍜 CodeChef profile analytics
* 🛡 Protected routes with JWT authentication
* ☁ Cloud deployment
* ⚡ Fast frontend with Vite + React

-----------------------------------------------------------------------------------------

## 🧠 Tech Stack

### Frontend

* React.js
* Vite
* CSS / Modern UI styling
* Axios

### Backend

* Node.js
* Express.js
* JWT Authentication

### Database

* MongoDB Atlas

### Deployment

* Frontend: Vercel
* Backend: Render
* Version Control: GitHub

-----------------------------------------------------------------------------------------------------

## 🏗 Project Architecture

User
↓
React Frontend (Vercel)
↓
Node.js API (Render)
↓
MongoDB Atlas Database

----------------------------------------------------------------------------------

## 📂 Project Structure

```
algonitro/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── api.js
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── server.js
│
└── README.md
```

------------------------------------------------------------------------------------

## ⚙️ Environment Variables

### Backend (.env)

```
PORT=5000
MONGO_URI=mongodb_connection_string
JWT_SECRET=secret_key
```

### Frontend (.env)

```
VITE_API_URL=https://algonitro-backend.onrender.com
```

------------------------------------------------------------------------------------------------------------------

## 🛠 Local Development Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/sparsh-4066/algonitro.git
cd algonitro
```

---

### 2️⃣ Start Backend

```
cd backend
npm install
npm start
```

Backend runs at:

```
http://localhost:5000
```

---

### 3️⃣ Start Frontend

```
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 📸 Screenshots

Login page<img width="932" height="724" alt="image" src="https://github.com/user-attachments/assets/a93bf37b-4ab0-4cb0-a61d-75567349406d" />
Register page<img width="1015" height="805" alt="image" src="https://github.com/user-attachments/assets/c376106a-6aea-47b8-bb42-18aeb3796953" />
Main Dashboard page<img width="1896" height="857" alt="image" src="https://github.com/user-attachments/assets/7fd8c693-0c4d-4950-9657-02ac4a913861" />

---------------------------------------------------------------------------------------------

## 🚀 Future Improvements

* Global leaderboard
* Public user profiles
* Contest reminder system
* Daily problem solving streak tracker
* Advanced analytics and charts
* Profile sharing links
* Making it flexible to open on other devices

-------------------------------------------------------------------------------------------

## 👨‍💻 Author

**Sparsh**

GitHub: https://github.com/sparsh-4066

-------------------------------------------------------------------------------------------

## ⭐ If you like this project

Please consider giving it a **star on GitHub** to support the project!
