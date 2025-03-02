import type { Metadata } from 'next';
import './globals.css';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import AppKitProvider from '@/context/wagmiContext';
import { Bounce, ToastContainer } from 'react-toastify';
import NextTopLoader from 'nextjs-toploader';
import 'react-toastify/dist/ReactToastify.css';
import '@rainbow-me/rainbowkit/styles.css';

export const metadata: Metadata = {
  title: 'Superbase',
  description: 'Bridge aggregator built for fun',
  keywords: ['web3', 'ethereum', 'crypto', 'wallet', 'swap', 'bridge'],
  creator: 'Raji Oladeji',
  metadataBase: new URL('https://superbase.live'),
  openGraph: {
    images: '/assets/open-graph-com.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body className={'relative bg-primary-100'} id="body">
          <NextTopLoader color="#fff" showSpinner={false} />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
          <AppKitProvider>
            <NuqsAdapter>{children}</NuqsAdapter>
          </AppKitProvider>
        </body>
      </html>
    </>
  );
}
