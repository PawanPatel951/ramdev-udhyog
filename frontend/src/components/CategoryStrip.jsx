import React from "react";
import { Link } from "react-router-dom";
import { categories } from "../data/site";

export default function CategoryStrip() {
  return (
    <section className="w-full overflow-hidden bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          data-aos="fade-up"
          className="mb-8 flex items-end justify-between gap-4"
        >
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">
              Shop by category
            </span>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-[#063f42] sm:text-3xl">
              Find What You Need
            </h2>
          </div>

          <Link
            to="/products"
            className="hidden shrink-0 text-sm font-extrabold text-[#063f42] transition hover:text-orange-500 sm:block"
          >
            View Products →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                to="/products"
                data-aos="fade-up"
                data-aos-delay={index * 70}
                className="group rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
              >
                <div
                  className="mx-auto grid h-14 w-14 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: category.bg,
                    color: category.color,
                  }}
                >
                  <Icon size={27} strokeWidth={2.2} />
                </div>

                <h3 className="mt-3 text-xs font-black leading-5 text-[#063f42] sm:text-sm">
                  {category.name}
                </h3>
              </Link>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center sm:hidden">
          <Link
            to="/products"
            className="rounded-xl bg-[#063f42] px-5 py-3 text-sm font-extrabold text-white shadow-lg transition hover:bg-orange-500"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}