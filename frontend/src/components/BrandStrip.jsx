import React from "react";
import { Award } from "lucide-react";

const brands = [
  {
    name: "Havells India Limited",
    domain: "havells.com",
    color: "#e31b23",
  },
  {
    name: "Anchor",
    domain: "lsin.panasonic.com",
    color: "#005baa",
  },
  {
    name: "Legrand India Private Limited",
    domain: "legrand.co.in",
    color: "#e31b23",
  },
  {
    name: "Crompton Greaves Consumer Electrical Limited",
    domain: "crompton.co.in",
    color: "#e31b23",
  },
  {
    name: "Bajaj Electricals Limited",
    domain: "bajajelectricals.com",
    color: "#e31b23",
  },
 {
  name: "Polycab India Limited",
  domain: "polycab.com",
  color: "#ed1c24",
},
  {
    name: "V-Guard Industries",
    domain: "vguard.in",
    color: "#e31b23",
  },
  {
    name: "Finolex Cables Limited",
    domain: "finolex.com",
    color: "#005baa",
  },
  {
    name: "Orient Electric Limited",
    domain: "orientelectric.com",
    color: "#f26522",
  },
];

const getInitials = (name) => {
  const words = name
    .replace(/Limited|Private|Industries|Consumer|Electrical|Cables|India/gi, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return `${words[0][0]}${words[1][0]}`.toUpperCase();
};

function BrandCard({ brand, index }) {
  const [imageFailed, setImageFailed] = React.useState(false);

 const logoUrl = `https://www.google.com/s2/favicons?domain=${brand.domain}&sz=128`;

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 60}
      className="group relative flex min-h-[88px] items-center gap-3 overflow-hidden rounded-xl border border-slate-200 bg-white px-3 py-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-100/70 sm:min-h-[96px] sm:px-4"
    >
      <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-orange-500 via-orange-400 to-[#063f42] transition-transform duration-500 group-hover:scale-x-100" />

      <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-orange-500/5 transition-all duration-500 group-hover:scale-[2.2] group-hover:bg-orange-500/10" />

      <div className="relative z-10 grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-lg border border-slate-200 bg-white p-1.5 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-orange-200 group-hover:shadow-md sm:h-14 sm:w-14">
        {!imageFailed ? (
          <img
            src={logoUrl}
            alt={`${brand.name} logo`}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <span
            className="text-sm font-black sm:text-base"
            style={{ color: brand.color }}
          >
            {getInitials(brand.name)}
          </span>
        )}
      </div>

      <div className="relative z-10 min-w-0 flex-1">
        <p className="break-words text-[10px] font-extrabold leading-[1.35] text-[#063f42] transition-colors duration-300 group-hover:text-orange-600 sm:text-[11px] lg:text-xs">
          {brand.name}
        </p>

        <div
          className="mt-1.5 h-0.5 w-5 rounded-full transition-all duration-300 group-hover:w-10"
          style={{
            backgroundColor: brand.color,
          }}
        />
      </div>
    </div>
  );
}

export default function BrandStrip() {
  return (
    <section
      className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50"
      data-aos="fade-up"
    >
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
        <div className="mb-6 text-center sm:mb-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-orange-600 sm:text-[10px]">
            <Award size={14} strokeWidth={2.5} />
            Trusted Brands
          </div>

          <h2 className="mt-2 text-xl font-black tracking-tight text-[#063f42] sm:text-2xl lg:text-3xl">
            Brands We Trust
          </h2>

          <p className="mx-auto mt-1.5 max-w-xl text-[11px] leading-5 text-slate-500 sm:text-sm">
            Quality electrical and hardware products from trusted brands.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5">
          {brands.map((brand, index) => (
            <BrandCard
              key={brand.name}
              brand={brand}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}