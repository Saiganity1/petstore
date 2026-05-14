# Quick Start: Deploy to Render in 5 Minutes

## 🚀 One-Time Setup

### 1. Create Render Account
- Go to https://render.com
- Sign up with GitHub (recommended)
- Authorize Render to access your repositories

### 2. Prepare Your GitHub Repository
Push your code to GitHub with these files already in place:
- `backend/Dockerfile`
- `backend/src/main/resources/application-prod.properties`
- `render.yaml` (optional, but recommended)

```bash
git add .
git commit -m "Add Render deployment configuration"
git push origin main
```

---

## 📋 Simple Deployment Steps

### Step 1: Create PostgreSQL Database
1. Go to https://dashboard.render.com
2. Click **New +** → **PostgreSQL**
3. Enter:
   - **Name**: `petstore-db`
   - **Database**: `petstore`
   - **User**: `petstore`
   - **Region**: Choose your region
4. Click **Create Database**
5. **Copy** the **Internal Database URL** (you'll need this in Step 3)

### Step 2: Deploy Backend
1. Click **New +** → **Web Service**
2. Select your GitHub repository
3. Fill in:
   - **Name**: `petstore-backend`
   - **Environment**: `Docker` (auto-detected)
   - **Region**: Same as your database
   - **Branch**: `main`
4. Click **Create Web Service** (this will fail initially due to missing env vars - that's OK!)

### Step 3: Configure Backend Environment Variables
While the backend is deploying:
1. Go to the backend service → **Environment** tab
2. Add these environment variables (replace with your values):

```
DB_URL=postgresql://petstore:PASSWORD@HOST:PORT/petstore
DB_USER=petstore
DB_PASSWORD=PASSWORD
ALLOWED_ORIGINS=https://petstore-frontend.onrender.com
SPRING_PROFILES_ACTIVE=prod
SERVER_PORT=8080
```

**Where to find these values from the Database page:**
- Open your PostgreSQL database
- Copy the **Internal Database URL** - it looks like:
  ```
  postgresql://petstore:somehashhere@dpg-xxxx.onrender.com:5432/petstore
  ```
- Extract: username, password, host, port, database name

3. Click **Save** - backend will automatically redeploy

### Step 4: Deploy Frontend
1. Click **New +** → **Static Site**
2. Select your GitHub repository
3. Fill in:
   - **Name**: `petstore-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
   - **Root Directory**: (leave empty)
4. Click **Create Static Site** - it will deploy automatically

### Step 5: Update Frontend Environment (Optional)
If frontend build command needs the API URL:
1. Go to frontend → **Environment** tab
2. Add:
   ```
   VITE_API_URL=https://petstore-backend.onrender.com
   ```
3. Click **Save** - frontend will rebuild

---

## ✅ Verify Deployment

### Test Backend
```bash
curl https://petstore-backend.onrender.com/api/pets
```
Should return JSON array of pets

### Test Frontend
- Open https://petstore-frontend.onrender.com
- You should see the pet gallery
- Try adding/editing/deleting pets

### Check Logs
If something doesn't work:
1. Go to service → **Logs** tab
2. Look for errors
3. Check database connection

---

## 🔧 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| **Backend fails to start** | Check "DB_URL" format and credentials in Environment vars |
| **Frontend can't connect to API** | Check "ALLOWED_ORIGINS" includes frontend domain |
| **Database connection timeout** | Ensure DB_URL uses "Internal Database URL" (not public) |
| **Build fails (frontend)** | Check build logs; ensure `vite build` works locally first |
| **500 error on API calls** | Check backend logs; may need to run schema.sql manually |

---

## 📈 Initialize Database with Data

### Option 1: Auto-load with DataLoader (Recommended)
Your `DataLoader.java` should auto-create sample data on startup.

### Option 2: Manual SQL Execution
If needed, connect to PostgreSQL and run:

```bash
# Get internal database URL from dashboard
psql postgresql://petstore:PASSWORD@HOST:PORT/petstore
```

Then run queries from `backend/src/main/resources/schema.sql`

---

## 🌐 Custom Domain (Optional)

1. Go to your service → **Settings**
2. Scroll to **Custom Domain**
3. Add your domain (e.g., `api.mydomain.com`)
4. Update DNS records as instructed
5. Update `ALLOWED_ORIGINS` in backend environment variables

---

## 📊 Monitor Your Services

- **Backend Logs**: Service → Logs (check for errors)
- **Frontend Logs**: Service → Logs (check build output)
- **Database**: PostgreSQL service → Logs
- **Usage/Performance**: Dashboard overview

---

## 🔐 Security Notes

- Never commit `.env` files with real credentials
- Use Render's Environment Variables for all secrets
- Keep `DB_PASSWORD` secret (Render hides it in UI)
- Update `ALLOWED_ORIGINS` to actual domain only

---

## 🚀 Next Steps

1. ✅ Services deployed
2. ⚠️ If issues occur, check logs and troubleshoot
3. 🎯 Set up auto-deploys (push to main = auto-deploy)
4. 📊 Add error tracking/monitoring
5. 🔐 Configure custom domains and SSL

---

## 📞 Still Need Help?

- **Render Docs**: https://render.com/docs
- **Check Service Logs**: Most errors are visible in logs
- **Test Locally First**: Ensure app works locally before deploying

---

## Deployment Checklist

- [ ] GitHub repo ready with code pushed
- [ ] PostgreSQL database created on Render
- [ ] Backend service created and environment vars set
- [ ] Frontend static site created
- [ ] Backend loads successfully (no errors in logs)
- [ ] Frontend builds successfully
- [ ] API endpoint responds with data
- [ ] Frontend can display pets from API
- [ ] CRUD operations work (add/edit/delete pets)

**When all checkmarks are complete, your app is live!** 🎉
