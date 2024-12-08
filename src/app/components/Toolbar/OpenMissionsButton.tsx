import { FunctionComponent } from "react";
import { FolderOpen } from "lucide-react";
import { Button } from "@/app/components/ui/button";

import { motion } from "framer-motion";

interface ToolbarProps {
  onClick: () => void;
}

const OpenMissionButton: FunctionComponent<ToolbarProps> = ({
  onClick: resetView,
}) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        size="icon"
        variant="secondary"
        className="active:scale-90"
        onClick={resetView}
      >
        <FolderOpen />
      </Button>
    </motion.div>
  );
};

export default OpenMissionButton;
