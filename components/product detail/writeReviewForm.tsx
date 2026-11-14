// components/Product page/WriteReviewForm.tsx
"use client";

import React, { useState } from "react";
import { submitProductReview } from "@/app/shop/[id]/action";

interface WriteReviewFormProps {
  productId: string;
}

export default function WriteReviewForm({ productId }: WriteReviewFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("productId", productId);
    formData.set("rating", String(rating));

    const result = await submitProductReview(formData);
    setIsSubmitting(false);

    if (result?.error) {
      setStatusMessage({ type: "error", text: result.error });
    } else {
      setStatusMessage({
        type: "success",
        text: "Thank you — your review has been published.",
      });
      form.reset();
      setRating(5);
      setTimeout(() => {
        setIsOpen(false);
        setStatusMessage(null);
      }, 2000);
    }
  };

  return (
    <div className="pt-8 font-sans">
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="px-6 h-tap border border-line-strong text-xs tracking-button uppercase font-semibold text-ink hover:bg-surface-cream transition-colors cursor-pointer"
        >
          WRITE A REVIEW
        </button>
      ) : (
        <div className="bg-surface-cream border border-line p-6 md:p-8 max-w-2xl space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-display text-2xl font-light text-ink">
              Write a Review
            </h3>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-xs text-ink-subtle hover:text-ink uppercase tracking-wider cursor-pointer"
            >
              Close ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Interactive Star Rating Selector */}
            <div className="space-y-1.5">
              <label className="eyebrow text-ink-subtle block">Rating</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => {
                  const active = (hoveredRating || rating) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className={`text-xl transition-colors cursor-pointer ${
                        active ? "text-brand" : "text-line-strong"
                      }`}
                      aria-label={`Rate ${star} stars`}
                    >
                      ★
                    </button>
                  );
                })}
                <span className="text-xs text-ink-muted ml-2">
                  {rating} out of 5
                </span>
              </div>
            </div>

            {/* Reviewer Name */}
            <div className="space-y-1.5">
              <label htmlFor="authorName" className="eyebrow text-ink-subtle block">
                Your Name
              </label>
              <input
                id="authorName"
                name="authorName"
                type="text"
                required
                placeholder="e.g. Kasun D."
                className="w-full h-input px-4 bg-surface border border-field text-sm text-ink focus:outline-none focus:border-brand"
              />
            </div>

            {/* Review Headline */}
            <div className="space-y-1.5">
              <label htmlFor="title" className="eyebrow text-ink-subtle block">
                Review Headline
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                placeholder="Summarize your experience"
                className="w-full h-input px-4 bg-surface border border-field text-sm text-ink focus:outline-none focus:border-brand"
              />
            </div>

            {/* Review Comment */}
            <div className="space-y-1.5">
              <label htmlFor="comment" className="eyebrow text-ink-subtle block">
                Your Review
              </label>
              <textarea
                id="comment"
                name="comment"
                rows={4}
                required
                placeholder="Share details on quality, finish, and how it fits your space..."
                className="w-full p-4 bg-surface border border-field text-sm text-ink focus:outline-none focus:border-brand"
              />
            </div>

            {statusMessage && (
              <p
                className={`text-xs p-3 ${
                  statusMessage.type === "error"
                    ? "bg-red-50 text-warning border border-red-200"
                    : "bg-surface-sand text-ink border border-line"
                }`}
              >
                {statusMessage.text}
              </p>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 h-button bg-brand hover:bg-brand-deep text-on-brand text-xs tracking-button uppercase font-semibold transition-colors cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "SUBMIT REVIEW"}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-6 h-button border border-line-strong text-xs tracking-button uppercase font-semibold text-ink-muted hover:text-ink cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}