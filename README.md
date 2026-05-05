
# Petstore

Monorepo with Spring Boot backend and React (Vite) frontend. This scaffold follows Spec-kit conventions and includes an OpenAPI contract at `spec/api.yaml`.

Quick start:

- Start Postgres via Docker Compose:

```bash
docker-compose up -d
```

- Build and run backend:

```bash
cd backend
mvn spring-boot:run
```

- Start frontend:

```bash
cd frontend
npm install
npm run dev
```

Spec-kit artifacts:

- OpenAPI spec: `spec/api.yaml`
- Spec-kit metadata marker: `spec-kit.json`

Notes:

- The backend exposes CRUD endpoints under `/api/pets` matching the OpenAPI contract.
- To generate strongly-typed clients from the spec, run e.g. `openapi-generator-cli` or integrate Spec-kit's client generator in CI.

