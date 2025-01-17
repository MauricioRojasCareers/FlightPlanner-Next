import { Collapsible, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "./ui/sidebar";
import { ChevronRight, Settings2 } from "lucide-react";
import { CollapsibleContent } from "./ui/collapsible";

import { ParameterReadout } from "./ui/mission-parameters/parameter-readout";

export default function MissionParameters() {
  const { toggleSidebar, state } = useSidebar();
  return (
    <SidebarGroup>
      <SidebarMenu>
        <Collapsible asChild className="group/collapsible" defaultOpen={true}>
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                onClick={() => {
                  if (state === "collapsed") {
                    toggleSidebar();
                  }
                }}
              >
                <Settings2 />
                <span>Mission Parameters</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <ParameterReadout
                  parameterName="Flight Direction"
                  defaultValue="120 Degrees"
                />
                <ParameterReadout
                  parameterName="Flight time"
                  defaultValue="15 minutes"
                />
                <ParameterReadout parameterName="Altitude" defaultValue="120" />

                <ParameterReadout parameterName="Speed" defaultValue="8 m/s" />
                <ParameterReadout
                  parameterName="Boundary Buffer"
                  defaultValue="20 m"
                />
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
}
