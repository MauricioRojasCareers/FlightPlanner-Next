"use client";

import dynamic from "next/dynamic";
import React from "react";
import type { CesiumType } from "../types/cesium";
import LoadingSpinner from "./loading";

const CesiumDynamicComponent = dynamic(() => import("./CesiumComponentRaw"), {
  ssr: false,
});

// const CesiumDynamicComponent = dynamic(() => import("./CesiumComponent"), {
//   ssr: false,
// });

export const CesiumWrapper: React.FunctionComponent = () => {
  const [CesiumJs, setCesiumJs] = React.useState<CesiumType | null>(null);

  React.useEffect(() => {
    if (CesiumJs !== null) return;
    const CesiumImportPromise = import("cesium");
    Promise.all([CesiumImportPromise]).then((promiseResults) => {
      const { ...Cesium } = promiseResults[0];
      setCesiumJs(Cesium);
    });
  }, [CesiumJs]);

  return CesiumJs ? (
    <CesiumDynamicComponent CesiumJs={CesiumJs} />
  ) : (
    <LoadingSpinner />
  );
};

// Using fetched position from main
// export const CesiumWrapper: React.FunctionComponent<{
//   positions: Position[];
// }> = ({ positions }) => {
//   const [CesiumJs, setCesiumJs] = React.useState<CesiumType | null>(null);

//   React.useEffect(() => {
//     if (CesiumJs !== null) return;
//     const CesiumImportPromise = import("cesium");
//     Promise.all([CesiumImportPromise]).then((promiseResults) => {
//       const { ...Cesium } = promiseResults[0];
//       setCesiumJs(Cesium);
//     });
//   }, [CesiumJs]);

//   return CesiumJs ? (
//     <CesiumDynamicComponent CesiumJs={CesiumJs} positions={positions} />
//   ) : (
//     <LoadingSpinner />
//   );
// };

export default CesiumWrapper;
