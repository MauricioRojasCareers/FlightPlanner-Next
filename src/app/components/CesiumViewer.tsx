"use client";

import { FunctionComponent, useRef } from "react";
import type { CesiumType } from "@/types/cesium";

// Import Hooks
import { useViewerStore } from "@/store/viewerStore";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useCesiumActions } from "@/hooks/useCesiumActions";
import { useCesiumViewer } from "@/hooks/useCesiumViewer";
import { useCesiumKeyControls } from "@/hooks/useCesiumKeyControls";

export const CesiumViewer: FunctionComponent<{
  CesiumJs: CesiumType;
}> = ({ CesiumJs }) => {
  /* --------------START Zustand Store  -------------- */
  const setCesiumReady = useViewerStore((state: any) => state.setCesiumReady);
  /* -------------- END Zustand Store-------------- */

  /* -------------- Cesium Viewer  -------------- */
  /* CesiumJs Viewer element to interact with cesiumAPI */
  // const cesiumViewer = useRef<Viewer | null>(null);
  /* Empty Div so Viewer CesiumJs Credits can be hidden */
  const customCreditContainerRef = useRef<HTMLDivElement>(
    document.createElement("div")
  );

  /* --------------START usehooks  -------------- */
  const { position: userPosition, error: locationError } = useGeolocation();

  const { cesiumViewer, cesiumContainerRef } = useCesiumViewer({
    CesiumJs,
    userPosition,
    locationError,
    setCesiumReady,
  });
  // const { toggleFullScreen } = useFullScreen();

  useCesiumActions({
    cesiumViewer,
    userPosition,
    CesiumJs,
  });

  useCesiumKeyControls({
    cesiumViewer,
    userLongitude: userPosition?.longitude || 0,
    userLatitude: userPosition?.latitude || 0,
    CesiumJs,
  });
  /* -------------- END usehooks-------------- */

  return (
    <>
      <div ref={cesiumContainerRef} id="cesiumContainer" className="relative" />
    </>
  );
};

export default CesiumViewer;
