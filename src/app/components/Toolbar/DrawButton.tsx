import { FunctionComponent } from "react";
import { Route } from "lucide-react";
import { Button } from "@/app/components/ui/button";

import { motion } from "framer-motion";

interface ToolbarProps {
  onClick?: () => void;
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
      <Button
        size="icon"
        variant="north"
        onClick={resetView}
        className="active:scale-90 text-rose-600 active:text-rose-400"
      >
        <Route size={24} />
      </Button>
    </motion.div>
  );
};

export default HomeButton;
