import { ReactNode } from "react";
import { Metadata } from "next";
// @ts-ignore
import "./globals.css";
import { AuthProvider } from "../contexts/AuthContext";

export const metadata: Metadata = {
  title: "MCE Celulares",
  description: "MCE Celulares",
  icons: {
    icon: "/img/icon-mcecelulares.png"
  },
};

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html>
      <body className="bg-[url('/img/home-background.png')] bg-fixed bg-top bg-repeat-y bg-[size:100%_auto]">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

export default Layout;