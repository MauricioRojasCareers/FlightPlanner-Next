import { FunctionComponent } from "react";
import { Globe } from "lucide-react";

import ToolBarButton from "./ToolBarIcon";

interface ToolbarProps {
  onClick: () => void;
}

const ZoomOutButton: FunctionComponent<ToolbarProps> = ({
  onClick: globeView,
}) => {
  return (
    <ToolBarButton
      onClick={globeView}
      icon={<Globe size={24} />}
      disableHoverEffect
      toolTipText="Globe View"
      variant="globe"
      buttonClassName="group"
      iconClassName="group-hover:scale-90 animate-pulse"
    />
  );
};

export default ZoomOutButton;
