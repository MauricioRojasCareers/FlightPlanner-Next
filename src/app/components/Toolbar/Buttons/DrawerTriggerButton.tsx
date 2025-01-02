import { FunctionComponent } from "react";

import { ButtonType } from "@/app/types/toolbar";
import ToolBarButton from "../ToolBarButton";
import { PanelBottomOpen } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

const DrawerTriggerButton: FunctionComponent<ButtonType> = ({
  onClick: resetView,
}) => {
  return (
    <Drawer>
      <DrawerTrigger>
        <ToolBarButton
          onClick={resetView}
          icon={
            <PanelBottomOpen
              className="
          group-hover:scale-75
          group-active:scale-110
          transition-transform duration-300 ease-in-out        
        "
            />
          }
          buttonClassName="group"
        />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerClose>
            <Button>Close</Button>
          </DrawerClose>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-2">
          <Button>Submit</Button>
          <Button>Submit</Button>
          <Button>Submit</Button>
          <Button>Submit</Button>

          <Button>Submit</Button>

          <Button>Submit</Button>

          <Button>Submit</Button>
          <Button>Submit</Button>

          <Button>Submit</Button>
          <Button>Submit</Button>
          <Button>Submit</Button>
          <Button>Submit</Button>
          <Button>Submit</Button>
          <Button>Submit</Button>

          <Button>Submit</Button>
          <Button>Submit</Button>

          <Button>Submit</Button>
          <Button>Submit</Button>

          <Button>Submit</Button>
          <Button>Submit</Button>

          <Button>Submit</Button>
          <Button>Submit</Button>
          <Button>Submit</Button>

          <Button>Submit</Button>
          <Button>Submit</Button>
          <Button>Submit</Button>

          <Button>Submit</Button>
          <Button>Submit</Button>
          <Button>Submit</Button>
          <Button>Submit</Button>

          <Button>Submit</Button>
          <Button>Submit</Button>

          <Button>Submit</Button>
          <Button>Submit</Button>
        </div>

        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerTriggerButton;
