import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import AdminLogin from "./AdminLogin";
import { clearAdminToken, getAdminToken } from "./api";
import "./app.css";

function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => Boolean(getAdminToken()),
  );

  function logout() {
    clearAdminToken();
    setIsAuthenticated(false);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate replace to="/" />
            ) : (
              <AdminLogin onLogin={() => setIsAuthenticated(true)} />
            )
          }
        />
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <AdminDashboard onLogout={logout} />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return <AdminApp />;
}
