import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PronounceAI",
  description: "AI-powered English Pronunciation Assessment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased font-sans">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
