"use client";
import { useEffect, useCallback, useState, useRef } from "react";
import type { Viewer, Cartesian3 } from "cesium";
import { CesiumType } from "../types/cesium"; // Adjust import if necessary

import { UserPosition } from "../types/position";
import { startDrawing } from "@/utils/startDrawing";
import { useStartDrawing } from "@/hooks/useStartDrawing";

import {
  checkViewer,
  setupCameraConstraints,
  setupController,
} from "@/utils/cesiumUtils";

export const useCesiumActions = ({
  cesiumViewer,
  userPosition,
  CesiumJs,
  triggerAction,
  setTriggerAction,
}: {
  cesiumViewer: React.RefObject<Viewer>;
  userPosition: UserPosition | null;
  CesiumJs: CesiumType;
  triggerAction: string | null;
  setTriggerAction: (action: string | null) => void;
}) => {
  // Ref to keep track of the latest points
  const pointsRef = useRef<Cartesian3[]>([]);

  // Destructure the points from the hook (not calling it as a function)
  const { points } = useStartDrawing({ cesiumViewer, CesiumJs });

  // Function to reset to a top-down view
  const resetTopView = useCallback(() => {
    if (userPosition && cesiumViewer.current) {
      console.log("I'm resetting view now!");
      const topDownHeight = 800;
      const userPositionCartesian = CesiumJs.Cartesian3.fromDegrees(
        userPosition.longitude,
        userPosition.latitude,
        topDownHeight
      );

      cesiumViewer.current.camera.flyTo({
        destination: userPositionCartesian,
        orientation: {
          heading: CesiumJs.Math.toRadians(0.0),
          pitch: CesiumJs.Math.toRadians(-90),
          roll: 0.0,
        },
        duration: 1,
      });
    }
  }, [userPosition, cesiumViewer, CesiumJs]);

  // Function to tilt the view to the terrain
  const tiltViewToTerrain = useCallback(() => {
    if (userPosition && cesiumViewer.current) {
      const topDownHeight = 800;
      const userPositionCartesian = CesiumJs.Cartesian3.fromDegrees(
        userPosition.longitude,
        userPosition.latitude,
        topDownHeight
      );

      const offsetDistance = 800;
      const offsetLongitude = userPosition.longitude + offsetDistance / 111320;

      const sidePositionCartesian = CesiumJs.Cartesian3.fromDegrees(
        offsetLongitude,
        userPosition.latitude,
        400
      );

      cesiumViewer.current.camera.flyTo({
        destination: sidePositionCartesian,
        orientation: {
          heading: CesiumJs.Math.toRadians(-90.0),
          pitch: CesiumJs.Math.toRadians(0),
          roll: 0.0,
        },
        duration: 1,
      });
    }
  }, [userPosition, cesiumViewer, CesiumJs]);

  // Function to fly to the globe view
  const globeView = useCallback(() => {
    cesiumViewer.current?.camera.flyHome();
  }, [cesiumViewer]);

  // Effect to handle triggered actions
  useEffect(() => {
    if (triggerAction && cesiumViewer.current) {
      switch (triggerAction) {
        case "globeView":
          globeView();
          break;
        case "yourLocation":
          resetTopView();
          break;
        case "tiltView":
          tiltViewToTerrain();
          break;
        case "startDrawing":
          console.log("Drawing started...");
          break;

        default:
          break;
      }

      setTriggerAction(null); // Reset the action after execution
    }
  }, [
    triggerAction,
    cesiumViewer,
    userPosition,
    CesiumJs,
    setTriggerAction,
    globeView,
    resetTopView,
    tiltViewToTerrain,
  ]);

  return {
    resetTopView,
    tiltViewToTerrain,
    globeView,
    startDrawing,
  };
};

// // Function to start drawing points
// const startDrawing = useCallback(() => {
//   // Check if we have viewer ref
//   if (!cesiumViewer.current) {
//     console.log("Viewer is not initialized");
//     return;
//   }

//   // Check if we have the scene available
//   const scene = cesiumViewer.current.scene;
//   if (!scene) {
//     console.log("Scene is not available");
//     return;
//   }

//   console.log("Drawing mode started");

//   // get an instance of the scene.canvas so we can add elements
//   const handler = new CesiumJs.ScreenSpaceEventHandler(scene.canvas);
//   cesiumViewer.current.scene.globe.depthTestAgainstTerrain = true;

//   handler.setInputAction(
//     async (click: ScreenSpaceEventHandler.PositionedEvent) => {
//       // Use pickPosition for terrain-aware picking
//       const cartesian = scene.pickPosition(click.position);

//       console.log(cartesian);

//       if (cartesian) {
//         const cartographic = CesiumJs.Cartographic.fromCartesian(cartesian);
//         const longitude = CesiumJs.Math.toDegrees(cartographic.longitude);
//         const latitude = CesiumJs.Math.toDegrees(cartographic.latitude);
//         console.log("Cartographic from Cartesian:", cartographic);

//         try {
//           // Sample terrain for height
//           const terrainProvider = scene.terrainProvider;
//           const terrainHeights = await CesiumJs.sampleTerrainMostDetailed(
//             terrainProvider,
//             [cartographic]
//           );

//           const terrainHeight = terrainHeights[0].height || 0; // Use sampled height
//           const adjustedPosition = CesiumJs.Cartesian3.fromDegrees(
//             longitude,
//             latitude,
//             terrainHeight + 5
//           );

//           // Update the points array
//           setPoints((prevPoints) => {
//             const updatedPoints = [...prevPoints, adjustedPosition];

//             // Optionally, add the entity for the new point
//             cesiumViewer.current?.entities.add({
//               position: adjustedPosition,
//               billboard: {
//                 image: new CesiumJs.PinBuilder().fromColor(
//                   CesiumJs.Color.WHITE,
//                   25
//                 ), // 2D marker
//                 verticalOrigin: CesiumJs.VerticalOrigin.BOTTOM, // Anchor at the bottom
//                 heightReference: CesiumJs.HeightReference.CLAMP_TO_GROUND, // Clamp to terrain
//               },
//             });

//             console.log("Point added:", adjustedPosition);
//             return updatedPoints;
//           });

//           // Sample terrain height for each point before creating the polygon
//           const cartographics = pointsRef.current.map((point) => {
//             const cartographic = CesiumJs.Cartographic.fromCartesian(point);
//             return cartographic;
//           });

//           const polygonEntity = cesiumViewer.current?.entities.add({
//             polygon: {
//               hierarchy: CesiumJs.Cartesian3.fromDegreesArrayHeights(
//                 terrainHeights
//                   .map((terrainHeight, index) => {
//                     const cartographic = cartographics[index];
//                     return [
//                       CesiumJs.Math.toDegrees(cartographic.longitude),
//                       CesiumJs.Math.toDegrees(cartographic.latitude),
//                       terrainHeight.height + 500, // Adjusted height
//                     ];
//                   })
//                   .flat()
//               ),
//               material: CesiumJs.Color.RED.withAlpha(0.5),
//             },
//           });

//           console.log(
//             `White dot placed at: ${longitude}, ${latitude}, ${terrainHeight}`
//           );
//         } catch (error) {
//           console.error("Error sampling terrain height:", error);
//         }
//       }
//     },
//     CesiumJs.ScreenSpaceEventType.LEFT_CLICK
//   );

//   // Double-click to finish polygon
//   handler.setInputAction(() => {
//     console.log("Points logged on right-click:", pointsRef.current);
//     handler.destroy(); // Remove event handler

//     // Create a polygon entity using the points array
//     if (pointsRef.current.length > 2) {
//       // Ensure there are enough points to form a polygon
//       const hierarchy = pointsRef.current.map((point) =>
//         CesiumJs.Cartographic.fromCartesian(point)
//       );
//       const degreesArray = hierarchy.flatMap((cartographic) => [
//         CesiumJs.Math.toDegrees(cartographic.longitude),
//         CesiumJs.Math.toDegrees(cartographic.latitude),
//         cartographic.height || 0,
//       ]);

//       const polygonEntity = cesiumViewer.current?.entities.add({
//         polygon: {
//           hierarchy:
//             CesiumJs.Cartesian3.fromDegreesArrayHeights(degreesArray),
//           material: CesiumJs.Color.RED.withAlpha(0.5),
//         },
//       });
//       console.log("Polygon created:", polygonEntity);
//     } else {
//       console.log("Not enough points to create a polygon.");
//     }
//   }, CesiumJs.ScreenSpaceEventType.RIGHT_CLICK);
// }, [cesiumViewer, CesiumJs]);
