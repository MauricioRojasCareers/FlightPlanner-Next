import { ChevronsUpDown, Search } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Label } from "../ui/label";

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  const { state, open, toggleSidebar } = useSidebar();
  return (
    <form {...props}>
      <SidebarMenu className=" flex justify-center items-center  w-full">
        <SidebarMenuItem>
          {!open && (
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              tooltip="Search"
              onClick={() => {
                if (state === "collapsed") {
                  toggleSidebar();
                }
              }}
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg 0 bg-slate-200/50">
                <Search className="size-4" />
              </div>
            </SidebarMenuButton>
          )}

          {open && (
            <>
              <Label htmlFor="search" className="sr-only">
                Search
              </Label>
              <SidebarInput
                id="search"
                placeholder="Search Flight Planner:"
                className="pl-8"
              />
              <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
            </>
          )}
        </SidebarMenuItem>
      </SidebarMenu>
    </form>
  );
}
