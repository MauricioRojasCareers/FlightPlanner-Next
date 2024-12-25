import { FunctionComponent } from "react";

import { ButtonType } from "@/app/types/toolbar";
import ToolBarButton from "../ToolBarButton";
import { Route } from "lucide-react";

const HomeButton: FunctionComponent<ButtonType> = ({
  onClick: drawMission,
}) => {
  return (
    <ToolBarButton
      onClick={drawMission}
      icon={
        <Route
          className="
          text-rose-700
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
