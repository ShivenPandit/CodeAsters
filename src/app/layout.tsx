import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CodeAsters — Digital Solutions",
    template: "%s — CodeAsters",
  },
  description:
    "CodeAsters is a modern software development company that designs and builds websites, web applications, dashboards, ERP systems, mobile apps, and cloud-connected platforms with production-grade architecture.",
  keywords: [
    "web development",
    "software development",
    "digital solutions",
    "admin dashboard",
    "ERP systems",
    "mobile app development",
    "backend development",
    "full-stack development",
    "CodeAsters",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FAFAFB] text-[#0A0A0A]`}
      >
        <div className="noise-overlay" />
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
