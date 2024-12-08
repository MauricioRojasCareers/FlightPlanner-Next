import { FunctionComponent } from "react";
import { Navigation } from "lucide-react";
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
        className="hover:text-white active:scale-90"
      >
        <Navigation size={24} className="fill-blue-500 transition-all" />
      </Button>
    </motion.div>
  );
};

export default HomeButton;
