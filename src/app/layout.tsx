import type { Metadata } from "next";
import "./globals.css";

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
      className="h-full antialiased"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&family=Outfit:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-bg-base text-white">
        {children}
      </body>
    </html>
  );
}
