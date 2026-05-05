# Deployment Guide

## Environment Variables

### Backend (Spring Boot)

Create a `.env` file or set these environment variables:

```bash
# Database Configuration
DB_URL=jdbc:postgresql://your-db-host:5432/petstore
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# Server Configuration
SERVER_PORT=8080

# CORS - Allowed origins (comma-separated)
ALLOWED_ORIGINS=https://your-frontend-domain.com,https://www.your-frontend-domain.com
```

### Frontend (React/Vite)

Create a `.env` file:

```bash
# API Base URL
VITE_API_URL=https://your-backend-domain.com
```

## Building

### Backend (Maven)
```bash
cd backend
mvn clean package
java -jar target/petstore-backend-0.0.1-SNAPSHOT.jar
```

### Frontend (Vite)
```bash
cd frontend
npm install
npm run build
# Serve dist/ directory with your web server
```

## Docker Deployment (Optional)

### Backend Dockerfile
```dockerfile
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY backend/target/petstore-backend-*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
```

### Frontend Dockerfile
```dockerfile
FROM node:22 as builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build

FROM nginx:latest
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Render Deployment

### Backend
1. Connect GitHub repo to Render
2. Create new Web Service
3. Set build command: `cd backend && ./mvnw clean package`
4. Set start command: `java -jar backend/target/petstore-backend-*.jar`
5. Set environment variables (DB_URL, DB_USER, DB_PASSWORD, etc.)

### Frontend
1. Create new Static Site
2. Connect GitHub repo
3. Set build command: `cd frontend && npm install && npm run build`
4. Set publish directory: `frontend/dist`

## Render Database Setup

Use Render's PostgreSQL database:
1. Create PostgreSQL database on Render
2. Get connection string
3. Set `DB_URL` environment variable on backend service
4. Run database setup script or execute SQL from `backend/src/main/resources/schema.sql`

## Verification Checklist

- [ ] Backend builds successfully: `mvn clean package`
- [ ] Frontend builds successfully: `npm run build`
- [ ] Environment variables are set correctly
- [ ] Database connection works
- [ ] CORS is configured with correct frontend URL
- [ ] API responds to GET /api/pets
- [ ] Frontend can add new pets
- [ ] All environment variables use defaults or are explicitly set
