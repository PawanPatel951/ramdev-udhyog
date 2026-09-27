import React from "react";
import { MessageCircle, Package, CheckCircle2 } from "lucide-react";
import { site } from "../data/site";

export default function ProductCard({ product, index = 0 }) {
  const waText = `Hello, I want to enquire about ${product.name}${
    product.sku !== "—" ? ` (SKU: ${product.sku})` : ""
  }.`;

  const discount =
    product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  return (
    <article
      data-aos="fade-up"
      data-aos-delay={(index % 4) * 70}
      className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-orange-200 hover:shadow-[0_20px_55px_rgba(6,63,66,0.12)]"
    >
      <div className="relative h-[235px] overflow-hidden bg-gradient-to-br from-slate-50 to-[#f6f4ee]">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain p-5 transition duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-slate-400">
            <Package size={46} />
            <span className="text-xs font-semibold">No image</span>
          </div>
        )}

        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-orange-500 px-3 py-1.5 text-[10px] font-black text-white shadow-md">
            SAVE {discount}%
          </span>
        )}

        <span className="absolute right-3 top-3 max-w-[62%] truncate rounded-full border border-white bg-white/90 px-3 py-1.5 text-[10px] font-black text-[#063f42] shadow-sm backdrop-blur">
          {product.category}
        </span>
      </div>

      <div className="p-5">
        <div className="text-[10px] font-black uppercase tracking-[0.15em] text-orange-500">
          {product.brand || "Ramdev Store"}
        </div>

        <h3 className="mt-2 line-clamp-2 min-h-[48px] text-[17px] font-black leading-6 text-slate-900">
          {product.name}
        </h3>

        <p className="mt-2 line-clamp-3 min-h-[60px] text-xs leading-5 text-slate-500">
          {product.description || "Quality product available from our store inventory."}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-[10px]">
          <span className="truncate text-slate-400">
            {product.sku !== "—" ? `SKU: ${product.sku}` : "Genuine product"}
          </span>
          {product.stock > 0 ? (
            <span className="ml-2 inline-flex shrink-0 items-center gap-1 font-bold text-emerald-600">
              <CheckCircle2 size={13} />
              In stock
            </span>
          ) : (
            <span className="ml-2 shrink-0 font-bold text-red-500">Out of stock</span>
          )}
        </div>

        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <small className="block text-[9px] font-semibold uppercase tracking-wide text-slate-400">
              Starting from
            </small>
            <strong className="mr-2 text-xl font-black text-[#063f42]">
              ₹{product.price.toLocaleString("en-IN")}
            </strong>
            {product.mrp > product.price && (
              <del className="text-[11px] text-slate-400">
                ₹{product.mrp.toLocaleString("en-IN")}
              </del>
            )}
          </div>

          <a
            href={`https://wa.me/${site.phoneRaw}?text=${encodeURIComponent(waText)}`}
            target="_blank"
            rel="noreferrer"
            title="Ask on WhatsApp"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600 transition hover:bg-emerald-600 hover:text-white"
          >
            <MessageCircle size={19} />
          </a>
        </div>
      </div>
    </article>
  );
}
