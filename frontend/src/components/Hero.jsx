import React from "react";
import {
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Wrench,
  PackageCheck,
} from "lucide-react";
import { site } from "../data/site";
import sliderImage from "../asserts/images/slider_img.png";

export default function Hero() {
  const features = [
    {
      icon: PackageCheck,
      title: "Quality Products",
      text: "Reliable hardware & electrical items",
    },
    {
      icon: Wrench,
      title: "Complete Range",
      text: "Tools, fittings & project essentials",
    },
    {
      icon: ShieldCheck,
      title: "Trusted Service",
      text: "Local support you can count on",
    },
  ];

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#063f42]">
      <img
        src={sliderImage}
        alt="Ramdev Udhyog and Hardware"
        className="absolute inset-0 -z-30 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 -z-20 bg-[#032e30]/55" />

      <div className="absolute inset-0 -z-20 bg-gradient-to-r from-[#021f21]/95 via-[#063f42]/70 to-[#063f42]/15" />

      <div className="absolute inset-0 -z-20 bg-gradient-to-t from-[#021f21] via-transparent to-[#021f21]/30" />

      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8">
        <div className="w-full max-w-4xl text-white">
          <div
            data-aos="fade-down"
            className="inline-flex items-center gap-2 border border-orange-400/30 bg-[#032e30]/40 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm sm:text-xs"
          >
            <ShieldCheck
              size={15}
              className="text-orange-400"
            />
            Trusted Hardware & Electrical Store
          </div>

          <h1
            data-aos="fade-up"
            data-aos-delay="100"
            className="mt-6 max-w-4xl text-4xl font-black leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl xl:text-[76px]"
          >
            Hardware & Electrical
            <span className="block text-orange-400">
              Solutions Under One Roof
            </span>
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="mt-5 max-w-2xl text-sm leading-7 text-slate-100 sm:text-base lg:text-lg"
          >
            Quality hardware, electrical products, tools,
            fittings and everyday essentials for your home,
            shop and construction needs.
          </p>

          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="mt-7 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#products"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-orange-950/25 transition duration-300 hover:-translate-y-1 hover:bg-orange-600"
            >
              Explore Products
              <ArrowRight size={18} />
            </a>

            <a
              href={`https://wa.me/${site.phoneRaw}?text=${encodeURIComponent(
                "Hello Ramdev Udhyog & Hardware, I want to enquire about your products."
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-extrabold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#063f42]"
            >
              <MessageCircle size={18} />
              WhatsApp Us
            </a>
          </div>

          <div className="mt-10 grid max-w-4xl grid-cols-1 border-y border-white/15 sm:grid-cols-3">
            {features.map(
              ({ icon: Icon, title, text }, index) => (
                <div
                  key={title}
                  data-aos="fade-up"
                  data-aos-delay={400 + index * 100}
                  className={`flex items-center gap-3 py-4 sm:px-5 sm:py-5 ${
                    index !== 0
                      ? "border-t border-white/15 sm:border-l sm:border-t-0"
                      : ""
                  }`}
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-orange-500/15 text-orange-400">
                    <Icon size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-extrabold text-white">
                      {title}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-300">
                      {text}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#063f42]/30 to-transparent" />
    </section>
  );
}