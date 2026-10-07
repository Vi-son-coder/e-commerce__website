import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const input = "border rounded-xl p-3 w-full focus:outline-none focus:border-blue-500";

export default function AuthModal() {
  const { modal, openAuth, closeAuth, login, register } = useAuth();
  const [form, setForm] = useState({ identifier: "", username: "", email: "", password: "", full_name: "", phone: "", address: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (!modal) return null;
  const isLogin = modal === "login";
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (isLogin) {
        await login(form.identifier.trim(), form.password);
      } else {
        const { identifier: _i, ...payload } = form;
        await register(payload);
      }
      closeAuth();
      setForm((f) => ({ ...f, password: "" }));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center" onClick={closeAuth}>
      <form onSubmit={submit} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl p-7 w-[420px] flex flex-col gap-3 shadow-xl">
        <div className="flex justify-between items-center">
          <p className="font-bold text-xl">{isLogin ? "Đăng nhập NovaMark" : "Tạo tài khoản"}</p>
          <button type="button" onClick={closeAuth} className="cursor-pointer text-xl leading-none">×</button>
        </div>

        {isLogin ? (
          <input className={input} placeholder="Tên đăng nhập hoặc email" value={form.identifier} onChange={set("identifier")} required />
        ) : (
          <>
            <input className={input} placeholder="Tên đăng nhập (tối thiểu 3 ký tự)" value={form.username} onChange={set("username")} required />
            <input className={input} type="email" placeholder="Email" value={form.email} onChange={set("email")} required />
            <input className={input} placeholder="Họ và tên" value={form.full_name} onChange={set("full_name")} />
            <input className={input} placeholder="Số điện thoại" value={form.phone} onChange={set("phone")} />
            <input className={input} placeholder="Địa chỉ giao hàng" value={form.address} onChange={set("address")} />
          </>
        )}
        <input className={input} type="password" placeholder={isLogin ? "Mật khẩu" : "Mật khẩu (tối thiểu 8 ký tự)"} value={form.password} onChange={set("password")} required />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button disabled={busy} className="bg-[#004AC6] !text-white rounded-xl p-3 font-medium cursor-pointer disabled:opacity-60">
          {busy ? "Đang xử lý..." : isLogin ? "Đăng nhập" : "Đăng ký"}
        </button>
        <p className="text-sm text-center">
          {isLogin ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
          <button type="button" className="!text-[#004AC6] font-medium cursor-pointer" onClick={() => { setError(""); openAuth(isLogin ? "register" : "login"); }}>
            {isLogin ? "Đăng ký" : "Đăng nhập"}
          </button>
        </p>
      </form>
    </div>
  );
}
