import React, { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X, PackageSearch } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import ProductGrid from "../components/ProductGrid";
import { useProducts } from "../context/ProductContext";

export default function Products() {
  const { products, categories } = useProducts();
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const category = params.get("category") || "All";

  useEffect(() => {
    setSearch(params.get("search") || "");
  }, [params]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;

      const matchesSearch =
        !q ||
        [
          product.name,
          product.description,
          product.category,
          product.brand,
          product.sku,
        ]
          .join(" ")
          .toLowerCase()
          .includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [products, search, category]);

  const changeCategory = (value) => {
    const next = new URLSearchParams(params);
    if (value === "All") next.delete("category");
    else next.set("category", value);
    setParams(next);
  };

  return (
    <>
      <PageHero
        title="Products"
        text="Live products loaded from the store product API. Search by product, brand, category or SKU."
      />

      <section className="bg-slate-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex h-12 w-full items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-orange-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-orange-100 lg:max-w-2xl">
                <Search size={19} className="shrink-0 text-slate-400" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search products, brands, SKU..."
                  className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className="inline-flex items-center gap-2 text-sm font-bold text-slate-500">
                <SlidersHorizontal size={17} className="text-orange-500" />
                {filtered.length} products
              </div>
            </div>

            <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => changeCategory("All")}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-black transition ${
                  category === "All"
                    ? "bg-[#063f42] text-white shadow-md"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-orange-200 hover:text-orange-600"
                }`}
              >
                All Products
              </button>

              {categories.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => changeCategory(item)}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-black transition ${
                    category === item
                      ? "bg-orange-500 text-white shadow-md"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-orange-200 hover:text-orange-600"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {filtered.length > 0 && (
            <div className="mb-5 flex items-center gap-2 text-sm text-slate-500">
              <PackageSearch size={17} className="text-orange-500" />
              Showing{" "}
              <span className="font-black text-[#063f42]">{filtered.length}</span>{" "}
              matching products
            </div>
          )}

          <ProductGrid products={filtered} />
        </div>
      </section>
    </>
  );
}
