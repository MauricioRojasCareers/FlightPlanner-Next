import { FunctionComponent } from "react";

import { ButtonType } from "@/app/types/toolbar";
import ToolBarButton from "../ToolBarButton";
import { Settings } from "lucide-react";

const SettingsButton: FunctionComponent<ButtonType> = ({
  onClick: resetView,
}) => {
  return (
    <ToolBarButton
      onClick={resetView}
      icon={
        <Settings
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

export default SettingsButton;
