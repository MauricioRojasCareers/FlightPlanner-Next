import { FunctionComponent } from "react";
import HomeButton from "@/app/components/Toolbar/HomeButton";

interface ToolbarProps {
  onClick: () => void;
}

const MobileToolbar: FunctionComponent<ToolbarProps> = ({
  onClick: resetView,
}) => {
  return (
    <>
      <HomeButton onClick={resetView} />
    </>
  );
};

export default MobileToolbar;
