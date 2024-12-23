"use client";

import dynamic from "next/dynamic";
import React from "react";
import type { CesiumType } from "../types/cesium";
import Loading from "@/app/components/Loading";
import { Toaster } from "./ui/toaster";

const CesiumDynamicComponent = dynamic(
  () => import("@/app/components/CesiumViewer"),
  {
    ssr: false,
  }
);

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
    <>
      <CesiumDynamicComponent CesiumJs={CesiumJs} />
      <Toaster />
    </>
  ) : (
    <Loading />
  );
};

export default CesiumWrapper;
