import "@/app/globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";

const geistSans = Geist({
    subsets: ["latin"],
    variable: "--font-geist-sans",
});
const geistMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-geist-mono",
});

export const metadata: Metadata = {
    title: "Detective Game",
    description: "Интерактивное расследование",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru" className={`${geistSans.variable} ${geistMono.variable}`}>
        <body className="font-sans antialiased bg-background text-foreground">
        {children}
        </body>
        </html>
    );
}