import { FunctionComponent, useEffect, useRef, useState } from "react";
import type { CesiumType } from "../types/cesium";
import type { UserPosition } from "../types/position";
import { Viewer, sampleTerrainMostDetailed } from "cesium";

import DesktopFirstTimeVisitorView from "./_FirstTimeVisitor/DesktopView/page";
import MobileFirstTimeVisitorView from "./_FirstTimeVisitor/MobileView//page";
import MobileToolbar from "./Toolbar/MobileToolbar/MobileToolbar";
import DesktopToolbar from "./Toolbar/DesktopToolbar/DesktopToolbar";

// Import Hooks
import { useToast } from "@/app/hooks/use-toast";
import { useCesiumKeyControls } from "../hooks/useCesiumKeyControls";
import useFullScreen from "../hooks/useFullScreen";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  resetTopView,
  flyToPosition,
  initializeCameraView,
} from "@/app/lib/cesiumHelpers";

export const CesiumComponentRaw: FunctionComponent<{
  CesiumJs: CesiumType;
}> = ({ CesiumJs }) => {
  const cesiumViewer = useRef<Viewer | null>(null);
  const cesiumContainerRef = useRef<HTMLDivElement>(null);
  const customCreditContainerRef = useRef<HTMLDivElement>(
    document.createElement("div")
  );

  const [isMobile, setIsMobile] = useState<boolean>(false);

  const [userPosition, setUserPosition] = useState<UserPosition | null>(null);

  const [locationError, setLocationError] = useState<string | null>(null);

  const [locationPermission, setLocationPermission] = useLocalStorage<
    "granted" | "denied" | null
  >("locationPermission", null);

  const { toast } = useToast();
  const { toggleFullScreen } = useFullScreen();

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

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      // Check window width and update state
      setIsMobile(window.innerWidth < 768); // Tailwind's `md` breakpoint is 768px
    };

    handleResize(); // Call initially to set state based on current window size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up on unmount
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
      });

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

      initializeCameraView({
        CesiumJs,
        cesiumViewer: cesiumViewer.current,
        userPosition,
      });

      return () => {
        cesiumViewer.current?.destroy(); // Cleanup when component unmounts
      };
    }
  }, [userPosition, CesiumJs, locationError]);

  useCesiumKeyControls({
    cesiumViewer,
    userLongitude: userPosition?.longitude || 0,
    userLatitude: userPosition?.latitude || 0,
    CesiumJs,
  });

  const handleResetTopView = () => {
    if (userPosition && cesiumViewer.current) {
      resetTopView({
        CesiumJs,
        cesiumViewer: cesiumViewer.current,
        userPosition,
      });
    }
  };

  const handleTilt = () => {
    // Depends on user's position (which is either given by user or Phoenix HQ)
    // Also depends on the cesium viewer existing
    if (userPosition && cesiumViewer.current) {
      // Offset distance to the side, for example, 1000 meters to the east
      const offsetDistance = 1000;
      // Calculate the new longitude to move the camera to the side
      const offsetLongitude = userPosition.latitude - offsetDistance / 111320;
      // Get the offset position to move the camera to
      const sidePosition: UserPosition = {
        latitude: offsetLongitude, // Same latitude
        longitude: userPosition.longitude, // New longitude after applying the offset
      };
      // Fly to the offset poisition that should give us a sideview looking north
      flyToPosition({
        CesiumJs,
        cesiumViewer: cesiumViewer.current,
        position: sidePosition,
        height: 200,
        heading: 0,
        pitch: -10,
        duration: 3,
      });
    }
  };

  const handleGlobeView = () => {
    cesiumViewer.current?.camera.flyHome();
  };

  const handleDrawMission = () => {
    if (userPosition && cesiumViewer.current) {
      flyToPosition({
        CesiumJs: CesiumJs,
        cesiumViewer: cesiumViewer.current,
        position: userPosition,
        height: 800,
        heading: 0,
        pitch: -90,
        duration: 2,
      });
    }
  };

  return (
    <>
      <div
        ref={cesiumContainerRef}
        id="cesiumContainer"
        className="relative w-screen h-screen md:overflow-hidden"
      >
        {/* Conditionally render First Time Visitor views */}
        {locationPermission === null &&
          (isMobile ? (
            <MobileFirstTimeVisitorView />
          ) : (
            <DesktopFirstTimeVisitorView />
          ))}
      </div>
      {isMobile ? (
        <MobileToolbar
          onClick={handleResetTopView}
          onTiltView={handleTilt}
          onZoomOut={handleGlobeView}
          onDrawMission={handleDrawMission}
        />
      ) : (
        <DesktopToolbar
          onClick={handleResetTopView}
          onAction={toggleFullScreen}
          onTiltView={handleTilt}
          onZoomOut={handleGlobeView}
          onDrawMission={handleDrawMission}
        />
      )}
    </>
  );
};

export default CesiumComponentRaw;
