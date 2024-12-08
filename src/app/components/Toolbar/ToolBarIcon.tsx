import { X } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { FunctionComponent } from "react";

interface ToolbarButtonProps {
  onClick: () => void;
  icon: JSX.Element; // Pass the icon as a JSX element
  iconClassName?: string; // Optional class name for icon styling
  buttonClassName?: string; // Optional class name for icon styling
  disableHoverEffect?: boolean; // Optional prop to disable hover effect
  reverseHoverEffect?: boolean; // Optional prop to disable hover effect
  iconText?: string; // Optional Icon Name
  buttonSize?: "icon" | "default" | "lg" | "sm"; // Prop to set the button size (default: medium)
}

const ToolBarButton: FunctionComponent<ToolbarButtonProps> = ({
  onClick,
  icon,
  iconClassName,
  buttonClassName,
  disableHoverEffect = false,
  reverseHoverEffect = true,
  iconText,
  buttonSize = "icon",
}) => {
  // Determine the hover effect class to apply based on reverseHoverEffect and disableHoverEffect
  const hoverEffectClass = !disableHoverEffect
    ? reverseHoverEffect
      ? "group-hover:scale-150 transition-all"
      : ""
    : "group-hover:scale-75 transition-all";
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        size={buttonSize}
        variant="secondary"
        onClick={onClick}
        className={`group ${buttonClassName} fflex flex-row justify-center items-center`}
      >
        {iconText && <p className="font-extralight text-xs">{iconText}</p>}
        {/* Conditionally apply additional icon styling if provided */}
        <span
          className={`${iconClassName} ${hoverEffectClass}`} // Apply the hover effect class
        >
          {icon}
        </span>
      </Button>
    </motion.div>
  );
};

export default ToolBarButton;
