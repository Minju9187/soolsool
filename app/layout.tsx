import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import QueryProvider from "@/components/providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "soolsool (술술)",
  description: "개인 커스텀 테이스팅 노트 & 달력 기반 음주 다이어리",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full bg-slate-50 dark:bg-zinc-950 flex justify-center text-slate-900 dark:text-slate-50">
        <QueryProvider>
          <main className="w-full max-w-md bg-white dark:bg-zinc-900 min-h-full flex flex-col shadow-sm relative overflow-x-hidden">
            <div className="flex-1 pb-16">
              {children}
            </div>
            <BottomNav />
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}
