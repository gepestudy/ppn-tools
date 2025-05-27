
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from "@mantine/core";
import type { Metadata } from "next";

import "@mantine/core/styles.css";
import "./globals.css";
import { theme } from "./theme";

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
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="light">{children}</MantineProvider>
      </body>
    </html>
  );
}
