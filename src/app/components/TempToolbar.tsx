"use client";

import { useViewerStore } from "@/store/viewerStore";
import TempDesktopToolbar from "./TempDesktopToolbar";
import TempMobileToolbar from "./TempMobileToolbar";
import { useSidebar } from "@/components/ui/sidebar";

const TempToolbar = () => {
  const { isMobile } = useSidebar();
  const isCesiumReady = useViewerStore((state: any) => state.isCesiumReady); // Access Zustand store

  // Only render the toolbar if Cesium is ready
  if (!isCesiumReady) return null;

  return <>{isMobile ? <TempMobileToolbar /> : <TempDesktopToolbar />}</>;
};

export default TempToolbar;
