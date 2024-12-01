import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cesium in Next.js 14 with TypeScript",
  description:
    "An example Next.js 14 TypeScript project displaying Cesium hosted in Vercel",
  openGraph: {
    type: "website",
    siteName: "FlightPlanner Next Generation",
    title: "FlightPlanner Next Generation",
    url: `https://flight-planner-next.vercel.app/`,
    description: "Using Cesium, Next.js, TypeScript, and TailwindCSS",
    images: [
      {
        url: `https://flight-planner-next.vercel.app/og.png`,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
