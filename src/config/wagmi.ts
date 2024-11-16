"use client";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import {
  mainnet,
  sepolia,
  polygon,
  optimism,
  arbitrum,
  base,
} from "wagmi/chains";

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

export const metadata = {
  name: "Superbase",
  description: "Superbase bridge aggregator",
  url: "http://localhost:3000", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create wagmiConfig
const chains = [mainnet, polygon, optimism, arbitrum, base] as const;
// export const config = defaultWagmiConfig({
//   chains,
//   projectId,
//   metadata,
//   ssr: true,
// });

export const config = getDefaultConfig({
  appName: "Superbase",
  projectId,
  chains,
  transports: chains.reduce(
    (obj, chain) => ({ ...obj, [chain.id]: http() }),
    {}
  ),
  ssr: true, // If your dApp uses server side rendering (SSR)
});
