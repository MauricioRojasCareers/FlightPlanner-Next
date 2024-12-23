import { FunctionComponent } from "react";
import { Globe } from "lucide-react";

import ToolBarButton from "../ToolBarButton";

interface ToolbarProps {
  onClick: () => void;
}

const ZoomOutButton: FunctionComponent<ToolbarProps> = ({
  onClick: globeView,
}) => {
  return (
    <ToolBarButton
      onClick={globeView}
      icon={
        <Globe
          className="
          text-green-700 fill-blue-400
            group-hover:animate-pulse 
            "
        />
      }
      buttonClassName="group"
    />
  );
};

export default ZoomOutButton;
