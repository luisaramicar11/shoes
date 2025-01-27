import withPWA from "next-pwa";

const nextConfig = {
  reactStrictMode: true, // Configuración global de Next.js
};

export default withPWA({
  dest: "public", // Configuración específica para PWA
  disable: process.env.NODE_ENV === "development", // Desactiva el SW en desarrollo
  buildExcludes: [/middleware-manifest.json$/], // Evita conflictos con middleware
})(nextConfig);
