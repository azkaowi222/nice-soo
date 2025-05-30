import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "./components/layout-wrapper/LayoutWrapper";
import BodyWrapper from "./components/layout-wrapper/BodyWrapper";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nice soo marketplace",
  description: "Generated by create next app",
  icons: {
    icon: "/images/nice-so.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <BodyWrapper>
        <main
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <LayoutWrapper>{children}</LayoutWrapper>
        </main>
        {/* <TopNavbar />
        <Navbar /> */}
      </BodyWrapper>
    </html>
  );
}
