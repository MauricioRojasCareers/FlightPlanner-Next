import { FunctionComponent } from "react";
import MenuButton from "@/app/components/Toolbar/MenuButton";
import MaximizeButton from "../MaximizeButton";
import OpenMissionButton from "../OpenMissionsButton";

interface ToolbarProps {
  onClick: () => void;
  onAction: () => void;
}

const MobileToolbar: FunctionComponent<ToolbarProps> = ({
  onClick: resetView,
  onAction: enterFullScreen,
}) => {
  return (
    <div className="absolute w-full h-[10%] p-4 flex flex-row items-center justify-between">
      {/* Search Bar */}
      <div className="flex items-center w-full h-full">
        <input
          type="text"
          placeholder="Search..."
          className="w-full h-full px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Menu Button */}
      <div className="flex justify-end w-1/2 h-full gap-2">
        <OpenMissionButton onClick={resetView} />
        <MenuButton onClick={resetView} />
      </div>
    </div>
  );
};

export default MobileToolbar;
