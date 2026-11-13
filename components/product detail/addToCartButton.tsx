// components/Product page/AddToCart.tsx
"use client";

import React, { useState } from "react";
import { Product } from "./types/product";

interface AddToCartProps {
  product: Product;
}

export default function AddToCart({ product }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const isOutOfStock = product.quantity !== undefined && product.quantity <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
    }, 400);
  };

  return (
    <div className="space-y-5 font-sans">
      {/* Variant Selector */}
      <div className="space-y-2">
        <span className="eyebrow text-ink-subtle">
          Size
        </span>
        <div className="flex gap-2 text-xs">
          <button
            type="button"
            className="px-4 py-2.5 border border-brand bg-surface-selected font-semibold text-ink cursor-pointer"
          >
            Small — H 38cm
          </button>
          <button
            type="button"
            className="px-4 py-2.5 border border-line text-ink-muted hover:border-ink transition-colors cursor-pointer"
          >
            Large — H 52cm
          </button>
        </div>
      </div>

      {/* Counter & Action Button */}
      <div className="flex gap-3 items-center pt-2">
        <div className="flex items-center border border-field bg-surface">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1 || isOutOfStock}
            className="w-10 h-button flex items-center justify-center text-sm font-light hover:bg-surface-cream disabled:opacity-30 cursor-pointer text-ink"
          >
            −
          </button>
          <span className="w-10 text-center font-semibold text-xs text-ink">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            disabled={
              isOutOfStock ||
              (product.quantity !== undefined && quantity >= product.quantity)
            }
            className="w-10 h-button flex items-center justify-center text-sm font-light hover:bg-surface-cream disabled:opacity-30 cursor-pointer text-ink"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isOutOfStock || isAdding}
          className={`flex-1 h-button text-xs tracking-button uppercase font-semibold text-on-brand transition-all cursor-pointer ${added
              ? "bg-emerald-800"
              : "bg-brand hover:bg-brand-deep"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isAdding
            ? "Adding..."
            : added
              ? "✓ Added to Bag"
              : isOutOfStock
                ? "Sold Out"
                : `ADD TO BAG — $${product.price * quantity}`}
        </button>
      </div>

      {/* Logistics & Delivery Highlights */}
      <div className="pt-2 text-xs text-ink-muted space-y-3 border-t border-line">
        <div className="flex items-center gap-2.5">
          {/* Custom Lucide Truck SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-ink shrink-0"
          >
            <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
            <path d="M15 18H9" />
            <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
            <circle cx="17" cy="18" r="2" />
            <circle cx="7" cy="18" r="2" />
          </svg>
          <span>Delivered by Thursday. Complimentary fully insured delivery.</span>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Gift Box Icon */}
          <svg xmlns="http://www.w3.org/2000/svg"
            width="17" height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-ink shrink-0">
            <path d="M12 7v14" />
            <path d="M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" />
            <path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5" />
            <rect x="3" y="7" width="18" height="4" rx="1" />
          </svg>
          <span>Gift wrapping available — add a handwritten note at checkout.</span>
        </div>
      </div>
    </div>
  );
}