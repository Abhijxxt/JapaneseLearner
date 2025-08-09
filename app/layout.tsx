import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import { Toaster } from "sonner";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Japanese Vocabulary Learner",
  description: "A Japanese vocabulary tool to learn and practice vocabulary and get better. Here, you can learn Japanese words and even Kanji words.",
  category: "Education",
  keywords: [
    "Japanese",
    "Vocabulary",
    "Learner",
    "Education",
    "Language Learning",
    "Kanji",
    "Hiragana",
    "Katakana",
    "Words",
    "Vocabulary Practice",
    "Vocabulary Test",
  ],
  authors: [{name: "Abhijeet Chatterjee"}],
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Japanese Vocabulary Learner</title>
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
        <Toaster richColors/>
        {children}
      </body>
    </html>
  );
}
