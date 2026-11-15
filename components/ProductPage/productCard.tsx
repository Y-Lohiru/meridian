"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Product } from "./types/product";

interface ProductCardProps {
  product: Product;
  onWishlistToggle?: (formData: FormData) => Promise<void>;
}

function isValidImageUrl(url?: string | null): url is string {
  if (!url) return false;
  const trimmed = url.trim();
  if (
    trimmed === "" ||
    trimmed === "null" ||
    trimmed === "undefined" ||
    trimmed === "/placeholder.jpg"
  ) {
    return false;
  }
  return (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("/")
  );
}

export default function ProductCard({
  product,
  onWishlistToggle,
}: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Catch images that already failed to load during SSR before React hydrated
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setImgError(true);
    }
  }, [product.image_url]);

  const showImage = isValidImageUrl(product.image_url) && !imgError;

  return (
    <div className="group relative font-sans text-ink">
      {/* Wishlist Heart Button (Preserved from your original card) */}
      {onWishlistToggle && (
        <form
          action={onWishlistToggle}
          className="absolute top-3 right-3 z-10"
        >
          <input type="hidden" name="productId" value={product.id} />
          <button
            type="submit"
            aria-label="Toggle wishlist"
            className="w-8 h-8 flex items-center justify-center bg-surface/85 backdrop-blur-sm border border-line text-ink hover:text-brand transition-colors cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </button>
        </form>
      )}

      <Link href={`/shop/${product.id}`} className="block focus:outline-none">
        {/* Image Frame matching ProductGallery.tsx (aspect-[4/5], bg-placeholder, border-line) */}
        <div className="relative aspect-[4/5] w-full bg-placeholder overflow-hidden border border-line mb-3.5">
          {showImage ? (
            <img
              ref={imgRef}
              src={product.image_url}
              alt={product.productName}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 ease-soft group-hover:scale-105"
            />
          ) : (
            /* Exact same missing-image gradient & label as ProductGallery.tsx */
            <div className="w-full h-full bg-placeholder flex items-center justify-center p-6">
              <span className="eyebrow text-ink-subtle text-center opacity-75">
                {product.productName}
              </span>
            </div>
          )}

          {product.quantity !== undefined && product.quantity <= 0 && (
            <span className="absolute bottom-3 left-3 bg-brand text-on-brand px-2.5 py-1 text-[10px] eyebrow">
              Sold Out
            </span>
          )}
        </div>

        {/* Product Meta */}
        <div className="space-y-1">
          <p className="eyebrow text-[10px] text-ink-subtle">
            {product.category}
          </p>

          <h3 className="text-sm font-medium text-ink group-hover:text-brand transition-colors leading-snug">
            {product.productName}
          </h3>

          <p className="text-sm font-normal text-brand">
            ${Number(product.price).toLocaleString()}
          </p>
        </div>
      </Link>
    </div>
  );
}