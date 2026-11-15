
import Link from "next/link";

const shopLinks = [
  { name: "All Shoes", href: "/shop" },
  { name: "Boots", href: "/shop?category=Boots" },
  { name: "Loafers", href: "/shop?category=Loafers" },
  { name: "Formal", href: "/shop?category=Formal" },
  { name: "Sneakers", href: "/shop?category=Sneakers" },
  { name: "Heels", href: "/shop?category=Heels" },
  { name: "Sandals", href: "/shop?category=Sandals" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-deep text-on-brand">
      <div className="mx-auto grid max-w-[85rem] grid-cols-1 gap-12 px-4 py-16 md:grid-cols-2 md:px-10 lg:grid-cols-3 lg:py-20">

        {/* Shop */}
        <div className="lg:pl-16">
          <h3 className="eyebrow mb-7 text-on-brand-muted">
            SHOP
          </h3>

          <ul className="space-y-4 text-sm text-on-brand-soft">
            {shopLinks.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-white"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="border-t border-on-brand-muted/30">
        <div className="mx-auto flex max-w-[85rem] flex-col justify-between gap-5 px-4 py-7 text-2xs text-on-brand-muted sm:flex-row sm:items-center md:px-10">

          <Link href="/" className="wordmark text-xl text-white">
            MERIDIAN
          </Link>

          <p>© 2026 Meridian. All rights reserved.</p>

          <div className="flex gap-5">
            <Link
              href="/Policies/privacy"
              className="transition-colors hover:text-white"
            >
              Privacy
            </Link>

            <Link
              href="/Policies/terms"
              className="transition-colors hover:text-white"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
