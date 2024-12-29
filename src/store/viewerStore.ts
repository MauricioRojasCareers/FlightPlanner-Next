import { create } from "zustand";

export const useViewerStore = create((set) => ({
  triggerAction: null,
  setTriggerAction: (action: any) => set({ triggerAction: action }),
}));
