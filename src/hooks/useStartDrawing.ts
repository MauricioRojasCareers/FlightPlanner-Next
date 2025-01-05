import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import type { Viewer, Cartesian3, ScreenSpaceEventHandler } from "cesium";
import { CesiumType } from "@/app/types/cesium";

export const useStartDrawing = ({
  cesiumViewer,
  CesiumJs,
}: {
  cesiumViewer: React.RefObject<Viewer>;
  CesiumJs: CesiumType;
}) => {
  // State to store drawn points
  const pointsRef = useRef<Cartesian3[]>([]);

  // React Query mutation for sampling terrain height
  const mutation = useMutation({
    mutationFn: async (click: ScreenSpaceEventHandler.PositionedEvent) => {
      const scene = cesiumViewer.current!.scene;
      const cartesian = scene.pickPosition(click.position);
      if (!cartesian) return null;

      const cartographic = CesiumJs.Cartographic.fromCartesian(cartesian);
      const longitude = CesiumJs.Math.toDegrees(cartographic.longitude);
      const latitude = CesiumJs.Math.toDegrees(cartographic.latitude);

      const terrainProvider = scene.terrainProvider;
      const terrainHeights = await CesiumJs.sampleTerrainMostDetailed(
        terrainProvider,
        [cartographic]
      );

      const terrainHeight = terrainHeights[0]?.height || 0;
      return CesiumJs.Cartesian3.fromDegrees(
        longitude,
        latitude,
        terrainHeight + 5
      );
    },
    onSuccess: (adjustedPosition) => {
      if (adjustedPosition) {
        pointsRef.current.push(adjustedPosition);

        // Add billboard immediately
        cesiumViewer.current?.entities.add({
          position: adjustedPosition,
          billboard: {
            image: new CesiumJs.PinBuilder().fromColor(
              CesiumJs.Color.SKYBLUE,
              50
            ),
            verticalOrigin: CesiumJs.VerticalOrigin.BOTTOM,
            heightReference: CesiumJs.HeightReference.CLAMP_TO_GROUND,
          },
        });
      }
    },
    onError: (error) => {
      console.error("Error processing click event:", error);
    },
  });

  // Effect to set up event listeners
  useEffect(() => {
    if (!cesiumViewer.current) return;

    const controller = cesiumViewer.current.scene.screenSpaceCameraController;
    controller.enableTranslate = false;
    controller.enableRotate = false;
    controller.enableTilt = false;
    controller.zoomEventTypes = CesiumJs.CameraEventType.WHEEL;

    const scene = cesiumViewer.current.scene;

    // Enable terrain depth testing
    scene.globe.depthTestAgainstTerrain = true;

    const handler = new CesiumJs.ScreenSpaceEventHandler(scene.canvas);

    handler.setInputAction((click: ScreenSpaceEventHandler.PositionedEvent) => {
      // Optimistic update (temporary point)
      const cartesian = scene.pickPosition(click.position);
      if (cartesian) {
        pointsRef.current.push(cartesian);

        cesiumViewer.current?.entities.add({
          position: cartesian,
          billboard: {
            image: new CesiumJs.PinBuilder().fromColor(
              CesiumJs.Color.SKYBLUE,
              50
            ),
            verticalOrigin: CesiumJs.VerticalOrigin.BOTTOM,
            heightReference: CesiumJs.HeightReference.CLAMP_TO_GROUND,
          },
        });
      }

      // Perform mutation
      mutation.mutate(click);
    }, CesiumJs.ScreenSpaceEventType.LEFT_CLICK);

    return () => handler.destroy(); // Cleanup on unmount
  }, [cesiumViewer, CesiumJs, mutation]);

  return { points: pointsRef.current };
};
