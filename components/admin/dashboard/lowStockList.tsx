import Image from "next/image";
import { getLowStockProducts } from "@/app/utils/queries/admin";

export default async function LowStockList() {
  const lowStocks = await getLowStockProducts();

  return (
    <div className="w-full lg:w-80 shrink-0">
      <div className="border border-line w-full h-auto bg-on-brand rounded-lg p-4 flex flex-col">
        <span className="pb-3 text-sm font-semibold text-ink">Low Stock</span>
        <hr className="border-line" />

        <div className="max-h-80 overflow-y-auto divide-y divide-line-soft">
          {lowStocks.map((item) => (
            <div key={item.id} className="flex flex-row items-center gap-3 py-3">
              <Image
                src={item.image_url}
                alt="product image"
                width={60}
                height={60}
                className="size-10 shrink-0 rounded-md object-cover"
              ></Image>

              <div className="flex flex-col flex-1 min-w-0">
                <span className="truncate text-sm font-semibold text-ink">{item.productName}</span>
                <span className="text-xs text-warning">{item.quantity}</span>
              </div>

              <button className="shrink-0 h-10 px-4 border border-line-strong text-sm text-ink rounded-md hover:bg-surface-hover">
                Restock
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
