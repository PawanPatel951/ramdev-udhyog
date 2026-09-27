import React from "react";
import { Link } from "react-router-dom";
import { categories } from "../data/site";
import { ArrowUpRight } from "lucide-react";

export default function CategoryStrip() {
  return (
    <section className="bg-[#063f42] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div data-aos="fade-right">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-orange-300">
              Shop by category
            </span>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Find what you need faster
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-300" data-aos="fade-left">
            Explore common electrical and hardware categories available from
            our store inventory.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
          {categories.map((category, i) => (
            <Link
              key={category.name}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              data-aos="zoom-in"
              data-aos-delay={i * 50}
              className="group relative flex min-h-[145px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-center text-white transition-all duration-300 hover:-translate-y-1 hover:border-orange-400/50 hover:bg-orange-500"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-orange-300/70 text-xl transition group-hover:border-white">
                {category.icon}
              </span>
              <span className="mt-3 text-xs font-extrabold leading-5">
                {category.name}
              </span>
              <ArrowUpRight
                size={15}
                className="absolute right-3 top-3 opacity-0 transition group-hover:opacity-100"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
