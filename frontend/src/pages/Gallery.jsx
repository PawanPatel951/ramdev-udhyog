import React, { useMemo } from "react";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import { useProducts } from "../context/ProductContext";

const ELECTRICAL_HARDWARE_KEYWORDS = [
  "electrical",
  "electric",
  "hardware",
  "wiring",
  "wire",
  "cable",
  "switch",
  "switches",
  "socket",
  "led",
  "light",
  "mcb",
  "breaker",
  "fan",
  "conduit",
  "connector",
  "fastener",
  "screw",
  "bolt",
  "nut",
  "washer",
  "tool",
  "plumbing",
  "fitting",
];

export default function Gallery() {
  const { products, loading, error } = useProducts();

  const galleryProducts = useMemo(() => {
    return products.filter((product) => {
      const text = `
        ${product?.name || ""}
        ${product?.category || ""}
        ${product?.brand || ""}
        ${product?.description || ""}
      `.toLowerCase();

      return ELECTRICAL_HARDWARE_KEYWORDS.some((keyword) =>
        text.includes(keyword)
      );
    });
  }, [products]);

  return (
    <>
      <PageHero
        title="Gallery"
        text="Explore our electrical and hardware products from genuine brands."
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Products"
            title="Electrical & Hardware Range"
          />

          {loading && (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#063f42]/20 border-t-[#f97316]" />
            </div>
          )}

          {!loading && error && (
            <div className="rounded-2xl bg-red-50 px-5 py-4 text-center text-sm font-semibold text-red-600">
              Products could not be loaded.
            </div>
          )}

          {!loading && !error && galleryProducts.length === 0 && (
            <div className="rounded-2xl bg-slate-50 px-5 py-12 text-center">
              <p className="text-base font-bold text-[#063f42]">
                No electrical or hardware products available.
              </p>
            </div>
          )}

          {!loading && !error && galleryProducts.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {galleryProducts.map((product, index) => {
                const image =
                  product.image ||
                  (Array.isArray(product.images)
                    ? product.images[0]
                    : "");

                return (
                  <figure
                    key={product.id || product._id || index}
                    data-aos="zoom-in"
                    data-aos-delay={Math.min(index * 60, 300)}
                    className="group overflow-hidden rounded-[24px] bg-white shadow-sm ring-1 ring-slate-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="h-[280px] overflow-hidden bg-slate-100 sm:h-[300px]">
                      {image ? (
                        <img
                          src={image}
                          alt={product.name || "Electrical Hardware Product"}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm font-semibold text-slate-400">
                          Image unavailable
                        </div>
                      )}
                    </div>

                    <figcaption className="bg-white px-5 py-4">
                      <h3 className="line-clamp-2 text-base font-black text-[#063f42]">
                        {product.name}
                      </h3>

                      {product.category && (
                        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                          {product.category}
                        </p>
                      )}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}