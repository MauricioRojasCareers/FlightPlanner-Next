"use client";

import * as React from "react";
import {
  Camera,
  Frame,
  Home,
  Map,
  PieChart,
  Plus,
  Projector,
  Ruler,
  Settings2,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import LidarSwitcher from "@/components/lidar-switcher";
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
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <LidarSwitcher teams={data.lidars} />
        {/* <TempSidebarHeader teams={data.lidars}></TempSidebarHeader> */}

        <CameraSwitcher teams={data.cameras} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
