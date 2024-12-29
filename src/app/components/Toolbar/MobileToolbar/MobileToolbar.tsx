import { FunctionComponent } from "react";
import MenuButton from "@/app/components/Toolbar/Buttons/Settings";
import TerrainButton from "@/app/components/Toolbar/Buttons/Terrain";

import OpenMissionButton from "../Buttons/MissionsFolder";
import DrawButton from "../Buttons/Draw";
import SearchBar from "../Buttons/pending/SearchBar";
import YourLocation from "../Buttons/YourLocation";
import GlobeView from "../Buttons/GlobeView";

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
          <DrawButton onClick={resetView} />
          <TerrainButton onClick={tiltView} />
        </div>
      </div>
      {/* NorthButton anchored in the bottom-risght corner */}
      <div className="absolute bottom-8 right-8">
        <YourLocation onClick={resetView} />
      </div>
      {/* NorthButton anchored in the bottom-right corner */}
      <div className="absolute bottom-8 left-8">
        <GlobeView onClick={globeView} />
      </div>
    </>
  );
};

export default MobileToolbar;
