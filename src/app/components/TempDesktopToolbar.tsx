"use client";

import { useViewerStore } from "@/store/viewerStore";

const TempDesktopToolbar = ({}) => {
  const setTriggerAction = useViewerStore(
    (state: any) => state.setTriggerAction
  );
  return (
    <>
      <div className="bg-transparent font-bold text-white h-[100vh] relative ">
        {/* <!-- Top Left Navbar --> */}
        <div className="absolute top-0 left-0 bg-blue-400 p-2">
          <p className="bg-red-500">Navbar</p>
          <p>Navbar</p>
          <div className="flex flex-col pointer-events-auto">
            <button
              onClick={() => {
                setTriggerAction("moveCamera");
                console.log("I clicked moveCamera");
              }}
            >
              Move Camera
            </button>
            <button onClick={() => setTriggerAction("zoomOut")}>
              Zoom Out
            </button>
          </div>
        </div>

        {/* <!-- Top Right Navbar --> */}
        <div className="absolute top-0 right-0 bg-blue-400 p-2">
          <p className="bg-red-500">Navbar</p>
          <p>Navbar</p>
        </div>

        {/* <!-- Bottom Left Navbar --> */}
        <div className="absolute bottom-0 left-0 bg-blue-400 p-2">
          <p className="bg-red-500">Navbar</p>
          <p>Navbar</p>
        </div>

        {/* <!-- Bottom Right Navbar --> */}
        <div className="absolute bottom-0 right-0 bg-blue-400 p-2">
          <p className="bg-red-500">Navbar</p>
          <p>Navbar</p>
        </div>
      </div>
    </>
  );
};

export default TempDesktopToolbar;
