import { FunctionComponent } from "react";

import { ButtonType } from "@/app/types/toolbar";
import ToolBarButton from "../ToolBarButton";
import { Mountain } from "lucide-react";

const HomeButton: FunctionComponent<ButtonType> = ({ onClick: tiltView }) => {
  return (
    <ToolBarButton
      onClick={tiltView}
      icon={
        <Mountain
          className="
          fill-green-300 text-green-700
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

export default HomeButton;
