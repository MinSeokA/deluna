import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { Providers } from '@/app/lib/providers';

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const Gugi = localFont({
  src: "../fonts/Gugi-Regular.woff",
  variable: "--font-gugi",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Deluna Guilds",
  description: "Deluna is Discord bot to help you manage your server.",
  // 다크 모드 지원
};

export default function GuildsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${Gugi.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
