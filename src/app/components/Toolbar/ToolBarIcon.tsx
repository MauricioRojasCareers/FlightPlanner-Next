import { X } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { FunctionComponent } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";

interface ToolbarButtonProps {
  onClick: () => void;
  icon: JSX.Element; // Pass the icon as a JSX element
  buttonClassName?: string; // Optional class name for icon styling
  disableHoverEffect?: boolean; // Optional prop to disable hover effect
  reverseHoverEffect?: boolean; // Optional prop to disable hover effect
  iconText?: string; // Optional Icon Name
  buttonSize?: "icon" | "default" | "lg" | "sm"; // Prop to set the button size (default: medium)
  toolTipText?: string;
  showToolTip?: boolean;
  iconClassName?: string; // Optional
  variant?:
    | "home"
    | "north"
    | "maximize"
    | "globe"
    | "destructive"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}

const ToolBarButton: FunctionComponent<ToolbarButtonProps> = ({
  onClick,
  icon,
  buttonClassName,
  iconText,
  buttonSize = "icon",
  toolTipText,
  showToolTip = true,
  variant = "north",
  iconClassName,
}) => {
  // Determine the hover effect class to apply based on reverseHoverEffect and disableHoverEffect

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Conditionally Render ToolTip if passed by showToolTipProp is passed as prop */}
      {showToolTip ? (
        <Tooltip>
          <TooltipTrigger>
            <Button
              size={buttonSize}
              variant={variant}
              onClick={onClick}
              className={` ${buttonClassName} flex flex-row justify-center items-center`}
            >
              {iconText && (
                <p className="font-extralight text-xs">{iconText}</p>
              )}
              <span className={`${iconClassName}`}>{icon}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{toolTipText}</p>
          </TooltipContent>
        </Tooltip>
      ) : (
        // Do not render tooltip
        <Button
          size={buttonSize}
          variant={variant}
          onClick={onClick}
          className={`group ${buttonClassName} flex flex-row justify-center items-center`}
        >
          {iconText && <p className="font-extralight text-xs">{iconText}</p>}
          <span>{icon}</span>
        </Button>
      )}
    </motion.div>
  );
};

export default ToolBarButton;
