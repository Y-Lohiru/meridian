
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/app/utils/supabase/client";

const categories = [
  "All",
  "Fashion",
  "Home & Living",
  "Beauty",
  "Technology",
];

type Product = {
  id: string;
  productName: string | null;
  category: string | null;
  price: number | null;
  image_url: string | null;
  created_at: string;
};

export default function TheEdit() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("product")
        .select(
          "id, productName, category, price, image_url, created_at"
        )
        .order("created_at", { ascending: true })
        .limit(8);

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data ?? []);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category?.toLowerCase() ===
            activeCategory.toLowerCase()
        );

  const formatPrice = (price: number | null) => {
    if (price === null) return "null";

    return `$${price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <section
      id="edit"
      className="bg-surface-cream py-14 md:py-28"
    >
      <div className="mx-auto max-w-[85rem] px-4 md:px-10">
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
                type="button"
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
        {loading ? (
          <p className="py-10 text-center text-sm text-ink-muted">
            Loading products...
          </p>
        ) : filteredProducts.length === 0 ? (
          <p className="py-10 text-center text-sm text-ink-muted">
            No products found.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
            {filteredProducts.map((product) => (
              <Link
                href={`/products/${product.id}`}
                key={product.id}
                className="group"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-placeholder">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.productName ?? "Product"}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-ink-muted">
                      No image
                    </div>
                  )}
                </div>

                <div className="pt-4">
                  <p className="eyebrow mb-2 text-brand-umber">
                    {product.category ?? "null"}
                  </p>

                  <h3 className="text-sm leading-relaxed text-ink transition-colors group-hover:text-brand-umber">
                    {product.productName ?? "null"}
                  </h3>

                  <p className="mt-2 text-sm font-medium text-brand">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-14 text-center">
          <Link
            href="/shop"
            className="inline-flex min-h-14 items-center border border-brand px-9 text-2xs font-semibold tracking-button text-brand transition-colors hover:bg-brand hover:text-on-brand"
          >
            VIEW THE WHOLE EDIT
          </Link>
        </div>
      </div>
    </section>
  );
}
