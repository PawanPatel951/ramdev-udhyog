import React from "react";

export default function PageLoader({ fullScreen = true }) {
  return (
    <div
      className={`${
        fullScreen ? "fixed inset-0 z-[9999]" : "relative min-h-[320px]"
      } flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-orange-50`}
      role="status"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center">
        <div className="relative grid h-24 w-24 place-items-center">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-slate-200 border-t-orange-500 border-r-[#063f42]" />
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#063f42] text-xl font-black text-white shadow-xl shadow-[#063f42]/20">
            R
          </div>
        </div>
        <p className="mt-5 text-sm font-black tracking-[0.18em] text-[#063f42]">
          RAMDEV
        </p>
        <p className="mt-1 text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">
          Udhyog & Hardware
        </p>
        <div className="mt-5 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-orange-500" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-orange-500 [animation-delay:120ms]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-orange-500 [animation-delay:240ms]" />
        </div>
      </div>
    </div>
  );
}
