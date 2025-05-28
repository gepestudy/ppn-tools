import type { Metadata } from "next";

import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Purwantara Tools",
  description: "made with ❤️ by gepe",
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
      <body>
        {children}
      </body>
    </html>
  );
}
