import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  // Lưu ý: output: 'export' không hỗ trợ redirects trong next.config.ts
  // Chúng ta sẽ xử lý bằng cách tạo các file tương ứng nếu cần.
};

export default nextConfig;
