"use client";

import { FunctionComponent, useEffect, useRef, useState } from "react";
import type { CesiumType } from "../types/cesium";
import type { UserPosition } from "../types/position";
import { Viewer, sampleTerrainMostDetailed } from "cesium";

// Import Hooks
import { useToast } from "@/app/hooks/use-toast";
import { useCesiumKeyControls } from "../hooks/useCesiumKeyControls";
import useFullScreen from "../hooks/useFullScreen";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useViewerStore } from "@/store/viewerStore";

export const CesiumViewer: FunctionComponent<{
  CesiumJs: CesiumType;
}> = ({ CesiumJs }) => {
  const cesiumViewer = useRef<Viewer | null>(null);
  const cesiumContainerRef = useRef<HTMLDivElement>(null);
  const customCreditContainerRef = useRef<HTMLDivElement>(
    document.createElement("div")
  );

  const [userPosition, setUserPosition] = useState<UserPosition | null>(null);

  const [locationError, setLocationError] = useState<string | null>(null);

  const [locationPermission, setLocationPermission] = useLocalStorage<
    "granted" | "denied" | null
  >("locationPermission", null);

  // Zustand Store:
  const triggerAction = useViewerStore((state: any) => state.triggerAction);
  const setTriggerAction = useViewerStore(
    (state: any) => state.setTriggerAction
  );
  const setCesiumReady = useViewerStore((state: any) => state.setCesiumReady);

  // Hooks:
  // const { toggleFullScreen } = useFullScreen();
  const { toast } = useToast();
  useCesiumKeyControls({
    cesiumViewer,
    userLongitude: userPosition?.longitude || 0,
    userLatitude: userPosition?.latitude || 0,
    CesiumJs,
  });

  // Disable page scrolling on touch devices
  useEffect(() => {
    const preventScroll = (e: TouchEvent) => {
      e.preventDefault();
    };

    const cesiumContainer = cesiumContainerRef.current;

    if (cesiumContainer) {
      cesiumContainer.addEventListener("touchstart", preventScroll, {
        passive: false,
      });
      cesiumContainer.addEventListener("touchmove", preventScroll, {
        passive: false,
      });
    }

    return () => {
      if (cesiumContainer) {
        cesiumContainer.removeEventListener("touchstart", preventScroll);
        cesiumContainer.removeEventListener("touchmove", preventScroll);
      }
    };
  }, []);

  // Get user's current location using Geolocation API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationPermission("granted");
          console.log("Location granted");
          setUserPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            height: 0,
          });

          console.log(position);
        },
        (error) => {
          setLocationError(
            "Unable to access your location. Check location services in browser settings."
          );
          console.error("Error getting location:", error);
          setLocationPermission("denied");
          console.error("Error getting user location:", error);
          setUserPosition({
            latitude: 30.435975,
            longitude: -97.685133,
            height: 0,
          });
          toast({
            title: "Unable to access your location.",
            description:
              "Check location services in browser settings or refresh the page. Using Phoenix HQ Position.",
            variant: "default", // Red background for error
            duration: 3000,
          });
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (userPosition && !cesiumViewer.current && cesiumContainerRef.current) {
      CesiumJs.Ion.defaultAccessToken = `${process.env.NEXT_PUBLIC_CESIUM_TOKEN}`;

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

      // Check when terrain has loaded
      cesiumViewer.current.scene.globe.tileLoadProgressEvent.addEventListener(
        (tilesLoaded: number) => {
          if (tilesLoaded === 0) {
            console.log("Terrain fully loaded, adding placemarker");

            // Ensure the placemarker is properly positioned on the terrain
            if (userPosition && cesiumViewer.current) {
              // Convert the position to Cartographic (longitude, latitude, height)
              const cartographicPosition = CesiumJs.Cartographic.fromDegrees(
                userPosition.longitude,
                userPosition.latitude,
                userPosition.height || 0 // Provide default height if not available
              );

              // Use the terrain provider from the viewer
              const terrainProvider =
                cesiumViewer.current.scene.terrainProvider;

              sampleTerrainMostDetailed(terrainProvider, [cartographicPosition])
                .then((terrainHeights) => {
                  const terrainHeight = terrainHeights[0].height;
                  const adjustedPosition = CesiumJs.Cartesian3.fromDegrees(
                    userPosition.longitude,
                    userPosition.latitude,
                    terrainHeight + 5 // Adjust height slightly above the terrain
                  );

                  // Add a billboard and label
                  cesiumViewer.current?.entities.add({
                    position: adjustedPosition,
                    billboard: new CesiumJs.BillboardGraphics({
                      image: locationError
                        ? "/assets/phoenix-logo.svg"
                        : "/assets/home.png", // Convert canvas to data URL for the billboard
                      verticalOrigin: CesiumJs.VerticalOrigin.BOTTOM, // Ensures the image stays at the bottom
                      heightReference: CesiumJs.HeightReference.CLAMP_TO_GROUND, // Keeps the billboard above the terrain
                      scale: locationError ? 1 : 0.3, // Set a fixed scale factor to keep it small
                      scaleByDistance: new CesiumJs.NearFarScalar(
                        100.0, // Near distance (beyond which scale starts reducing)
                        1.0, // Scale factor at near distance
                        10000.0, // Far distance (where scale becomes 0)
                        0.0 // Scale factor at far distance
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

      // Set camera to the user's position
      const userPositionCartesian = CesiumJs.Cartesian3.fromDegrees(
        userPosition.longitude,
        userPosition.latitude,
        1000 // Altitude (in meters)
      );
      cesiumViewer.current.camera.setView({
        destination: userPositionCartesian,
        orientation: {
          heading: CesiumJs.Math.toRadians(0.0), // Camera facing north
          pitch: CesiumJs.Math.toRadians(-90), // Look slightly down
          roll: 0.0, // No roll
        },
      });

      return () => {
        cesiumViewer.current?.destroy(); // Cleanup when component unmounts
        setCesiumReady(false);
      };
    }
  }, [userPosition, CesiumJs, locationError, setCesiumReady]);

  // Effect to handle triggered actions
  useEffect(() => {
    const resetTopView = () => {
      console.log("resetTopView invoked");
      if (userPosition && cesiumViewer.current) {
        const topDownHeight = 800;
        const userPositionCartesian = CesiumJs.Cartesian3.fromDegrees(
          userPosition.longitude,
          userPosition.latitude,
          topDownHeight // Use default height if not available
        );

        cesiumViewer.current.camera.flyTo({
          destination: userPositionCartesian,
          orientation: {
            heading: CesiumJs.Math.toRadians(0.0),
            pitch: CesiumJs.Math.toRadians(-90),
            roll: 0.0,
          },
          duration: 1, // Smooth transition
        });
      }
    };

    const tiltViewToTerrain = () => {
      if (userPosition && cesiumViewer.current) {
        const topDownHeight = 800;
        const userPositionCartesian = CesiumJs.Cartesian3.fromDegrees(
          userPosition.longitude,
          userPosition.latitude,
          topDownHeight // Use default height if not available
        );

        // Offset distance to the side, for example, 1000 meters to the east
        const offsetDistance = 800; // Distance to move the camera to the side

        // Calculate the new longitude to move the camera to the side
        const offsetLongitude =
          userPosition.longitude + offsetDistance / 111320;

        // Create a new Cartesian3 position with the offset applied
        const sidePositionCartesian = CesiumJs.Cartesian3.fromDegrees(
          offsetLongitude, // New longitude after applying the offset
          userPosition.latitude, // Same latitude as the user position
          400 // Same height as the initial top-down view
        );

        cesiumViewer.current.camera.flyTo({
          destination: sidePositionCartesian,
          orientation: {
            heading: CesiumJs.Math.toRadians(-90.0),
            pitch: CesiumJs.Math.toRadians(0),
            roll: 0.0,
          },
          duration: 1, // Smooth transition
        });
      }
    };

    const globeView = () => {
      cesiumViewer.current?.camera.flyHome();
    };

    if (triggerAction && cesiumViewer.current) {
      if (triggerAction === "globeView") {
        // Call globeView function when action is 'globeView'
        globeView();
      }

      if (triggerAction === "yourLocation") {
        // Call globeView function when action is 'globeView'
        resetTopView();
      }

      if (triggerAction === "tiltView") {
        // Call globeView function when action is 'globeView'
        tiltViewToTerrain();
      }

      // Reset the action to avoid repeated execution
      setTriggerAction(null);
    }
  }, [triggerAction, setTriggerAction, userPosition, CesiumJs]);

  return (
    <>
      <div ref={cesiumContainerRef} id="cesiumContainer" className="relative" />
    </>
  );
};

export default CesiumViewer;
