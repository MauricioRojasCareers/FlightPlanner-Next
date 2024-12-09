import { FunctionComponent } from "react";
import MenuButton from "@/app/components/Toolbar/SettingsButton";
import TerrainButton from "@/app/components/Toolbar/TerrainButton";

import OpenMissionButton from "../OpenMissionsButton";
import DrawButton from "../DrawButton";
import SearchBar from "../SearchBar";
import NorthButton from "../NorthButton";
import ZoomOutButton from "../ZoomOutButton";

interface ToolbarProps {
  onClick: () => void;
  onTiltView: () => void;
  onZoomOut: () => void;
}

const MobileToolbar: FunctionComponent<ToolbarProps> = ({
  onClick: resetView,
  onTiltView: tiltView,
  onZoomOut: globeView,
}) => {
  return (
    <>
      <button>Click Me</button>
      <div className="absolute top-0 left-0 w-full h-[10%] p-4 flex flex-row items-center justify-between gap-2">
        <MenuButton
          onClick={() => {
            console.log("Reset View button clicked");
            resetView();
          }}
        />
        <OpenMissionButton onClick={resetView} />
        {/* Search Bar */}
        <div className="flex items-center w-full">
          <SearchBar />
        </div>

        {/* Menu Button */}
        <div className="flex justify-end h-full gap-2 items-center ">
          <DrawButton />
          <TerrainButton onTiltView={tiltView} />
        </div>
      </div>
      {/* NorthButton anchored in the bottom-risght corner */}
      <div className="absolute bottom-4 right-4">
        <NorthButton onClick={resetView} />
      </div>
      {/* NorthButton anchored in the bottom-right corner */}
      <div className="absolute bottom-4 left-4">
        <ZoomOutButton onClick={globeView} />
      </div>
    </>
  );
};

export default MobileToolbar;
