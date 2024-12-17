import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sombra Labs",
  description: "Sombra Labs",
};

const turret = localFont({
  src: [
    {
      path: "./../public/fonts/TurretRoad-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "./../public/fonts/TurretRoad-Medium.ttf",
      style: "normal",
      weight: "500",
    },
    {
      path: "./../public/fonts/TurretRoad-Bold.ttf",
      style: "normal",
      weight: "700",
    },
    {
      path: "./../public/fonts/TurretRoad-ExtraBold.ttf",
      style: "normal",
      weight: "900",
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={turret.className}>{children}</body>
    </html>
  );
}
