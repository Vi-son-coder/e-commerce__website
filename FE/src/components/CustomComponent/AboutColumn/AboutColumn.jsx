

export const AboutColumn = () => {
  const links = [
    'Giới thiệu nền tảng mua sắm thông minh',
    'Chương trình AI Partner & Affiliate',
    'Tuyển dụng nhân tài Tech & E-commerce',
    'Điều khoản dịch vụ & Bảo mật thông tin',
  ];

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-bold text-gray-900">Về NovaMart</h3>
      <ul className="space-y-2.5 text-sm text-gray-600">
        {links.map((link, index) => (
          <li key={index}>
            <a href="#" className="hover:text-gray-900 transition-colors">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};