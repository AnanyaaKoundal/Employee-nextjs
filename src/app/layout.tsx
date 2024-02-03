import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from '../components/navbar/navbar'

const inter = Inter({ subsets: ["latin"] });

// Define metadata outside of the component
export const metadata: Metadata = {
  title: "Chit Chat",
  description: "The blogging App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
