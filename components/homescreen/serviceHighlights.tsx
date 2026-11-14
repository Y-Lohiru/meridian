import Image from "next/image";
import Link from "next/link";

export default function WinterHouse() {
  return (
    <section
      id="winter-house"
      className="mx-auto grid max-w-[85rem] grid-cols-1 items-center gap-10 px-4 py-14 md:px-10 md:py-28 lg:grid-cols-2 lg:gap-20"
    >
      {/* Image */}
      <div className="relative aspect-[5/4] overflow-hidden bg-placeholder">
        <Image
          src="/images/winter-house.jpg"
          alt="The Winter House interior collection"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col items-start lg:px-8">
        <p className="eyebrow mb-6 text-brand-umber">
          THE WINTER HOUSE
        </p>

        <h2 className="max-w-lg font-display text-5xl leading-tight tracking-tightest md:text-6xl">
          Quiet rooms, warm light.
        </h2>

        <p className="mt-7 max-w-md text-base leading-relaxed text-ink-muted">
          Wool throws, hand-thrown ceramics, low lamps and the
          soft things that make a long evening feel short.
          Gathered across every department into one collection.
        </p>

        <Link
          href="/collections/winter-house"
          className="mt-9 flex min-h-14 items-center bg-brand px-8 text-2xs font-semibold tracking-button text-on-brand transition-colors hover:bg-brand-walnut"
        >
          SHOP THE COLLECTION →
        </Link>
      </div>
    </section>
  );
}