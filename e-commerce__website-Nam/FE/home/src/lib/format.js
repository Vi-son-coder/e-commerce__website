import { API_BASE } from "./api";

/** 25000000 -> "25.000.000" (component Product tự thêm "đ") */
export const formatNumber = (n) => new Intl.NumberFormat("vi-VN").format(Math.round(Number(n) || 0));
export const formatVND = (n) => `${formatNumber(n)}đ`;
export const formatDate = (d) =>
  new Date(d).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" });

// Ảnh placeholder nhẹ (thay vì dùng ảnh 4.9MB trong assets làm ảnh dự phòng)
export const PLACEHOLDER_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect width='200' height='200' fill='#EAEDFF'/><text x='100' y='108' font-family='sans-serif' font-size='14' fill='#8a8fa8' text-anchor='middle'>NovaMark</text></svg>`
  );

/** DB chỉ lưu tên file (vd "iphone17.jpg") -> backend phục vụ tại /images/<tên file>. */
export function resolveImage(image) {
  if (!image) return PLACEHOLDER_IMG;
  if (/^(https?:)?\/\//.test(image) || image.startsWith("data:")) return image;
  return `${API_BASE}/images/${encodeURIComponent(image)}`;
}
