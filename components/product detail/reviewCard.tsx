// components/Product page/ReviewCard.tsx
import { ProductReview } from "./types/product";

interface ReviewCardProps {
  review: ProductReview;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="py-8 space-y-2.5 font-sans">
      {/* Individual Customer Star Rating */}
      <div className="text-brand text-xs tracking-wider">
        {"★".repeat(review.rating)}
        {"☆".repeat(5 - review.rating)}
      </div>

      {/* Review Headline */}
      <h3 className="text-sm font-semibold text-ink">{review.title}</h3>

      {/* Review Comment Body */}
      <p className="text-xs text-ink-muted leading-relaxed max-w-3xl">
        {review.comment}
      </p>

      {/* Author Name, Verified Buyer Badge & Date */}
      <div className="flex items-center gap-2 text-[11px] text-ink-subtle pt-1">
        <span className="font-medium text-ink">{review.author_name}</span>
        {review.verified && <span>· Verified buyer</span>}
        <span>
          ·{" "}
          {new Date(review.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>
    </article>
  );
}