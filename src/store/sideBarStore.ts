import { create } from "zustand";

type SidebarState = {
  activeItem: string | null;
  isCollapsed: boolean;
};

type SidebarActions = {
  setActiveItem: (item: string | null) => void;
  setIsCollapsed: (collapsed: boolean) => void;
};

export const useSidebarStore = create<SidebarState & SidebarActions>((set) => ({
  activeItem: null,
  isCollapsed: false,
  setActiveItem: (item) => set({ activeItem: item }),
  setIsCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
}));
