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
        {/* Top Navbar */}
        <div className="absolute top-0 w-full p-8 flex justify-between items-center gap-4">
          {/* Left Section - Avatar & Search Bar */}
          <div className="flex items-center gap-4 w-full max-w-[50%] pointer-events-auto">
            {/* Avatar */}
            <Link
              href="/"
              className="w-12 h-12 rounded-full flex items-center justify-center"
            >
              <Image
                src="/assets/phoenix-logo.svg"
                alt="User Avatar"
                width={100}
                height={100}
                className="rounded-full shadow-md hover:scale-110 active:scale-95"
                priority
              />
            </Link>
            {/* Search Bar */}
            <div className="flex-grow pointer-events-auto">
              <SearchBar />
            </div>
          </div>

          {/* Right Section - Toolbar Buttons */}
          <div className="flex gap-4 pointer-events-auto">
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

        {/* Bottom Buttons */}
        {/* Bottom-right corner */}
        <div className="absolute bottom-4 right-4 pointer-events-auto p-8">
          <YourLocation
            onClick={() => {
              setTriggerAction("yourLocation");
            }}
          />
        </div>

        {/* Bottom-left corner */}
        <div className="absolute bottom-4 left-4 pointer-events-auto p-8">
          <GlobeView
            onClick={() => {
              setTriggerAction("globeView");
            }}
          />
        </div>
      </div>
    </>
  );
};

export default TempDesktopToolbar;
