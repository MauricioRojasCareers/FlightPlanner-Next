import { FunctionComponent } from "react";

import { ButtonType } from "@//types/toolbar";
import ToolBarButton from "../../ToolBarButton";
import { Maximize } from "lucide-react";

const FullScreenButton: FunctionComponent<ButtonType> = ({
  onClick: resetView,
}) => {
  return (
    <ToolBarButton
      onClick={resetView}
      icon={
        <Maximize className="group-hover:scale-125 group-hover:text-rose-800" />
      }
      buttonClassName="group"
    />
  );
};

export default FullScreenButton;
