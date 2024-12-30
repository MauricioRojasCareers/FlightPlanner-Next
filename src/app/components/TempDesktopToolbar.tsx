"use client";

import Image from "next/image";
import Link from "next/link";
import SearchBar from "./Toolbar/Buttons/pending/SearchBar";
import TerrainButton from "@/app/components/Toolbar/Buttons/Terrain";
import DrawButton from "@/app/components/Toolbar/Buttons/Draw";
import OpenMissionButton from "@/app/components/Toolbar/Buttons/MissionsFolder";
import YourLocation from "@/app/components/Toolbar/Buttons/YourLocation";
import GlobeView from "@/app/components/Toolbar/Buttons/GlobeView";
import MenuButton from "@/app/components/Toolbar/Buttons/Settings";
import { useViewerStore } from "@/store/viewerStore";

const TempDesktopToolbar = ({}) => {
  const { setTriggerAction, triggerGlobeView } = useViewerStore();
  return (
    <>
      <div className="font-bold text-white h-svh relative">
        {/* <Top Left Navbar> */}
        <div className="absolute top-0 w-full p-8  flex justify-around items-center">
          <div className="flex pointer-events-auto  w-full">
            {/* Avatar & Search Bar */}
            <div className="flex items-center w-[50%] gap-4 ">
              {/* Avatar */}
              <Link
                href="/"
                className="w-12 h-12  rounded-full flex items-center justify-center"
              >
                <Image
                  src="/assets/phoenix-logo.svg" // Path to your image in the public/assets folder
                  alt="User Avatar"
                  width={100} // Adjust the dimensions as needed
                  height={100}
                  className="rounded-full shadow-md hover:scale-110 active:scale-95"
                  priority
                />
              </Link>
              {/* Search Bar */}
              <div className="flex items-center w-[75%] bg-orange-400">
                <SearchBar />
              </div>
            </div>
          </div>
          {/* Toolbar Buttons */}
          <div className="flex flex-row gap-4 pointer-events-auto ">
            {/* <HomeButton onClick={resetView} /> */}
            <TerrainButton
              onClick={() => {
                setTriggerAction("tiltView");
              }}
            />
            <DrawButton
              onClick={() => {
                setTriggerAction("tiltView");
              }}
            />
            <OpenMissionButton
              onClick={() => {
                setTriggerAction("tiltView");
              }}
            />
            <MenuButton
              onClick={() => {
                setTriggerAction("tiltView");
              }}
            />
          </div>
        </div>
      </div>
      {/* NorthButton anchored in the bottom-risght corner */}
      <div className="absolute bottom-4 right-4 pointer-events-auto p-8">
        <YourLocation
          onClick={() => {
            setTriggerAction("yourLocation");
          }}
        />
      </div>
      {/* NorthButton anchored in the bottom-right corner */}
      <div className="absolute bottom-4 left-4 pointer-events-auto p-8">
        <GlobeView
          onClick={() => {
            setTriggerAction("globeView");
          }}
        />
      </div>
    </>
  );
};

export default TempDesktopToolbar;
