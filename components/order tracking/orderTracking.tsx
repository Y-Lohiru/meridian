
"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Package,
  Truck,
  MapPin,
  CalendarDays,
  Headphones,
  CreditCard,
  ShieldCheck,
  Clock3,
} from "lucide-react";
import checkUser from "@/app/utils/auth";
import { redirect } from "next/navigation";
import { createClient } from "../../app/utils/supabase/client";

type DatabaseOrder = {
  order_id: string;
  user_id: string;
  status: string | null;
  total: number | null;
  created_at: string;
  apartment: string | null;
  city: string | null;
  country: string | null;
  delivery_cost: number | null;
  payment_method: string | null;
  delivery_method: string | null;
};
type OrderedProduct = {
  id: number;
  product_id: string;
  quantity: number | null;
  variant: string | null;
  unit_price: number | null;
  product: {
    productName: string | null;
    image_url: string | null;
    category: string | null;
    price: number | null;
  } | null;
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });

function addDaysToDate(value: string, days: number) {
  const date = new Date(value);
  date.setUTCDate(date.getUTCDate() + days);
  return formatDate(date.toISOString());
}

function money(value: number | null) {
  if (value === null) return "null";
  return `$${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
  })}`;
}

export default function TrackOrderPage() {
  const params = useParams<{ uuid: string }>();
  const orderid = params.uuid;
  const [orderData, setOrderData] = useState<DatabaseOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<OrderedProduct[]>([]);
  const [orderSubtotal, setOrderSubtotal] = useState<number | null>(null);
      const fetchUser = async () => {
          checkUser().then((user) => {
              if (user.data.user) {
                  console.log(user.data.user)   
              } else {
                  console.log("User not logged in")
                  return redirect('/login')
              }
          })
      }    
useEffect(() => {
  fetchUser();
  fetchProducts(orderid || "");
  fetchOrderedProducts(orderid || "");
}, [orderid]);
      
const fetchProducts =   async (id: string) =>{
    const supabase = createClient();
    const {data:orderdata, error}  = await supabase.from('orders').select('order_id, user_id, status, total, created_at, apartment, city, country, delivery_cost, payment_method, delivery_method').eq('order_id', id);
    if (error) {
        console.error('Error fetching Orders:', error);
    }
    else {

        setOrderData(orderdata?.[0] ?? null);
    }
    setLoading(false);
  }
const fetchOrderedProducts = async (id: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("order_product")
    .select(`
      id,
      product_id,
      quantity,
      variant,
      unit_price,
      product (
        productName,
        image_url,
        category,
        price
      )
    `)
    .eq("order_id", id);

  if (error) {
    console.error("Error fetching ordered products:", error);
    return;
  }

  const orderedProducts: OrderedProduct[] = (data ?? []).map((item) => ({
    id: item.id,
    product_id: item.product_id,
    quantity: item.quantity,
    variant: item.variant,
    unit_price: item.unit_price,
    product: Array.isArray(item.product)
      ? (item.product[0] ?? null)
      : (item.product ?? null),
  }));

  // Hide order items whose related product record is missing.
  const validProducts = orderedProducts.filter(
    (item) => item.product !== null && item.product.productName !== null
  );

  // Calculate the subtotal from all order items, including those with missing
  // product details. Prefer the price recorded at the time of purchase.
  const pricedItems = orderedProducts.filter(
    (item) => item.quantity !== null &&
      (item.unit_price ?? item.product?.price) != null
  );
  setOrderSubtotal(
    orderedProducts.length > 0 && pricedItems.length === orderedProducts.length
      ? pricedItems.reduce(
          (sum, item) => sum + (item.unit_price ?? item.product?.price ?? 0) * (item.quantity ?? 0),
          0
        )
      : null
  );

  setProducts(validProducts);
};
  if (loading) return <main className="min-h-screen bg-surface-cream p-12">Loading order...</main>;
  if (!orderData) return <main className="min-h-screen bg-surface-cream p-12">Order not found.</main>;

  // These are the only fields selected by the existing fetch function.
  const order = {
    number: orderData.order_id,
    placedOn: formatDate(orderData.created_at),
    status: orderData.status ?? "null",
    estimatedDelivery: orderData.status?.trim().toLowerCase() === "awaiting payment"
      ? "-"
      : addDaysToDate(orderData.created_at, 6),
    carrier: "null",
    trackingNumber: "null",
    deliveryMethod: orderData.delivery_method ?? "null",
    paymentMethod: orderData.payment_method ?? "null",
    recipient: "",
    address: [orderData.apartment, orderData.city, orderData.country]
      .filter((line): line is string => Boolean(line?.trim()))
      .join(", ") || "null",
    subtotal: orderSubtotal,
    shipping: orderData.delivery_cost,
    total: orderData.total,
  };
 
  const isAwaitingPayment = orderData.status?.trim().toLowerCase() === "awaiting payment";
  const stages = [
    { label: "Confirmed", date: isAwaitingPayment ? "-" : formatDate(orderData.created_at) },
    { label: "Preparing", date: isAwaitingPayment ? "-" : addDaysToDate(orderData.created_at, 1) },
    { label: "Shipped", date: isAwaitingPayment ? "-" : addDaysToDate(orderData.created_at, 2) },
    { label: "Delivered", date: isAwaitingPayment ? "-" : order.estimatedDelivery },
  ];
  const status = order.status.toLowerCase();
  const currentStep = status.includes("deliver") ? 4
    : status.includes("ship") || status.includes("transit") ? 3
    : status.includes("prepar") || status.includes("process") ? 2
    : status.includes("confirm") || status.includes("pend") ? 1 : 0;

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
              {order.number.slice(0, 8)}
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
                  ORDER STATUS
                </span>
              </div>

              <p className="text-xs uppercase tracking-[0.16em] text-ink-muted">
                Estimated arrival
              </p>

              <h3 className="mt-3 font-display text-3xl leading-tight md:text-5xl">
                {order.estimatedDelivery}
              </h3>

              <p className="mt-4 max-w-md text-sm leading-7 text-ink-muted">
                Your current order status is {order.status}. Delivery estimate: {order.estimatedDelivery}.
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
                Order progress.
              </h2>
            </div>
            <span className="hidden text-xs text-ink-muted sm:block">
              Step {currentStep} of 4
            </span>
          </div>

          <div className="relative">
            <div className="absolute left-[12.5%] right-[12.5%] top-[17px] h-px bg-line" />
            <div className="absolute left-[12.5%] top-[17px] h-px bg-brand" style={{ width: `${Math.max(0, currentStep - 1) * 25}%` }} />

            <div className="relative grid grid-cols-4 gap-2">
              {stages.map((stage, index) => {
                const completed = index < currentStep;
                const current = index === currentStep - 1;

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
              {products.length === 0 && (
  <p className="py-7 text-sm text-ink-muted">
    No products found for this order.
  </p>
)}

{products.map((item) => (
  <div
    key={item.id}
    className="flex gap-5 py-7 sm:gap-7"
  >
    <div className="h-32 w-24 shrink-0 overflow-hidden bg-surface-sand sm:h-40 sm:w-32">
      {item.product?.image_url ? (
        <img
          src={item.product.image_url}
          alt={item.product.productName ?? "Product"}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-xs text-ink-muted">
          No image
        </div>
      )}
    </div>

    <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
      <div>
        <p className="text-[10px] uppercase tracking-[0.14em] text-brand-umber">
          {item.product?.category ?? "null"}
        </p>

        <h3 className="mt-3 font-display text-lg leading-snug sm:text-xl">
          {item.product?.productName ?? "null"}
        </h3>

        <p className="mt-2 text-xs text-ink-muted">
          {money(item.unit_price ?? item.product?.price ?? null)}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-ink-muted">
          Qty {item.quantity ?? "null"}
        </span>

        <span className="text-sm font-medium">
          {(item.unit_price ?? item.product?.price) != null && item.quantity != null
            ? money((item.unit_price ?? item.product?.price ?? 0) * item.quantity)
            : "null"}
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
                      {order.address}
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
                  <span>{order.subtotal === null ? "null" : money(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Delivery</span>
                  <span>{money(order.shipping)}</span>
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

        {/* Support */}
        <section className="mt-16 border-t border-line pt-12 md:mt-24">
          <div className="border border-line p-7 md:p-9">
            <Headphones
              size={25}
              strokeWidth={1.2}
              className="mb-7 text-brand-umber"
            />
            <h3 className="font-display text-2xl">We're here to help.</h3>
            <p className="mt-3 max-w-sm text-sm leading-7 text-ink-muted">
              Have a question about your order or delivery?
              Our concierge team is here to assist you.
            </p>
            <p className="mt-9 text-sm text-ink-muted">
              Email: <a href="mailto:support@yourdomain.com" className="underline hover:text-brand-umber">support@yourdomain.com</a>
            </p>
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

    </main>
  );
}
