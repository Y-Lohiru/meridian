import { getOrders } from "@/app/utils/queries/admin";

export default async function OrderList() {
  const orders = await getOrders();

  const headers = [
    "ORDER",
    "CUSTOMER",
    "ITEM",
    "DATE",
    "STATUS",
    "TOTAL",
  ];

  return (
    <div className="m-2.5 bg-on-brand border rounded-2xl p-3 sm:p-4">
      <span className="mb-3 text-lg font-semibold">Orders</span>
      <div className="overflow-x-auto">
        <table className="w-full text-sm sm:text-base text-left whitespace-nowrap">
          <thead className="border-b">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-3 py-3 text-base text-black font-medium"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y">
            {orders.map((order) => (
              <tr key={order.orderId} className="hover:bg-black/5">
                <td className="px-3 py-3 ">{order.orderId}</td>
                <td className="px-3 py-3">{order.customerName}</td>
                <td className="px-3 py-3">{order.itemName}</td>
                <td className="px-3 py-3">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-3 py-3">{order.status}</td>
                <td className="px-3 py-3 tabular-nums">${order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {orders.length === 0 && (
        <p className="py-8 text-center text-sm text-black/50">
          No orders found.
        </p>
      )}
    </div>
  );
}
