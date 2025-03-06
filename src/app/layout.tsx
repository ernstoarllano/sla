import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Lato, Playfair_Display } from "next/font/google";

import { Providers } from "@/components/providers";

import "@/app/globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Solace Candidate Assignment",
  description: "Show us what you got",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
