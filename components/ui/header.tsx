import Link from "next/link";
import LogoText from "./logoText";

const navigation = [
  "New in",
  "Fashion",
  "Home & Living",
  "Beauty",
  "Technology",
  "Gifts",
];

export default function Header() {
  return (
    <header className="w-full bg-surface text-ink">
      {/* Announcement bar */}
      <div className="bg-brand-deep px-4 py-2.5 text-center text-2xs tracking-button text-on-brand-soft">
        Complimentary delivery on orders over [AMOUNT]
        <span className="mx-2">·</span>
        Free returns within 30 days
      </div>

      {/* Navigation */}
      <div className="mx-auto flex max-w-[85rem] items-center justify-between border-b border-line px-4 py-5 md:px-10">
        <Link href="/" className="wordmark text-2xl ">
          <LogoText />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item}
              href="#"
              className="text-xs text-ink-muted transition-colors hover:text-brand-umber"
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <Link
            href="/search"
            className="text-xs transition-colors hover:text-brand-umber"
          >
            Search
          </Link>

          <Link
            href="/account"
            className="hidden text-xs sm:block"
          >
            Account
          </Link>

          <Link
            href="/cart"
            className="text-xs"
          >
            Bag (0)
          </Link>

          <button
            className="text-xl lg:hidden"
            aria-label="Open navigation"
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}