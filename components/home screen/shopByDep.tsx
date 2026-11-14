import Image from "next/image";
import Link from "next/link";

const departments = [
  {
    name: "Fashion",
    image: "/images/fashion.jpg",
    link: "/fashion",
  },
  {
    name: "Home & Living",
    image: "/images/home-living.jpg",
    link: "/home-living",
  },
  {
    name: "Beauty",
    image: "/images/beauty.jpg",
    link: "/beauty",
  },
  {
    name: "Technology",
    image: "/images/technology.jpg",
    link: "/technology",
  },
  {
    name: "Gifts",
    image: "/images/gifts.jpg",
    link: "/gifts",
  },
];

export default function ShopByDepartment() {
  return (
    <section
      id="departments"
      className="mx-auto max-w-[85rem] px-4 py-14 md:px-10 md:py-28"
    >
      <div className="mb-8 flex items-end justify-between">
        <h2 className="font-display text-4xl tracking-tightest">
          Shop by department
        </h2>

        <Link
          href="/departments"
          className="hidden border-b border-line-strong pb-1 text-xs hover:text-brand-umber sm:block"
        >
          VIEW ALL →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {departments.map((department) => (
          <Link
            href={department.link}
            key={department.name}
            className="group"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-placeholder">
              <Image
                src={department.image}
                alt={department.name}
                fill
                sizes="(max-width: 640px) 50vw, 20vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="flex items-center justify-between py-4">
              <h3 className="text-sm font-medium">
                {department.name}
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