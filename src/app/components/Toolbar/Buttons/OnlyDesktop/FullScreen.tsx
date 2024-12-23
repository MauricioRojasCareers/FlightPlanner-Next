import { FunctionComponent } from "react";
import { Maximize } from "lucide-react";

import ToolBarButton from "../../ToolBarButton";

interface ToolbarProps {
  onClick: () => void;
}

const FullScreen: FunctionComponent<ToolbarProps> = ({
  onClick: resetView,
}) => {
  return (
    <ToolBarButton
      onClick={resetView}
      icon={<Maximize className="group-hover:scale-125" />}
      buttonClassName="group"
    />
  );
};

export default FullScreen;
