# Project Installation & Setup Guide

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v14 or higher)
  - Download from: https://nodejs.org/
  - Verify: `node --version`
  - Verify: `npm --version`

- **Git**
  - Download from: https://git-scm.com/
  - Verify: `git --version`

- **MongoDB** (either local or cloud)
  - Local: Install from https://www.mongodb.com/try/download/community
  - Cloud: https://www.mongodb.com/cloud/atlas (Recommended)

- **Text Editor/IDE**
  - VSCode recommended: https://code.visualstudio.com/

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/negij5675-ops/cricket-tournament-website.git
cd cricket-tournament-website
```

### 2. Backend Setup

#### Step 2.1: Navigate to Backend
```bash
cd backend
```

#### Step 2.2: Install Dependencies
```bash
npm install
```

#### Step 2.3: Setup Environment Variables
```bash
cp .env.example .env
```

Edit `.env` file:
```env
PORT=5000
NODE_ENV=development

# MongoDB - Replace with your connection string
# For MongoDB Atlas, get your connection string from dashboard
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cricket_tournament

# JWT Settings
JWT_SECRET=your_super_secret_key_minimum_32_characters_long
JWT_EXPIRE=7d

# Email (for password reset - optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Admin Email
ADMIN_EMAIL=admin@cricketstadium.com
```

#### Step 2.4: Start Backend Server
```bash
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on http://localhost:5000
🔌 Real-time updates enabled via Socket.IO
```

#### Step 2.5: Test Backend
Open browser and visit: `http://localhost:5000/api/health`

Expected response:
```json
{
  "status": "Server is running",
  "timestamp": "2026-06-02T..."
}
```

### 3. Frontend Setup

#### Step 3.1: Open New Terminal and Navigate to Frontend
```bash
# In a new terminal window
cd frontend
```

#### Step 3.2: Install Dependencies
```bash
npm install
```

#### Step 3.3: Setup Environment Variables
```bash
cp .env.example .env
```

Edit `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

#### Step 3.4: Start Frontend Server
```bash
npm start
```

Browser should automatically open at `http://localhost:3000`

## Verification Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] MongoDB connected
- [ ] Can access `http://localhost:3000`
- [ ] Home page loads
- [ ] Navigation works

## First Time Usage

### Create Admin Account

1. Go to `http://localhost:3000/register`
2. Fill in the form:
   ```
   First Name: Admin
   Last Name: User
   Email: admin@example.com
   Password: password123
   Phone: 1234567890
   Role: Select from dropdown (or set in DB)
   ```
3. Click Register
4. Update user role to "admin" in MongoDB (optional, depends on implementation)

### Access Admin Dashboard

1. Login with admin account
2. Navigate to `/admin` (shown in navbar if admin)
3. Create tournaments
4. Manage teams and players

## Common Installation Issues

### Issue: MongoDB Connection Failed
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
1. If using MongoDB locally, ensure it's running:
   ```bash
   # Windows
   mongod
   
   # Mac (with Homebrew)
   brew services start mongodb-community
   ```

2. If using MongoDB Atlas:
   - Get connection string from Atlas dashboard
   - Update MONGODB_URI in .env
   - Ensure IP is whitelisted in Network Access

### Issue: Port Already in Use
```
Error: listen EADDRINUSE :::5000
```

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill process (use PID from above)
kill -9 <PID>

# Or use different port
# Change PORT in .env
```

### Issue: npm install fails
```
Error: npm ERR! code ERESOLVE
```

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Install with legacy peer deps
npm install --legacy-peer-deps
```

### Issue: Cannot find module
```
Error: Cannot find module 'express'
```

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Development Tips

### Hot Reload
- Backend: Automatically reloads with `nodemon` (npm run dev)
- Frontend: Automatically reloads when you save files

### Debug Frontend
1. Open Chrome DevTools (F12)
2. Go to Console tab to see logs
3. Use React Developer Tools extension

### Debug Backend
```bash
node --inspect server.js
# Then visit chrome://inspect in Chrome
```

### View Database
1. MongoDB Atlas: Use web dashboard
2. Local MongoDB:
   ```bash
   mongosh
   use cricket_tournament
   db.users.find()
   ```

## Project Structure Overview

```
cricket-tournament-website/
├── backend/                  # Express/Node.js server
│   ├── models/              # Database schemas
│   ├── controllers/         # Business logic
│   ├── routes/             # API endpoints
│   ├── middleware/         # Authentication, validation
│   ├── server.js           # Main server file
│   ├── package.json        # Dependencies
│   └── .env                # Configuration (create from .env.example)
│
├── frontend/               # React application
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── services/      # API calls
│   │   ├── context/       # Global state
│   │   ├── App.js         # Main component
│   │   └── index.js       # Entry point
│   ├── package.json       # Dependencies
│   └── .env               # Configuration (create from .env.example)
│
├── README.md              # Main documentation
├── SETUP.md              # This file
└── .gitignore           # Git ignore rules
```

## Next Steps

1. **Create Tournament:**
   - Login as admin
   - Go to Admin Dashboard
   - Click "Create Tournament"
   - Fill in tournament details

2. **Create Teams:**
   - Go to Teams page
   - Click "Create Team"
   - Add players to team

3. **Schedule Matches:**
   - Go to Matches page
   - Create match between two teams
   - Set date and venue

4. **Live Scoring:**
   - Start match as admin
   - Update scores in real-time
   - Record wickets
   - End match and declare winner

## Getting Help

- Check [README.md](./README.md) for detailed documentation
- Check [backend/CONFIG.md](./backend/CONFIG.md) for backend setup
- Check [frontend/CONFIG.md](./frontend/CONFIG.md) for frontend setup
- Review API documentation in README.md
- Check console logs for error messages

## Support

For issues or questions:
1. Check if MongoDB is running
2. Check if both servers are running
3. Check browser console for errors (F12)
4. Check terminal for server errors
5. Email: admin@cricketstadium.com

---

**Happy Cricket Tournament Managing! 🏏**
