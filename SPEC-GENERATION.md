# Regenerating API clients and Spec-kit notes

This project includes a minimal Spec-kit skeleton. The authoritative API contract is at `spec/api.yaml`.

Generate a TypeScript client (axios) using `openapi-generator-cli`:

```bash
npm install @openapitools/openapi-generator-cli -g
openapi-generator-cli generate -i spec/api.yaml -g typescript-axios -o frontend/src/clients/api
```

Or generate types only:

```bash
npx openapi-typescript spec/api.yaml --output frontend/src/clients/types.ts
```

If you use a Spec-kit/Specify CLI, place templates in `.specify/templates` and run the generator per your organization's instructions.
