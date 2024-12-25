import type { Viewer } from "cesium";
import type { CesiumType } from "@/app/types/cesium";
import type { UserPosition } from "@/app/types/position";

// Initialize the Camera 1000 meters above the user's position in a top-down view
export const initializeCameraView = ({
  CesiumJs,
  cesiumViewer,
  userPosition,
}: {
  CesiumJs: CesiumType;
  cesiumViewer: Viewer;
  userPosition: UserPosition;
}) => {
  // Set camera to the user's position
  const userPositionCartesian = CesiumJs.Cartesian3.fromDegrees(
    userPosition.longitude,
    userPosition.latitude,
    1000 // Altitude (in meters)
  );
  cesiumViewer.camera.setView({
    destination: userPositionCartesian,
    orientation: {
      heading: CesiumJs.Math.toRadians(0.0), // Camera facing north
      pitch: CesiumJs.Math.toRadians(-90), // Look slightly down
      roll: 0.0, // No roll
    },
  });
};

// Rotate camera to a top-down view
export const resetTopView = ({
  CesiumJs,
  cesiumViewer,
  userPosition,
}: {
  CesiumJs: CesiumType;
  cesiumViewer: Viewer;
  userPosition: UserPosition;
}) => {
  const topDownHeight = 800;

  const userPositionCartesian = CesiumJs.Cartesian3.fromDegrees(
    userPosition.longitude,
    userPosition.latitude,
    topDownHeight
  );

  cesiumViewer.camera.flyTo({
    destination: userPositionCartesian,
    orientation: {
      heading: CesiumJs.Math.toRadians(0.0),
      pitch: CesiumJs.Math.toRadians(-90),
      roll: 0.0,
    },
    duration: 2,
  });
};

/**
 * Flies to a position
 * Arguments:
 * - Cesium Lib
 * - Cesium Viewer
 * - A position with type:
 * {
 * latitude: number;
 * longitude: number;
 * height?: number;
 * };
 * - A Height
 * - A Heading
 * - A Pitch
 * - A Duration
 */
export const flyToPosition = ({
  CesiumJs,
  cesiumViewer,
  position,
  height,
  heading,
  pitch,
  roll,
  duration,
}: {
  CesiumJs: CesiumType;
  cesiumViewer: Viewer;
  position: UserPosition;
  height: number;
  heading: number;
  pitch: number;
  roll?: number;
  duration?: number;
}) => {
  const cartesianPosition = CesiumJs.Cartesian3.fromDegrees(
    position.longitude,
    position.latitude,
    height
  );

  cesiumViewer.camera.flyTo({
    destination: cartesianPosition,
    orientation: {
      heading: CesiumJs.Math.toRadians(heading),
      pitch: CesiumJs.Math.toRadians(pitch),
      roll,
    },
    duration,
  });
};
