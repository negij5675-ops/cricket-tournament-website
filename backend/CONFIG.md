# Backend Configuration

## Environment Setup

Create a `.env` file in the backend directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cricket_tournament

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Email Configuration (for password reset)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Cloudinary (Optional - for media storage)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Admin Email
ADMIN_EMAIL=admin@cricketstadium.com
```

## Database Setup

### MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Create a database user
4. Get connection string
5. Update MONGODB_URI in .env

### Local MongoDB
```bash
# Install MongoDB
# Run MongoDB service
mongod

# Update .env
MONGODB_URI=mongodb://localhost:27017/cricket_tournament
```

## Starting the Server

```bash
# Install dependencies
npm install

# Development with auto-reload
npm run dev

# Production
nnpm start
```

## API Health Check

Once server is running:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "Server is running",
  "timestamp": "2026-06-02T09:00:00.000Z"
}
```

## Project Structure

```
backend/
├── models/           # Mongoose schemas
│   ├── User.js
│   ├── Tournament.js
│   ├── Team.js
│   ├── Player.js
│   ├── Match.js
│   ├── News.js
│   ├── Gallery.js
│   └── Leaderboard.js
├── controllers/      # Route handlers
│   ├── authController.js
│   ├── tournamentController.js
│   ├── teamController.js
│   ├── playerController.js
│   ├── matchController.js
│   ├── newsController.js
│   ├── galleryController.js
│   └── userController.js
├── routes/          # API routes
│   ├── authRoutes.js
│   ├── tournamentRoutes.js
│   ├── teamRoutes.js
│   ├── playerRoutes.js
│   ├── matchRoutes.js
│   ├── newsRoutes.js
│   ├── galleryRoutes.js
│   └── userRoutes.js
├── middleware/      # Custom middleware
│   ├── auth.js          # JWT authentication
│   ├── upload.js        # File upload
│   └── errorHandler.js  # Error handling
├── server.js        # Express server
├── package.json     # Dependencies
├── .env.example     # Environment template
└── .gitignore
```

## Common Issues & Solutions

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Ensure MongoDB is running or check your connection string

### JWT Token Expired
```
Error: Token expired
```
**Solution:** User needs to login again to get a new token

### CORS Error
```
Access to XMLHttpRequest blocked by CORS
```
**Solution:** Check FRONTEND_URL in .env matches your frontend URL

### File Upload Error
```
Error: Invalid file type
```
**Solution:** Ensure file is image or video and under 500MB

## Performance Tips

1. **Database Indexing:** Add indexes to frequently queried fields
2. **Pagination:** Implement pagination for large datasets
3. **Caching:** Use Redis for caching frequently accessed data
4. **Compression:** Enable gzip compression for responses
5. **Rate Limiting:** Implement rate limiting to prevent abuse

## Security Best Practices

1. Never commit `.env` file to version control
2. Use strong JWT_SECRET (minimum 32 characters)
3. Enable HTTPS in production
4. Implement request validation
5. Use helmet.js for security headers
6. Implement rate limiting
7. Sanitize user inputs
8. Use bcryptjs for password hashing

## Monitoring & Logging

Implement logging for:
- API requests/responses
- Database operations
- Authentication events
- Error tracking

## Backup & Recovery

1. Regular database backups
2. MongoDB Atlas automatic backups
3. Version control for code
4. Disaster recovery plan

---

For more information, see [README.md](../README.md)
