import { useEffect, useRef } from "react";

export const useDisableScroll = () => {
  const cesiumContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preventScroll = (e: TouchEvent) => {
      e.preventDefault();
    };

    const cesiumContainer = cesiumContainerRef.current;

    if (cesiumContainer) {
      cesiumContainer.addEventListener("touchstart", preventScroll, {
        passive: false,
      });
      cesiumContainer.addEventListener("touchmove", preventScroll, {
        passive: false,
      });
    }

    return () => {
      if (cesiumContainer) {
        cesiumContainer.removeEventListener("touchstart", preventScroll);
        cesiumContainer.removeEventListener("touchmove", preventScroll);
      }
    };
  }, []);

  return cesiumContainerRef;
};
