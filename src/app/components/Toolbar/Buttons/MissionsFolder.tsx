import { FunctionComponent } from "react";

import { ButtonType } from "@/app/types/toolbar";
import ToolBarButton from "../ToolBarButton";
import { FolderOpen } from "lucide-react";

const OpenMissionButton: FunctionComponent<ButtonType> = ({
  onClick: resetView,
}) => {
  return (
    <ToolBarButton
      onClick={resetView}
      icon={
        <FolderOpen
          className="
        group-hover:scale-75
        group-active:scale-110
        transition-transform duration-300 ease-in-out        
      "
        />
      }
      buttonClassName="group"
    />
  );
};

export default OpenMissionButton;
