# Cricket Tournament Platform

A comprehensive web application for managing local cricket tournaments, teams, players, and matches with real-time updates.

## 🎯 Features

### Tournament Management
- Create and manage multiple tournaments
- Support for different cricket formats (T20, ODI, 10-Over, 5-Over)
- Tournament status tracking (upcoming, ongoing, completed)
- Customizable rules and prize pools
- Team and player registration

### Real-Time Updates
- Live match scoring with Socket.IO
- Real-time leaderboard updates
- Instant notifications for news and updates
- Live commentary support

### Team & Player Management
- Create and manage teams
- Player registration and profile management
- Captain and vice-captain assignment
- Player statistics tracking
- Team performance metrics

### Match Management
- Schedule matches with venues and dates
- Record live scores and wickets
- Detailed match scorecard
- Man of the Match selection
- Match results and analysis

### Content Management
- News and updates section
- Photo and video gallery
- Media uploads and management
- Like and comment functionality
- Categorized content

### User Management
- Role-based access control (Admin, Team Manager, Player, Fan)
- User authentication with JWT
- Profile management
- Password reset functionality

### Admin Dashboard
- Tournament creation and management
- User role management
- Statistics and analytics
- System administration

## 📁 Project Structure

```
cricket-tournament-website/
├── backend/
│   ├── models/          # Database models
│   ├── controllers/      # Route controllers
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── server.js        # Express server setup
│   ├── package.json     # Dependencies
│   └── .env.example     # Environment variables template
├── frontend/
│   ├── src/
│   │   ├── pages/       # React pages
│   │   ├── components/  # Reusable components
│   │   ├── services/    # API service calls
│   │   ├── context/     # React context
│   │   ├── App.js       # Main app component
│   │   └── index.js     # Entry point
│   ├── package.json     # Dependencies
│   └── .env.example     # Environment variables template
├── README.md            # This file
└── .gitignore          # Git ignore rules
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/cricket_tournament
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

5. Start the server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

5. Start the development server:
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints

```
POST /api/auth/register          - Register new user
POST /api/auth/login             - Login user
POST /api/auth/logout            - Logout user
GET  /api/auth/me                - Get current user
PUT  /api/auth/update-profile    - Update user profile
POST /api/auth/change-password   - Change password
POST /api/auth/forgot-password   - Request password reset
POST /api/auth/reset-password    - Reset password with token
```

### Tournament Endpoints

```
GET    /api/tournaments           - Get all tournaments
GET    /api/tournaments/:id       - Get tournament details
POST   /api/tournaments           - Create tournament (Admin)
PUT    /api/tournaments/:id       - Update tournament (Admin)
DELETE /api/tournaments/:id       - Delete tournament (Admin)
GET    /api/tournaments/:id/matches       - Get tournament matches
GET    /api/tournaments/:id/leaderboard   - Get tournament leaderboard
POST   /api/tournaments/:id/add-team      - Add team to tournament
POST   /api/tournaments/:id/start         - Start tournament
POST   /api/tournaments/:id/end           - End tournament
```

### Team Endpoints

```
GET    /api/teams                 - Get all teams
GET    /api/teams/:id             - Get team details
POST   /api/teams                 - Create team
PUT    /api/teams/:id             - Update team
DELETE /api/teams/:id             - Delete team
GET    /api/teams/:id/players     - Get team players
GET    /api/teams/:id/statistics  - Get team statistics
POST   /api/teams/:id/add-player  - Add player to team
POST   /api/teams/:id/set-captain - Set team captain
```

### Match Endpoints

```
GET    /api/matches               - Get all matches
GET    /api/matches/:id           - Get match details
POST   /api/matches               - Create match (Admin)
PUT    /api/matches/:id           - Update match (Admin)
POST   /api/matches/:id/start     - Start match (Admin)
POST   /api/matches/:id/end       - End match (Admin)
GET    /api/matches/:id/scorecard - Get match scorecard
POST   /api/matches/:id/update-score    - Update score (Admin)
POST   /api/matches/:id/record-wicket   - Record wicket (Admin)
POST   /api/matches/:id/set-man-of-match - Set man of match (Admin)
```

### Player Endpoints

```
GET    /api/players               - Get all players
GET    /api/players/:id           - Get player details
POST   /api/players               - Create player
PUT    /api/players/:id           - Update player
DELETE /api/players/:id           - Delete player
GET    /api/players/:id/statistics - Get player statistics
GET    /api/players/:id/matches   - Get player matches
```

### News Endpoints

```
GET    /api/news                  - Get all published news
GET    /api/news/:id              - Get news details
GET    /api/news/category/:category - Get news by category
POST   /api/news                  - Create news (Admin)
PUT    /api/news/:id              - Update news (Admin)
POST   /api/news/:id/publish      - Publish news (Admin)
DELETE /api/news/:id              - Delete news (Admin)
POST   /api/news/:id/view         - Increment view count
```

### Gallery Endpoints

```
GET    /api/gallery               - Get all gallery items
GET    /api/gallery/:id           - Get gallery item details
POST   /api/gallery               - Upload media (Protected)
GET    /api/gallery/match/:matchId     - Get match gallery
GET    /api/gallery/tournament/:tournamentId - Get tournament gallery
POST   /api/gallery/:id/like      - Like media (Protected)
POST   /api/gallery/:id/comment   - Add comment (Protected)
DELETE /api/gallery/:id           - Delete media (Protected)
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in request headers:

```bash
Authorization: Bearer <your_token_here>
```

## 🛠 Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Token-based authentication
- **Socket.IO** - Real-time communication
- **Bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Media storage (optional)

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Socket.IO Client** - Real-time updates
- **Tailwind CSS** - Utility-first CSS
- **React Icons** - Icon library
- **Recharts** - Data visualization

## 📖 Database Models

### User
- firstName, lastName
- email, phone
- password (hashed)
- role (admin, team-manager, player, fan)
- profile image, bio
- location (city, state, country)

### Tournament
- name, description
- format (T20, ODI, etc.)
- startDate, endDate
- location, venue
- teams, admin
- status (upcoming, ongoing, completed)
- rules, prize pool

### Team
- name, shortName
- logo, description
- manager, captain
- players
- statistics (wins, losses, totalMatches)

### Player
- userId, jerseyNumber
- role (batsman, bowler, all-rounder)
- team
- batting/bowling stats
- career statistics

### Match
- tournament, matchNumber
- team1, team2
- matchDate, venue
- status (scheduled, live, completed)
- innings data
- result
- manOfTheMatch

### News
- title, content
- author, category
- featuredImage
- views, isPublished
- timestamps

### Gallery
- title, description
- mediaUrl, thumbnail
- mediaType (photo, video)
- related tournament/team/match
- likes, comments

## 🔄 Real-Time Features

Socket.IO events for live updates:

```javascript
// Client to Server
socket.emit('join-tournament', tournamentId);
socket.emit('join-match', matchId);
socket.emit('score-update', { matchId, runs, wickets });
socket.emit('news-publish', newsData);

// Server to Client
socket.on('score-updated', (data) => { /* ... */ });
socket.on('wicket-recorded', (data) => { /* ... */ });
socket.on('new-news', (data) => { /* ... */ });
```

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_password
CLOUDINARY_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
FRONTEND_URL=http://localhost:3000
ADMIN_EMAIL=admin@example.com
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📦 Deployment

### Backend Deployment (Heroku, AWS, DigitalOcean, etc.)
1. Set environment variables
2. Build and push to hosting platform
3. Configure MongoDB connection string
4. Deploy application

### Frontend Deployment (Vercel, Netlify, etc.)
1. Build the React app: `npm run build`
2. Deploy the `build` folder
3. Configure API URL for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Support

For support, email admin@cricketstadium.com or create an issue on GitHub.

## 🙏 Acknowledgments

- Cricket enthusiasts and community
- Open-source contributors
- MERN stack community

---

**Made with ❤️ for cricket lovers**
