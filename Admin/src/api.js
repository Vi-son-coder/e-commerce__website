const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000"
).replace(/\/+$/, "");
const ADMIN_TOKEN_KEY = "novaAdminAuthToken";

export function getAdminToken() {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function saveAdminToken(token) {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearAdminToken() {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}

export async function request({ reqPATH = "", method = "GET", data = null }) {
  const headers = {};
  const token = getAdminToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (data !== null) headers["Content-Type"] = "application/json";

  return fetch(`${API_BASE_URL}${reqPATH}`, {
    method,
    headers,
    ...(data !== null ? { body: JSON.stringify(data) } : {}),
  });
}

export { API_BASE_URL };
