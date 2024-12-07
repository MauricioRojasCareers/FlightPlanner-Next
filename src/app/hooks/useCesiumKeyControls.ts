import { useEffect } from "react";
import type { Viewer, Cartesian3, Math as CesiumMath } from "cesium";
import type { CesiumType } from "../types/cesium";

interface UseCesiumKeyControlsProps {
  cesiumViewer: React.RefObject<Viewer | null>;
  userLongitude: number;
  userLatitude: number;
  CesiumJs: CesiumType;
}

export const useCesiumKeyControls = ({
  cesiumViewer,
  userLongitude,
  userLatitude,
  CesiumJs,
}: UseCesiumKeyControlsProps) => {
  useEffect(() => {
    if (!cesiumViewer.current) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!cesiumViewer.current) return;

      if (event.key === "r" || event.key === "R") {
        // Reset to top-down view
        const topDownHeight = 1100;
        const topDownPosition = CesiumJs.Cartesian3.fromDegrees(
          userLongitude,
          userLatitude,
          topDownHeight
        );

        cesiumViewer.current.camera.flyTo({
          destination: topDownPosition,
          orientation: {
            heading: CesiumJs.Math.toRadians(0.0),
            pitch: CesiumJs.Math.toRadians(-90),
            roll: 0.0,
          },
          duration: 1,
        });
      }

      // Additional key handling (e.g., for "E") can go here.
    };

    // Add event listener for keydown
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [cesiumViewer, userLongitude, userLatitude]);
};

//   if (event?.key === "e" || event?.key === "E") {
//     let tiltApplied = false; // Track if tilt has already been applied
//     const tiltCameraAroundScreenCenter = () => {
//       if (!cesiumViewer.current) return;

//       if (tiltApplied === false) {
//         tiltApplied = true;
//         const scene = cesiumViewer.current.scene;
//         const camera = cesiumViewer.current.camera;

//         // Get the Cartesian position of the center of the screen
//         const screenCenter = new CesiumJs.Cartesian2(
//           scene.canvas.clientWidth / 2,
//           scene.canvas.clientHeight / 2
//         );
//         const centerRay = camera.getPickRay(screenCenter);

//         if (!centerRay) {
//           console.error("Failed to get pick ray for screen center.");
//           return; // Exit if the pick ray is undefined
//         }

//         const focusPoint = scene.globe.pick(centerRay, scene);

//         if (!focusPoint) {
//           console.error("No intersection point found for screen center.");
//           return; // Exit if the ray doesn't intersect the globe
//         }

//         const deltaRotation = CesiumJs.Math.toRadians(80);
//         const relativePosition = CesiumJs.Cartesian3.subtract(
//           camera.position,
//           focusPoint,
//           new CesiumJs.Cartesian3()
//         );

//         // Rotate around the X-axis
//         const rotatedPosition = new CesiumJs.Cartesian3(
//           relativePosition.x,
//           relativePosition.y * Math.cos(deltaRotation) -
//             relativePosition.z * Math.sin(deltaRotation),
//           relativePosition.y * Math.sin(deltaRotation) +
//             relativePosition.z * Math.cos(deltaRotation)
//         );

//         const newCameraPosition = CesiumJs.Cartesian3.add(
//           focusPoint,
//           rotatedPosition,
//           new CesiumJs.Cartesian3()
//         );

//         // Smoothly transition to the new camera position and orientation
//         camera.flyTo({
//           destination: newCameraPosition,
//           orientation: {
//             heading: camera.heading, // Maintain the current heading
//             pitch: camera.pitch + deltaRotation, // Adjust pitch to reflect the tilt
//             roll: camera.roll, // Maintain the current roll
//           },
//           duration: 2, // Duration of the transition in seconds
//         });
//         console.log("rotated view");
//         console.log(tiltApplied);
//       }
//     };

//     tiltCameraAroundScreenCenter();
//     console.log(tiltApplied);
//   }
