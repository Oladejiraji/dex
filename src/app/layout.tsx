import type { Metadata } from "next";
import "./globals.css";
import AppKitProvider from "@/context/wagmiContext";
import { Bounce, ToastContainer } from "react-toastify";
import NextTopLoader from "nextjs-toploader";
import "react-toastify/dist/ReactToastify.css";
import "@rainbow-me/rainbowkit/styles.css";
import MobileIndicator from "@/components/shared/MobileIndicator";
import config from "@/config";
import Metatags from "../components/shared/MetaTags";

export const metadata: Metadata = {
  title: "Superbase",
  description: "The greatest token swapper ever",
};

const prodMeta = {
  title: "Superbase",
  description: "The greatest token swapper ever 🤩😎",
  image:
    "https://firebasestorage.googleapis.com/v0/b/deji-firegram.appspot.com/o/Bee%203.png?alt=media&token=8bf25bc2-36fd-4c8d-96b2-da9faeb1439f",
  keywords: "crypto, bitcoin",
  siteName: "SUPERBASE",
  href: config.SITE_URL,
  url: config.SITE_URL,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Metatags data={prodMeta} />
      <html lang="en">
        <body className="bg-primary-100 relative">
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
            <div className="w-full h-full hidden lg:block">{children}</div>
            <div className="block lg:hidden h-full w-full">
              <MobileIndicator />
            </div>
          </AppKitProvider>
        </body>
      </html>
    </>
  );
}
