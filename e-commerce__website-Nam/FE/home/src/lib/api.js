// Lớp gọi API duy nhất của frontend. Mọi component đi qua đây, không gọi fetch trực tiếp.
export const API_BASE = (import.meta.env.VITE_API_URL ?? "http://localhost:3000").replace(/\/$/, "");

const TOKEN_KEY = "novamark_token";
export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};
export const setToken = (token) => {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* localStorage bị chặn: bỏ qua */
  }
};

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

let onUnauthorized = null;
/** AuthContext đăng ký callback để tự đăng xuất khi token hết hạn. */
export const setUnauthorizedHandler = (fn) => {
  onUnauthorized = fn;
};

function toQuery(query) {
  const sp = new URLSearchParams();
  Object.entries(query ?? {}).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") sp.set(k, String(v));
  });
  const s = sp.toString();
  return s ? `?${s}` : "";
}

async function request(path, { method = "GET", body, query, auth = true } = {}) {
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  const token = getToken();
  if (auth && token) headers.Authorization = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(`${API_BASE}${path}${toQuery(query)}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(0, `Không kết nối được máy chủ (${API_BASE}). Hãy kiểm tra backend đã chạy chưa.`);
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    /* body rỗng hoặc không phải JSON */
  }

  if (!res.ok) {
    if (res.status === 401 && auth && token && onUnauthorized) onUnauthorized();
    throw new ApiError(res.status, data?.message ?? `Lỗi ${res.status}`);
  }
  return { data, headers: res.headers };
}

export const api = {
  // ---- auth ----
  login: async (identifier, password) =>
    (await request("/auth/login", { method: "POST", body: { username: identifier, password }, auth: false })).data,
  register: async (payload) =>
    (await request("/auth/register", { method: "POST", body: payload, auth: false })).data,
  me: async () => (await request("/auth/me")).data,

  // ---- catalog ----
  categories: async () => (await request("/categories")).data,
  /** Trả về { items, total }. params: q, category_id, sort, order, page, limit, in_stock, status */
  products: async (params) => {
    const { data, headers } = await request("/products", { query: params });
    return { items: data, total: Number(headers.get("X-Total-Count") ?? data.length) };
  },
  product: async (id) => (await request(`/products/${id}`)).data,

  // ---- orders ----
  checkout: async ({ shipping_address, items, pay }) =>
    (await request("/orders/checkout", { method: "POST", body: { shipping_address, items, pay } })).data,
  myOrders: async () => (await request("/orders/mine")).data,

  // ---- hành vi + gợi ý (hệ thống đề xuất) ----
  logBehavior: (payload) =>
    request("/behavior", { method: "POST", body: payload }).catch(() => null), // best-effort, không làm hỏng UI
  recommendationsByUser: async (userId) => (await request(`/recommendations/user/${userId}`)).data,
  generateRecommendations: async (userId, limit = 10) =>
    (await request(`/recommendations/generate/${userId}`, { method: "POST", body: { limit } })).data,
};
