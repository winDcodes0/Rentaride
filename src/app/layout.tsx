import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rentaride | Premium Immersive Bookings & Bhadarwah Escapes",
  description: "Experience dark futuristic luxury travel bookings in Bhadarwah, Mini Kashmir. Explore Jai Valley, Guldanda Pass, and Padri Meadow. Plan your next elite escape seamlessly.",
  keywords: "rentaride, Bhadarwah travel, Mini Kashmir, Jai Valley, Guldanda, luxury travel, immersive booking, private concierge",
  authors: [{ name: "Rentaride Concierge" }],
  openGraph: {
    title: "Rentaride | Premium Immersive Travel & Bhadarwah Bookings",
    description: "Experience the psychological journey of elite luxury travel to Jai Valley and Guldanda. Discover, Explore, Trust, Book, and Confirm your premium getaway.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-bg-base text-white">
        {children}
      </body>
    </html>
  );
}
