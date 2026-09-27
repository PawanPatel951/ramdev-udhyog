import React from "react";
import { Maximize2 } from "lucide-react";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import { gallery } from "../data/site";

export default function Gallery() {
  return (
    <>
      <PageHero
        title="Gallery"
        text="A visual look at our electrical and hardware range and store experience."
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our store"
            title="Quality Products. Genuine Brands."
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {gallery.map((item, i) => (
              <figure
                key={i}
                data-aos="zoom-in"
                data-aos-delay={i * 80}
                className="group relative min-h-[300px] overflow-hidden rounded-[26px] bg-slate-100 shadow-sm"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="h-full min-h-[300px] w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#063f42]/90 via-transparent to-transparent opacity-80" />
                <figcaption className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 text-white">
                  <span className="text-sm font-black leading-5">{item.title}</span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/15 backdrop-blur transition group-hover:bg-orange-500">
                    <Maximize2 size={16} />
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
