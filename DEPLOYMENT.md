# Deployment Guide

## Backend Deployment

### Option 1: Heroku

```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login to Heroku
heroku login

# Create new app
heroku create cricket-tournament-api

# Add MongoDB addon
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set JWT_SECRET=your_secret_key
heroku config:set NODE_ENV=production
heroku config:set FRONTEND_URL=https://your-frontend-url.com

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Option 2: AWS EC2

```bash
# 1. Create EC2 instance
# 2. SSH into instance
ssh -i key.pem ubuntu@your-ec2-ip

# 3. Install Node.js
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# 4. Install MongoDB
sudo apt-get install -y mongodb-org

# 5. Clone repository
git clone https://github.com/negij5675-ops/cricket-tournament-website.git
cd cricket-tournament-website/backend

# 6. Install dependencies
npm install

# 7. Create .env file with production settings
nano .env

# 8. Install PM2 (process manager)
sudo npm install -g pm2

# 9. Start server with PM2
pm2 start server.js --name "cricket-api"
pm2 startup
pm2 save

# 10. Setup Nginx reverse proxy
sudo apt-get install -y nginx
# Configure nginx to proxy requests to Node.js
```

### Option 3: DigitalOcean

```bash
# 1. Create Droplet (Ubuntu 20.04)
# 2. SSH into droplet
ssh root@your-droplet-ip

# 3. Install Node.js
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# 4. Install MongoDB
sudo apt-get install -y mongodb-org

# 5-10. Follow same steps as AWS
```

## Frontend Deployment

### Option 1: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel

# Set environment variables in Vercel dashboard
# REACT_APP_API_URL=https://your-backend-url/api
```

### Option 2: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
cd frontend
npm run build

# Deploy
netlify deploy --prod --dir=build
```

### Option 3: GitHub Pages

```bash
# 1. Add to package.json
"homepage": "https://username.github.io/cricket-tournament-website",

# 2. Install gh-pages
npm install gh-pages --save-dev

# 3. Add scripts to package.json
"deploy": "npm run build && gh-pages -d build"

# 4. Deploy
npm run deploy
```

### Option 4: AWS S3 + CloudFront

```bash
# 1. Build
cd frontend
npm run build

# 2. Create S3 bucket
aws s3 mb s3://cricket-tournament-app

# 3. Upload
aws s3 sync build/ s3://cricket-tournament-app --delete

# 4. Create CloudFront distribution
# Use AWS Console

# 5. Update REACT_APP_API_URL with CloudFront URL
```

## Environment Configuration

### Backend Production .env
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/db
JWT_SECRET=very-long-secret-key-min-32-chars
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend-url.com
```

### Frontend Production .env
```env
REACT_APP_API_URL=https://your-api-url/api
REACT_APP_SOCKET_URL=https://your-api-url
```

## SSL/HTTPS Setup

### Using Let's Encrypt

```bash
# Install Certbot
sudo apt-get install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --standalone -d yourdomain.com

# Configure Nginx with SSL
# Update nginx config to use certificate
```

## Monitoring & Logging

### Sentry (Error Tracking)

```bash
# Install Sentry
npm install @sentry/node

# Setup in server.js
const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'your-sentry-dsn' });
```

### PM2 Monitoring

```bash
# Install PM2 Plus
pm2 install pm2-auto-pull
pm2 web

# Access dashboard at localhost:9615
```

## Database Backup

### MongoDB Atlas
- Automatic backups enabled by default
- Configure in Atlas Dashboard

### Manual Backup
```bash
mongodump --uri="mongodb+srv://user:password@cluster.mongodb.net/db" --out=./backup
```

## Performance Optimization

### Backend
1. Enable gzip compression
2. Implement Redis caching
3. Use CDN for static files
4. Optimize database queries

### Frontend
1. Minimize bundle size
2. Implement code splitting
3. Enable compression
4. Use CDN for assets

## Domain Setup

1. Purchase domain from registrar
2. Point nameservers to hosting provider
3. Configure DNS records
4. Setup SSL certificate

## Pre-Launch Checklist

- [ ] All environment variables set
- [ ] Database backups configured
- [ ] SSL certificate installed
- [ ] Error tracking setup
- [ ] Logging configured
- [ ] Domain configured
- [ ] Performance optimized
- [ ] Security headers set
- [ ] Tests passing
- [ ] Code reviewed

---

For more help:
- Heroku: https://devcenter.heroku.com/
- AWS: https://docs.aws.amazon.com/
- Vercel: https://vercel.com/docs/
- Netlify: https://docs.netlify.com/
