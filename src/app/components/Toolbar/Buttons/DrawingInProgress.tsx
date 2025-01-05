import React from "react";
import { Pencil } from "lucide-react";

function DrawingInProgress() {
  return (
    <>
      {/* Ripple Effect and Dark Glass Background */}
      <div
        className="relative flex items-center justify-start w-full bg-black/30 
                    backdrop-blur-lg p-4 rounded-xl border border-white/10 shadow-2xl overflow-hidden"
      >
        {/* Ripple Animation */}
        <div
          className="absolute inset-0 w-full h-full rounded-xl 
                        bg-rose-600/20 animate-ripple opacity-30 pointer-events-none animate-pulse"
        ></div>

        {/* Main Button with Dark Glass Styling */}
        <div
          className="relative z-10 text-white flex items-center w-full justify-between
                      text-sm transition-all duration-500 ease-in-out gap-2"
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
