import { FunctionComponent } from "react";
import { Mountain } from "lucide-react";

import ToolBarButton from "../ToolBarButton";

interface ToolbarProps {
  onTiltView: () => void;
}

const HomeButton: FunctionComponent<ToolbarProps> = ({
  onTiltView: tiltView,
}) => {
  return (
    <ToolBarButton
      onClick={tiltView}
      icon={
        <Mountain
          className="
          fill-green-300 text-green-700
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
