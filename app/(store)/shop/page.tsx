// app/shop/page.tsx
import React, { Suspense } from "react";
import FilterSidebar, { ColorOption } from "@/components/ProductPage/filterSidebar";
import ProductGrid from "@/components/ProductPage/productGrid";
import { getProducts } from "@/lib/data/products";

interface PageProps {
  searchParams: Promise<{
    category?: string;
    color?: string;
    material?: string;
    maxPrice?: string;
    sort?: string;
  }>;
}

// Inner async component handles reading dynamic searchParams
async function ProductCatalog({ searchParams }: PageProps) {
  const params = await searchParams;

  const products = await getProducts({
    category: params.category,
    color: params.color,
    material: params.material,
    maxPrice: params.maxPrice ? parseFloat(params.maxPrice) : 2000,
    sort: params.sort || "curated",
  });

  return <ProductGrid products={products} />;
}

// Outer page component stays static/prerenderable
export default function HomePage({ searchParams }: PageProps) {
  const categoriesList = ["Boots",
  "Loafers",
  "Formal",
  "Sneakers",
  "Heels",
  "Sandals",
  "Lighting",
  "Furniture",
  "Ceramics"];
  const colorsList: ColorOption[] = [
    { name: "Natural", hex: "#E8DCC4" },
    { name: "Charcoal", hex: "#333333" },
    { name: "Smoked", hex: "#6E6B66" },
    { name: "Brass", hex: "#C5A059" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Oak", hex: "#B8976C" },
  ];
  const materialsList = ["Stoneware", "Oak", "Brass", "Travertine", "Wool", "Linen"];

  return (
    <div className="bg-background min-h-screen text-foreground font-serif">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-3">
          Home & Living
        </h1>
        <p className="max-w-xl text-sm md:text-base text-muted-foreground font-sans font-light leading-relaxed mb-8">
          Furniture, lighting and objects made to be lived with—built by small
          workshops and chosen for how they age.
        </p>

        <div className="flex gap-8 items-start">
          <FilterSidebar
            categories={categoriesList}
            colors={colorsList}
            materials={materialsList}
          />

          <Suspense fallback={<div className="flex-1 py-20 text-center font-sans text-muted-foreground">Loading products...</div>}>
            <ProductCatalog searchParams={searchParams} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}