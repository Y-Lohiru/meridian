import Image from "next/image";
import { getLowStockProducts } from "@/app/utils/queries/admin";
import RestockButton from "./restockButton";

export default async function LowStockList() {
  const lowStocks = await getLowStockProducts();

  return (
    <div className="w-full lg:w-96 shrink-0 lg:h-96">
      <div className="border border-line w-full h-full bg-on-brand rounded-xl p-4 sm:p-6 flex flex-col">
        <span className="pb-4 text-base font-semibold text-ink">Low Stock</span>
        <hr className="border-line" />

        <div className="max-h-80 lg:max-h-none lg:flex-1 lg:min-h-0 overflow-y-auto divide-y divide-line-soft">
          {lowStocks.map((item) => (
            <div
              key={item.id}
              className="flex flex-row items-center gap-4 py-4"
            >
              {item.image_url ? (
                <Image
                  src={item.image_url}
                  alt={item.productName}
                  width={96}
                  height={96}
                  className="size-12 shrink-0 rounded-lg object-cover"
                />
              ) : (
                <div className="size-12 shrink-0 rounded-lg bg-placeholder" />
              )}

              <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                <span className="line-clamp-2 text-sm font-medium leading-snug text-ink">
                  {item.productName}
                </span>
                <span className="text-xs text-warning">
                  {item.quantity === 0
                    ? "Out of stock"
                    : `${item.quantity} left`}
                </span>
              </div>

              <RestockButton id={item.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
