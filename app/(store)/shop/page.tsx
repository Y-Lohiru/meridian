// app/shop/page.tsx
import { Suspense } from "react";
import FilterSidebar, { ColorOption } from "@/components/ProductPage/filterSidebar";
import ProductGrid from "@/components/ProductPage/productGrid";
import { getProducts } from "@/lib/data/products";
import { SHOE_CATEGORIES, SHOE_COLORS, SHOE_MATERIALS } from "@/lib/data/shoeOptions";

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
  const categoriesList = SHOE_CATEGORIES;
  const colorsList: ColorOption[] = SHOE_COLORS;
  const materialsList = SHOE_MATERIALS;

  return (
    <div className="bg-background min-h-screen text-foreground font-serif">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-3">
          The Collection
        </h1>
        <p className="max-w-xl text-sm md:text-base text-muted-foreground font-sans font-light leading-relaxed mb-8">
          Boots, loafers and dress shoes hand-lasted in full-grain leather by
          small family workshops, and chosen for how they age.
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