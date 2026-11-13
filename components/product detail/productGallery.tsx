// components/Product page/ProductGallery.tsx
"use client";

import React, { useState } from "react";

interface ProductGalleryProps {
  mainImage: string;
  extraImages?: string[];
  productName: string;
}

export default function ProductGallery({
  mainImage,
  extraImages = [],
  productName,
}: ProductGalleryProps) {
  // Combine main image_url and images array without duplicates
  const allImages = Array.from(
    new Set([mainImage, ...(extraImages || [])].filter(Boolean))
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const hasMultipleImages = allImages.length > 1;
  const activeImage = allImages[selectedIndex] || "/placeholder.jpg";

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 sticky top-6">
      {/* Side Thumbnails — Rendered ONLY if product has > 1 image */}
      {hasMultipleImages && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:w-20 shrink-0 scrollbar-none">
          {allImages.map((imgUrl, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={`${imgUrl}-${idx}`}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`relative aspect-[3/4] w-16 md:w-full bg-placeholder overflow-hidden border transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? "border-brand ring-1 ring-brand"
                    : "border-line opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`${productName} view ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Main Image Frame */}
      <div className="relative flex-1 aspect-[4/5] bg-placeholder overflow-hidden border border-line">
        <img
          src={activeImage}
          alt={productName}
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {/* Image Counter Badge (Matches PDF [IMAGE 1 OF 5]) */}
        {hasMultipleImages && (
          <div className="absolute bottom-4 left-4 bg-surface/90 backdrop-blur-sm px-3 py-1 text-[10px] eyebrow text-ink border border-line">
            {selectedIndex + 1} / {allImages.length}
          </div>
        )}
      </div>
    </div>
  );
}