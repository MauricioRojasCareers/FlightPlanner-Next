import { FunctionComponent } from "react";
import { ButtonType } from "@/types/toolbar";
import ToolBarButton from "../ToolBarButton";
import { PanelLeftClose, PanelRightClose } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

const OpenSideBar: FunctionComponent<ButtonType> = ({ onClick: resetView }) => {
  const { open, toggleSidebar } = useSidebar();
  return (
    <ToolBarButton
      onClick={toggleSidebar}
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
