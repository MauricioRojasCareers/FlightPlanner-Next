import { FunctionComponent } from "react";
import { Mountain } from "lucide-react";
import { Button } from "@/app/components/ui/button";

import { motion } from "framer-motion";

interface ToolbarProps {
  onTiltView: () => void;
}

const HomeButton: FunctionComponent<ToolbarProps> = ({
  onTiltView: tiltView,
}) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        size="icon"
        variant="north"
        onClick={tiltView}
        className="active:scale-90  text-green-700 "
      >
        <Mountain size={24} className="fill-green-300" />
      </Button>
    </motion.div>
  );
};

export default HomeButton;
