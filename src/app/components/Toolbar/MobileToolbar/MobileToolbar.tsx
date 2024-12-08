import { FunctionComponent } from "react";
import MenuButton from "@/app/components/Toolbar/MenuButton";
import TerrainButton from "@/app/components/Toolbar/TerrainButton";

import OpenMissionButton from "../OpenMissionsButton";
import DrawButton from "../DrawButton";
import SearchBar from "../SearchBar";

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
        <div className="flex justify-end w-[2%5] h-full gap-2 items-center ">
          <DrawButton />
          <TerrainButton onClick={resetView} />
        </div>
      </div>
    </>
  );
};

export default MobileToolbar;
