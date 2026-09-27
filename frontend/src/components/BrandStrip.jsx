import React from "react";
import { brands } from "../data/site";

export default function BrandStrip() {
  return (
    <section className="border-b border-slate-200 bg-white" data-aos="fade-up">
      <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto px-4 py-5 sm:px-6 lg:px-8">
        <span className="mr-2 shrink-0 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
          Brands we trust
        </span>
        {brands.map((brand, i) => (
          <div
            key={brand}
            className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-black tracking-wide text-[#063f42] shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
          >
            {brand}
          </div>
        ))}
      </div>
    </section>
  );
}
