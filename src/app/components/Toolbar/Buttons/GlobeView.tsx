import { FunctionComponent } from "react";
import { ButtonType } from "@/app/types/toolbar";
import ToolBarButton from "../ToolBarButton";
import { Globe } from "lucide-react";

const ZoomOutButton: FunctionComponent<ButtonType> = ({
  onClick: globeView,
}) => {
  return (
    <ToolBarButton
      onClick={globeView}
      icon={
        <Globe
          className="
            text-blue-600 fill-green-500
            group-hover:animate-pulse
            group-hover:scale-110 
            group-active:scale-90
            transition-transform duration-300 ease-in-out
            drop-shadow-lg
          "
        />
      }
      buttonClassName="group"
    />
  );
};

export default ZoomOutButton;
