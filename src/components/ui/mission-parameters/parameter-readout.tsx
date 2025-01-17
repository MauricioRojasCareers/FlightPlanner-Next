import { SidebarMenuSubButton, SidebarSeparator } from "../sidebar";
import { Label } from "../label";
import { Input } from "../input";
import { Button } from "../button";

export type ParameterReadtoutProps = {
  parameterName: string;
  defaultValue?: string | number; // Default value for the input
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
          <div className="w-full flex items-center gap-2">
            <Button variant="ghost" size="icon">
              -
            </Button>

            <Input
              className="flex-grow h-9 text-center font-extralight focus:font-normal "
              defaultValue={defaultValue}
            />

            <Button variant="ghost" size="icon">
              +
            </Button>
          </div>
        </div>
      </SidebarMenuSubButton>
      <SidebarSeparator></SidebarSeparator>
    </div>
  );
}
