import { useEffect, useRef } from "react";
import { Viewer, sampleTerrainMostDetailed } from "cesium";
import { useDisableScroll } from "./useDisableScroll"; // Import your hook

export const useCesiumViewer = ({
  CesiumJs,
  userPosition,
  locationError,
  setCesiumReady,
}: {
  CesiumJs: any;
  userPosition: { latitude: number; longitude: number } | null;
  locationError: string | null;
  setCesiumReady: (ready: boolean) => void;
}) => {
  const cesiumViewer = useRef<Viewer | null>(null);

  // Use the scroll-disabling hook here
  const cesiumContainerRef = useDisableScroll();

  const customCreditContainerRef = useRef<HTMLDivElement>(
    document.createElement("div")
  );

  useEffect(() => {
    if (userPosition && !cesiumViewer.current && cesiumContainerRef.current) {
      // Set Cesium token
      CesiumJs.Ion.defaultAccessToken = `${process.env.NEXT_PUBLIC_CESIUM_TOKEN}`;

      // Initialize Cesium Viewer
      cesiumViewer.current = new CesiumJs.Viewer(cesiumContainerRef.current, {
        terrain: CesiumJs.Terrain.fromWorldTerrain(),
        infoBox: false,
        creditContainer: customCreditContainerRef.current,
        fullscreenButton: false,
        timeline: false,
        baseLayerPicker: false,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        navigationHelpButton: false,
        animation: false,
        selectionIndicator: false,
      });

      setCesiumReady(true);

      // Terrain load event
      cesiumViewer.current?.scene.globe.tileLoadProgressEvent.addEventListener(
        (tilesLoaded: number) => {
          if (tilesLoaded === 0) {
            console.log("Terrain fully loaded, adding placemarker");

            // Add placemarker
            if (userPosition && cesiumViewer.current) {
              const cartographicPosition = CesiumJs.Cartographic.fromDegrees(
                userPosition.longitude,
                userPosition.latitude,
                0
              );

              const terrainProvider =
                cesiumViewer.current.scene.terrainProvider;

              sampleTerrainMostDetailed(terrainProvider, [cartographicPosition])
                .then((terrainHeights) => {
                  const terrainHeight = terrainHeights[0].height;
                  const adjustedPosition = CesiumJs.Cartesian3.fromDegrees(
                    userPosition.longitude,
                    userPosition.latitude,
                    terrainHeight + 5
                  );

                  cesiumViewer.current?.entities.add({
                    position: adjustedPosition,
                    billboard: new CesiumJs.BillboardGraphics({
                      image: locationError
                        ? "/assets/phoenix-logo.svg"
                        : "/assets/home.png",
                      verticalOrigin: CesiumJs.VerticalOrigin.BOTTOM,
                      heightReference: CesiumJs.HeightReference.CLAMP_TO_GROUND,
                      scale: locationError ? 1 : 0.3,
                      scaleByDistance: new CesiumJs.NearFarScalar(
                        100.0,
                        1.0,
                        10000.0,
                        0.0
                      ),
                    }),
                  });
                })
                .catch((error) => {
                  console.error("Error getting terrain height:", error);
                });
            }
          }
        }
      );

      // Set camera position
      const userPositionCartesian = CesiumJs.Cartesian3.fromDegrees(
        userPosition.longitude,
        userPosition.latitude,
        1000
      );
      cesiumViewer.current?.camera.setView({
        destination: userPositionCartesian,
        orientation: {
          heading: CesiumJs.Math.toRadians(0.0),
          pitch: CesiumJs.Math.toRadians(-90),
          roll: 0.0,
        },
      });

      // Cleanup on unmount
      return () => {
        cesiumViewer.current?.destroy();
        setCesiumReady(false);
      };
    }
  }, [
    userPosition,
    CesiumJs,
    locationError,
    setCesiumReady,
    cesiumContainerRef,
  ]);

  return { cesiumViewer, cesiumContainerRef };
};
