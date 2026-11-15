import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import ShopByDepartment from "./shopByDep";
import TheEdit from "./theEdit";
import WinterBoot from "./serviceHighlights";
import Benefits from "./benifits";
import { getProducts } from "@/lib/data/products";

// Loads products from the database on the server, then hands them to the client component
async function TheEditSection() {
  const products = await getProducts({ sort: "curated" });
  return <TheEdit products={products} />;
}

export default function Hero() {
  return (
    <main className="bg-surface text-ink">

      {/* Main hero */}
      <section className="mx-auto grid max-w-[85rem] grid-cols-1 items-center gap-10 px-4 py-14 md:px-10 lg:grid-cols-2 lg:gap-16 lg:py-24">

        <div className="flex flex-col items-start">
          <p className="eyebrow mb-6 text-brand-umber">
            AUTUMN / WINTER 2026
          </p>

          <h1 className="font-display text-hero font-normal tracking-tightest">
            Made to be worn for decades.
          </h1>

          <p className="mt-7 max-w-md text-base leading-relaxed text-ink-muted">
            Hand-lasted shoes in full-grain leather, from small
            family workshops that have been doing it for generations.
            Every pair is built to be resoled, not replaced.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="flex min-h-14 items-center justify-center bg-brand px-7 text-2xs font-semibold tracking-button text-on-brand transition-colors hover:bg-brand-walnut"
            >
              SHOP NEW ARRIVALS
            </Link>

            <Link
              href="#categories"
              className="flex min-h-14 items-center justify-center border border-line-strong px-7 text-2xs font-semibold tracking-button text-ink transition-colors hover:bg-surface-cream"
            >
              SHOP BY STYLE
            </Link>
          </div>
        </div>

        {/* Featured collection image */}
        <div className="group relative min-h-[420px] overflow-hidden bg-placeholder md:min-h-[560px]">
          <Image
            src="/images/hero-campaign.jpg"
            alt="Leather boots from the Meridian Autumn/Winter collection"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-8 text-white md:p-10">
            <p className="eyebrow mb-3 text-on-brand-muted">
              FEATURED COLLECTION
            </p>

            <h2 className="font-display text-4xl">
              The Winter Boot
            </h2>

            <Link
              href="#winter-boot"
              className="mt-5 inline-block border-b border-white pb-2 text-xs tracking-button"
            >
              SHOP THE EDIT →
            </Link>
          </div>
        </div>
      </section>

      <ShopByDepartment />
      <Suspense fallback={<section className="bg-surface-cream py-14 md:py-28" />}>
        <TheEditSection />
      </Suspense>
      <WinterBoot />
      <Benefits />

    </main>
  );
}