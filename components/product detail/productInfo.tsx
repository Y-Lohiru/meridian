// components/Product page/ProductInfo.tsx
"use client";

import { useState } from "react";
import { Product } from "./types/product";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [openTab, setOpenTab] = useState<string | null>("details");

  const toggleTab = (tab: string) => {
    setOpenTab(openTab === tab ? null : tab);
  };

  return (
    <div className="border-t border-line text-xs font-sans pt-2">
      <div className="border-b border-line py-4">
        <button
          type="button"
          onClick={() => toggleTab("details")}
          className="w-full flex justify-between items-center text-left eyebrow text-ink cursor-pointer"
        >
          <span>Details</span>
          <span className="text-sm font-light">{openTab === "details" ? "−" : "+"}</span>
        </button>
        {openTab === "details" && (
          <div className="mt-3 text-ink-muted leading-relaxed space-y-1.5 font-sans">
            <p>Hand-lasted in a family workshop, with a leather lining and insole.</p>
            <p>Stitched construction, built to be resoled.</p>
            <p>Comes with dust bags and cedar shoe trees.</p>
            {product.color && <p>Color: <strong className="text-ink font-normal">{product.color}</strong></p>}
            {product.material && <p>Material: <strong className="text-ink font-normal">{product.material}</strong></p>}
          </div>
        )}
      </div>

      <div className="border-b border-line py-4">
        <button
          type="button"
          onClick={() => toggleTab("care")}
          className="w-full flex justify-between items-center text-left eyebrow text-ink cursor-pointer"
        >
          <span>Care</span>
          <span className="text-sm font-light">{openTab === "care" ? "−" : "+"}</span>
        </button>
        {openTab === "care" && (
          <div className="mt-3 text-ink-muted leading-relaxed space-y-1.5 font-sans">
            <p>Brush off dirt after each wear and rest with shoe trees between wears.</p>
            <p>Condition leather every few months; use a suede brush and protector spray for suede.</p>
            <p>Send your pair back to us for resoling when the sole wears through.</p>
          </div>
        )}
      </div>

      <div className="border-b border-line py-4">
        <button
          type="button"
          onClick={() => toggleTab("shipping")}
          className="w-full flex justify-between items-center text-left eyebrow text-ink cursor-pointer"
        >
          <span>Delivery & Returns</span>
          <span className="text-sm font-light">{openTab === "shipping" ? "−" : "+"}</span>
        </button>
        {openTab === "shipping" && (
          <div className="mt-3 text-ink-muted leading-relaxed space-y-1.5 font-sans">
            <p>Complimentary shipping on orders over $300. 30-day free returns.</p>
          </div>
        )}
      </div>
    </div>
  );
}