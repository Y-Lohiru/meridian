import Image from "next/image";
import Link from "next/link";

export default function WinterBoot() {
  return (
    <section
      id="winter-boot"
      className="mx-auto grid max-w-[85rem] grid-cols-1 items-center gap-10 px-4 py-14 md:px-10 md:py-28 lg:grid-cols-2 lg:gap-20"
    >
      {/* Image */}
      <div className="relative aspect-[5/4] overflow-hidden bg-placeholder">
        <Image
          src="/Boots-ladies.jpg"
          alt="Goodyear-welted leather boots from The Winter Boot collection"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col items-start lg:px-8">
        <p className="eyebrow mb-6 text-brand-umber">
          THE WINTER BOOT
        </p>

        <h2 className="max-w-lg font-display text-5xl leading-tight tracking-tightest md:text-6xl">
          Built for cold mornings.
        </h2>

        <p className="mt-7 max-w-md text-base leading-relaxed text-ink-muted">
          Waxed calfskin, shearling linings and Goodyear-welted
          soles, stitched by hand so they can be resoled again
          and again. Boots that only get better with every winter.
        </p>

        <Link
          href="/shop?category=Boots"
          className="mt-9 flex min-h-14 items-center bg-brand px-8 text-2xs font-semibold tracking-button text-on-brand transition-colors hover:bg-brand-walnut"
        >
          SHOP THE BOOTS →
        </Link>
      </div>
    </section>
  );
}
