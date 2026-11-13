import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { request } from "../api/request.api";
import { saveAuthSession } from "../services/auth.storage";
import "./auth.css";

export default function AuthPage({ mode }) {
  const isRegister = mode === "register";
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");

    if (isRegister && password !== confirmPassword) {
      setErrorMessage("Mật khẩu xác nhận không khớp");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await request({
        reqPATH: isRegister ? "/users/register" : "/users/login",
        method: "POST",
        data: isRegister ? { name, email, password } : { email, password },
      });
      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        if (response.status === 404) {
          throw new Error(
            "Không tìm thấy API tài khoản. Hãy khởi động lại backend trong thư mục BE rồi thử lại.",
          );
        }
        throw new Error(
          `Máy chủ trả về phản hồi không hợp lệ (HTTP ${response.status}). Hãy kiểm tra backend.`,
        );
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Không thể xác thực tài khoản");
      }

      saveAuthSession(data);
      const redirectTo = searchParams.get("redirect");
      navigate(redirectTo?.startsWith("/") ? redirectTo : "/", {
        replace: true,
      });
    } catch (error) {
      setErrorMessage(error.message || "Không thể kết nối máy chủ");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="auth-title">
        <Link className="auth-brand" to="/">
          NovaMark
        </Link>
        <p className="auth-eyebrow">MUA SẮM THÔNG MINH</p>
        <h1 id="auth-title">{isRegister ? "Tạo tài khoản" : "Chào mừng trở lại"}</h1>
        <p className="auth-description">
          {isRegister
            ? "Đăng ký để lưu giỏ hàng và nhận gợi ý phù hợp với bạn."
            : "Đăng nhập để tiếp tục trải nghiệm mua sắm."}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegister && (
            <label>
              Họ và tên
              <input
                autoComplete="name"
                maxLength={100}
                onChange={(event) => setName(event.target.value)}
                required
                value={name}
              />
            </label>
          )}
          <label>
            Email
            <input
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
              required
              type="email"
              value={email}
            />
          </label>
          <label>
            Mật khẩu
            <input
              autoComplete={isRegister ? "new-password" : "current-password"}
              minLength={isRegister ? 8 : undefined}
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              value={password}
            />
          </label>
          {isRegister && (
            <label>
              Nhập lại mật khẩu
              <input
                autoComplete="new-password"
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
                type="password"
                value={confirmPassword}
              />
            </label>
          )}

          {errorMessage && (
            <p className="auth-error" role="alert">
              {errorMessage}
            </p>
          )}
          <button className="auth-submit" disabled={isSubmitting} type="submit">
            {isSubmitting
              ? "Đang xử lý..."
              : isRegister
                ? "Đăng ký"
                : "Đăng nhập"}
          </button>
        </form>

        <p className="auth-switch">
          {isRegister ? "Đã có tài khoản?" : "Bạn chưa có tài khoản?"}{" "}
          <Link to={isRegister ? "/login" : "/register"}>
            {isRegister ? "Đăng nhập" : "Đăng ký ngay"}
          </Link>
        </p>
        <Link className="auth-home-link" to="/">
          Quay lại trang chủ
        </Link>
      </section>
    </main>
  );
}
