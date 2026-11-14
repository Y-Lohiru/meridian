"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const categories = [
  "All",
  "Fashion",
  "Home & Living",
  "Beauty",
  "Technology",
];

const products = [
  {
    name: "Double-faced cashmere overcoat",
    category: "Fashion",
    price: "$890",
    image: "/images/products/cashmere-coat.jpg",
    isNew: true,
  },
  {
    name: "Hand-thrown stoneware vase",
    category: "Home & Living",
    price: "$165",
    image: "/images/products/stoneware-vase.jpg",
    isNew: false,
  },
  {
    name: "Noir Absolu eau de parfum, 100 ml",
    category: "Beauty",
    price: "$210",
    image: "/images/products/perfume.jpg",
    isNew: false,
  },
  {
    name: "Studio wireless headphones",
    category: "Technology",
    price: "$449",
    image: "/images/products/headphones.jpg",
    isNew: true,
  },
  {
    name: "Grained leather weekender",
    category: "Fashion",
    price: "$620",
    image: "/images/products/weekender.jpg",
    isNew: false,
  },
  {
    name: "Merino herringbone throw",
    category: "Home & Living",
    price: "$280",
    image: "/images/products/throw.jpg",
    isNew: false,
  },
  {
    name: "Overnight renewal serum",
    category: "Beauty",
    price: "$96",
    image: "/images/products/serum.jpg",
    isNew: true,
  },
  {
    name: "Ceramic smart speaker",
    category: "Technology",
    price: "$329",
    image: "/images/products/speaker.jpg",
    isNew: false,
  },
];

export default function TheEdit() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === activeCategory
        );

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
              href="#"
              key={product.name}
              className="group"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-placeholder">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {product.isNew && (
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
                  {product.name}
                </h3>

                <p className="mt-2 text-sm font-medium text-brand">
                  {product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/products"
            className="inline-flex min-h-14 items-center border border-brand px-9 text-2xs font-semibold tracking-button text-brand transition-colors hover:bg-brand hover:text-on-brand"
          >
            VIEW THE WHOLE EDIT
          </Link>
        </div>
      </div>
    </section>
  );
}