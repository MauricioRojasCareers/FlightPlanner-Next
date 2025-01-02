import { Button } from "../../../components/ui/button";
import { motion } from "framer-motion";
import { FunctionComponent } from "react";

interface ToolbarButtonProps {
  onClick: () => void;
  icon: JSX.Element; // Pass the icon as a JSX element for reusability
  iconText?: string; // Optional text in button

  buttonClassName?: string; // Optional class name for icon styling
  buttonSize?: "icon" | "default" | "lg" | "sm"; // Prop to set the button size (default: medium)

  variant?: "secondary";
}

const ToolBarButton: FunctionComponent<ToolbarButtonProps> = ({
  onClick,
  icon,
  iconText,
  buttonClassName,
  buttonSize = "icon",
  variant = "secondary",
}) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        size={buttonSize}
        variant={variant}
        onClick={onClick}
        className={`${buttonClassName} flex flex-row justify-center items-center`}
      >
        {iconText && <p className="font-extralight text-xs">{iconText}</p>}
        <span>{icon}</span>
      </Button>
    </motion.div>
  );
};

export default ToolBarButton;
