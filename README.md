
# Petstore Application

A full-stack e-commerce pet marketplace built with Spring Boot 3.2 (Java 21) backend and React 18 (Vite) frontend.

## ✨ Features

- ✅ RESTful API for pet CRUD operations
- ✅ Responsive pet gallery with filtering
- ✅ Search by name & filter by species
- ✅ Add new pets with form dialog
- ✅ PostgreSQL persistent storage
- ✅ CORS-enabled for frontend
- ✅ Environment-based configuration
- ✅ Production-ready builds
- ✅ OpenAPI/Swagger documentation

## 🛠 Tech Stack

**Backend:** Java 21 | Spring Boot 3.2 | PostgreSQL | Maven
**Frontend:** React 18 | Vite 5 | Material-UI | Tailwind CSS

## 🚀 Quick Start (Local)

### Prerequisites
- Java 21+ 
- Maven 3.9.15+
- Node.js 22+ & npm
- PostgreSQL 15+

### Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
# Runs on http://localhost:8080
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

### Database Setup
```bash
# Create database
createdb petstore
createuser petstore_user --password  # password: petstore_pass

# Setup tables & permissions
python fix_db.py
```

## 📦 Production Build

### Backend (JAR)
```bash
cd backend
mvn clean package
java -jar target/petstore-backend-*.jar
```

### Frontend (Static Site)
```bash
cd frontend
npm install
npm run build
# Serve dist/ directory
```

## ⚙️ Environment Configuration

### Frontend (.env)
```
VITE_API_URL=http://localhost:8080
```

### Backend (application.properties)
```
DB_URL=jdbc:postgresql://localhost:5432/petstore
DB_USER=petstore_user
DB_PASSWORD=petstore_pass
ALLOWED_ORIGINS=http://localhost:5173
```

See `.env.example` files in frontend/ and backend/ for full options.

## 📚 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/pets` | List all pets |
| GET | `/api/pets?q=name` | Search by name |
| GET | `/api/pets?species=Dog` | Filter by species |
| POST | `/api/pets` | Create pet |
| PUT | `/api/pets/{id}` | Update pet |
| DELETE | `/api/pets/{id}` | Delete pet |

API docs: http://localhost:8080/swagger-ui.html

## 🐳 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for:
- Docker setup
- Render cloud deployment
- Environment variables
- Database configuration

## 📋 Checklist for Production

- [x] Backend builds successfully: `mvn clean package`
- [x] Frontend builds successfully: `npm run build`
- [x] Environment variables configurable
- [x] Database connection pooling ready
- [x] CORS configured for frontend URL
- [x] API responses validated
- [x] Error handling in place
- [x] Swagger/OpenAPI docs generated

## 📂 Project Structure

```
petstore/
├── backend/              # Spring Boot API
│   ├── src/main/java/com/petstore/
│   ├── pom.xml
│   └── target/          # Build output
├── frontend/            # React app  
│   ├── src/
│   ├── package.json
│   └── dist/           # Build output
├── spec/               # OpenAPI contract
└── DEPLOYMENT.md       # Deployment guide
```

## 🔗 GitHub Repository

https://github.com/Saiganity1/petstore.git

## ❓ Troubleshooting

**Database permission error?**
```sql
GRANT USAGE ON SCHEMA public TO petstore_user;
GRANT CREATE ON SCHEMA public TO petstore_user;
```

**Frontend can't reach backend?**
- Check `VITE_API_URL` in .env
- Verify backend is running on port 8080
- Check browser console for CORS errors

**Build fails?**
- Backend: `mvn clean install -DskipTests`
- Frontend: `npm install && npm run build`

