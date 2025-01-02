import type { Metadata } from "next";
import "./globals.css";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

import TempToolbar from "./components/TempToolbar";

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
        <SidebarProvider defaultOpen={false}>
          <AppSidebar variant="inset" />
          <main className="w-full h-svh md:h-svh lg:h-[100vh] relative">
            <header className="absolute top-0 left-0 w-full z-10 h-svh pointer-events-none">
              {/* <SidebarTrigger variant="secondary" /> */}
              <SidebarInset>
                <TempToolbar />
              </SidebarInset>
            </header>
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
