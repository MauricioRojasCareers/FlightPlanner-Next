import { FunctionComponent } from "react";
import { Home } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/app/components/ui/button";

interface ToolbarProps {
  onClick: () => void;
}

const HomeButton: FunctionComponent<ToolbarProps> = ({
  onClick: resetView,
}) => {
  return (
    <div className="absolute right-0 p-4">
      {/* Motion Button for animation */}
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
          <Home size={24} />
        </Button>
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs bg-black text-white p-1 rounded-md">
          Go to Home
        </div>
      </motion.div>
    </div>
  );
};

export default HomeButton;
