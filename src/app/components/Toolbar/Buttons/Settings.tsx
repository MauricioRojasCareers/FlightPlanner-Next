import { FunctionComponent } from "react";
import { Settings } from "lucide-react";

import ToolBarButton from "../ToolBarButton";

interface ToolbarProps {
  onClick: () => void;
}

const HomeButton: FunctionComponent<ToolbarProps> = ({
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

export default HomeButton;
