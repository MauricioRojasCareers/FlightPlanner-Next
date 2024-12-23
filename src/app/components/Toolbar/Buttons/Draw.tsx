import { FunctionComponent } from "react";
import ToolBarButton from "../ToolBarButton";
import { Route } from "lucide-react";

interface ToolbarProps {
  onClick: () => void;
}

const HomeButton: FunctionComponent<ToolbarProps> = ({
  onClick: resetView,
}) => {
  return (
    <ToolBarButton
      onClick={resetView}
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
