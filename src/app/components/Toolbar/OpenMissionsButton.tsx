import { FunctionComponent } from "react";
import { Route } from "lucide-react";
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
        className="text-black hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
        onClick={resetView}
      >
        <Route />
      </Button>
    </motion.div>
  );
};

export default OpenMissionButton;
