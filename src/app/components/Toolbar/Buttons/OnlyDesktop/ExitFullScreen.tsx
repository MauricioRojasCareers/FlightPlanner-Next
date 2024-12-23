import { FunctionComponent } from "react";

import { ButtonType } from "@/app/types/toolbar";
import ToolBarButton from "../../ToolBarButton";
import { X } from "lucide-react";

const exitFullscreen: FunctionComponent<ButtonType> = ({
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
