import Link from "next/link";

const shopLinks = [
  "New in",
  "Fashion",
  "Home & Living",
  "Beauty",
  "Technology",
  "Gifts",
];

const helpLinks = [
  "Delivery",
  "Returns",
  "Order tracking",
  "Contact concierge",
  "Size guides",
];

export default function Footer() {
  return (
    <footer className="bg-brand-deep text-on-brand">

      <div className="mx-auto grid max-w-[85rem] grid-cols-1 gap-12 px-4 py-16 md:grid-cols-2 md:px-10 lg:grid-cols-3 lg:py-20">

        {/* Newsletter */}
        <div className="max-w-md">
          <h2 className="font-display text-4xl">
            Join the Meridian list.
          </h2>

          <p className="mt-5 text-sm leading-relaxed text-on-brand-soft">
            First look at new collections and private sales.
            No noise — one letter a fortnight.
          </p>

          <form className="mt-8 flex border-b border-on-brand-muted">
            <input
              type="email"
              placeholder="Email address"
              required
              className="min-w-0 flex-1 border-0 bg-transparent py-4 text-sm text-on-brand outline-none placeholder:text-on-brand-muted"
            />

            <button
              type="submit"
              className="px-3 text-2xs font-semibold tracking-button transition-colors hover:text-on-brand-muted"
            >
              SUBSCRIBE →
            </button>
          </form>
        </div>

        {/* Shop */}
        <div className="lg:pl-16">
          <h3 className="eyebrow mb-7 text-on-brand-muted">
            SHOP
          </h3>

          <ul className="space-y-4 text-sm text-on-brand-soft">
            {shopLinks.map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="transition-colors hover:text-white"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="eyebrow mb-7 text-on-brand-muted">
            HELP
          </h3>

          <ul className="space-y-4 text-sm text-on-brand-soft">
            {helpLinks.map((item) => (
              <li key={item}>
                <Link
                  href={item === "Order tracking" ? "/track-order" : "#"}
                  className="transition-colors hover:text-white"
                >
                  {item}
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
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}