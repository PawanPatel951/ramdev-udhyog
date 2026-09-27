
import React from "react";
import {
  CheckCircle2,
  Target,
  Users,
  Wrench,
} from "lucide-react";

import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import { site } from "../data/site";

import fanImage from "../asserts/images/fan.jpg";

export default function About() {
  const values = [
    [
      Target,
      "Customer First",
      "Understand the requirement before suggesting a product.",
    ],
    [
      Wrench,
      "Practical Expertise",
      "Support for everyday electrical and hardware needs.",
    ],
    [
      Users,
      "Local Connection",
      "Personal service built around our Bilara customers.",
    ],
  ];

  return (
    <>
      <PageHero
        title="About Us"
        text="A local destination for electrical, hardware and project essentials in Bilara."
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div
            data-aos="fade-right"
            className="relative overflow-hidden rounded-[28px] bg-slate-100 shadow-2xl"
          >
            <img
              src={fanImage}
              alt="Ramdev Udhyog and Hardware"
              width="900"
              height="650"
              loading="lazy"
              decoding="async"
              className="h-full min-h-[320px] w-full object-cover"
            />

            <div className="absolute bottom-5 left-5 rounded-2xl border border-white/20 bg-[#063f42]/90 px-5 py-4 text-white backdrop-blur">
              <p className="text-xs font-black uppercase tracking-wider text-orange-300">
                Local store
              </p>

              <p className="mt-1 text-sm font-bold">
                Bilara, Rajasthan
              </p>
            </div>
          </div>

          <div data-aos="fade-left">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-orange-500">
              About Ramdev
            </span>

            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#102a2d] sm:text-4xl">
              Helping customers find the right products with confidence.
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-500 sm:text-base">
              {site.name} serves customers around Bilara with electrical and
              hardware products from trusted brands. Whether it is a home
              requirement, repair work, shop setup or a larger project, our
              focus is simple: genuine products, useful guidance and dependable
              service.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "Genuine brand options",
                "Practical product guidance",
                "Transparent pricing",
                "Friendly local support",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm font-bold text-[#102a2d]"
                >
                  <CheckCircle2
                    size={18}
                    className="shrink-0 text-orange-500"
                  />

                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our values"
            title="Simple Principles, Everyday Service"
          />

          <div className="grid gap-5 md:grid-cols-3">
            {values.map(([Icon, title, text], index) => (
              <div
                key={title}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-50 text-orange-500">
                  <Icon size={25} />
                </div>

                <h3 className="mt-5 text-lg font-black text-[#102a2d]">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

