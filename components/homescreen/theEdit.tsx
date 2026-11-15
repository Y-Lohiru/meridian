"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/components/product detail/types/product";

// Shoe categories stored in the database
const shoeCategories = ["Boots", "Loafers", "Formal", "Sneakers", "Heels", "Sandals"];

const categories = ["All", ...shoeCategories];

const MAX_PRODUCTS = 8;
const NEW_FOR_DAYS = 30;

function sameCategory(a?: string, b?: string) {
  return a?.toLowerCase() === b?.toLowerCase();
}

function isNew(createdAt?: string) {
  if (!createdAt) return false;
  const ageMs = Date.now() - new Date(createdAt).getTime();
  return ageMs < NEW_FOR_DAYS * 24 * 60 * 60 * 1000;
}

function hasImage(url?: string | null): url is string {
  return Boolean(url && (url.startsWith("http") || url.startsWith("/")));
}

export default function TheEdit({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [brokenImages, setBrokenImages] = useState<Set<string>>(new Set());

  // Only shoes appear in The Edit, even if other items are still in the database
  const shoes = products.filter((product) =>
    shoeCategories.some((c) => sameCategory(c, product.category))
  );

  const filteredProducts = (
    activeCategory === "All"
      ? shoes
      : shoes.filter((product) => sameCategory(product.category, activeCategory))
  ).slice(0, MAX_PRODUCTS);

  return (
    <section id="edit" className="bg-surface-cream py-14 md:py-28">
      <div className="mx-auto max-w-site px-4 md:px-10">

        <p className="eyebrow mb-4 text-brand-umber">
          MOST WANTED THIS SEASON
        </p>

        <div className="mb-9 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2 className="font-display text-5xl tracking-tightest">
            The Edit
          </h2>

          {/* Category filters */}
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`border-b pb-2 text-xs transition-colors ${
                  activeCategory === category
                    ? "border-brand text-brand"
                    : "border-transparent text-ink-subtle hover:text-ink"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {filteredProducts.map((product) => (
            <Link
              href={`/shop/${product.id}`}
              key={product.id}
              className="group"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-placeholder">
                {hasImage(product.image_url) && !brokenImages.has(product.id) ? (
                  // Plain <img> (same as the shop's product card) so any storage URL works
                  <img
                    src={product.image_url}
                    alt={product.productName}
                    loading="lazy"
                    onError={() =>
                      setBrokenImages((prev) => new Set(prev).add(product.id))
                    }
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center p-6">
                    <span className="eyebrow text-center text-ink-subtle opacity-75">
                      {product.productName}
                    </span>
                  </div>
                )}

                {isNew(product.created_at) && (
                  <span className="absolute left-3 top-3 bg-surface px-3 py-2 text-2xs tracking-button text-ink">
                    NEW
                  </span>
                )}
              </div>

              <div className="pt-4">
                <p className="eyebrow mb-2 text-brand-umber">
                  {product.category}
                </p>

                <h3 className="text-sm leading-relaxed text-ink transition-colors group-hover:text-brand-umber">
                  {product.productName}
                </h3>

                <p className="mt-2 text-sm font-medium text-brand">
                  ${Number(product.price).toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="py-10 text-center text-sm text-ink-subtle">
            No pairs in this style yet — check back soon.
          </p>
        )}

        <div className="mt-14 text-center">
          <Link
            href="/shop"
            className="inline-flex min-h-14 items-center border border-brand px-9 text-2xs font-semibold tracking-button text-brand transition-colors hover:bg-brand hover:text-on-brand"
          >
            VIEW ALL SHOES
          </Link>
        </div>
      </div>
    </section>
  );
}