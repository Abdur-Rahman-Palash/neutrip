import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShareTrip Clone - Flights, Hotels & Holiday Packages | Best Travel Deals",
  description: "Book flights, hotels, and holiday packages at unbeatable prices. Your trusted travel partner for domestic and international destinations. 24/7 customer support.",
  keywords: ["flights", "hotels", "holiday packages", "travel booking", "cheap flights", "hotel deals", "vacation packages", "travel agency"],
  authors: [{ name: "ShareTrip Clone" }],
  openGraph: {
    title: "ShareTrip Clone - Best Travel Deals",
    description: "Book flights, hotels, and holiday packages at unbeatable prices",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShareTrip Clone - Best Travel Deals",
    description: "Book flights, hotels, and holiday packages at unbeatable prices",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
