import React from "react";
import Link from "next/link";
import { Product } from "@/types/product";

interface ProductCardProps {
  product?: Product;
  isWishlisted?: boolean;
  onWishlistToggle?: (formData: FormData) => Promise<void>;
}

export default function ProductCard({
  product,
  isWishlisted = false,
  onWishlistToggle,
}: ProductCardProps) {
  if (!product || !product.id) return null;

  return (
    <div className="group cursor-pointer block relative font-serif">
      <Link href={`/shop/${product.id}`} className="block">
        <div className="relative aspect-[3/4] bg-muted overflow-hidden mb-4">
          <img
            src={product.image_url} // Mapped to image_url
            alt={product.productName}
            className="object-cover w-full h-full group-hover:scale-[1.02] transition-transform duration-700 ease-out"
          />
        </div>
      </Link>

      {onWishlistToggle && (
        <form action={onWishlistToggle} className="absolute top-3 right-3 z-10">
          <input type="hidden" name="productId" value={product.id} />
          <input
            type="hidden"
            name="isWishlisted"
            value={isWishlisted ? "true" : "false"}
          />
          <button
            type="submit"
            aria-label="Wishlist item"
            className="text-foreground bg-background rounded-full p-1.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <svg
              className={`w-3.5 h-3.5 ${isWishlisted ? "fill-foreground" : ""}`}
              fill={isWishlisted ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </form>
      )}

      <div className="space-y-1">
        <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
          {product.category}
        </span>
        <h3 className="text-sm md:text-base font-light text-foreground tracking-tight group-hover:underline">
          <Link href={`/shop/${product.id}`}>{product.productName}</Link>
        </h3>
        <p className="text-xs md:text-sm font-sans text-muted-foreground">
          ${product.price}
        </p>
      </div>
    </div>
  );
}