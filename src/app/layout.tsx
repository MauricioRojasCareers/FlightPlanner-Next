import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

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
          <main className="w-full h-[100vh]">
            <div className="p-4 absolute z-50">
              <SidebarTrigger className="bg-white" />
            </div>
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
