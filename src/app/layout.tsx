import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Siratul Islam Siam | Web Developer & Problem Solver",
  description:
    "I build modern, high-performance websites and web applications that help businesses grow. Clean code, creative design and a focus on real results.",
  keywords: [
    "Siratul Islam Siam",
    "Siam Portfolio",
    "Web Developer",
    "Frontend Developer",
    "Full Stack Developer",
    "Next.js",
    "React",
    "Bangladesh",
  ],
  authors: [{ name: "Siratul Islam Siam" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#07090e",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#07090e] text-slate-100 antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
