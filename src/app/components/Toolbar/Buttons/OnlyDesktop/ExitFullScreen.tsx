import { FunctionComponent } from "react";
import ToolBarButton from "../../ToolBarButton";
import { X } from "lucide-react";

interface ToolbarProps {
  onClick: () => void;
}

const exitFullscreen: FunctionComponent<ToolbarProps> = ({
  onClick: handleMaximizeClick,
}) => {
  return (
    <ToolBarButton
      onClick={handleMaximizeClick}
      icon={<X className="text-rose-800 group-hover:scale-125" />}
      iconText="Exit full Screen"
      buttonSize="sm"
      buttonClassName="group"
    />
  );
};

export default exitFullscreen;
