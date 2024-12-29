import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import DesktopToolbar from "./components/Toolbar/DesktopToolbar/DesktopToolbar";
import TempDesktopToolbar from "./components/TempDesktopToolbar";

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
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full h-svh md:h-svh lg:h-[100vh] relative">
            <header className="absolute top-0 left-0 w-full z-10 h-svh pointer-events-none">
              {/* <div className="bg-rose-300 pointer-events-auto">
                <p>Hello World</p>
              </div> */}
              {/* <SidebarTrigger variant="secondary" /> */}
              <TempDesktopToolbar></TempDesktopToolbar>
            </header>
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
