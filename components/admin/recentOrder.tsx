import { getRecentOrders } from "@/app/utils/queries/admin";

export default function RecentOrder() {
  const orders = getRecentOrders();
  
  const order = [
    {
      id: "#M-10484",
      customer: "Kasun D.",
      item: "Hand-thrown stoneware vase",
      date: "Oct 19",
      status: "Awaiting payment",
      total: 165,
    },
    {
      id: "#M-10483",
      customer: "Nimali F.",
      item: "Noir Absolu eau de parfum",
      date: "Oct 19",
      status: "Awaiting payment",
      total: 210,
    },
    {
      id: "#M-10482",
      customer: "Amara P.",
      item: "Alabaster table lamp",
      date: "Oct 19",
      status: "To ship",
      total: 540,
    },
    {
      id: "#M-10481",
      customer: "Daniel K.",
      item: "Double-faced cashmere overcoat",
      date: "Oct 19",
      status: "To ship",
      total: 890,
    },
    {
      id: "#M-10480",
      customer: "Lena S.",
      item: "Merino herringbone throw",
      date: "Oct 18",
      status: "To ship",
      total: 280,
    },
  ];
  const headers = ["ORDER", "CUSTOMER", "ITEM", "DATE", "STATUS", "TOTAL"];

  return (
    <div className="bg-on-brand p-3 border rounded-2xl">
      <span className="text-brand font-semibold">Recent Orders</span>
      <div>
        <table className="w-full">
          <tr>
            {headers.map((header) => (
              <th className="text-brand font-semibold">{header}</th>
            ))}
          </tr>

          {order.map((o) => (
            <tr className="border-t border-line">
              <td>{o.id}</td>
              <td>{o.customer}</td>
              <td>{o.item}</td>
              <td>{o.date}</td>
              <td>{o.status}</td>
              <td className="text-right">${o.total}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
