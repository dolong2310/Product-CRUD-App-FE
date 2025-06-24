import { poppins } from "@/public/fonts";
import type { Metadata } from "next";
import "./globals.css";
import { openGraphBase } from "./shared-metadata";
import envConfig from "@/config/envConfig";

export const metadata: Metadata = {
  metadataBase: new URL(envConfig.NEXT_PUBLIC_URL),
  title: {
    default: "Grocery Mart",
    template: "%s | Grocery Mart",
  },
  description: "Grocery Mart is a modern grocery shopping experience.",
  openGraph: openGraphBase,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  );
}
