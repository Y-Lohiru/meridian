import Image from "next/image";
import Link from "next/link";

// Shoe categories — names match the `category` values stored in the database
const categories = [
  { name: "Boots", image: "/images/boots.jpg" },
  { name: "Loafers", image: "/images/loafers.jpg" },
  { name: "Formal", image: "/images/formal.jpg" },
  { name: "Sneakers", image: "/images/sneakers.jpg" },
  { name: "Heels", image: "/images/heels.jpg" },
  { name: "Sandals", image: "/images/sandals.jpg" },
];

export default function ShopByDepartment() {
  return (
    <section
      id="categories"
      className="mx-auto max-w-[85rem] px-4 py-14 md:px-10 md:py-28"
    >
      <div className="mb-8 flex items-end justify-between">
        <h2 className="font-display text-4xl tracking-tightest">
          Shop by style
        </h2>

        <Link
          href="/shop"
          className="hidden border-b border-line-strong pb-1 text-xs hover:text-brand-umber sm:block"
        >
          VIEW ALL SHOES →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <Link
            href={`/shop?category=${category.name}`}
            key={category.name}
            className="group"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-placeholder">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="flex items-center justify-between py-4">
              <h3 className="text-sm font-medium">
                {category.name}
              </h3>

              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
