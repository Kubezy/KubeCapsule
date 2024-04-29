import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Banner from "./components/base/banner";
import "./globals.css";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KubeCapsule",
  description: "Kubernetes 10th Year Time Capsule Project",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="header">
          <Banner />
        </div>
        <div className="pt-14">
          {children}
        </div>
      </body>
    </html>
  );
}
