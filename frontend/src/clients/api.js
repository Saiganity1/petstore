const trimTrailingSlash = (value) => value.replace(/\/+$/, "");

const resolveRenderBackendUrl = () => {
  if (typeof window === "undefined") {
    return "";
  }

  const host = window.location.hostname;
  const match = host.match(/^petstore-frontend(-[a-z0-9]+)?\.onrender\.com$/i);
  if (!match) {
    return "";
  }

  const suffix = match[1] || "";
  return `https://petstore-backend${suffix}.onrender.com`;
};

const resolveApiBaseUrl = () => {
  const envUrl = (import.meta.env.VITE_API_URL || "").trim();
  if (envUrl) {
    return trimTrailingSlash(envUrl);
  }

  const inferredRenderUrl = resolveRenderBackendUrl();
  if (inferredRenderUrl) {
    return inferredRenderUrl;
  }

  return "http://localhost:8080";
};

export const API_BASE_URL = resolveApiBaseUrl();

const buildError = async (response, fallbackMessage) => {
  const text = await response.text();
  const body = text ? ` - ${text}` : "";
  return new Error(`HTTP ${response.status}${body || ` - ${fallbackMessage}`}`);
};

const parseResponse = async (response) => {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, options);
  if (!response.ok) {
    throw await buildError(response, "Request failed");
  }
  return parseResponse(response);
};

export const getPets = async (params = {}) => {
  const query = new URLSearchParams();
  if (params.q) query.set("q", params.q);
  if (params.species) query.set("species", params.species);

  const querySuffix = query.toString() ? `?${query.toString()}` : "";
  const data = await request(`/api/pets${querySuffix}`);
  return Array.isArray(data) ? data : [];
};

export const createPet = (payload) =>
  request("/api/pets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

export const updatePet = (id, payload) =>
  request(`/api/pets/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

export const deletePet = (id) =>
  request(`/api/pets/${id}`, {
    method: "DELETE",
  });
