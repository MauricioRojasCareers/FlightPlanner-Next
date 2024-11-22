"use client";

import React from "react";
import type { CesiumType } from "../types/cesium";
import { Cesium3DTileset, type Entity, type Viewer } from "cesium";
import type { Position } from "../types/position";
import { dateToJulianDate } from "../example_utils/date";
import "cesium/Build/Cesium/Widgets/widgets.css";

export const CesiumComponent: React.FunctionComponent<{
  CesiumJs: CesiumType;
  positions: Position[];
}> = ({ CesiumJs, positions }) => {
  const cesiumViewer = React.useRef<Viewer | null>(null);
  const cesiumContainerRef = React.useRef<HTMLDivElement>(null);
  const customCreditContainerRef = React.useRef<HTMLDivElement>(
    document.createElement("div")
  );
  const addedScenePrimitives = React.useRef<Cesium3DTileset[]>([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const resetCamera = React.useCallback(async () => {
    // Set the initial camera to look at Seattle (or other initial view).
    if (cesiumViewer.current !== null) {
      // Set your desired camera view here
      console.log("Yay viewer exists!");
    }
  }, []);

  const cleanUpPrimitives = React.useCallback(() => {
    // Remove any previously added scene primitives.
    addedScenePrimitives.current.forEach((scenePrimitive) => {
      if (cesiumViewer.current !== null) {
        cesiumViewer.current.scene.primitives.remove(scenePrimitive);
      }
    });
    addedScenePrimitives.current = [];
  }, []);

  const initializeCesiumJs = React.useCallback(async () => {
    if (cesiumViewer.current !== null) {
      // Create osmBuildingsTileset (example), add to viewer.
      const osmBuildingsTileset = await CesiumJs.createOsmBuildingsAsync();
      cleanUpPrimitives();
      const osmBuildingsTilesetPrimitive =
        cesiumViewer.current.scene.primitives.add(osmBuildingsTileset);
      addedScenePrimitives.current.push(osmBuildingsTilesetPrimitive);

      // Add user-provided positions (as an example, you might want to customize this logic)
      positions.forEach((p) => {
        cesiumViewer.current?.entities.add({
          position: CesiumJs.Cartesian3.fromDegrees(p.lng, p.lat),
          ellipse: {
            semiMinorAxis: 50000.0,
            semiMajorAxis: 50000.0,
            height: 0,
            material: CesiumJs.Color.RED.withAlpha(0.5),
            outline: true,
            outlineColor: CesiumJs.Color.YELLOW,
          },
        });
      });

      // Mark that the viewer is loaded
      setIsLoaded(true);

      // Reset camera view
      resetCamera();
    }
  }, [positions, cleanUpPrimitives, resetCamera, CesiumJs]);

  React.useEffect(() => {
    const initializeViewer = async () => {
      if (cesiumViewer.current === null && cesiumContainerRef.current) {
        // Set your Cesium Ion access token
        CesiumJs.Ion.defaultAccessToken = `${process.env.NEXT_PUBLIC_CESIUM_TOKEN}`;

        try {
          // Wait for the terrain provider to load asynchronously
          const terrainProvider = await CesiumJs.CesiumTerrainProvider.fromUrl(
            `https://api.maptiler.com/tiles/terrain-quantized-mesh-v2/?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`,
            {
              requestVertexNormals: true, // Enables smooth shading
              requestWaterMask: true, // Enables water effects
            }
          );

          // Initialize the Cesium viewer with the terrain provider and other options
          cesiumViewer.current = new CesiumJs.Viewer(
            cesiumContainerRef.current,
            {
              terrainProvider,
              creditContainer: customCreditContainerRef.current,
              fullscreenButton: false,
              timeline: false,
              baseLayerPicker: false,
              geocoder: false,
              homeButton: false,
              sceneModePicker: false,
              navigationHelpButton: false,
              clockViewModel: undefined,
              navigationInstructionsInitiallyVisible: false,
              animation: false,
              infoBox: false,
              selectionIndicator: false,
              shouldAnimate: false,
            }
          );
        } catch (error) {
          console.error("Error loading terrain provider:", error);
        }
      }

      // Manually hide the Cesium clock widget if it’s still visible
      if (cesiumViewer.current && cesiumViewer.current.container) {
        const clockWidget = cesiumViewer.current.container.querySelector(
          ".cesium-clock"
        ) as HTMLElement;
        if (clockWidget) {
          clockWidget.style.display = "none";
        }
      }
    };

    initializeViewer();
  }, [CesiumJs.Viewer, CesiumJs.Ion, CesiumJs.CesiumTerrainProvider]);

  initializeCesiumJs();

  // const entities: Entity[] = [];
  // const julianDate = dateToJulianDate(CesiumJs, new Date());

  return (
    <div
      ref={cesiumContainerRef}
      id="cesium-container"
      style={{ height: "100vh", width: "100vw" }}
    />
  );
};

export default CesiumComponent;
