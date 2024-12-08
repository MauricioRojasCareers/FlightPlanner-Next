import { FunctionComponent } from "react";
import ToolBarButton from "./ToolBarIcon";
import { X } from "lucide-react";

interface ToolbarProps {
  onClick: () => void;
}

const CloseFullScreenButton: FunctionComponent<ToolbarProps> = ({
  onClick: handleMaximizeClick,
}) => {
  return (
    <ToolBarButton
      onClick={handleMaximizeClick}
      icon={<X size={20} />}
      iconClassName="text-rose-600"
      disableHoverEffect={true}
      iconText="Exit full Screen"
      buttonSize="sm"
    />
  );
};

export default CloseFullScreenButton;
