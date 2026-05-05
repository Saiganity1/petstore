This directory is intended for generated API clients derived from `spec/api.yaml`.

To generate a TypeScript client (example using `openapi-generator-cli`):

```bash
# install openapi-generator-cli (Java needed)
npm install @openapitools/openapi-generator-cli -g

openapi-generator-cli generate \
  -i spec/api.yaml \
  -g typescript-axios \
  -o frontend/src/clients/api
```

Or use `openapi-typescript` for a lightweight type-only client:

```bash
npx openapi-typescript spec/api.yaml --output frontend/src/clients/types.ts
```

After generation, import the client and use it in the app instead of raw `fetch` calls.
