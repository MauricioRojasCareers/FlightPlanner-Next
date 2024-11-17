import CesiumWrapper from "../Components/CesiumWrapper";

async function getTerrainProvider() {
  const terrainProvider = {
    url: `https://api.maptiler.com/tiles/terrain-quantized-mesh-v2/?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`,
    options: {
      requestVertexNormals: true, // Enables smooth shading
      requestWaterMask: true, // Enables water effects
    },
  };

  return terrainProvider;
}

async function getPosition() {
  //Mimic server-side stuff...
  return {
    position: {
      lat: 39.953436,
      lng: -75.164356,
    },
  };
}

export default async function MainPage() {
  const fetchedPosition = await getPosition();
  const terrainProvider = await getTerrainProvider();
  return (
    <CesiumWrapper
      positions={[fetchedPosition.position]}
      terrainProvider={terrainProvider}
    />
  );
}
