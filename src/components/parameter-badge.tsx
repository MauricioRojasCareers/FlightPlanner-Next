import { Minus, Plus } from "lucide-react";
import { SidebarMenuBadge } from "./ui/sidebar";

export function ParameterBadge() {
  return (
    <>
      <SidebarMenuBadge className="gap-2">
        <button className="bg-black text-white rounded px-2">
          <Minus size={20} />
        </button>
        24
        <button className="bg-black text-white rounded px-2">
          <Plus size={20} />
        </button>
      </SidebarMenuBadge>
    </>
  );
}
