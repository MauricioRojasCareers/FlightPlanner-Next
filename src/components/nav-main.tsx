"use client";

import {
  ChevronRight,
  CopyMinus,
  Pencil,
  Plus,
  Minus,
  type LucideIcon,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { useSidebarStore } from "@/store/sideBarStore";
import { useState } from "react";
import { ParameterBadge } from "./parameter-badge";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const { activeItem, setActiveItem, isCollapsed } = useSidebarStore();
  /* For Sidebar Toggle Button: */
  const { toggleSidebar, open } = useSidebar();

  const [isExpanded, setIsExpanded] = useState(false);

  const handleSidebarToggle = () => {
    if (!open) {
      toggleSidebar(); // Open the sidebar if it's closed
    }
  };

  return (
    <SidebarGroup className="">
      {/* {open && (
        <>
          <div className="flex justify-between items-center w-full">
            <SidebarGroupLabel className="flex items-center gap-4 w-[90%] h-full">
              <p
                className={`${
                  isExpanded
                    ? ""
                    : "text-ellipsis overflow-hidden whitespace-nowrap truncate"
                }  p-2  max-w-full overflow-hidden text-ellipsis select-none`}
              >
                Mission #1 - Hoes Ranch New jersey
              </p>
              <button>
                <Pencil
                  size={15}
                  onClick={() => setIsExpanded((prev) => !prev)}
                />
              </button>
            </SidebarGroupLabel>

            <button className="w-[10%] flex justify-center items-center">
              <CopyMinus size={15} />
            </button>
          </div>
        </>
      )} */}

      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={!item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  className="select-none"
                  tooltip={item.title}
                  onClick={() => {
                    setActiveItem(
                      activeItem === item.title ? null : item.title
                    );

                    handleSidebarToggle();
                  }}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span className="text-xs font-extralight">
                            {subItem.title}
                          </span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>

      {/* {open && (
        <div className="flex justify-center items-center p-2 bg-black text-white m-4">
          <button className="font-extralight select-none">Outputs</button>
        </div>
      )} */}
    </SidebarGroup>
  );
}
