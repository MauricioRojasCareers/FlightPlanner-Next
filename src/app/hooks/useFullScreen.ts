import { useCallback } from "react";

/**
 * Hook for managing fullscreen functionality.
 * @returns {Function} enterFullScreen - Function to toggle fullscreen mode.
 */
const useFullScreen = () => {
  const enterFullScreen = useCallback((element: HTMLElement | null) => {
    if (!element) return;

    if (document.fullscreenElement) {
      // Exit fullscreen
      document
        .exitFullscreen()
        .catch((err) => console.error("Error exiting full-screen:", err));
    } else {
      // Enter fullscreen
      if (element.requestFullscreen) {
        element
          .requestFullscreen()
          .catch((err) => console.error("Error entering full-screen:", err));
      } else if ((element as any).webkitRequestFullscreen) {
        (element as any).webkitRequestFullscreen();
      } else if ((element as any).mozRequestFullScreen) {
        (element as any).mozRequestFullScreen();
      } else if ((element as any).msRequestFullscreen) {
        (element as any).msRequestFullscreen();
      }
    }
  }, []);

  return { enterFullScreen };
};

export default useFullScreen;
