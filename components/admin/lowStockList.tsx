import Image from "next/image";
import { getLowStockProducts } from "@/app/utils/queries/admin";

export default async function LowStockList() {
  const lowStocks = await getLowStockProducts();

  return (
    <div className="m-2.5">
      <div className="border w-80 h-auto bg-on-brand rounded-2xl p-3 flex flex-col">
        <span>Low Stock</span>
        <hr />

        <div className="max-h-80 overflow-y-auto">
          {lowStocks.map((item) => (
            <div key={item.name} className="flex flex-row gap-6 m-1.5">
              <Image
                src={item.image}
                alt="product image"
                width={50}
                height={80}
              ></Image>

              <div className="flex flex-col ">
                <span>{item.name}</span>
                <span>{item.remaining}</span>
              </div>

              <button className="border w-20 h-12 text-brand rounded ">
                Restock
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
