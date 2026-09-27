import React from "react";
import { ArrowRight } from "lucide-react";

export default function PageHero({ title, text }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#063f42] via-[#075d5e] to-[#0a6969] py-16 text-white sm:py-20">
      <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-orange-500/20 blur-2xl" />

      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-52 w-52 rounded-full bg-white/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.16em] backdrop-blur">
            RAMDEV UDHYOG & HARDWARE

            <ArrowRight
              size={13}
              aria-hidden="true"
            />
          </span>

          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">
            {title}
          </h1>

          {text && (
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
              {text}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}