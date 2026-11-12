// components/Product page/RelatedProducts.tsx
import React from "react";
import ProductCard from "@/components/Product page/productCard";
import { getProducts } from "@/lib/data/products";

interface RelatedProductsProps {
  currentCategory: string;
  currentProductId: string;
}

export default async function RelatedProducts({
  currentCategory,
  currentProductId,
}: RelatedProductsProps) {
  const categoryProducts = await getProducts({ category: currentCategory });

  const related = categoryProducts
    .filter((p) => p.id !== currentProductId)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="mt-20 pt-12 border-t border-border font-serif">
      <h2 className="text-2xl font-light tracking-tight mb-8">Complete the Look</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {related.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
}