import { useState } from "react";
 
export const NewsletterColumn = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Đăng ký thành công với email: ${email}`);
      setEmail('');
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-bold text-gray-900">Nhận bản tin ưu đãi</h3>
      <p className="text-sm leading-relaxed text-gray-600">
        Đăng ký nhận mã giảm giá 100K cho đơn hàng đầu tiên và thông tin flash sale AI.
      </p>

      {/* Form đăng ký */}
      <form onSubmit={handleSubmit} className="mt-1 flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Địa chỉ email của bạn..."
          required
          className="w-full rounded-xl bg-slate-100 px-4 py-2.5 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="shrink-0 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold !text-white hover:bg-blue-700 transition-colors"
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
};