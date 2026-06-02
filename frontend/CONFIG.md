# Frontend Configuration

## Environment Setup

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

## Starting the Development Server

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

## Project Structure

```
frontend/
├── src/
│   ├── pages/              # Page components
│   │   ├── Home.js
│   │   ├── auth/
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── tournament/
│   │   │   ├── Tournaments.js
│   │   │   └── TournamentDetail.js
│   │   ├── team/
│   │   │   ├── Teams.js
│   │   │   └── TeamDetail.js
│   │   ├── match/
│   │   │   ├── Matches.js
│   │   │   └── MatchDetail.js
│   │   ├── player/
│   │   │   ├── Players.js
│   │   │   └── PlayerDetail.js
│   │   ├── news/
│   │   │   └── News.js
│   │   ├── gallery/
│   │   │   └── Gallery.js
│   │   ├── user/
│   │   │   └── UserProfile.js
│   │   └── admin/
│   │       └── AdminDashboard.js
│   ├── components/         # Reusable components
│   │   ├── navbar/
│   │   │   └── Navbar.js
│   │   └── common/
│   │       └── Footer.js
│   ├── services/           # API service calls
│   │   ├── authService.js
│   │   ├── tournamentService.js
│   │   ├── teamService.js
│   │   ├── matchService.js
│   │   ├── playerService.js
│   │   ├── newsService.js
│   │   └── galleryService.js
│   ├── context/            # React context
│   │   └── AuthContext.js
│   ├── App.js              # Main component
│   ├── index.js            # Entry point
│   └── index.css
├── public/
│   ├── index.html
│   └── favicon.ico
├── package.json
├── .env.example
├── tailwind.config.js
└── .gitignore
```

## Component Architecture

### Pages
Top-level components representing routes. Each page handles data fetching and layout.

### Services
API integration layer using Axios. Each service corresponds to a backend API resource.

### Context
Global state management using React Context API. Currently used for authentication state.

## Key Technologies

- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Socket.IO Client** - Real-time communication
- **React Icons** - Icon library
- **Recharts** - Data visualization (for future features)

## Running Different Environments

### Development
```bash
npm start
```

### Production Build
```bash
npm run build
```

### Testing
```bash
npm test
```

## Environment Variables Explained

### REACT_APP_API_URL
- Backend API base URL
- Used in all service calls
- Prefix: `REACT_APP_` is required for CRA

### REACT_APP_SOCKET_URL
- Socket.IO server URL
- For real-time updates
- Same as backend server URL

## Authentication Flow

1. User registers/logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Token added to all API requests
5. Token verified on protected pages
6. User logged out on token expiration

## State Management

### Global State (Context)
- `auth` - Current user information
- `login` - Login function
- `logout` - Logout function

### Local State (useState)
- Page-specific data
- Form inputs
- UI state (modals, dropdowns, etc.)

## API Service Pattern

```javascript
// service.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const service = {
  getAll: () => axios.get(`${API_URL}/resource`),
  getById: (id) => axios.get(`${API_URL}/resource/${id}`),
  create: (data) => axios.post(`${API_URL}/resource`, data),
  update: (id, data) => axios.put(`${API_URL}/resource/${id}`, data),
  delete: (id) => axios.delete(`${API_URL}/resource/${id}`)
};

export default service;
```

## Common Issues & Solutions

### CORS Error
```
Access to XMLHttpRequest blocked by CORS
```
**Solution:** Check REACT_APP_API_URL matches backend FRONTEND_URL

### Token Not Working
```
Error: Unauthorized
```
**Solution:** 
1. Clear localStorage
2. Login again
3. Check token expiration

### Socket.IO Connection Failed
```
Error: Failed to connect to socket server
```
**Solution:** Check REACT_APP_SOCKET_URL is correct and backend is running

### Blank Page/404
```
Page not found
```
**Solution:** Check React Router paths and component imports

## Performance Optimization

1. **Code Splitting:** React Router automatically handles this
2. **Lazy Loading:** Implement React.lazy for pages
3. **Image Optimization:** Use proper image formats and sizes
4. **Memoization:** Use React.memo for expensive components
5. **useCallback:** Optimize callback functions

## Styling

This project uses Tailwind CSS for styling. Key files:

- `tailwind.config.js` - Tailwind configuration
- `src/index.css` - Global styles
- Components use Tailwind utility classes

## Build & Deployment

### Build
```bash
npm run build
```

Creates optimized production build in `build/` folder.

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Connect GitHub repo
2. Set build command: `npm run build`
3. Set publish directory: `build/`

### Deploy to AWS S3 + CloudFront
```bash
npm run build
# Upload build/ folder to S3
```

## Environment-Specific Configuration

```
.env.local        # Local development (git ignored)
.env.development  # Development build
.env.production   # Production build
.env.test         # Testing
```

---

For more information, see [README.md](../README.md)
