import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
    NEXT_PUBLIC_FACTORY_CONTRACT_BSC_TESTNET: process.env.NEXT_PUBLIC_FACTORY_CONTRACT_BSC_TESTNET,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
