"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProductCard from "./productCard";
import { Product } from "./types/product";

interface ProductGridProps {
  products: Product[];
  onWishlistToggle?: (formData: FormData) => Promise<void>;
}

export default function ProductGrid({
  products = [],
  onWishlistToggle,
}: ProductGridProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const currentSort = searchParams.get("sort") || "curated";

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", newSort);
    replace(`${pathname}?${params.toString()}`);
  };

  const safeProducts = products.filter(
    (p): p is Product => Boolean(p) && Boolean(p.id)
  );

  return (
    <div className="flex-1 font-serif">
      <div className="flex justify-between items-center border-b border-border pb-4 mb-6">
        <span className="text-xs tracking-wider uppercase text-muted-foreground">
          {safeProducts.length} pieces shown
        </span>

        <div className="flex gap-2 items-center">
          <span className="text-xs tracking-wider uppercase text-muted-foreground">
            Sort by
          </span>
          <select
            value={currentSort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="bg-transparent text-xs tracking-wider font-sans focus:outline-none cursor-pointer text-foreground"
          >
            <option value="curated">Curated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {safeProducts.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground font-sans">
          No pieces match the filter criteria.
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12">
          {safeProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onWishlistToggle={onWishlistToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}