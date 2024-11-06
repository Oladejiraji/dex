import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { config } from "@/config/wagmi";
import { cookieToInitialState } from "wagmi";
import AppKitProvider from "@/context/wagmiContext";
import { Bounce, ToastContainer } from "react-toastify";
import NextTopLoader from "nextjs-toploader";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));

  return (
    <html lang="en">
      <body className="bg-primary-100 relative h-screen">
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
        <AppKitProvider initialState={initialState}>{children}</AppKitProvider>
      </body>
    </html>
  );
}
