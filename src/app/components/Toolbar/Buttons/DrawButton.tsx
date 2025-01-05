import { FunctionComponent } from "react";

import ToolBarButton from "../ToolBarButton";
import { Route } from "lucide-react";
import { ButtonType } from "@/types/toolbar";

const DrawButton: FunctionComponent<ButtonType> = ({
  onClick: startDrawing,
}) => {
  return (
    <ToolBarButton
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
      onClick={startDrawing}
    />
  );
};

export default DrawButton;
