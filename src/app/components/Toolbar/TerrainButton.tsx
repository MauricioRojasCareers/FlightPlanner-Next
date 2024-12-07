import { FunctionComponent } from "react";
import { Mountain } from "lucide-react";
import { Button } from "@/app/components/ui/button";

import { motion } from "framer-motion";

interface ToolbarProps {
  onClick: () => void;
}

const HomeButton: FunctionComponent<ToolbarProps> = ({
  onClick: resetView,
}) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Button size="icon" variant="secondary" onClick={resetView}>
        <Mountain size={24} />
      </Button>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs bg-black text-white p-1 rounded-md">
        Go to Home
      </div>
    </motion.div>
  );
};

export default HomeButton;
