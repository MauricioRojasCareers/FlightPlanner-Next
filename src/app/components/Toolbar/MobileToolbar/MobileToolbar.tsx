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
      <div className="w-full h-screen bg-red-300 flex flex-row relative">
        <div className="bg-yellow-200 w-full justify-between gap-2 flex absolute p-4 min-h-screen flex-col">
          <div className="bg-blue-300 flex">
            <MenuButton
              onClick={() => {
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
          <div className="bg-white flex justify-between">
            {/* NorthButton anchored in the bottom-risght corner */}
            <div className="">
              <YourLocation onClick={resetView} />
            </div>
            {/* NorthButton anchored in the bottom-right corner */}
            <div className="">
              <GlobeView onClick={globeView} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileToolbar;
