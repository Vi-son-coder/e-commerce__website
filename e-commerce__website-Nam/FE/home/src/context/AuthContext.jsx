import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api, getToken, setToken, setUnauthorizedHandler } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(() => !!getToken());
  const [modal, setModal] = useState(null); // null | "login" | "register"

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  // Khôi phục phiên đăng nhập từ token đã lưu
  useEffect(() => {
    setUnauthorizedHandler(logout);
    if (!getToken()) return;
    api
      .me()
      .then(setUser)
      .catch(() => setToken(null))
      .finally(() => setChecking(false));
  }, [logout]);

  const login = useCallback(async (identifier, password) => {
    const { token, user } = await api.login(identifier, password);
    setToken(token);
    setUser(user);
    return user;
  }, []);

  const register = useCallback(async (payload) => {
    const { token, user } = await api.register(payload);
    setToken(token);
    setUser(user);
    return user;
  }, []);

  const value = useMemo(
    () => ({
      user,
      checking,
      login,
      register,
      logout,
      modal,
      openAuth: (mode = "login") => setModal(mode),
      closeAuth: () => setModal(null),
    }),
    [user, checking, login, register, logout, modal]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
