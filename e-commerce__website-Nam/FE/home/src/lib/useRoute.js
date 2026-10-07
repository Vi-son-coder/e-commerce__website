import { useEffect, useState } from "react";

// Router hash tối giản (không cần cài react-router): #/  #/product/3  #/cart  #/checkout  #/orders
const read = () => window.location.hash.replace(/^#/, "") || "/";

export function useRoute() {
  const [path, setPath] = useState(read);
  useEffect(() => {
    const onChange = () => setPath(read());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return path;
}

export function navigate(to) {
  if (read() === to) window.scrollTo(0, 0);
  else window.location.hash = to;
}

// Chuyển sang trang mới thì cuộn lên đầu
if (typeof window !== "undefined") {
  window.addEventListener("hashchange", () => window.scrollTo(0, 0));
}
