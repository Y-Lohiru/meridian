import { getRecentOrders } from "@/app/utils/queries/admin";
import StatusPill from "../orders/statusPill";

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
    <div className="lg:bg-on-brand lg:p-4 lg:border lg:border-line lg:rounded-lg">
      <span className="text-sm text-ink font-semibold">Recent Orders</span>
      <ul className="flex flex-col gap-2.5 mt-3 lg:hidden">
        {orders.map((o) => (
          <li
            key={o.orderId}
            className="flex flex-col gap-1.5 rounded-lg border border-line bg-on-brand p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-bold text-ink">
                #{o.orderId.slice(0, 8).toUpperCase()}
              </span>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusClass(o.status)}`}
              >
                <StatusPill status={o.status} />
              </span>
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

      <div className="hidden lg:block overflow-x-auto mt-3 -mx-4 px-4 sm:mx-0 sm:px-0">
        <table className="w-full whitespace-nowrap text-left text-sm">
          <thead>
            <tr>
              {headers.map((header) => (
                <th className="px-3 py-2 text-xs text-ink-muted font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.orderId} className="border-t border-line">
                <td className="px-3 py-3 font-semibold max-w-24 truncate">
                  {o.orderId}
                </td>
                <td className="px-3 py-3">{o.customerName}</td>
                <td className="px-3 py-3">{o.itemName}</td>
                <td className="px-3 py-3 text-ink-muted">
                  {new Date(o.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-3 py-3"><StatusPill status={o.status} /></td>
                <td className="px-3 py-3 text-left font-semibold tabular-nums">
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
