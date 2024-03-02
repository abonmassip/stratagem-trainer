import type { Metadata } from "next";
import { Kdam_Thmor_Pro } from "next/font/google";
import "./globals.css";

const font = Kdam_Thmor_Pro({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stratagem Trainer",
  description: "Help us spread Managed Democracy!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={font.className}
        style={{ backgroundImage: `url("/bg/1.webp")` }}
      >
        {children}
      </body>
    </html>
  );
}
