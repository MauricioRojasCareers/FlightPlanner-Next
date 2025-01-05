import type { Viewer, ScreenSpaceEventHandler, Cartesian3 } from "cesium";
import { CesiumType } from "@/types/cesium";

export const startDrawing = ({
  cesiumViewer,
  CesiumJs,
  pointsRef,
}: {
  cesiumViewer: React.RefObject<Viewer>;
  CesiumJs: CesiumType;
  pointsRef: React.MutableRefObject<Cartesian3[]>;
}) => {
  if (!checkViewer(cesiumViewer)) return;

  const viewer = cesiumViewer.current as Viewer; // Narrow the type
  const scene = viewer.scene;

  console.log("Drawing mode started...");

  setupCameraConstraints(cesiumViewer.current!, CesiumJs);
  setupController(cesiumViewer.current!, CesiumJs);

  const handler = new CesiumJs.ScreenSpaceEventHandler(scene.canvas);

  // Enable depth test against terrain for accurate placement
  scene.globe.depthTestAgainstTerrain = true;

  handler.setInputAction(
    async (click: ScreenSpaceEventHandler.PositionedEvent) => {
      try {
        const adjustedPosition = await getAdjustedPosition(
          click,
          scene,
          CesiumJs
        );
        if (!adjustedPosition) return;

        pointsRef.current.push(adjustedPosition);
        console.log("Points so far:", pointsRef.current);

        addBillboard(
          cesiumViewer.current!,
          CesiumJs,
          adjustedPosition,
          pointsRef
        );
      } catch (error) {
        console.error("Error processing click event:", error);
      }
    },
    CesiumJs.ScreenSpaceEventType.LEFT_CLICK
  );

  // Optional: Return cleanup function to destroy handler if needed
  return () => handler.destroy();
};

/* ---------------------- Helper Functions ----------------------- */

// Validate the viewer and scene
const checkViewer = (cesiumViewer: React.RefObject<Viewer | null>): boolean => {
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
const setupCameraConstraints = (viewer: Viewer, CesiumJs: CesiumType) => {
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
const setupController = (viewer: Viewer, CesiumJs: CesiumType) => {
  const controller = viewer.scene.screenSpaceCameraController;
  controller.enableTranslate = false;
  controller.enableRotate = false;
  controller.enableTilt = false;
  controller.zoomEventTypes = CesiumJs.CameraEventType.WHEEL;
};

// Get adjusted position with terrain height
const getAdjustedPosition = async (
  click: ScreenSpaceEventHandler.PositionedEvent,
  scene: any,
  CesiumJs: CesiumType
): Promise<Cartesian3 | null> => {
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
};

// Add a billboard entity
const addBillboard = (
  viewer: Viewer,
  CesiumJs: CesiumType,
  position: Cartesian3,
  pointsRef: React.MutableRefObject<Cartesian3[]>
) => {
  const billboard = viewer.entities.add({
    position,
    billboard: {
      image: new CesiumJs.PinBuilder().fromColor(CesiumJs.Color.SKYBLUE, 50),
      verticalOrigin: CesiumJs.VerticalOrigin.BOTTOM,
      heightReference: CesiumJs.HeightReference.CLAMP_TO_GROUND,
    },
  });

  billboard.properties = new CesiumJs.PropertyBag({
    index: pointsRef.current.length - 1,
  });
};
