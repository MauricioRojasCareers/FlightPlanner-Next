"use client";

/* SideBar */
import { useSidebar } from "@/components/ui/sidebar";

/* Zustand Imports */
import { useCesiumViewerStore, useViewerStore } from "@/store/viewerStore";

/* Buttons */
import OpenSideBarButton from "../Buttons/OpenSideBar";
import TiltViewButton from "@/app/components/Toolbar/Buttons/TiltView";
import GlobeViewButton from "@/app/components/Toolbar/Buttons/GlobeView";
import YourLocationButton from "@/app/components/Toolbar/Buttons/YourLocation";
import DrawButton from "@/app/components/Toolbar/Buttons/DrawButton";
import FullScreenButton from "../Buttons/OnlyDesktop/FullScreen";
import ExitFullScreenButton from "../Buttons/OnlyDesktop/ExitFullScreen";
import ExitDrawingButton from "../Buttons/ExitDrawing";
import DrawingInProgress from "../Buttons/DrawingInProgress";

export default function DesktopToolbar() {
  /* --------------START Zustand Store  -------------- */
  /* For Draw Button:*/
  const { isDrawing, toggleDrawingMode, isFullScreen, toggleFullScreenMode } =
    useCesiumViewerStore();

  /* For Every Other Button: */
  const { setTriggerAction } = useViewerStore();
  /* --------------END Zustand Store  -------------- */

  /* For Sidebar Toggle Button: */
  const { toggleSidebar } = useSidebar();

  return (
    <>
      <div className="font-bold text-white h-svh relative">
        {/* Top ToolBar Buttons */}
        <div className="absolute top-0 w-full flex justify-between  gap-8 p-8 ">
          {/* Sidebar Toggle Button */}
          <div className="flex gap-4 w-full max-w-[50%] pointer-events-auto ">
            <OpenSideBarButton onClick={toggleSidebar} />
          </div>

          {/* Top-Right Toobar Buttons*/}
          <div className="flex pointer-events-auto ">
            <div className="flex flex-col gap-4 text-center justify-center">
              <div className="flex gap-4 justify-center">
                <TiltViewButton
                  onClick={() => {
                    setTriggerAction("tiltView");
                  }}
                />

                {isFullScreen ? (
                  <ExitFullScreenButton onClick={toggleFullScreenMode} />
                ) : (
                  <FullScreenButton onClick={toggleFullScreenMode} />
                )}

                {!isDrawing ? (
                  <DrawButton onClick={toggleDrawingMode} />
                ) : (
                  <ExitDrawingButton onClick={toggleDrawingMode} />
                )}
              </div>
              {isDrawing && <DrawingInProgress />}
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        {/* Bottom-left corner */}
        <div className="absolute bottom-0 left-0 pointer-events-auto p-8">
          <GlobeViewButton
            onClick={() => {
              setTriggerAction("globeView");
            }}
          />
        </div>
        {/* Bottom-right corner */}
        <div className="absolute bottom-0 right-0 pointer-events-auto p-8">
          <YourLocationButton onClick={() => {}} />
        </div>
      </div>
    </>
  );
}
