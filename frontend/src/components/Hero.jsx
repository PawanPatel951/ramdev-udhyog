import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Zap,
  Wrench,
  Link as LinkIcon,
  Droplets,
  ShieldCheck,
} from "lucide-react";

import sliderImage from "../asserts/images/slider_img.png";

const slides = [
  {
    image: sliderImage,
    icon: Zap,
    eyebrow: "Electrical Components & Wiring",
    title: "Electrical Products",
    highlight: "& Wiring Essentials",
    description:
      "Electrical wires, circuit breakers, wall switches, outlets, extension cords, electrical tape, connectors, conduit pipes and junction boxes.",
  },
  {
    image: sliderImage,
    icon: LinkIcon,
    eyebrow: "Fasteners & Connectors",
    title: "Strong Fasteners",
    highlight: "For Every Job",
    description:
      "Wood screws, machine bolts, hex nuts, flat washers, wall anchors, common nails and cable ties for everyday fixing and construction work.",
  },
  {
    image: sliderImage,
    icon: Wrench,
    eyebrow: "Hand Tools",
    title: "Essential Hand Tools",
    highlight: "For Everyday Work",
    description:
      "Wire strippers, screwdrivers, linesman pliers, tape measures, claw hammers, utility knives and adjustable wrenches.",
  },
  {
    image: sliderImage,
    icon: Droplets,
    eyebrow: "Plumbing & Structural Hardware",
    title: "Pipes, Fittings",
    highlight: "& Hardware",
    description:
      "Teflon tape, PVC pipes, hose clamps, door hinges, padlocks and sandpaper for plumbing, maintenance and structural work.",
  },
  {
    image: sliderImage,
    icon: ShieldCheck,
    eyebrow: "Ramdev Udhyog & Hardware",
    title: "Hardware & Electrical",
    highlight: "Under One Roof",
    description:
      "From wires and switches to tools, fasteners, pipes, fittings and everyday hardware essentials — all in one place.",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrent(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  const slide = slides[current];
  const Icon = slide.icon;

  return (
    <section
      className="relative isolate min-h-[620px] overflow-hidden bg-[#063f42] sm:min-h-screen"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slides.map((item, index) => (
        <img
          key={index}
          src={item.image}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 -z-30 h-full w-full object-cover object-center transition-all duration-[1400ms] ease-out ${
            index === current
              ? "scale-105 opacity-100"
              : "scale-100 opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 -z-20 bg-[#032e30]/55" />

      <div className="absolute inset-0 -z-20 bg-gradient-to-r from-[#021f21]/95 via-[#063f42]/75 to-[#063f42]/10" />

      <div className="absolute inset-0 -z-20 bg-gradient-to-t from-[#021f21] via-transparent to-[#021f21]/20" />

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_45%,rgba(249,115,22,0.14),transparent_32%)]" />

      <div className="mx-auto flex min-h-[620px] max-w-7xl items-center px-4 pb-24 pt-28 sm:min-h-screen sm:px-6 sm:pb-28 sm:pt-32 lg:px-8">
        <div
          key={current}
          className="w-full max-w-3xl text-white"
        >
          <div
            data-aos="fade-down"
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-orange-400 sm:text-xs"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-orange-500/15">
              <Icon size={15} />
            </span>

            <span>{slide.eyebrow}</span>
          </div>

          <h1
            data-aos="fade-up"
            data-aos-delay="100"
            className="mt-5 text-[2.2rem] font-black leading-[1.04] tracking-tight sm:mt-6 sm:text-6xl lg:text-7xl xl:text-[78px]"
          >
            {slide.title}

            <span className="block text-orange-400">
              {slide.highlight}
            </span>
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="mt-5 max-w-2xl text-[13px] leading-6 text-slate-100 sm:text-base sm:leading-7 lg:text-lg"
          >
            {slide.description}
          </p>
        </div>
      </div>

      <div className="absolute bottom-7 left-0 right-0 z-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={previousSlide}
            aria-label="Previous slide"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition-all duration-300 hover:border-orange-400 hover:bg-orange-500 sm:h-10 sm:w-10"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={
                  current === index ? "true" : "false"
                }
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  current === index
                    ? "w-8 bg-orange-500"
                    : "w-1.5 bg-white/40 hover:bg-white"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition-all duration-300 hover:border-orange-400 hover:bg-orange-500 sm:h-10 sm:w-10"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#063f42] to-transparent" />
    </section>
  );
}