import React from "react";
import { Pencil } from "lucide-react";

function DrawingInProgress() {
  return (
    <>
      {/* Ripple Effect and Dark Glass Background */}
      <div
        className="relative flex items-center justify-start h-full
                    backdrop-blur-lg p-2 rounded-xl border shadow-2xl overflow-hidden"
      >
        {/* Main Button with Dark Glass Styling */}
        <div
          className="relative z-10 text-white flex items-center w-full justify-between
                      text-sm transition-all duration-500 ease-in-out gap-2 h-full px-2"
        >
          <p className="tracking-wide text-xs font-bold animate-pulse">
            Drawing in Progress
          </p>
          <Pencil size={15} />
        </div>
      </div>
    </>
  );
}

export default DrawingInProgress;
