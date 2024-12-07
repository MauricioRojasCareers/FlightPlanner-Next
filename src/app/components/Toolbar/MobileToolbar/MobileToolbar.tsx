import { FunctionComponent } from "react";
import MenuButton from "@/app/components/Toolbar/MenuButton";

interface ToolbarProps {
  onClick: () => void;
}

const MobileToolbar: FunctionComponent<ToolbarProps> = ({
  onClick: resetView,
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
      <div className="flex justify-end w-1/2 h-full">
        <MenuButton onClick={resetView} />
      </div>
    </div>
  );
};

export default MobileToolbar;
