"use client";

import React, { useState } from "react";
import { Product } from "@/components/product detail/types/product";

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
      {/* Details Tab — Connected to Supabase `details`, `material`, and `color` */}
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
          <div className="mt-3 text-ink-muted leading-relaxed space-y-2 whitespace-pre-line">
            <p>
              {product.details?.trim() ||
                "Hand-finished by small workshops and built for everyday longevity."}
            </p>

            {(product.material || product.color) && (
              <ul className="pt-1 space-y-1 text-ink-subtle">
                {product.material && (
                  <li>
                    Material:{" "}
                    <strong className="text-ink font-normal">
                      {product.material}
                    </strong>
                  </li>
                )}
                {product.color && (
                  <li>
                    Color:{" "}
                    <strong className="text-ink font-normal">
                      {product.color}
                    </strong>
                  </li>
                )}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Care Tab */}
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
          <div className="mt-3 text-ink-muted leading-relaxed space-y-1.5">
            <p>
              Wipe clean with a soft, dry cloth. Avoid harsh chemical cleaners or
              prolonged direct moisture.
            </p>
          </div>
        )}
      </div>

      {/* Delivery & Returns Tab */}
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
          <div className="mt-3 text-ink-muted leading-relaxed space-y-1.5">
            <p>
              Complimentary standard shipping on orders over $300. Free returns
              within 30 days.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}