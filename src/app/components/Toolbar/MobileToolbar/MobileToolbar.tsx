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
      <div className="w-full h-svh bg-red-300 flex flex-row relative">
        <div className="bg-yellow-200 w-full h-svh justify-between gap-2 flex p-4 flex-col">
          {/* Top Section */}
          <div className="bg-blue-300 flex">
            <MenuButton onClick={() => resetView()} />
            <OpenMissionButton onClick={resetView} />
            <div className="flex items-center w-full">
              <SearchBar />
            </div>
            <div className="flex justify-end h-full gap-2 items-center">
              <DrawButton onClick={resetView} />
              <TerrainButton onClick={tiltView} />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="bg-white flex justify-between">
            <div>
              <YourLocation onClick={resetView} />
            </div>
            <div>
              <GlobeView onClick={globeView} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileToolbar;
