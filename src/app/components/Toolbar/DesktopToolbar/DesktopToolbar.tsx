import { FunctionComponent, useEffect, useState } from "react";

import MenuButton from "@/app/components/Toolbar/MenuButton";
import DrawButton from "@/app/components/Toolbar/DrawButton";
import NorthButton from "@/app/components/Toolbar/NorthButton";
import TerrainButton from "@/app/components/Toolbar/TerrainButton";
import Image from "next/image";
import MaximizeButton from "../MaximizeButton";
import SearchBar from "../SearchBar";
import CloseFullScreenButton from "../CloseFullScreenButton";
import OpenMissionButton from "../OpenMissionsButton";

interface ToolbarProps {
  onClick: () => void;
  onAction: () => void;
  onTiltView: () => void;
}

const DesktopToolbar: FunctionComponent<ToolbarProps> = ({
  onClick: resetView,
  onAction: enterFullScreen,
  onTiltView: tiltView,
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
    <div className="absolute top-0 left-0 w-full h-[10%] md:h-[20%] lg:h-[10%] p-4 flex flex-row items-center justify-between">
      {/* Avatar & Search Bar */}
      <div className="flex items-center w-1/2 gap-4">
        {/* Avatar */}
        <div className="w-12 h-12  rounded-full flex items-center justify-center ">
          <Image
            src="/assets/phoenix-logo.svg" // Path to your image in the public/assets folder
            alt="User Avatar"
            width={100} // Adjust the dimensions as needed
            height={100}
            className="rounded-full shadow-md hover:scale-110 active:scale-95"
            priority
          />
        </div>
        {/* Search Bar */}
        <div className="flex items-center w-3/4">
          <SearchBar />
        </div>
        <NorthButton onClick={resetView} />
        {/* Fullscreen Button */}

        {isFullscreen ? (
          <CloseFullScreenButton onClick={handleMaximizeClick} />
        ) : (
          <MaximizeButton onClick={enterFullScreen} /> // Enter fullscreen icon
        )}
      </div>

      {/* Toolbar Buttons */}
      <div className="flex flex-row gap-4 justify-end">
        {/* <HomeButton onClick={resetView} /> */}
        <TerrainButton onTiltView={tiltView} />
        <DrawButton onClick={resetView} />
        <OpenMissionButton onClick={resetView} />

        <MenuButton onClick={resetView} />
      </div>
    </div>
  );
};

export default DesktopToolbar;
