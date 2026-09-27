import React from "react";
import {
  Facebook,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { site } from "../data/site";

export default function Footer() {
  return (
    <footer className="bg-[#042f31] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.7fr_1fr]">
          <div data-aos="fade-up">
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-400 text-xl font-black text-white">
                R
              </span>
              <span>
                <span className="block text-lg font-black tracking-wide text-white">
                  RAMDEV
                </span>
                <span className="block text-[9px] font-bold tracking-[0.15em] text-emerald-200/70">
                  UDHYOG & HARDWARE
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
              Quality electrical and hardware products with genuine brands,
              fair pricing and friendly local service.
            </p>

            <div className="mt-5 flex gap-2">
              {[
                [Instagram, site.instagram, "Instagram"],
                [Facebook, site.facebook, "Facebook"],
                [MessageCircle, `https://wa.me/${site.phoneRaw}`, "WhatsApp"],
              ].map(([Icon, href, label]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-orange-400 hover:bg-orange-500 hover:text-white"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div data-aos="fade-up" data-aos-delay="100">
            <h3 className="text-sm font-black uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <div className="mt-4 space-y-2">
              {[
                ["Home", "/"],
                ["Products", "/products"],
                ["Gallery", "/gallery"],
                ["About", "/about"],
                ["Contact", "/contact"],
              ].map(([label, to]) => (
                <Link
                  key={to}
                  to={to}
                  className="flex items-center gap-2 py-1.5 text-sm text-slate-400 transition hover:translate-x-1 hover:text-orange-300"
                >
                  <ArrowUpRight size={14} />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div data-aos="fade-up" data-aos-delay="200">
            <h3 className="text-sm font-black uppercase tracking-wider text-white">
              Visit & Contact
            </h3>

            <a
              href={`tel:+${site.phoneRaw}`}
              className="mt-4 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-orange-400/30 hover:bg-white/10"
            >
              <Phone size={18} className="mt-0.5 shrink-0 text-orange-400" />
              <span>
                <span className="block text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Call us
                </span>
                <span className="mt-1 block text-sm font-bold text-white">
                  {site.phone}
                </span>
              </span>
            </a>

            <a
              href={site.maps}
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-orange-400/30 hover:bg-white/10"
            >
              <MapPin size={18} className="mt-0.5 shrink-0 text-orange-400" />
              <span>
                <span className="block text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Store
                </span>
                <span className="mt-1 block text-sm leading-6 text-slate-300">
                  {site.address}
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <span>Serving Bilara & nearby areas</span>
        </div>
      </div>
    </footer>
  );
}
