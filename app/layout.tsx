import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

const cormorant = Cormorant_Garamond({
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["cyrillic", "latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Сон & Уют - Магазин кроватей и диванов",
  description:
    "Современный интернет-магазин премиальных кроватей и диванов с минималистичным дизайном.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${inter.variable}`} suppressHydrationWarning>
      <body
        className="font-sans text-gray-900 bg-white antialiased flex flex-col min-h-screen"
        suppressHydrationWarning
      >
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="flex-grow pt-20">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
