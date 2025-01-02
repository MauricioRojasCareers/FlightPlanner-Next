"use client";

import Image from "next/image";
import Link from "next/link";
import SearchBar from "./Toolbar/Buttons/pending/SearchBar";
import TerrainButton from "@/app/components/Toolbar/Buttons/Terrain";
import DrawButton from "@/app/components/Toolbar/Buttons/Draw";
import OpenMissionButton from "@/app/components/Toolbar/Buttons/MissionsFolder";
import YourLocation from "@/app/components/Toolbar/Buttons/YourLocation";
import GlobeView from "@/app/components/Toolbar/Buttons/GlobeView";
import SettingsButton from "@/app/components/Toolbar/Buttons/Settings";
import { useViewerStore } from "@/store/viewerStore";
import { Maximize } from "lucide-react";
import FullScreen from "./Toolbar/Buttons/OnlyDesktop/FullScreen";
import ExitFullScreen from "./Toolbar/Buttons/OnlyDesktop/ExitFullScreen";
import { useSidebar } from "@/components/ui/sidebar";
import { useState } from "react";
import OpenSideBar from "./Toolbar/Buttons/OpenSideBar";

const TempDesktopToolbar = ({}) => {
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar();
  const { setTriggerAction, triggerGlobeView } = useViewerStore();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullScreenToggle = () => {
    if (!isFullscreen) {
      // Enter full screen
      document.documentElement
        .requestFullscreen()
        .catch((err) =>
          console.error(`Failed to enter full-screen mode: ${err.message}`)
        );
    } else {
      // Exit full screen
      document
        .exitFullscreen()
        .catch((err) =>
          console.error(`Failed to exit full-screen mode: ${err.message}`)
        );
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      <div className="font-bold text-white h-svh relative">
        {/* Top Navbar */}
        <div className="absolute top-0 w-full p-8 flex justify-between items-center gap-4">
          {/* Left Section - Avatar & Search Bar */}
          <div className="flex items-center gap-4 w-full max-w-[50%] pointer-events-auto">
            {open ? <> </> : <></>}

            <OpenSideBar onClick={toggleSidebar} />
            {/* Avatar */}
            {/* <Link
              href="/"
              className="w-12 h-12 rounded-full flex items-center justify-center"
            >
              <Image
                src="/assets/phoenix-logo.svg"
                alt="User Avatar"
                width={100}
                height={100}
                className="hidden lg:block rounded-full shadow-md hover:scale-110 active:scale-95"
                priority
              />
            </Link> */}
            {/* Search Bar */}
            {/* <div className="flex-grow pointer-events-auto">
              <SearchBar />
            </div> */}
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
            {/* <OpenMissionButton
              onClick={() => {
                setTriggerAction("tiltView");
              }}
            /> */}
            {/* <MenuButton
              onClick={() => {
                setTriggerAction("tiltView");
              }}
            /> */}
            {isFullscreen ? (
              <ExitFullScreen onClick={handleFullScreenToggle} />
            ) : (
              <FullScreen onClick={handleFullScreenToggle} />
            )}
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
