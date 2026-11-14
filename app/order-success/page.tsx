import Link from "next/link";

interface OrderSuccessPageProps {
  searchParams: Promise<{
    orderId?: string | string[];
  }>;
}

export default async function OrderSuccessPage({
  searchParams,
}: OrderSuccessPageProps) {
  const params = await searchParams;

  const orderId = Array.isArray(params.orderId)
    ? params.orderId[0]
    : params.orderId;

  return (
    <main className="min-h-screen bg-surface flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center space-y-6">
        {/* Success Icon */}

        <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="38"
            height="38"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#15803d"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>

        {/* Heading */}

        <p className="text-xs uppercase tracking-widest text-ink-subtle">
          MERIDIAN
        </p>

        <h1 className="font-display text-4xl font-light text-ink">
          Thank You For Your Order
        </h1>

        <p className="text-sm text-ink-muted leading-relaxed">
          Your order has been successfully placed. We appreciate your purchase
          and look forward to delivering your items.
        </p>

        {/* Order Reference */}

        {orderId && (
          <div className="border border-line bg-surface-cream p-5 space-y-2">
            <p className="text-xs uppercase tracking-widest text-ink-subtle">
              Order Reference
            </p>

            <p className="text-sm font-semibold text-ink break-all">
              {orderId}
            </p>
          </div>
        )}

        <p className="text-xs text-ink-subtle">Order status: Pending</p>

        {/* Continue Shopping */}

        <Link
          href="/"
          className="inline-block bg-brand text-on-brand px-8 py-4 text-xs uppercase tracking-widest hover:bg-[#3D2615] transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}
