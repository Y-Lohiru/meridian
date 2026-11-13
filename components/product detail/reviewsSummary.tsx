// components/Product page/ReviewSummary.tsx
import React from "react";
import { ProductReview } from "./types/product";

interface ReviewSummaryProps {
  reviews: ProductReview[];
  averageRating: string;
}

export default function ReviewSummary({
  reviews,
  averageRating,
}: ReviewSummaryProps) {
  const totalReviews = reviews.length;

  const getStarStats = (star: number) => {
    if (totalReviews === 0) return { count: 0, pct: "0%" };
    const count = reviews.filter((r) => r.rating === star).length;
    return {
      count,
      pct: `${Math.round((count / totalReviews) * 100)}%`,
    };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-line font-sans">
      {/* Left: Average Rating Score & Stars */}
      <div className="md:col-span-4 space-y-2">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-5xl font-light text-ink">
            {totalReviews > 0 ? averageRating : "—"}
          </span>
          <span className="eyebrow text-ink-subtle">
            {totalReviews > 0
              ? `out of 5 · ${totalReviews} ${totalReviews === 1 ? "review" : "reviews"}`
              : "No ratings yet"}
          </span>
        </div>

        {totalReviews > 0 && (
          <div className="text-brand text-sm tracking-widest">
            {"★".repeat(Math.round(Number(averageRating)))}
            {"☆".repeat(5 - Math.round(Number(averageRating)))}
          </div>
        )}
      </div>

      {/* Right: 5-to-1 Star Breakdown Bars */}
      <div className="md:col-span-8 space-y-2 text-xs text-ink-muted">
        {[5, 4, 3, 2, 1].map((star) => {
          const { count, pct } = getStarStats(star);
          return (
            <div key={star} className="flex items-center gap-3">
              <span className="w-12 text-ink-subtle">{star} star</span>
              <div className="flex-1 bg-surface-cream h-1.5 overflow-hidden">
                <div
                  className="bg-brand h-full transition-all duration-500"
                  style={{ width: pct }}
                />
              </div>
              <span className="w-8 text-right text-ink-subtle">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}