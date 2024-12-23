import { FunctionComponent } from "react";

import { ButtonType } from "@/app/types/toolbar";
import { Navigation } from "lucide-react";
import ToolBarButton from "../ToolBarButton";

const HomeButton: FunctionComponent<ButtonType> = ({ onClick: resetView }) => {
  return (
    <ToolBarButton
      onClick={resetView}
      icon={
        <Navigation
          className="
          fill-blue-400 text-transparent
            group-hover:scale-90
            group-active:scale-110
            group-hover:animate-pulse
            transition-transform duration-100 ease-in-out         
          "
        />
      }
      buttonClassName="group"
    />
  );
};

export default HomeButton;
