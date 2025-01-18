import {
  SidebarMenuSubButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export type ParameterReadtoutProps = {
  parameterName: string;
  defaultValue?: string;
};

export function ParameterReadout({
  parameterName,
  defaultValue = "200",
}: ParameterReadtoutProps) {
  return (
    <div className="flex flex-col gap-2">
      <SidebarSeparator></SidebarSeparator>
      <SidebarMenuSubButton className="w-full justify-between h-full select-none ">
        <div className="w-full h-full flex flex-col gap-2 select-none">
          <Label htmlFor="email" className="text-xs truncate">
            {parameterName}
          </Label>
          <div className="w-full flex justify-around gap-2  ">
            <Button variant="default" size="sm">
              -
            </Button>

            <Input
              className="w-[100%] text-center select-none default:select-none "
              defaultValue={defaultValue}
              onFocus={(e) => (e.target.value = "")} // Clears text when clicked
              onBlur={(e) => {
                if (!e.target.value) e.target.value = defaultValue; // Restore default text if empty
              }}
            />

            <Button variant="default" size="sm">
              +
            </Button>
          </div>
        </div>
      </SidebarMenuSubButton>
      <SidebarSeparator></SidebarSeparator>
    </div>
  );
}
