import React from "react";
import { RefreshCw, SearchX } from "lucide-react";
import ProductCard from "./ProductCard";
import { useProducts } from "../context/ProductContext";

function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="h-[235px] animate-pulse rounded-2xl bg-slate-100" />
      <div className="mt-4 h-3 w-1/3 animate-pulse rounded bg-slate-100" />
      <div className="mt-3 h-5 w-4/5 animate-pulse rounded bg-slate-100" />
      <div className="mt-3 h-3 w-full animate-pulse rounded bg-slate-100" />
      <div className="mt-2 h-3 w-3/5 animate-pulse rounded bg-slate-100" />
      <div className="mt-5 h-11 w-full animate-pulse rounded-xl bg-slate-100" />
    </div>
  );
}

export default function ProductGrid({ products }) {
  const { loading, error, reload } = useProducts();

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 min-[431px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        data-aos="fade-up"
        className="mx-auto flex max-w-xl flex-col items-center rounded-3xl border border-red-100 bg-red-50 p-8 text-center"
      >
        <SearchX className="h-11 w-11 text-red-500" />
        <h3 className="mt-4 text-lg font-black text-slate-900">
          Products are temporarily unavailable
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{error}</p>
        <button
          onClick={reload}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div
        data-aos="fade-up"
        className="mx-auto flex max-w-xl flex-col items-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center"
      >
        <SearchX className="h-11 w-11 text-orange-500" />
        <h3 className="mt-4 text-lg font-black text-slate-900">
          No products found
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          Try another search or category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 min-[431px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, i) => (
        <ProductCard key={product.id || i} product={product} index={i} />
      ))}
    </div>
  );
}
