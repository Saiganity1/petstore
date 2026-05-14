# Render Deployment Guide

This guide will help you deploy both the frontend and backend of your Petstore application on Render.

## Prerequisites

- Render account (https://render.com)
- GitHub repository with your code
- PostgreSQL database (can be provisioned on Render or use external provider)

---

## Step 1: Set Up PostgreSQL Database

### Option A: Use Render's PostgreSQL
1. Go to https://dashboard.render.com
2. Click **New +** → **PostgreSQL**
3. Fill in the details:
   - **Name**: `petstore-db`
   - **Database**: `petstore`
   - **User**: `petstore` (or your choice)
   - **Region**: Choose closest to your location
   - **PostgreSQL Version**: 15
4. Click **Create Database**
5. Copy the **Internal Database URL** (you'll need this for the backend)

### Option B: Use External Database
If you prefer using an external PostgreSQL provider, get the connection string.

---

## Step 2: Deploy Backend (Java/Spring Boot)

### 2.1 Create Web Service
1. Go to https://dashboard.render.com
2. Click **New +** → **Web Service**
3. Connect your GitHub repository:
   - Choose your GitHub repo
   - Select `Connect`
4. Configure the service:
   - **Name**: `petstore-backend`
   - **Environment**: `Docker`
   - **Region**: Same as database (recommended)
   - **Branch**: `main` (or your default branch)
5. Click **Create Web Service**

### 2.2 Set Environment Variables
Once the service is created:
1. Go to **Environment** tab
2. Add the following environment variables:

```
DB_URL=postgresql://[user]:[password]@[host]:[port]/[database]
DB_USER=[database_user]
DB_PASSWORD=[database_password]
ALLOWED_ORIGINS=https://[your-frontend-domain].onrender.com,https://www.your-domain.com
SERVER_PORT=8080
SPRING_PROFILES_ACTIVE=prod
```

Replace the values with your actual database credentials.

### 2.3 Build & Deploy
- Render will automatically build using the Dockerfile
- Deployment takes 5-10 minutes
- Your backend will be available at `https://petstore-backend.onrender.com`

---

## Step 3: Deploy Frontend (React/Vite)

### 3.1 Create Static Site
1. Go to https://dashboard.render.com
2. Click **New +** → **Static Site**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `petstore-frontend`
   - **Branch**: `main` (or your default branch)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
   - **Root Directory**: `frontend` (if your frontend is in a subdirectory)
5. Click **Create Static Site**

### 3.2 Set Environment Variables (Optional)
If needed, add to Static Site environment:
```
VITE_API_URL=https://petstore-backend.onrender.com
```

### 3.3 Deploy
- Render will build and deploy automatically
- Your frontend will be available at `https://petstore-frontend.onrender.com`

---

## Step 4: Configure CORS

Update your backend's CORS configuration to allow your frontend domain:

**File**: `backend/src/main/java/com/petstore/config/CorsConfig.java`

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        String allowedOrigins = System.getenv("ALLOWED_ORIGINS");
        if (allowedOrigins == null) {
            allowedOrigins = "http://localhost:5173";
        }
        
        registry.addMapping("/**")
                .allowedOrigins(allowedOrigins.split(","))
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

---

## Step 5: Database Initialization

### 5.1 Option 1: Automatic Schema Creation
The `schema.sql` file in `backend/src/main/resources/` will be automatically executed.

### 5.2 Option 2: Manual SQL Execution
If you need to run SQL manually:
1. Connect to your Render PostgreSQL
2. Run the queries from `backend/src/main/resources/schema.sql`

You can connect using:
```bash
psql [internal-database-url]
```

---

## Step 6: Environment-Specific Configuration

### Backend Configuration Files
- `backend/src/main/resources/application.properties` - Development
- `backend/src/main/resources/application-prod.properties` - Production

Update `application-prod.properties` to use environment variables:

```properties
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USER}
spring.datasource.password=${DB_PASSWORD}
spring.jpa.hibernate.ddl-auto=validate
server.port=${SERVER_PORT:8080}
```

---

## Step 7: Update Frontend API Configuration

**File**: `frontend/.env` (create if doesn't exist)

```
VITE_API_URL=https://petstore-backend.onrender.com
```

Update your frontend API client to use this variable:

**File**: `frontend/src/clients/api.js` (or similar)

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
```

---

## Deployment Checklist

- [ ] PostgreSQL database created on Render
- [ ] Database credentials saved
- [ ] Backend web service created
- [ ] Backend environment variables configured
- [ ] Frontend static site created
- [ ] Frontend environment variables configured
- [ ] CORS configuration updated
- [ ] Database schema initialized
- [ ] Both services deployed successfully
- [ ] Test API endpoints (e.g., `GET /api/pets`)
- [ ] Verify frontend-backend communication

---

## Troubleshooting

### Backend not connecting to database
- Check environment variables are set correctly
- Verify database URL format: `postgresql://user:password@host:port/database`
- Check database firewall rules

### Frontend not loading API data
- Check browser console for CORS errors
- Verify `ALLOWED_ORIGINS` environment variable includes frontend domain
- Test API directly: `curl https://petstore-backend.onrender.com/api/pets`

### Build fails
- Check build logs in Render dashboard
- Verify Maven/Node dependencies are correct
- Ensure Java version is 17+ (specified in pom.xml)

### Slow initial load on free tier
- Free tier Render services spin down after 15 mins of inactivity
- Use paid tier for production

---

## Next Steps

1. Monitor logs: Go to your service → **Logs** tab
2. Set up custom domain (optional)
3. Enable auto-deploys on GitHub pushes
4. Add monitoring and error tracking

---

## Support

- Render Docs: https://render.com/docs
- Check logs for detailed error messages
- Review environment variables configuration

