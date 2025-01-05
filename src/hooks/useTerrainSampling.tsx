import { useMutation } from "@tanstack/react-query";
import type { ScreenSpaceEventHandler, Cartesian3, Viewer } from "cesium";
import { CesiumType } from "@/types/cesium";

// Custom hook for terrain sampling
export const useTerrainSampling = (
  scene: any,
  CesiumJs: CesiumType,
  pointsRef: React.MutableRefObject<Cartesian3[]>,
  viewer: Viewer
) => {
  return useMutation({
    mutationFn: async (click: ScreenSpaceEventHandler.PositionedEvent) => {
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
        console.log("Points so far:", pointsRef.current);

        viewer.entities.add({
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
      console.error("Error sampling terrain height:", error);
    },
  });
};
