import { useLocation } from "react-router-dom";

export default function Breadcrumb() {
  // useLocation dùng để lấy thông tin chi tiết về URL hiện tại user đang truy cập, khi khai báo 1 biến x = useLocation() thì x sẽ chứa 5 thuộc tính chính: pathname:"/san-pham/123" , search: "?category=mobile", hash: "#thong-so-ky-thuat",state: { from: "/home" }, key
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter((x) => x);

  return (
    <div className="text-xs text-gray-500 flex items-center space-x-1 py-2">
      <span>Trang chủ</span>
      {pathSegments.map((p) => {
        return (
          <>
            <span>&gt;</span>
            <span>{p}</span>
          </>
        );
      })}
    </div>
  );
}
