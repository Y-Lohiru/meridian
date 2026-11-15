import { getRecentOrders } from "@/app/utils/queries/admin";
import StatusPill from "../orders/statusPill";
import Link from "next/link";

export default async function RecentOrder() {
  const orders = await getRecentOrders();

  const headers = ["ORDER", "CUSTOMER", "ITEM", "DATE", "STATUS", "TOTAL"];

  function statusClass(status: string) {
    if (status === "To ship")
      return "bg-status-toship border-status-toship text-on-brand";
    if (status === "Delivered")
      return "bg-status-delivered border-status-delivered text-ink";
    if (status === "Shipped") return "border-status-shipped text-brand";
    return "border-warning text-warning";
  }

  return (
    <div className="lg:bg-on-brand lg:px-6 lg:pt-6 lg:pb-2 lg:border lg:border-line lg:rounded-xl">
      <div className="flex items-center justify-between gap-3">
        <span className="text-base text-ink font-semibold">Recent Orders</span>
        <Link
          href="/admin/orders"
          className="text-sm font-medium text-brand hover:underline underline-offset-4"
        >
          View all orders →
        </Link>
      </div>
      <ul className="flex flex-col gap-3 mt-4 lg:hidden">
        {orders.map((o) => (
          <li
            key={o.orderId}
            className="flex flex-col gap-1.5 rounded-lg border border-line bg-on-brand p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-bold text-ink">
                #{o.orderId.slice(0, 8).toUpperCase()}
              </span>

              <StatusPill status={o.status} />
            </div>

            <span className="truncate text-sm text-ink-muted">
              {o.customerName} . {o.itemName}
            </span>

            <div className="flex items-center justify-between">
              <span className="text-sm text-ink-muted">
                {new Date(o.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span className="text-sm font-bold text-ink tabular-nums">
                ${o.total}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div className="hidden lg:block overflow-x-auto mt-6">
        <table className="w-full whitespace-nowrap text-left text-sm text-ink">
          <thead>
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className={`px-3 pb-3 text-xs tracking-wider text-ink-muted font-medium first:pl-0 last:pr-0 ${header === "TOTAL" ? "text-right" : ""}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.orderId} className="border-t border-line">
                <td className="pl-0 pr-3 py-4 font-semibold">
                  #{o.orderId.slice(0, 8).toUpperCase()}
                </td>
                <td className="px-3 py-4">{o.customerName}</td>
                <td className="px-3 py-4">{o.itemName}</td>
                <td className="px-3 py-4">
                  {new Date(o.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-3 py-4">
                  <StatusPill status={o.status} />
                </td>
                <td className="pl-3 pr-0 py-4 text-right font-semibold tabular-nums">
                  ${o.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
