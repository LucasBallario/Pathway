import type { Metadata } from "next";
import "./globals.css";
import { Lato } from 'next/font/google';

const lato = Lato({
  subsets: ['latin'], 
   weight: ['400', '700'], 
   display: 'swap',
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
    <html lang="en" className={lato.className}>
      <body className="bg-black"
      >
        {children}
      </body>
    </html>
  );
}
