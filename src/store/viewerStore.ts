// viewerStore.ts

import { create } from "zustand";

// Define the store state and actions type
type ViewerStore = {
  triggerAction: string | null;
  setTriggerAction: (action: string | null) => void;
  isCesiumReady: boolean;
  setCesiumReady: (ready: boolean) => void;
  triggerGlobeView: () => void;
  startDrawing: () => void;
};

export const useViewerStore = create<ViewerStore>((set) => ({
  triggerAction: null,
  setTriggerAction: (action) => set({ triggerAction: action }),

  isCesiumReady: false,
  setCesiumReady: (ready) => set({ isCesiumReady: ready }),

  triggerGlobeView: () => set({ triggerAction: "globeView" }), // action to trigger globeView
  triggerYourLocation: () => set({ triggerAction: "yourLocation" }), // action to trigger zoom to your location
  triggerTiltView: () => set({ triggerAction: "tiltView" }), // action to trigger tiltview
  startDrawing: () => set({ triggerAction: "startDrawing" }), // action to trigger tiltview
}));
