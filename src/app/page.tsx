import CesiumWrapper from "@/app/components/CesiumWrapper";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex justify-center h-screen items-center">
      {/* <CesiumWrapper /> */}
      <Link
        href="cesium"
        className="text-white hover:scale-125 active:scale-95 transition-transform duration-300 ease-in-out "
      >
        Open FlightPlanner
      </Link>
    </main>
  );
}
