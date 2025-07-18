import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import IntroWrapper from './components/IntroWrapper';
import CursorLight from './components/CursorLight';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "YORE",
  description: "YORE ARTISAN WORKS",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <head>
        <title>YORE</title>
        <link rel="icon" type="image/png" href="/cursor-icon.png" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,100..900;1,100..900&display=swap"/>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <CursorLight />
        <IntroWrapper />
        {children}
      </body>
    </html>
  );
}
