import { FunctionComponent } from "react";
import { Maximize } from "lucide-react";

import ToolBarButton from "./ToolBarIcon";

interface ToolbarProps {
  onClick: () => void;
}

const MaximizeButton: FunctionComponent<ToolbarProps> = ({
  onClick: resetView,
}) => {
  return (
    <ToolBarButton
      onClick={resetView}
      icon={<Maximize size={24} />}
      variant="maximize"
      toolTipText="Enter Full Screen"
      buttonClassName="group"
      iconClassName="group-hover:scale-150"
    />
  );
};

export default MaximizeButton;
