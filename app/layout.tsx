import type { Metadata } from "next";
import "./globals.css";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { ScanProvider } from "./context/ScanContext";
import { MotionProvider } from "@/components/MotionProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-aeonik",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-input",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pathway",
  description: "Track your digital footprint",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable}`}>
      <body className={`${inter.className} bg-background text-foreground`}>
        <MotionProvider>
          <ScanProvider>{children}</ScanProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
