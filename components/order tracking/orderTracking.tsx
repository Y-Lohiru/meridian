
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Package,
  Truck,
  MapPin,
  CalendarDays,
  Headphones,
  ShoppingBag,
  CreditCard,
  ShieldCheck,
  Clock3,
} from "lucide-react";

const order = {
  number: "M-10479",
  placedOn: "12 November 2026",
  status: "In transit",
  estimatedDelivery: "18 November 2026",
  carrier: "DHL Express",
  trackingNumber: "DHL-82910472",
  deliveryMethod: "Express delivery",
  paymentMethod: "Visa ending in 4242",
  recipient: "Alex Morgan",
  address: [
    "24 Kensington Gardens",
    "London W8 4PX",
    "United Kingdom",
  ],
  subtotal: 1055,
  shipping: 0,
  total: 1055,
};

const products = [
  {
    name: "Double-faced cashmere overcoat",
    category: "FASHION / OUTERWEAR",
    variant: "Camel / Medium",
    quantity: 1,
    price: 890,
    image: "/images/products/cashmere-coat.jpg",
  },
  {
    name: "Hand-thrown stoneware vase",
    category: "HOME & LIVING / OBJECTS",
    variant: "Natural / One size",
    quantity: 1,
    price: 165,
    image: "/images/products/stoneware-vase.jpg",
  },
];

const stages = [
  { label: "Confirmed", date: "12 Nov" },
  { label: "Preparing", date: "13 Nov" },
  { label: "Shipped", date: "14 Nov" },
  { label: "Delivered", date: "Expected 18 Nov" },
];

function money(value: number) {
  return `$${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
  })}`;
}

export default function TrackOrderPage() {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <main className="min-h-screen bg-surface-cream text-ink">
      {/* Page heading */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-6 pb-14 pt-12 md:px-12 md:pb-20 md:pt-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-ink-muted transition hover:text-ink"
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            Back to shopping
          </Link>

          <div className="mt-14 max-w-2xl">
            <p className="eyebrow mb-5 text-brand-umber">
              MERIDIAN / YOUR ORDER
            </p>

            <h1 className="font-display text-5xl leading-[1.05] tracking-tightest md:text-7xl">
              Track your
              <br />
              <span className="italic">order.</span>
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-7 text-ink-muted md:text-base">
              From our hands to your home. Follow the progress
              of your order and find everything you need
              in one place.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-20">
        {/* Order number and status */}
        <div className="flex flex-col justify-between gap-6 border-b border-line pb-9 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-3 text-ink-muted">
              ORDER REFERENCE
            </p>
            <h2 className="font-display text-3xl md:text-4xl">
              {order.number}
            </h2>
            <p className="mt-2 text-sm text-ink-muted">
              Placed on {order.placedOn}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-brand-umber" />
            <span className="text-xs font-medium uppercase tracking-[0.14em]">
              {order.status}
            </span>
          </div>
        </div>

        {/* Delivery highlight */}
        <section className="mt-10 bg-surface-sand px-7 py-9 md:px-12 md:py-12">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <Truck
                  size={19}
                  strokeWidth={1.4}
                  className="text-brand-umber"
                />
                <span className="eyebrow text-brand-umber">
                  ON ITS WAY TO YOU
                </span>
              </div>

              <p className="text-xs uppercase tracking-[0.16em] text-ink-muted">
                Estimated arrival
              </p>

              <h3 className="mt-3 font-display text-3xl leading-tight md:text-5xl">
                {order.estimatedDelivery}
              </h3>

              <p className="mt-4 max-w-md text-sm leading-7 text-ink-muted">
                Your pieces have left our care and are making
                their way to you. We&apos;ll keep you updated
                as your delivery progresses.
              </p>
            </div>

            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-line bg-surface-cream md:h-28 md:w-28">
              <Package
                size={38}
                strokeWidth={1}
                className="text-brand-umber"
              />
            </div>
          </div>
        </section>

        {/* Progress tracker */}
        <section className="py-14 md:py-20">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <p className="eyebrow mb-3 text-brand-umber">
                DELIVERY PROGRESS
              </p>
              <h2 className="font-display text-3xl md:text-4xl">
                Almost there.
              </h2>
            </div>
            <span className="hidden text-xs text-ink-muted sm:block">
              Step 3 of 4
            </span>
          </div>

          <div className="relative">
            <div className="absolute left-[12.5%] right-[12.5%] top-[17px] h-px bg-line" />
            <div className="absolute left-[12.5%] top-[17px] h-px w-[50%] bg-brand" />

            <div className="relative grid grid-cols-4 gap-2">
              {stages.map((stage, index) => {
                const completed = index < 3;
                const current = index === 2;

                return (
                  <div
                    key={stage.label}
                    className="flex flex-col items-center text-center"
                  >
                    <div
                      className={`z-10 flex h-9 w-9 items-center justify-center rounded-full border ${
                        completed
                          ? "border-brand bg-brand text-on-brand"
                          : "border-line bg-surface-cream text-ink-muted"
                      } ${
                        current
                          ? "ring-4 ring-surface-sand"
                          : ""
                      }`}
                    >
                      {completed ? (
                        <Check size={15} strokeWidth={1.8} />
                      ) : (
                        <span className="text-xs">{index + 1}</span>
                      )}
                    </div>

                    <p
                      className={`mt-5 text-[10px] font-medium uppercase tracking-[0.08em] sm:text-xs sm:tracking-[0.12em] ${
                        completed ? "text-ink" : "text-ink-muted"
                      }`}
                    >
                      {stage.label}
                    </p>
                    <p className="mt-2 text-[10px] text-ink-muted sm:text-xs">
                      {stage.date}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <div className="grid gap-12 border-t border-line pt-14 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          {/* Products */}
          <section>
            <p className="eyebrow mb-3 text-brand-umber">
              YOUR SELECTION
            </p>
            <h2 className="font-display text-3xl md:text-4xl">
              Pieces in your order.
            </h2>

            <div className="mt-9 divide-y divide-line border-t border-line">
              {products.map((product) => (
                <div
                  key={product.name}
                  className="flex gap-5 py-7 sm:gap-7"
                >
                  <div className="h-32 w-24 shrink-0 overflow-hidden bg-surface-sand sm:h-40 sm:w-32">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.14em] text-brand-umber">
                        {product.category}
                      </p>
                      <h3 className="mt-3 font-display text-lg leading-snug sm:text-xl">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-xs text-ink-muted">
                        {product.variant}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-ink-muted">
                        Qty {product.quantity}
                      </span>
                      <span className="text-sm font-medium">
                        {money(product.price)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Delivery and summary */}
          <aside className="space-y-10">
            <section>
              <p className="eyebrow mb-3 text-brand-umber">
                DELIVERY DETAILS
              </p>
              <h2 className="font-display text-2xl md:text-3xl">
                Where it&apos;s headed.
              </h2>

              <div className="mt-7 space-y-7 border-t border-line pt-7">
                <div className="flex items-start gap-4">
                  <MapPin
                    size={19}
                    strokeWidth={1.3}
                    className="mt-1 shrink-0 text-brand-umber"
                  />
                  <div>
                    <p className="mb-2 text-xs font-medium">
                      Delivery address
                    </p>
                    <p className="text-sm leading-7 text-ink-muted">
                      {order.recipient}
                      <br />
                      {order.address.map((line) => (
                        <span key={line}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Truck
                    size={19}
                    strokeWidth={1.3}
                    className="mt-1 shrink-0 text-brand-umber"
                  />
                  <div>
                    <p className="mb-2 text-xs font-medium">
                      Shipping service
                    </p>
                    <p className="text-sm leading-6 text-ink-muted">
                      {order.carrier}
                      <br />
                      {order.deliveryMethod}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CalendarDays
                    size={19}
                    strokeWidth={1.3}
                    className="mt-1 shrink-0 text-brand-umber"
                  />
                  <div>
                    <p className="mb-2 text-xs font-medium">
                      Expected delivery
                    </p>
                    <p className="text-sm text-ink-muted">
                      {order.estimatedDelivery}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="border-t border-line pt-8">
              <p className="eyebrow mb-5 text-brand-umber">
                ORDER SUMMARY
              </p>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-ink-muted">Subtotal</span>
                  <span>{money(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Delivery</span>
                  <span>Complimentary</span>
                </div>
                <div className="flex justify-between border-t border-line pt-5">
                  <span className="font-medium">Total paid</span>
                  <span className="font-display text-xl">
                    {money(order.total)}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs text-ink-muted">
                <CreditCard size={15} strokeWidth={1.4} />
                {order.paymentMethod}
              </div>
            </section>
          </aside>
        </div>

        {/* Action cards */}
        <section className="mt-16 grid gap-5 border-t border-line pt-12 md:grid-cols-2 md:mt-24">
          <div className="flex flex-col justify-between border border-line p-7 md:p-9">
            <div>
              <Headphones
                size={25}
                strokeWidth={1.2}
                className="mb-7 text-brand-umber"
              />
              <h3 className="font-display text-2xl">
                We're here to help.
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-7 text-ink-muted">
                Have a question about your order or delivery?
                Our concierge team is here to assist you.
              </p>
            </div>

            <Link
              href="/contact"
              className="mt-9 inline-flex items-center justify-between border-b border-ink pb-3 text-xs font-medium uppercase tracking-[0.13em] transition hover:text-brand-umber"
            >
              Contact support
              <ArrowRight size={17} strokeWidth={1.5} />
            </Link>
          </div>

          <div className="flex flex-col justify-between bg-surface-sand p-7 md:p-9">
            <div>
              <ShoppingBag
                size={25}
                strokeWidth={1.2}
                className="mb-7 text-brand-umber"
              />
              <h3 className="font-display text-2xl">
                Your order, at a glance.
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-7 text-ink-muted">
                Review your order reference, payment information,
                shipping service and purchased pieces.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setDetailsOpen(true)}
              className="mt-9 inline-flex items-center justify-between border-b border-ink pb-3 text-xs font-medium uppercase tracking-[0.13em] transition hover:text-brand-umber"
            >
              View order details
              <ArrowRight size={17} strokeWidth={1.5} />
            </button>
          </div>
        </section>

        {/* Reassurance */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-9 gap-y-4 border-t border-line pt-9 text-[11px] text-ink-muted">
          <span className="flex items-center gap-2">
            <ShieldCheck size={16} strokeWidth={1.4} />
            Secure order information
          </span>
          <span className="flex items-center gap-2">
            <Clock3 size={16} strokeWidth={1.4} />
            Delivery updates
          </span>
          <span className="flex items-center gap-2">
            <Package size={16} strokeWidth={1.4} />
            Carefully packaged
          </span>
        </div>
      </div>

      {/* Order details modal */}
      {detailsOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setDetailsOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-details-title"
            className="w-full max-w-lg bg-surface-cream p-7 shadow-xl md:p-10"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="eyebrow mb-3 text-brand-umber">
                  ORDER DETAILS
                </p>
                <h2
                  id="order-details-title"
                  className="font-display text-3xl"
                >
                  {order.number}
                </h2>
              </div>
              <button
                onClick={() => setDetailsOpen(false)}
                className="text-sm text-ink-muted hover:text-ink"
                aria-label="Close order details"
              >
                ✕
              </button>
            </div>

            <div className="mt-8 space-y-5 border-y border-line py-6 text-sm">
              {[
                ["Order placed", order.placedOn],
                ["Current status", order.status],
                ["Carrier", order.carrier],
                ["Tracking number", order.trackingNumber],
                ["Delivery method", order.deliveryMethod],
                ["Payment", order.paymentMethod],
                ["Items", String(products.length)],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-6"
                >
                  <span className="text-ink-muted">{label}</span>
                  <span className="text-right">{value}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-sm font-medium">Total paid</span>
              <span className="font-display text-2xl">
                {money(order.total)}
              </span>
            </div>

            <button
              onClick={() => setDetailsOpen(false)}
              className="mt-9 w-full bg-brand px-6 py-4 text-xs font-medium uppercase tracking-[0.16em] text-on-brand transition hover:bg-brand-deep"
            >
              Close details
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
