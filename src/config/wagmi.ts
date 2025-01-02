'use client';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  bsc,
  gnosis,
  zksync,
  polygonZkEvm,
  mantle,
  mode,
  avalanche,
  inkSepolia,
  linea,
  blast,
  scroll,
  zora,
  aurora,
} from 'wagmi/chains';

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error('Project ID is not defined');

export const metadata = {
  name: 'Superbase',
  description: 'Superbase bridge aggregator',
  url: 'http://localhost:3000', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

// Create wagmiConfig
export const supportedChains = [
  mainnet,
  optimism,
  bsc,
  gnosis,
  polygon,
  zksync,
  polygonZkEvm,
  mantle,
  base,
  mode,
  arbitrum,
  avalanche,
  inkSepolia,
  linea,
  blast,
  scroll,
  zora,
  aurora,
] as const;
export const config = getDefaultConfig({
  appName: 'Superbase',
  projectId,
  chains: supportedChains,
  transports: supportedChains.reduce((obj, chain) => ({ ...obj, [chain.id]: http() }), {}),
  ssr: true,
});
