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
  const [fieldErrors, setFieldErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field, setter, value) {
    setter(value);
    setFieldErrors((currentErrors) => {
      const nextErrors = { ...currentErrors, [field]: "" };
      if (field === "password" || field === "confirmPassword") {
        nextErrors.password = "";
        nextErrors.confirmPassword = "";
      }
      return nextErrors;
    });
    setErrorMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFieldErrors({});
    setErrorMessage("");

    const errors = {};
    if (isRegister && !name.trim()) {
      errors.name = "Vui lòng nhập họ tên";
    } else if (isRegister && name.trim().length > 40) {
      errors.name = "Họ tên không được vượt quá 40 ký tự";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = "Email không hợp lệ";
    }
    if (!password) {
      errors.password = "Vui lòng nhập mật khẩu";
    } else if (isRegister && password.length < 8) {
      errors.password = "Mật khẩu cần có ít nhất 8 ký tự";
    }
    if (isRegister && !confirmPassword) {
      errors.confirmPassword = "Vui lòng nhập lại mật khẩu";
    } else if (isRegister && password !== confirmPassword) {
      errors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
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
      const message = error.message || "Không thể kết nối máy chủ";
      if (/họ tên/i.test(message)) {
        setFieldErrors({ name: message });
      } else if (/email/i.test(message)) {
        setFieldErrors({ email: message });
      } else if (/mật khẩu/i.test(message) && isRegister) {
        setFieldErrors({ password: message });
      } else {
        setErrorMessage(message);
      }
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

        <form className="auth-form" noValidate onSubmit={handleSubmit}>
          {isRegister && (
            <label>
              Họ và tên
              <input
                aria-describedby={fieldErrors.name ? "name-error" : undefined}
                aria-invalid={Boolean(fieldErrors.name)}
                autoComplete="name"
                maxLength={100}
                onChange={(event) =>
                  updateField("name", setName, event.target.value)
                }
                value={name}
              />
              {fieldErrors.name && (
                <span className="auth-field-error" id="name-error" role="alert">
                  {fieldErrors.name}
                </span>
              )}
            </label>
          )}
          <label>
            Email
            <input
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
              aria-invalid={Boolean(fieldErrors.email)}
              autoComplete="email"
              onChange={(event) =>
                updateField("email", setEmail, event.target.value)
              }
              type="email"
              value={email}
            />
            {fieldErrors.email && (
              <span className="auth-field-error" id="email-error" role="alert">
                {fieldErrors.email}
              </span>
            )}
          </label>
          <label>
            Mật khẩu
            <input
              aria-describedby={
                fieldErrors.password ? "password-error" : undefined
              }
              aria-invalid={Boolean(fieldErrors.password)}
              autoComplete={isRegister ? "new-password" : "current-password"}
              onChange={(event) =>
                updateField("password", setPassword, event.target.value)
              }
              type="password"
              value={password}
            />
            {fieldErrors.password && (
              <span
                className="auth-field-error"
                id="password-error"
                role="alert"
              >
                {fieldErrors.password}
              </span>
            )}
          </label>
          {isRegister && (
            <label>
              Nhập lại mật khẩu
              <input
                aria-describedby={
                  fieldErrors.confirmPassword
                    ? "confirm-password-error"
                    : undefined
                }
                aria-invalid={Boolean(fieldErrors.confirmPassword)}
                autoComplete="new-password"
                onChange={(event) =>
                  updateField(
                    "confirmPassword",
                    setConfirmPassword,
                    event.target.value,
                  )
                }
                type="password"
                value={confirmPassword}
              />
              {fieldErrors.confirmPassword && (
                <span
                  className="auth-field-error"
                  id="confirm-password-error"
                  role="alert"
                >
                  {fieldErrors.confirmPassword}
                </span>
              )}
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
