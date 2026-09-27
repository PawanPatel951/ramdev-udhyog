import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Phone,
  MessageCircle,
} from "lucide-react";

import { site } from "../data/site";
import logo from "../asserts/images/logos.jpeg";

const links = [
  ["Home", "/"],
  ["Products", "/products"],
  ["Gallery", "/gallery"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50);
        ticking = false;
      });

      ticking = true;
    };

    setScrolled(window.scrollY > 50);

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[1000] w-full max-w-none transition-[background-color,box-shadow] duration-300 ${
          scrolled
            ? "bg-[#032e30]/95 shadow-lg backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="w-full max-w-none">
          <div
            className={`mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 ${
              scrolled
                ? "h-[68px]"
                : "h-[76px] sm:h-[82px]"
            }`}
          >
            <Link
              to="/"
              onClick={closeMenu}
              className="group flex shrink-0 items-center gap-3"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-200 group-hover:scale-105 sm:h-12 sm:w-12">
                <img
                  src={logo}
                  alt="Ramdev Udhyog & Hardware"
                  width="48"
                  height="48"
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="leading-none">
                <div className="text-[17px] font-black tracking-wide text-white sm:text-xl">
                  RAMDEV
                </div>

                <div className="mt-1 text-[7px] font-bold tracking-[0.18em] text-orange-300 sm:text-[8px]">
                  UDHYOG & HARDWARE
                </div>
              </div>
            </Link>

            <nav className="hidden items-center gap-7 md:flex lg:gap-9">
              {links.map(([label, to]) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) =>
                    `relative py-2 text-[14px] font-bold transition-colors duration-200 ${
                      isActive
                        ? "text-orange-400"
                        : "text-white hover:text-orange-300"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {label}

                      <span
                        className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-orange-500 transition-all duration-200 ${
                          isActive ? "w-full" : "w-0"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="hidden shrink-0 items-center gap-2.5 md:flex">
              <a
                href={`tel:+${site.phoneRaw}`}
                className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-4 py-2.5 text-sm font-bold text-white transition duration-200 hover:border-orange-400 hover:bg-white/10 hover:text-orange-300"
              >
                <Phone size={16} />
                Call Now
              </a>

              <a
                href={`https://wa.me/${site.phoneRaw}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-bold text-white shadow-md transition duration-200 hover:bg-orange-600"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
            </div>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/20 bg-black/10 text-white backdrop-blur-sm transition duration-200 hover:bg-white/10 md:hidden"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <div
          className={`w-full overflow-hidden border-t border-white/10 bg-[#032e30]/98 backdrop-blur-xl transition-all duration-300 md:hidden ${
            open
              ? "max-h-[500px] opacity-100"
              : "max-h-0 border-transparent opacity-0"
          }`}
        >
          <div className="mx-auto w-full max-w-7xl px-4 pb-5 pt-3 sm:px-6">
            <nav className="flex flex-col">
              {links.map(([label, to]) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `border-b border-white/10 px-2 py-4 text-sm font-bold transition ${
                      isActive
                        ? "text-orange-400"
                        : "text-white hover:text-orange-300"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <a
                href={`tel:+${site.phoneRaw}`}
                onClick={closeMenu}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                <Phone size={16} />
                Call
              </a>

              <a
                href={`https://wa.me/${site.phoneRaw}`}
                target="_blank"
                rel="noreferrer"
                onClick={closeMenu}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </header>

      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={closeMenu}
          className="fixed inset-0 z-[900] bg-black/30 md:hidden"
        />
      )}
    </>
  );
}