import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  // Lưu ý: output: 'export' không hỗ trợ redirects trong next.config.ts
  // Chúng ta sẽ xử lý bằng cách tạo các file tương ứng nếu cần.
};

export default nextConfig;
