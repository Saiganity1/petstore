# Render Deployment Commands

## Prerequisites
```bash
# Install Git (if not already installed)
# Create GitHub account and repository

# Clone your repository
git clone https://github.com/YOUR_USERNAME/petstore.git
cd petstore
```

## Local Testing Before Deployment

### Test Backend Locally
```bash
cd backend

# Set local environment variables
export DB_URL="jdbc:postgresql://localhost:5432/petstore"
export DB_USER="petstore_user"
export DB_PASSWORD="petstore_pass"
export ALLOWED_ORIGINS="http://localhost:5173"

# Build and run
mvn clean install
mvn spring-boot:run

# Test API
curl http://localhost:8080/api/pets
```

### Test Frontend Locally
```bash
cd frontend

export VITE_API_URL="http://localhost:8080"

npm install
npm run dev

# Open browser: http://localhost:5173
```

## Push to GitHub

```bash
# Add all files
git add .

# Commit changes
git commit -m "Configure Render deployment"

# Push to GitHub
git push origin main
```

## One-Time Render Setup

### Create PostgreSQL Database
1. Go to https://dashboard.render.com
2. New → PostgreSQL
3. Name: petstore-db
4. Database: petstore
5. User: petstore
6. Region: (choose your region)
7. Copy the "Internal Database URL"

### Deploy Backend

```bash
# 1. New → Web Service
# 2. Select your GitHub repository
# 3. Settings:
#    - Name: petstore-backend
#    - Environment: Docker
#    - Root Directory: / (empty)
#    - Build Command: (leave empty - uses Dockerfile)
#    - Start Command: (leave empty - uses Dockerfile)
#    - Region: (same as database)
# 4. Create Web Service

# 5. Go to Environment tab and add:
#    DB_URL=postgresql://petstore:PASSWORD@HOST:PORT/petstore
#    DB_USER=petstore
#    DB_PASSWORD=PASSWORD
#    ALLOWED_ORIGINS=https://petstore-frontend.onrender.com
#    SPRING_PROFILES_ACTIVE=prod
#    SERVER_PORT=8080
# 6. Save - service will redeploy
```

### Deploy Frontend

```bash
# 1. New → Static Site
# 2. Select your GitHub repository
# 3. Settings:
#    - Name: petstore-frontend
#    - Build Command: npm install && npm run build
#    - Publish Directory: frontend/dist
#    - Environment: (optional)
#      - VITE_API_URL=https://petstore-backend.onrender.com
# 4. Create Static Site
```

## Verify Deployment

```bash
# Test Backend API (replace with your domain)
curl https://petstore-backend.onrender.com/api/pets

# Test Frontend
# Open in browser: https://petstore-frontend.onrender.com
```

## Useful Render Commands

### View Logs
```bash
# Backend logs
# Go to dashboard → petstore-backend → Logs

# Frontend logs
# Go to dashboard → petstore-frontend → Logs

# Database logs
# Go to dashboard → petstore-db → Logs
```

### Rebuild Services
```bash
# Backend (if build fails)
# Dashboard → petstore-backend → Manual Deploy → Deploy Latest Commit

# Frontend (if build fails)
# Dashboard → petstore-frontend → Manual Deploy → Redeploy
```

### SSH into Container (Backend only - for debugging)
```bash
# Dashboard → petstore-backend → Shell

# View files
ls -la

# Check environment
env | grep DB_URL

# View logs from inside
tail -f /var/log/petstore.log
```

## Database Initialization

### If Data Doesn't Load

```bash
# Connect to PostgreSQL database
# Get connection string from dashboard

psql postgresql://petstore:PASSWORD@HOST:PORT/petstore

# Run these SQL commands:
CREATE TABLE IF NOT EXISTS pet (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    species VARCHAR(100),
    price DECIMAL(10,2),
    description TEXT
);

-- Insert sample data
INSERT INTO pet (name, species, price, description) VALUES
('Buddy', 'Dog', 299.99, 'Friendly Golden Retriever'),
('Whiskers', 'Cat', 199.99, 'Playful Siamese cat'),
('Tweety', 'Bird', 79.99, 'Singing Canary');
```

## Update Services After Local Changes

```bash
# Make changes to your code
git add .
git commit -m "Update petstore features"
git push origin main

# Render will automatically rebuild and redeploy!
# Check status in dashboard
```

## Troubleshooting

### Backend Not Starting
```bash
# Check environment variables are correct
# Go to dashboard → petstore-backend → Environment
# Verify DB_URL format: postgresql://user:password@host:port/database

# View detailed logs
# Dashboard → petstore-backend → Logs
```

### Frontend Not Displaying
```bash
# Check browser console for errors (F12)
# Verify VITE_API_URL is set correctly
# Check ALLOWED_ORIGINS includes frontend domain in backend
```

### Build Fails
```bash
# Check build logs
# Dashboard → Service → Logs

# Test locally first
cd frontend && npm install && npm run build
cd backend && mvn clean package
```

## Advanced: Manual Database Connection

```bash
# Install psql if needed
# macOS: brew install postgresql
# Ubuntu: sudo apt-get install postgresql-client
# Windows: Download PostgreSQL installer

# Connect to Render PostgreSQL
psql postgresql://petstore:PASSWORD@dpg-xxxxx.onrender.com:5432/petstore

# Common commands
\dt                 # List tables
\d pet             # Show pet table schema
SELECT * FROM pet; # View data
```

## Cleanup (if needed)

```bash
# Delete services from Render dashboard
# 1. Go to service → Settings
# 2. Scroll to bottom → Delete Service

# This does NOT delete your GitHub code - only the deployed service
```
