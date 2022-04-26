/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["countryflagsapi.com"],
    },
    experimental: {
        esmExternals: false,
    },
};

module.exports = nextConfig;
