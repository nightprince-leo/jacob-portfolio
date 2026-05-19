/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Expose Web3Forms key to the browser (free tier requires client-side submit).
  // Vercel: set WEB3FORMS_ACCESS_KEY or NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY, then redeploy.
  env: {
    NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY:
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
      process.env.WEB3FORMS_ACCESS_KEY ||
      '',
  },
};

module.exports = nextConfig;
