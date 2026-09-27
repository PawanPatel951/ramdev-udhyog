import React from "react";
import {
  ArrowRight,
  Award,
  Headphones,
  IndianRupee,
  ShieldCheck,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

import Hero from "../components/Hero";
import BrandStrip from "../components/BrandStrip";
import CategoryStrip from "../components/CategoryStrip";
import SectionHeading from "../components/SectionHeading";
import ProductGrid from "../components/ProductGrid";
import { useProducts } from "../context/ProductContext";
import { site } from "../data/site";

export default function Home() {
  const { products } = useProducts();

  const benefits = [
    {
      icon: Award,
      title: "Genuine Brands",
      text: "Trusted electrical and hardware brands for everyday requirements and projects.",
    },
    {
      icon: IndianRupee,
      title: "Reasonable Pricing",
      text: "Practical pricing with product choices for different budgets and requirements.",
    },
    {
      icon: Headphones,
      title: "Friendly Support",
      text: "Get help selecting the right product for your home, shop or project.",
    },
    {
      icon: ShieldCheck,
      title: "Quality First",
      text: "We focus on genuine products and dependable quality from known brands.",
    },
  ];

  return (
    <>
      <Hero />
      <BrandStrip />

      <section id="products" className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our product range"
            title="Everything You Need, In One Place"
            text="Browse live products from our store inventory. Prices and availability come directly from our product API."
          />

          <ProductGrid products={products.slice(0, 8)} />

          <div className="mt-10 flex justify-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-[#063f42] px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-[#063f42]/15 transition hover:-translate-y-1 hover:bg-orange-500"
            >
              View All Products
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <CategoryStrip />

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Ramdev"
            title="Built Around Trust & Service"
            text="A simple shopping experience backed by genuine products and local support."
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {benefits.map(({ icon: Icon, title, text }, index) => (
              <div
                key={title}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-orange-200 hover:shadow-xl"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-50 text-orange-500 transition group-hover:bg-orange-500 group-hover:text-white">
                  <Icon size={25} />
                </div>
                <h3 className="mt-5 text-lg font-black text-[#102a2d]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 pb-16 sm:pb-20">
        <div
          data-aos="zoom-in"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#063f42] to-[#0a6969] p-7 text-white shadow-2xl sm:p-10 lg:p-12">
            <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-orange-500/20 blur-2xl" />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-300">
                  Need help?
                </span>
                <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                  Looking for a specific electrical or hardware item?
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-200">
                  Call us or message on WhatsApp and ask about availability,
                  price or suitable alternatives.
                </p>

                <div className="mt-5 flex flex-wrap gap-3 text-xs font-bold text-slate-200">
                  {["Product availability", "Price enquiry", "Suitable alternatives"].map(
                    (item) => (
                      <span key={item} className="inline-flex items-center gap-1.5">
                        <CheckCircle2 size={15} className="text-orange-300" />
                        {item}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <a
                  href={`tel:+${site.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-orange-600"
                >
                  Call {site.phone}
                </a>
                <a
                  href={`https://wa.me/${site.phoneRaw}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-extrabold text-[#063f42] transition hover:bg-slate-100"
                >
                  <MessageCircle size={17} />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
