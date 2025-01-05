import type { Viewer } from "cesium";
import { CesiumType } from "@/types/cesium"; // Adjust path as needed

/* ---------------------- Helper Functions ----------------------- */

// Validate the viewer and scene
export const checkViewer = (
  cesiumViewer: React.RefObject<Viewer | null>
): boolean => {
  if (!cesiumViewer.current) {
    console.error("Viewer is not initialized");
    return false;
  }

  if (!cesiumViewer.current.scene) {
    console.error("Scene is not available");
    return false;
  }
  return true;
};

// Setup camera constraints
export const setupCameraConstraints = (
  viewer: Viewer,
  CesiumJs: CesiumType
) => {
  const camera = viewer.camera;
  camera.constrainedAxis = CesiumJs.Cartesian3.UNIT_Z;
  camera.setView({
    destination: camera.position,
    orientation: {
      heading: camera.heading,
      pitch: camera.pitch,
      roll: camera.roll,
    },
  });
};

// Configure controller settings
export const setupController = (viewer: Viewer, CesiumJs: CesiumType) => {
  const controller = viewer.scene.screenSpaceCameraController;
  controller.enableTranslate = false;
  controller.enableRotate = false;
  controller.enableTilt = false;
  controller.zoomEventTypes = CesiumJs.CameraEventType.WHEEL;
};
