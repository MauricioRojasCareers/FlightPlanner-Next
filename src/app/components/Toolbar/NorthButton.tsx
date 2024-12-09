import { FunctionComponent } from "react";

import ToolBarButton from "./ToolBarIcon";
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
      icon={<Navigation size={28} className="fill-blue-400 scale-150" />}
      toolTipText="Your Location"
      variant="home"
    />
  );
};

export default HomeButton;
