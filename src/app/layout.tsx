import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeAegis — From Intent to Prevent",
  description:
    "AI-powered software security and engineering intelligence platform connecting requirements, architecture, and secure source code.",
  icons: {
    icon: "/images/codeaegis-icon.svg",
    shortcut: "/images/codeaegis-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full bg-[#090D18] text-slate-100 flex flex-col font-sans selection:bg-blue-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
