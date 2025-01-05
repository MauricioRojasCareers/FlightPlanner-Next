"use client";

import { useViewerStore } from "@/store/viewerStore";

import { useSidebar } from "@/components/ui/sidebar";

import DesktopToolbar from "./_Desktop/DesktopToolbar";
import MobileToolbar from "./_Mobile/MobileToolbar";

export default function HandleDifferentToolbars() {
  const { isMobile } = useSidebar();
  const isCesiumReady = useViewerStore((state: any) => state.isCesiumReady);

  if (!isCesiumReady) return null;

  return <>{isMobile ? <MobileToolbar /> : <DesktopToolbar />}</>;
}
