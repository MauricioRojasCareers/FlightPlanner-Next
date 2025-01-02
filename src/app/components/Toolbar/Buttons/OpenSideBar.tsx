import { FunctionComponent } from "react";
import { ButtonType } from "@/app/types/toolbar";
import ToolBarButton from "../ToolBarButton";
import { PanelLeftClose, PanelRightClose } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

const OpenSideBar: FunctionComponent<ButtonType> = ({ onClick: resetView }) => {
  const { open, toggleSidebar } = useSidebar(); // Only keeping relevant variables.

  return (
    <ToolBarButton
      onClick={() => {
        toggleSidebar(); // Toggles the sidebar's state.
        if (resetView) resetView(); // Calls the passed `resetView` function if provided.
      }}
      icon={
        open ? (
          <PanelLeftClose className="group-hover:scale-75 group-active:scale-110 transition-transform duration-300 ease-in-out" />
        ) : (
          <PanelRightClose className="group-hover:scale-75 group-active:scale-110 transition-transform duration-300 ease-in-out" />
        )
      }
      buttonClassName="group"
    />
  );
};

export default OpenSideBar;
