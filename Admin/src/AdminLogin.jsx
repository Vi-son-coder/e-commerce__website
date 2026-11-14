import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL, saveAdminToken } from "./api";

export default function AdminLogin({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const contentType = response.headers.get("content-type") || "";
      const loginData = contentType.includes("application/json")
        ? await response.json()
        : null;

      if (!response.ok || !loginData?.token) {
        throw new Error(
          loginData?.message || `Không thể đăng nhập (HTTP ${response.status}).`,
        );
      }

      const accessResponse = await fetch(`${API_BASE_URL}/admin/dashboard`, {
        headers: { Authorization: `Bearer ${loginData.token}` },
      });
      if (accessResponse.status === 403) {
        throw new Error("Tài khoản này chưa được cấp quyền quản trị.");
      }
      if (!accessResponse.ok) {
        throw new Error(
          `Không thể xác thực quyền quản trị (HTTP ${accessResponse.status}).`,
        );
      }

      saveAdminToken(loginData.token);
      onLogin();
      navigate("/", { replace: true });
    } catch (error) {
      setErrorMessage(error.message || "Không thể kết nối máy chủ.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="admin-login-page">
      <section aria-labelledby="admin-login-title" className="admin-login-card">
        <Link aria-label="NovaMark Admin" className="admin-brand" to="/login">
          <span className="admin-brand-mark">N</span>
          <span>
            <strong>NovaMark</strong>
            <small>ADMIN CONSOLE</small>
          </span>
        </Link>
        <p className="admin-eyebrow">KHU VỰC QUẢN TRỊ</p>
        <h1 id="admin-login-title">Đăng nhập quản trị</h1>
        <p className="admin-login-description">
          Đăng nhập bằng tài khoản đã được cấp quyền quản trị cửa hàng.
        </p>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              autoComplete="username"
              onChange={(event) => setEmail(event.target.value)}
              required
              type="email"
              value={email}
            />
          </label>
          <label>
            Mật khẩu
            <input
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              value={password}
            />
          </label>
          {errorMessage && (
            <p className="admin-login-error" role="alert">
              {errorMessage}
            </p>
          )}
          <button
            className="admin-button admin-button-primary"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Đang xác thực..." : "Đăng nhập"}
          </button>
        </form>
        <a
          className="admin-login-store-link"
          href={import.meta.env.VITE_STORE_URL || "http://localhost:5173"}
        >
          ← Trở về trang bán hàng
        </a>
      </section>
    </main>
  );
}
