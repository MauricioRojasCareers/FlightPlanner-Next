import { FunctionComponent } from "react";

import ToolBarButton from "../ToolBarButton";
import { Navigation } from "lucide-react";

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
        <Navigation
          className="
          fill-blue-400 text-transparent
            group-hover:scale-90
            group-active:scale-110
            group-hover:animate-pulse
            transition-transform duration-100 ease-in-out         
          "
        />
      }
      buttonClassName="group"
    />
  );
};

export default HomeButton;
