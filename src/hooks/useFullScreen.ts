import { useCallback } from "react";

/**
 * Hook for managing fullscreen functionality for the entire browser window.
 * @returns {Object} Functions to toggle fullscreen mode.
 */
const useFullScreen = () => {
  const toggleFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
      // Enter fullscreen for the entire document
      if (document.documentElement.requestFullscreen) {
        document.documentElement
          .requestFullscreen()
          .catch((err) => console.error("Error entering full-screen:", err));
      } else if ((document.documentElement as any).webkitRequestFullscreen) {
        (document.documentElement as any).webkitRequestFullscreen();
      } else if ((document.documentElement as any).mozRequestFullScreen) {
        (document.documentElement as any).mozRequestFullScreen();
      } else if ((document.documentElement as any).msRequestFullscreen) {
        (document.documentElement as any).msRequestFullscreen();
      }
    } else {
      // Exit fullscreen
      document
        .exitFullscreen()
        .catch((err) => console.error("Error exiting full-screen:", err));
    }
  }, []);

  return { toggleFullScreen };
};

export default useFullScreen;
