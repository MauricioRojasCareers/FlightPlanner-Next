import { FunctionComponent, useEffect, useRef, useState } from "react";
import type { CesiumType } from "../types/cesium";
import type { UserPosition } from "../types/position";
import { Viewer, sampleTerrainMostDetailed } from "cesium";

export const CesiumComponentRaw: FunctionComponent<{
  CesiumJs: CesiumType;
}> = ({ CesiumJs }) => {
  const cesiumViewer = useRef<Viewer | null>(null);
  const cesiumContainerRef = useRef<HTMLDivElement>(null);
  const customCreditContainerRef = useRef<HTMLDivElement>(
    document.createElement("div")
  );

  const [userPosition, setUserPosition] = useState<UserPosition | null>(null);

  const [locationError, setLocationError] = useState<string | null>(null);

  // Get user's current location using Geolocation API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
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
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (userPosition && !cesiumViewer.current && cesiumContainerRef.current) {
      CesiumJs.Ion.defaultAccessToken = `${process.env.NEXT_PUBLIC_CESIUM_TOKEN}`;

      cesiumViewer.current = new CesiumJs.Viewer(cesiumContainerRef.current, {
        terrain: CesiumJs.Terrain.fromWorldTerrain(),
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

                  // Create a canvas element for the rectangle
                  const canvas = document.createElement("canvas");
                  canvas.width = 100; // Rectangle width
                  canvas.height = 50; // Rectangle height

                  const context = canvas.getContext("2d");
                  if (context) {
                    context.fillStyle = "white"; // Rectangle color
                    context.fillRect(0, 0, canvas.width, canvas.height);
                  }

                  // URL for the external image to be used as the billboard
                  // const imageUrl = "/static/assets/homepng.png";
                  const imageUrl = "/assets/homepng.png";

                  // Add a billboard and label
                  cesiumViewer.current?.entities.add({
                    position: adjustedPosition,
                    billboard: new CesiumJs.BillboardGraphics({
                      image: imageUrl, // Convert canvas to data URL for the billboard
                      verticalOrigin: CesiumJs.VerticalOrigin.BOTTOM, // Ensures the image stays at the bottom
                      heightReference: CesiumJs.HeightReference.CLAMP_TO_GROUND, // Keeps the billboard above the terrain
                      scale: 0.3, // Set a fixed scale factor to keep it small
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

      // Event listener for 'R' key press to switch to top-down view
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "r" || event.key === "R") {
          // Adjust camera height for a less zoomed-in top-down view
          const topDownHeight = 1100; // Adjust this value to control zoom level

          // Set camera to top-down view (orthogonal view)
          const topDownPosition = CesiumJs.Cartesian3.fromDegrees(
            userPosition.longitude,
            userPosition.latitude,
            topDownHeight // Higher altitude for a broader view
          );

          // Animate camera transition to the top-down view
          cesiumViewer.current?.camera.flyTo({
            destination: topDownPosition,
            orientation: {
              heading: CesiumJs.Math.toRadians(0.0),
              pitch: CesiumJs.Math.toRadians(-90), // Top-down view
              roll: 0.0,
            },
            duration: 1, // Duration of the animation in seconds
            // easingFunction: CesiumJs.EasingFunction.LINEAR, // Optional: easing for smooth transition
          });
        }
      };

      // Add event listener for keydown
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        cesiumViewer.current?.destroy(); // Cleanup when component unmounts
      };
    }
  }, [userPosition, CesiumJs]);

  const topDownView = () => {
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
  return (
    <>
      {locationError && (
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-100 text-red-600 p-4 rounded-md shadow-md text-center"
          role="alert"
        >
          {locationError}
        </div>
      )}
      <div
        ref={cesiumContainerRef}
        id="cesiumContainer"
        className="absolute inset-0 h-full w-full overflow-hidden"
      />

      <button
        onClick={topDownView}
        className="absolute top-4 right-4 md:right-4 md:top-4 md:left-auto md:bottom-auto text-rose-600 py-2 px-4 bg-white rounded-2xl text-xs shadow-lg hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-500 w-auto mx-auto md:mx-0"
      >
        Home Button!
      </button>
    </>
  );
};

export default CesiumComponentRaw;
