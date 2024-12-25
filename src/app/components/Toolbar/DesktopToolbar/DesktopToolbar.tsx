import { FunctionComponent, useEffect, useState } from "react";

import MenuButton from "@/app/components/Toolbar/Buttons/Settings";
import DrawButton from "@/app/components/Toolbar/Buttons/Draw";
import YourLocation from "@/app/components/Toolbar/Buttons/YourLocation";
import TerrainButton from "@/app/components/Toolbar/Buttons/Terrain";
import Image from "next/image";
import FullScreen from "../Buttons/OnlyDesktop/FullScreen";
import SearchBar from "../Buttons/pending/SearchBar";
import ExitFullScreen from "../Buttons/OnlyDesktop/ExitFullScreen";
import OpenMissionButton from "../Buttons/MissionsFolder";
import GlobeView from "../Buttons/GlobeView";
import Link from "next/link";

interface ToolbarProps {
  onClick: () => void;
  onAction: () => void;
  onTiltView: () => void;
  onZoomOut: () => void;
  onDrawMission: () => void;
}

const DesktopToolbar: FunctionComponent<ToolbarProps> = ({
  onClick: resetView,
  onAction: enterFullScreen,
  onTiltView: tiltView,
  onZoomOut: globeView,
  onDrawMission: drawMission,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const checkFullscreen = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener("fullscreenchange", checkFullscreen);
    return () =>
      document.removeEventListener("fullscreenchange", checkFullscreen);
  }, []);

  const handleMaximizeClick = () => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      enterFullScreen();
    }
  };

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-[10%] md:h-[20%] lg:h-[10%] p-4 flex flex-row items-center justify-between">
        {/* Avatar & Search Bar */}
        <div className="flex items-center w-1/2 gap-4">
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
          <div className="flex items-center w-3/4">
            <SearchBar />
          </div>
          {/* <YourLocation onClick={resetView} />
          <GlobeView onClick={globeView} /> */}
        </div>

        {/* Toolbar Buttons */}
        <div className="flex flex-row gap-4 justify-end">
          {/* <HomeButton onClick={resetView} /> */}
          <TerrainButton onClick={tiltView} />
          <DrawButton onClick={drawMission} />
          <OpenMissionButton onClick={resetView} />

          <MenuButton onClick={resetView} />
          {/* Fullscreen Button */}
          {isFullscreen ? (
            <ExitFullScreen onClick={handleMaximizeClick} />
          ) : (
            <FullScreen onClick={enterFullScreen} />
          )}
        </div>
      </div>

      {/* NorthButton anchored in the bottom-risght corner */}
      <div className="absolute bottom-4 right-4">
        <YourLocation onClick={resetView} />
      </div>
      {/* NorthButton anchored in the bottom-right corner */}
      <div className="absolute bottom-4 left-4">
        <GlobeView onClick={globeView} />
      </div>
    </>
  );
};

export default DesktopToolbar;
