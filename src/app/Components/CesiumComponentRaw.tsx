import { FunctionComponent, useEffect, useRef, useState } from "react";
import type { CesiumType } from "../types/cesium";
import { Viewer, Color, sampleTerrainMostDetailed } from "cesium";

import "cesium/Build/Cesium/Widgets/widgets.css";

export const CesiumComponentRaw: FunctionComponent<{
  CesiumJs: CesiumType;
}> = ({ CesiumJs }) => {
  const cesiumViewer = useRef<Viewer | null>(null);
  const cesiumContainerRef = useRef<HTMLDivElement>(null);
  const customCreditContainerRef = useRef<HTMLDivElement>(
    document.createElement("div")
  );

  const [userPosition, setUserPosition] = useState<{
    latitude: number;
    longitude: number;
    height?: number;
  } | null>(null);

  useEffect(() => {
    // Get user's current location using Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setUserPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            height: 0,
          });

          console.log(position);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (userPosition && !cesiumViewer.current && cesiumContainerRef.current) {
      //OPTIONAL: Assign access Token here
      //Guide: https://cesium.com/learn/ion/cesium-ion-access-tokens/
      CesiumJs.Ion.defaultAccessToken = `${process.env.NEXT_PUBLIC_CESIUM_TOKEN}`;

      // Have to resort back to viewer unfortunately because I want to draw entities. Sucks!!!! But here is the widget in case you want it
      // cesiumViewer.current = new CesiumJs.CesiumWidget("cesiumContainer", {
      //   terrain: CesiumJs.Terrain.fromWorldTerrain(),
      //   creditContainer: customCreditContainerRef.current,
      // });

      cesiumViewer.current = new CesiumJs.Viewer(cesiumContainerRef.current, {
        terrain: CesiumJs.Terrain.fromWorldTerrain(),
        creditContainer: customCreditContainerRef.current,
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
          const topDownHeight = 1250; // Adjust this value to control zoom level

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
  }, [userPosition]);

  // if (!cesiumViewer.current) {
  //   return <div>Give us a second while we load everything in...</div>;
  // }

  return (
    <div
      ref={cesiumContainerRef}
      id="cesiumContainer"
      className="absolute inset-0"
    />
  );
};

export default CesiumComponentRaw;
