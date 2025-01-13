import { FunctionComponent } from "react";

import { ButtonType } from "@/types/toolbar";
import ToolBarButton from "../ToolBarButton";
import { Ruler } from "lucide-react";

const MeasurementButton: FunctionComponent<ButtonType> = ({
  onClick: tiltView,
}) => {
  return (
    <ToolBarButton
      onClick={tiltView}
      icon={
        <Ruler
          className="
          fill-amber-200 text-black
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

export default MeasurementButton;
