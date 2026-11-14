const AUTH_TOKEN_KEY = "novaAuthToken";
const AUTH_USER_KEY = "novaAuthUser";
export const AUTH_CHANGED_EVENT = "nova-auth-changed";

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function getCurrentUser() {
  try {
    const user = localStorage.getItem(AUTH_USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

export function saveAuthSession({ token, user }) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

export function clearAuthSession() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}
