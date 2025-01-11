import type { Metadata } from 'next';
import './globals.css';
import AppKitProvider from '@/context/wagmiContext';
import { Bounce, ToastContainer } from 'react-toastify';
import NextTopLoader from 'nextjs-toploader';
import 'react-toastify/dist/ReactToastify.css';
import '@rainbow-me/rainbowkit/styles.css';

export const metadata: Metadata = {
  title: 'Superbase',
  description: 'The greatest token swapper ever',
  keywords: ['web3', 'ethereum', 'crypto', 'wallet', 'swap', 'bridge'],
  creator: 'Raji Oladeji',
  metadataBase: new URL('https://superbase.live'),
  openGraph: {
    images: '/assets/open-grapg.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        {/* <Metatags data={prodMeta} /> */}
        <body className="relative bg-primary-100">
          <div id="modal-root"></div>
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
          <AppKitProvider>{children}</AppKitProvider>
        </body>
      </html>
    </>
  );
}
