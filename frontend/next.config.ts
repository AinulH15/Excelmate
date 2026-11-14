import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Konfigurasi minimal untuk menghindari konflik Webpack di Windows
  productionBrowserSourceMaps: false,
};

export default nextConfig;