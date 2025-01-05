import { FunctionComponent } from "react";
import ToolBarButton from "../ToolBarButton";
import { RouteOff } from "lucide-react";
import { ButtonType } from "@/types/toolbar";

const ExitDrawingButton: FunctionComponent<ButtonType> = ({
  onClick: exitDrawing,
}) => {
  return (
    <ToolBarButton
      icon={
        <RouteOff
          className="
            text-white
            group-hover:text-white/70
            group-active:scale-110
            transition-transform duration-300 ease-in-out
          "
        />
      }
      buttonClassName="
        group
        flex items-center justify-center 
        bg-rose-700 
        text-white 
        p-3 
        hover:bg-rose-600 
        hover:animate-pulse
        focus:outline-none 
        focus:ring-2 
        focus:ring-rose-700 
        transition-all duration-300 ease-in-out
      "
      onClick={exitDrawing}
    />
  );
};

export default ExitDrawingButton;
