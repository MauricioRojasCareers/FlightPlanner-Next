import { FunctionComponent } from "react";
import { Maximize } from "lucide-react";

import { Button } from "@/app/components/ui/button";

import { motion } from "framer-motion";
import ToolBarButton from "./ToolBarIcon";

interface ToolbarProps {
  onClick: () => void;
}

const MaximizeButton: FunctionComponent<ToolbarProps> = ({
  onClick: resetView,
}) => {
  return (
    <ToolBarButton
      onClick={resetView}
      icon={<Maximize size={24} />}
      reverseHoverEffect={true}
      iconClassName="hover:scale-110 text-black"
    />
  );
};

export default MaximizeButton;
