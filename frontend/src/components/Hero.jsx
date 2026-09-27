import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Zap,
  ShieldCheck,
  Wrench,
  Cable,
  Settings,
} from "lucide-react";

import sliderImage from "../asserts/images/slider_img.png";

const slides = [
  {
    icon: Zap,
    eyebrow: "Electrical Components & Wiring",
    title: "Electrical Products",
    highlight: "& Wiring Essentials",
    text: "Electrical wires, circuit breakers, wall switches, outlets, extension cords, electrical tape, connectors, conduit pipes and junction boxes.",
  },
  {
    icon: Settings,
    eyebrow: "Fasteners & Connectors",
    title: "Strong & Reliable",
    highlight: "Fastening Solutions",
    text: "Wood screws, machine bolts, hex nuts, flat washers, wall anchors, nails, cable ties and other essential hardware.",
  },
  {
    icon: Wrench,
    eyebrow: "Hand Tools",
    title: "Tools For Every",
    highlight: "Everyday Job",
    text: "Wire strippers, screwdrivers, pliers, tape measures, claw hammers, utility knives and adjustable wrenches.",
  },
  {
    icon: Cable,
    eyebrow: "Plumbing & Hardware",
    title: "Practical Products",
    highlight: "For Every Project",
    text: "Teflon tape, PVC pipes, hose clamps, door hinges, padlocks, sandpaper and essential structural hardware.",
  },
  {
    icon: ShieldCheck,
    eyebrow: "Ramdev Udhyog & Hardware",
    title: "Quality Products",
    highlight: "Under One Roof",
    text: "Electrical and hardware products from trusted brands for homes, shops, repairs and project requirements.",
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const previousSlide = () => {
    setActive((current) =>
      current === 0 ? slides.length - 1 : current - 1
    );
  };

  const nextSlide = () => {
    setActive((current) => (current + 1) % slides.length);
  };

  const currentSlide = slides[active];
  const Icon = currentSlide.icon;

  return (
    <section className="relative w-full max-w-full overflow-hidden bg-[#063f42] text-white">
      <div className="relative h-[680px] w-full max-w-full overflow-hidden sm:h-[720px] lg:h-[760px]">
        <img
          src={sliderImage}
          alt="Ramdev Udhyog and Hardware electrical and hardware products"
          width="1920"
          height="1080"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full max-w-none object-cover object-center"
        />

        <div className="absolute inset-0 bg-[#063f42]/75" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#032e30]/95 via-[#063f42]/80 to-[#063f42]/35" />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#032e30]/60 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-5 pb-16 pt-24 sm:px-6 lg:px-8">
          <div
            key={active}
            data-aos="fade-up"
            className="w-full max-w-3xl"
          >
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-3 py-2 text-[9px] font-black uppercase tracking-[0.14em] text-orange-300 backdrop-blur-sm sm:px-4 sm:text-[10px] sm:tracking-[0.18em]">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-orange-500/20">
                <Icon size={15} />
              </span>

              <span className="truncate">
                {currentSlide.eyebrow}
              </span>
            </div>

            <h1 className="mt-6 max-w-3xl text-[42px] font-black leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {currentSlide.title}
              <span className="block text-orange-500">
                {currentSlide.highlight}
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm font-medium leading-7 text-slate-200 sm:text-base sm:leading-8 lg:text-lg">
              {currentSlide.text}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous slide"
          className="absolute bottom-7 left-5 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/10 text-white backdrop-blur-md transition hover:border-orange-400 hover:bg-orange-500 sm:left-6 lg:left-8"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                active === index
                  ? "w-12 bg-orange-500"
                  : "w-2.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute bottom-7 right-5 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/10 text-white backdrop-blur-md transition hover:border-orange-400 hover:bg-orange-500 sm:right-6 lg:right-8"
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
}