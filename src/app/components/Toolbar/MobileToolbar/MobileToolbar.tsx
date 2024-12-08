import { FunctionComponent } from "react";
import MenuButton from "@/app/components/Toolbar/MenuButton";
import TerrainButton from "@/app/components/Toolbar/TerrainButton";

import OpenMissionButton from "../OpenMissionsButton";
import DrawButton from "../DrawButton";
import SearchBar from "../SearchBar";
import NorthButton from "../NorthButton";

interface ToolbarProps {
  onClick: () => void;
}

const MobileToolbar: FunctionComponent<ToolbarProps> = ({
  onClick: resetView,
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
          <TerrainButton onClick={resetView} />
        </div>
      </div>
      {/* NorthButton anchored in the bottom-right corner */}
      <div className="absolute bottom-4 right-4">
        <NorthButton onClick={resetView} />
      </div>
    </>
  );
};

export default MobileToolbar;
