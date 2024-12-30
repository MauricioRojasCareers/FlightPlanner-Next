import { create } from "zustand";

export const useViewerStore = create((set) => ({
  // Existing state and actions
  triggerAction: null,
  setTriggerAction: (action: any) => set({ triggerAction: action }),

  // New state and actions
  isCesiumReady: false,
  setCesiumReady: (ready: boolean) => set({ isCesiumReady: ready }),
}));
