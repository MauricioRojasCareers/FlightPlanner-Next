import { FunctionComponent } from "react";
import { Menu } from "lucide-react";

interface ToolbarProps {
  onClick: () => void;
}

const MobileToolbar: FunctionComponent<ToolbarProps> = ({
  onClick: resetView,
}) => {
  return (
    <button
      onClick={resetView}
      className="absolute top-4 left-4 sm:left-auto sm:right-4 flex items-center gap-2 p-2  bg-white/30 backdrop-blur-md border border-white/20 rounded-xl text-sm shadow-lg text-white hover:bg-white/40 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
    >
      <Menu size={20} className="text-white" />
      <span className="font-extralight text-xs">Mobile</span>
    </button>
  );
};

export default MobileToolbar;
