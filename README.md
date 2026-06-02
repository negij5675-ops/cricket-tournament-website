# 🏏 Local Cricket Tournament Platform

A comprehensive web application for managing local cricket tournaments with live scoring, player statistics, fixture management, and real-time updates.

## 📋 Features

### Core Features
- ✅ **Tournament Management** - Create & manage multiple tournaments with customizable overs
- ✅ **Player Statistics & Performance** - Track player stats, batting/bowling averages
- ✅ **Fixture Calendar** - View all upcoming and completed matches
- ✅ **Team Management** - Team profiles and roster management
- ✅ **User Registration** - Player and fan registration system
- ✅ **Mobile Responsive** - Works seamlessly on all devices
- ✅ **Video Streaming** - Match highlights and replays
- ✅ **Photo Gallery** - Match moments and team photos
- ✅ **News & Blog** - Latest cricket news and tournament updates
- ✅ **Real-time Updates** - WebSocket-based live notifications
- ✅ **Admin Dashboard** - Tournament and match management
- ✅ **Leaderboards** - Tournament standings and statistics

### User Roles
- 👨‍💼 **Admin** - Full tournament management
- 👥 **Teams** - Team profile, player management
- 👨‍🦰 **Fans** - View tournaments, statistics, news

## 🛠️ Tech Stack

### Frontend
- React 18
- Tailwind CSS
- Socket.io Client
- React Router v6
- Axios
- Recharts

### Backend
- Node.js + Express.js
- MongoDB
- Socket.io
- JWT Authentication
- Multer (File uploads)
- Bcryptjs

## 📁 Project Structure

```
cricket-tournament-website/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── App.js
│   ├── package.json
│   └── .env.example
└── README.md
```

## 🚀 Quick Start

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure MongoDB URI and other env variables
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
npm start
```

## 📄 License

MIT License

## 👨‍💻 Author

Cricket Tournament Team 2026
