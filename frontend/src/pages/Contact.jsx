import React from "react";
import {
  Clock,
  Facebook,
  Instagram,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from "lucide-react";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import { site } from "../data/site";

export default function Contact() {
  const cards = [
    {
      Icon: Phone,
      label: "Call Us",
      title: site.phone,
      action: "Call Now",
      href: `tel:+${site.phoneRaw}`,
      style: "dark",
    },
    {
      Icon: MessageCircle,
      label: "WhatsApp",
      title: "Chat With Us",
      action: "WhatsApp",
      href: `https://wa.me/${site.phoneRaw}`,
      style: "orange",
    },
    {
      Icon: MapPin,
      label: "Visit Store",
      title: "Bilara, Rajasthan",
      action: "Open Maps",
      href: site.maps,
      style: "dark",
      external: true,
    },
  ];

  return (
    <>
      <PageHero
        title="Contact Us"
        text="Call, WhatsApp or visit our store in Bilara. No enquiry form — contact us directly."
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Get in touch" title="We're Here To Help" />

          <div className="grid gap-5 md:grid-cols-3">
            {cards.map((card, index) => {
              const Icon = card.Icon;
              return (
                <div
                  key={card.label}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-orange-50 text-orange-500">
                    <Icon size={28} />
                  </div>
                  <span className="mt-5 block text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                    {card.label}
                  </span>
                  <h3 className="mt-2 text-xl font-black text-[#102a2d]">{card.title}</h3>
                  <a
                    href={card.href}
                    target={card.external ? "_blank" : undefined}
                    rel={card.external ? "noreferrer" : undefined}
                    className={`mt-5 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-extrabold text-white transition ${
                      card.style === "orange"
                        ? "bg-orange-500 hover:bg-orange-600"
                        : "bg-[#063f42] hover:bg-[#075d5e]"
                    }`}
                  >
                    {card.action}
                    {card.external && <Navigation size={16} />}
                  </a>
                </div>
              );
            })}
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
            <div
              data-aos="fade-right"
              className="rounded-[28px] bg-gradient-to-br from-[#063f42] to-[#0a6969] p-7 text-white sm:p-9"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-300">
                Visit us
              </span>
              <h3 className="mt-3 text-2xl font-black">Ramdev Udhyog & Hardware</h3>

              <div className="mt-7 space-y-4">
                <p className="flex gap-3 text-sm leading-6 text-slate-200">
                  <MapPin className="mt-0.5 shrink-0 text-orange-300" size={19} />
                  {site.address}
                </p>
                <p className="flex gap-3 text-sm leading-6 text-slate-200">
                  <Clock className="mt-0.5 shrink-0 text-orange-300" size={19} />
                  Visit during regular store hours. Please call before visiting
                  for product-specific availability.
                </p>
              </div>

              <div className="mt-7 flex gap-2">
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 transition hover:bg-orange-500"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href={site.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 transition hover:bg-orange-500"
                >
                  <Facebook size={18} />
                </a>
              </div>
            </div>

            <div
              data-aos="fade-left"
              className="min-h-[350px] overflow-hidden rounded-[28px] border border-slate-200 bg-slate-100 shadow-sm"
            >
              <iframe
                title="Ramdev Udhyog & Hardware location"
                className="h-full min-h-[350px] w-full border-0"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  "Ramdev Udhyog & Hardware, Bilara, Rajasthan 342602"
                )}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
