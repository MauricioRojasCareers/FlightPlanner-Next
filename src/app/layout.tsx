import type { Metadata } from "next";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";

import TempToolbar from "./components/Toolbar/HandleDifferentToolbars";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "FlightPlanner Next-Generation",
  description: "Using bleeding edge technology with an emphasis on typesafety.",
  openGraph: {
    type: "website",
    siteName: "FlightPlanner Next-Generation",
    title: "FlightPlanner Next-Generation",
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
      <body>
        <Providers>
          <AppSidebar />
          <main className="w-full h-svh md:h-svh lg:h-[100vh] relative">
            <header className="absolute top-0 left-0 w-full z-10 h-svh pointer-events-none">
              <TempToolbar />
            </header>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
