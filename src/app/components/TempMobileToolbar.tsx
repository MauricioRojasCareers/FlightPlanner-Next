"use client";

import TerrainButton from "@/app/components/Toolbar/Buttons/Terrain";
import DrawButton from "@/app/components/Toolbar/Buttons/Draw";
import YourLocation from "@/app/components/Toolbar/Buttons/YourLocation";
import GlobeView from "@/app/components/Toolbar/Buttons/GlobeView";
import DrawerTriggerButton from "./Toolbar/Buttons/DrawerTriggerButton";

import { useViewerStore } from "@/store/viewerStore";

const TempMobileToolbar = ({}) => {
  const { setTriggerAction } = useViewerStore();
  return (
    <>
      <div className="font-bold text-white h-svh relative">
        {/* <Top Left Navbar> */}
        <div className="absolute top-0 w-full  flex justify-between items-center p-6">
          <div className="flex pointer-events-auto w-full">
            {/* Avatar & Search Bar */}
            <div className="flex items-center w-full gap-2 ">
              {/* Avatar */}
              {/* <MenuButton
                onClick={() => {
                  setTriggerAction("tiltView");
                }}
              />
              <OpenMissionButton
                onClick={() => {
                  setTriggerAction("tiltView");
                }}
              /> */}
              {/* Search Bar */}
              {/* <div className="flex items-center w-full">
                <SearchBar />
              </div> */}
              <div className="flex justify-between h-full w-full gap-2 items-center">
                <DrawButton
                  onClick={() => {
                    setTriggerAction("tiltView");
                  }}
                />
                <DrawerTriggerButton onClick={() => {}} />

                <TerrainButton
                  onClick={() => {
                    setTriggerAction("tiltView");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* NorthButton anchored in the bottom-risght corner */}
        <div className="absolute bottom-4 right-4 pointer-events-auto">
          <YourLocation
            onClick={() => {
              setTriggerAction("yourLocation");
            }}
          />
        </div>
        {/* NorthButton anchored in the bottom-right corner */}
        <div className="absolute bottom-4 left-4 pointer-events-auto">
          <GlobeView
            onClick={() => {
              setTriggerAction("globeView");
            }}
          />
        </div>
      </div>
    </>
  );
};

export default TempMobileToolbar;
