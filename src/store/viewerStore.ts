import { create } from "zustand";

type CesiumViewerState = {
  triggerAction: string;
  isCesiumReady: boolean;
  isDrawing: boolean;
  isFullScreen: boolean;
};

type CesiumViewerActions = {
  setTriggerAction: (actionString: string) => void;
  setCesiumReady: (readyStatus: boolean) => void;

  toggleDrawingMode: () => void;
  toggleFullScreenMode: () => void;
};

export const useCesiumViewerStore = create<
  CesiumViewerState & CesiumViewerActions
>()((set, get) => ({
  isCesiumReady: false,
  isDrawing: false,
  triggerAction: "",
  isFullScreen: false,

  setCesiumReady: (ready) => set({ isCesiumReady: ready }),

  setTriggerAction: (action) => set({ triggerAction: action }),

  toggleDrawingMode: () => {
    const currentDrawingState = get().isDrawing; // Correctly using get() here

    set((state) => ({ isDrawing: !state.isDrawing })); // Toggling state

    if (!currentDrawingState) {
      console.log("Drawing mode activated. Initializing drawing tools...");
    } else {
      console.log("Drawing mode deactivated. Cleaning up drawing tools...");
    }
  },

  toggleFullScreenMode: () => {
    set((state) => {
      const newFullScreenState = !state.isFullScreen;

      if (newFullScreenState) {
        document.documentElement
          .requestFullscreen()
          .catch((err) =>
            console.error(`Failed to enter full-screen mode: ${err.message}`)
          );
      } else {
        document
          .exitFullscreen()
          .catch((err) =>
            console.error(`Failed to exit full-screen mode: ${err.message}`)
          );
      }
      return { isFullScreen: newFullScreenState };
    });
  },
}));

/*NOTE:  TRYING NOT TO USE THIS!!!!!!!!!!!!!!!!!!!!!! -------------------------- */
// Define the store state and actions type
type ViewerStore = {
  triggerAction: string | null;
  setTriggerAction: (action: string | null) => void;

  isCesiumReady: boolean;
  setCesiumReady: (ready: boolean) => void;

  triggerGlobeView: () => void;

  isDrawing: boolean;
  startDrawing: () => void;
  stopDrawing: () => void;
};

export const useViewerStore = create<ViewerStore>((set) => ({
  triggerAction: null,
  isCesiumReady: false,

  isDrawing: false,
  canStartDrawing: true,

  // Update triggerAction state
  setTriggerAction: (action) => set({ triggerAction: action }),

  // Set Cesium ready state
  setCesiumReady: (ready) => set({ isCesiumReady: ready }),

  // Trigger globe view
  triggerGlobeView: () => set({ triggerAction: "globeView" }),

  // Start drawing: Toggle isDrawing and disable further drawing
  startDrawing: () =>
    set((state: any) => {
      if (state.canStartDrawing) {
        return {
          isDrawing: true,
          canStartDrawing: false,
          triggerAction: "startDrawing",
        };
      }
      return state; // No changes if drawing is already disabled
    }),

  // Stop drawing: Reset isDrawing and enable further drawing
  stopDrawing: () =>
    set(() => ({
      isDrawing: false,
      canStartDrawing: false,
      triggerAction: null, // Reset the action
    })),
}));
