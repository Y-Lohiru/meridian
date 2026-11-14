// components/Product page/ProductPurchaseSection.tsx
"use client";

import React, { useState } from "react";
import { Product, ProductVariant } from "./types/product";
import ProductInfo from "./productInfo";
import { usecart } from "@/components/checkout/CartContent";

interface ProductPurchaseSectionProps {
  product: Product;
  averageRating: string;
  reviewCount: number;
}

export default function ProductPurchaseSection({
  product,
  averageRating,
  reviewCount,
}: ProductPurchaseSectionProps) {
  const variants: ProductVariant[] = Array.isArray(product.variants)
    ? product.variants
    : [];
  const hasVariants = variants.length > 0;

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    hasVariants ? variants[0] : null,
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const activePrice = selectedVariant ? selectedVariant.price : product.price;
  const totalPrice = activePrice * quantity;
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
    <div className="space-y-6">
      {/* Header & Dynamic Price */}
      <div>
        <span className="eyebrow text-ink-subtle block mb-1">
          {product.category}
        </span>

        <h1 className="font-display text-4xl font-light text-ink tracking-tight leading-tight">
          {product.productName}
        </h1>

        <div className="flex items-center gap-4 mt-3 font-sans">
          <span className="text-xl font-normal text-brand">
            ${activePrice.toLocaleString()}
          </span>

          {reviewCount > 0 && (
            <a
              href="#reviews"
              className="flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink transition-colors"
            >
              <span className="text-brand">
                {"★".repeat(Math.round(Number(averageRating)))}
                {"☆".repeat(5 - Math.round(Number(averageRating)))}
              </span>
              <span className="font-semibold text-ink">{averageRating}</span>
              <span className="text-ink-subtle">
                ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
              </span>
            </a>
          )}
        </div>
      </div>

      {/* Color / Material Tag */}
      {(product.color || product.material) && (
        <p className="font-sans text-xs text-ink-muted">
          {[product.material, product.color].filter(Boolean).join(" — ")}
        </p>
      )}

      <hr className="border-line" />

      {/* Conditional Size Selector */}
      {hasVariants && (
        <div className="space-y-2.5 font-sans">
          <span className="eyebrow text-ink-subtle block">Size</span>
          <div className="grid grid-cols-2 gap-3">
            {variants.map((variant) => {
              const isSelected = selectedVariant?.label === variant.label;
              return (
                <button
                  key={variant.label}
                  type="button"
                  onClick={() => setSelectedVariant(variant)}
                  className={`p-3.5 text-left border transition-all cursor-pointer ${
                    isSelected
                      ? "border-brand bg-surface-selected text-ink"
                      : "border-line bg-surface text-ink-muted hover:border-ink"
                  }`}
                >
                  <div className="flex justify-between items-center text-xs font-semibold text-ink">
                    <span>{variant.label}</span>
                    <span>${variant.price}</span>
                  </div>
                  {variant.dimensions && (
                    <div className="text-[11px] text-ink-subtle mt-1">
                      {variant.dimensions}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity & Dynamic Add to Bag Button */}
      <div className="space-y-5 font-sans">
        <div className="flex gap-3 items-center pt-1">
          <div className="flex items-center border border-field bg-surface">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1 || isOutOfStock}
              className="w-10 h-button flex items-center justify-center text-sm font-light hover:bg-surface-cream disabled:opacity-30 cursor-pointer text-ink"
            >
              −
            </button>
            <span className="w-10 text-center font-semibold text-xs text-ink">
              {quantity}
            </span>
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
            className={`flex-1 h-button text-xs tracking-button uppercase font-semibold text-on-brand transition-all cursor-pointer ${
              added ? "bg-emerald-800" : "bg-brand hover:bg-brand-deep"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isAdding
              ? "Adding..."
              : added
                ? "✓ Added to Bag"
                : isOutOfStock
                  ? "Sold Out"
                  : `ADD TO BAG — $${totalPrice.toLocaleString()}`}
          </button>
        </div>

        {/* Dark Espresso Box for Delivery & Gift Wrapping */}
        <div className="bg-brand text-on-brand p-5 space-y-3.5 text-xs">
          <div className="flex items-start gap-3">
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
              className="text-on-brand-muted shrink-0 mt-0.5"
            >
              <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
              <path d="M15 18H9" />
              <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
              <circle cx="17" cy="18" r="2" />
              <circle cx="7" cy="18" r="2" />
            </svg>
            <div>
              <p className="font-semibold text-on-brand">
                Complimentary, fully insured delivery
              </p>
              <p className="text-on-brand-soft text-[11px] mt-0.5">
                Tracked to your door with 30-day free returns
              </p>
            </div>
          </div>

          <div className="border-t border-brand-walnut pt-3.5 flex items-start gap-3">
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
              className="text-on-brand-muted shrink-0 mt-0.5"
            >
              <path d="M20 12v10H4V12" />
              <path d="M2 7h20v5H2z" />
              <path d="M12 22V7" />
              <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
              <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
            </svg>
            <div>
              <p className="font-semibold text-on-brand">
                Signature gift wrapping available
              </p>
              <p className="text-on-brand-soft text-[11px] mt-0.5">
                Hand-finished in our black box with a written note at checkout
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion Info */}
      <ProductInfo product={product} />
    </div>
  );
}
