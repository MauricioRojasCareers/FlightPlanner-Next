"use client";

import Image from "next/image";

const LoadingSpinner = () => (
  <div
    className="relative bg-black bg-cover bg-center h-screen flex flex-col justify-center items-center text-white"
    style={{ backgroundImage: "url('/background.png')" }}
  >
    <div className="absolute top-10 flex items-center gap-2">
      <Image
        width={100}
        height={100}
        src="/assets/phoenix-logo.svg"
        alt="Phoenix Logo"
        className="w-12 h-12 rounded-full shadow-md hover:scale-110 active:scale-95 animate-spin-slow"
      />
      <h2 className="text-2xl font-bold">FlightPlanner</h2>
    </div>
    <div className="w-24 h-24 border-4 border-gray-200 border-t-red-500 rounded-full animate-spin mb-5"></div>
    <p className="mt-2 text-lg">Loading...</p>
  </div>
);

export default function Loading() {
  return <LoadingSpinner />; // This is shown while CesiumWrapper is loading
}
