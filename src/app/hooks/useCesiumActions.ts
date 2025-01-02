import { useEffect, useCallback } from "react";
import type { Viewer } from "cesium";
import { CesiumType } from "../types/cesium"; // Adjust import if necessary

import { UserPosition } from "../types/position";

export const useCesiumActions = ({
  cesiumViewer,
  userPosition,
  CesiumJs,
  triggerAction,
  setTriggerAction,
}: {
  cesiumViewer: React.RefObject<Viewer | null>;
  userPosition: UserPosition | null;
  CesiumJs: CesiumType;
  triggerAction: string | null;
  setTriggerAction: (action: string | null) => void;
}) => {
  // Function to reset to a top-down view
  const resetTopView = useCallback(() => {
    if (userPosition && cesiumViewer.current) {
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
  };
};
