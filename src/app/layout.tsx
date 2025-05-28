import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Purwantara Tools",
  description: "made with ❤️ by gepe",
  icons: {
    icon: "/favicon.ico",
  },
  authors: [
    {
      name: "gepe",
      url: "https://github.com/ilhamgepe",
    },
    {
      name: "purwantara Team",
      url: "https://purwantara.id",
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={`${plusJakartaSans.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
