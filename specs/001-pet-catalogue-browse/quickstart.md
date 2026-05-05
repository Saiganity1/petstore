# Quickstart: Browse Pet Catalogue with Category Filtering

Prerequisites: Java 17, Maven 3.8+, Node 20, PostgreSQL 15

1. Start Postgres locally or via `docker-compose up -d`.
2. Configure `backend/src/main/resources/application.yml` or env vars for DB connection.
3. Run backend: `mvn spring-boot:run` (Flyway migrations will run automatically).
4. Start frontend: `npm install` then `npm run dev`.
5. Verify: open `http://localhost:5173` and confirm pet grid loads.

Manual verification steps are listed (browse, filter, detail, URL persistence, image fallback, error handling).
