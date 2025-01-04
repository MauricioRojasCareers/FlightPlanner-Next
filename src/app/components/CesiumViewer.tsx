"use client";

import { FunctionComponent, useEffect, useRef } from "react";
import { Viewer, sampleTerrainMostDetailed } from "cesium";
import type { CesiumType } from "../types/cesium";

// Import Hooks
import { useCesiumKeyControls } from "../hooks/useCesiumKeyControls";
import { useViewerStore } from "@/store/viewerStore";
import { useGeolocation } from "../hooks/useGeolocation";
import { useDisableScroll } from "../hooks/useDisableScroll";
import { useCesiumActions } from "../hooks/useCesiumActions";
import { useCesiumViewer } from "../hooks/useCesiumViewer";

export const CesiumViewer: FunctionComponent<{
  CesiumJs: CesiumType;
}> = ({ CesiumJs }) => {
  /* --------------START Zustand Store  -------------- */
  const triggerAction = useViewerStore((state: any) => state.triggerAction);
  const setTriggerAction = useViewerStore(
    (state: any) => state.setTriggerAction
  );
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
    triggerAction,
    setTriggerAction,
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
