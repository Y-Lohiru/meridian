// app/shop/[id]/page.tsx
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, getProductReviews } from "@/lib/data/products";
import ProductGallery from "@/components/product detail/productGallery";
import ProductPurchaseSection from "@/components/product detail/productPurchaseSection";
import ReviewSummary from "@/components/product detail/reviewsSummary";
import ReviewCard from "@/components/product detail/reviewCard";
import RelatedProducts from "@/components/product detail/relatedProducts";
import WriteReviewForm from "@/components/product detail/writeReviewForm";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

async function ProductDetails({ params }: ProductPageProps) {
  // Read the id here, inside <Suspense>, so the rest of the page can be prerendered
  const { id } = await params;

  // Fetch product details and reviews concurrently from Supabase
  const [product, reviews] = await Promise.all([
    getProductById(id),
    getProductReviews(id),
  ]);

  if (!product) {
    notFound();
  }

  // Calculate average star rating from database reviews
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "0.0";

  return (
    <div>
      <nav className="eyebrow text-ink-subtle mb-8 flex flex-wrap items-center gap-2">
        <Link href="/" className="hover:text-ink transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-ink transition-colors">
          Shop
        </Link>
        <span>/</span>
        <span className="text-ink font-semibold">{product.category}</span>
        <span>/</span>
        <span className="text-ink-subtle lowercase font-normal">
          {product.productName}
        </span>
      </nav>

      {/* Main Two-Column Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Gallery with conditional side thumbnails */}
        <div className="lg:col-span-7">
          <ProductGallery
            mainImage={product.image_url}
            extraImages={product.images}
            productName={product.productName}
          />
        </div>

        {/* Right: Conditional size pricing, Add to Bag, and Specifications */}
        <div className="lg:col-span-5">
          <ProductPurchaseSection
            product={product}
            averageRating={averageRating}
            reviewCount={reviews.length}
          />
        </div>
      </div>

      {/* Related Products Grid */}
      <Suspense fallback={<div className="h-64 bg-surface-cream animate-pulse mt-16" />}>
        <RelatedProducts
          currentCategory={product.category}
          currentProductId={product.id}
        />
      </Suspense>

      {/* Reviews Section Rendered Directly Using ReviewSummary & ReviewCard */}
      <section id="reviews" className="mt-section pt-16 border-t border-line">
        <h2 className="font-display text-3xl font-light text-ink tracking-tight mb-8">
          Reviews
        </h2>

        <ReviewSummary reviews={reviews} averageRating={averageRating} />

        <div className="divide-y divide-line">
          {reviews.length > 0 ? (
            reviews.map((rev) => <ReviewCard key={rev.id} review={rev} />)
          ) : (
            <p className="py-10 text-xs text-ink-subtle font-sans">
              There are no customer reviews for this item yet.
            </p>
          )}
        </div>

        {/* Interactive Review Submission Section */}
        <WriteReviewForm productId={product.id} />
      </section>
    </div>
  );
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  return (
    <div className="bg-surface min-h-screen text-ink">
      <main className="max-w-site mx-auto px-gutter-mobile md:px-gutter py-8">
        <Suspense
          fallback={
            <div className="py-32 text-center eyebrow text-ink-subtle">
              Loading product...
            </div>
          }
        >
          <ProductDetails params={params} />
        </Suspense>
      </main>
    </div>
  );
}

