"use client";

import SearchBar from "./Toolbar/Buttons/pending/SearchBar";
import TerrainButton from "@/app/components/Toolbar/Buttons/Terrain";
import DrawButton from "@/app/components/Toolbar/Buttons/Draw";
import OpenMissionButton from "@/app/components/Toolbar/Buttons/MissionsFolder";
import YourLocation from "@/app/components/Toolbar/Buttons/YourLocation";
import GlobeView from "@/app/components/Toolbar/Buttons/GlobeView";
import MenuButton from "@/app/components/Toolbar/Buttons/Settings";

const TempMobileToolbar = ({}) => {
  return (
    <>
      <div className="font-bold text-white h-svh relative">
        {/* <Top Left Navbar> */}
        <div className="absolute top-0 w-full  flex justify-between items-center p-6">
          <div className="flex pointer-events-auto w-full">
            {/* Avatar & Search Bar */}
            <div className="flex items-center w-full gap-2 ">
              {/* Avatar */}
              <MenuButton onClick={() => {}} />
              <OpenMissionButton onClick={() => {}} />
              {/* Search Bar */}
              <div className="flex items-center w-full">
                <SearchBar />
              </div>
              <div className="flex justify-end h-full gap-2 items-center">
                <DrawButton onClick={() => {}} />
                <TerrainButton onClick={() => {}} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* NorthButton anchored in the bottom-risght corner */}
      <div className="absolute bottom-4 right-4 pointer-events-auto">
        <YourLocation onClick={() => {}} />
      </div>
      {/* NorthButton anchored in the bottom-right corner */}
      <div className="absolute bottom-4 left-4 pointer-events-auto">
        <GlobeView onClick={() => {}} />
      </div>
    </>
  );
};

export default TempMobileToolbar;
