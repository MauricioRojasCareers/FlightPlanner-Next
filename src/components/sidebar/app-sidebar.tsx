"use client";

import * as React from "react";
import {
  Camera,
  CopyMinus,
  Frame,
  Home,
  Map,
  Pencil,
  PieChart,
  Plus,
  Projector,
  Ruler,
  Settings2,
} from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavProjects } from "@/components/sidebar/nav-projects";
import { NavUser } from "@/components/sidebar/nav-user";
import LidarSwitcher from "@/components/sidebar/lidar-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import CameraSwitcher from "./camera-switcher";
import TempSidebarHeader from "./temp-sidebar-header";
import MissionParameters from "@/components/sidebar/mission-parameters/mission-parameters";
import { SearchForm } from "./search-form";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  lidars: [
    {
      name: "Ranger",
      logo: Projector,
      plan: "Ranger",
    },
    {
      name: "MiniRanger",
      logo: Projector,
      plan: "MiniRanger",
    },
    {
      name: "Recon",
      logo: Projector,
      plan: "Recon",
    },
  ],

  cameras: [
    {
      name: "Sony A6KLite",
      logo: Camera,
      plan: "Sony A6KLite",
    },
    {
      name: "Sony A7R4",
      logo: Camera,
      plan: "Sony A7R4",
    },
    {
      name: "Sony LR1",
      logo: Camera,
      plan: "Sony LR1",
    },
    {
      name: "Riebo R6",
      logo: Camera,
      plan: "Riebo R6",
    },
  ],
  navMain: [
    {
      title: "Measurements",
      url: "#",
      icon: Ruler,
      isActive: true,
      items: [
        {
          title: "35 Feet",
          url: "#",
        },
        {
          title: "35 Feet",
          url: "#",
        },
        {
          title: "35 Feet",
          url: "#",
        },
        {
          title: "35 Feet",
          url: "#",
        },
        {
          title: "35 Feet",
          url: "#",
        },
        {
          title: "35 Feet",
          url: "#",
        },
        {
          title: "35 Feet",
          url: "#",
        },
        {
          title: "35 Feet",
          url: "#",
        },
        {
          title: "35 Feet",
          url: "#",
        },
        {
          title: "35 Feet",
          url: "#",
        },
      ],
    },
    {
      title: "Mission Parameters",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Aircraft's Flight Time",
          url: "#",
        },
        {
          title: "Altitude",
          url: "#",
        },
        {
          title: "Curve Size",
          url: "#",
        },
        {
          title: "Flight Direction",
          url: "#",
        },
        {
          title: "Lateral Overlap",
          url: "#",
        },
        {
          title: "Forward Overlap",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SearchForm />
        <SidebarSeparator />

        {/* {open && (
          <>
            <SidebarGroupLabel className="justify-between gap-4">
              <p className="truncate text-base">
                Mission #1 - Hoes Ranch New jersey Mission #1 - Hoes Ranch New
                jersey Mission #1 - Hoes Ranch New jersey Mission #1 - Hoes
                Ranch New jersey Mission #1 - Hoes Ranch New jersey Mission #1 -
                Hoes Ranch New jersey Mission #1 - Hoes Ranch New jersey Mission
                #1 - Hoes Ranch New jersey Mission #1 - Hoes Ranch New jersey
              </p>
              <button>
                <Pencil size={15}></Pencil>
              </button>
            </SidebarGroupLabel>
            <SidebarSeparator />
          </>
        )} */}
        <LidarSwitcher teams={data.lidars} />
        <CameraSwitcher teams={data.cameras} />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <MissionParameters />
        {/* <NavMain items={data.navMain} /> */}
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
