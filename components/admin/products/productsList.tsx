import { getProducts } from "@/app/utils/queries/admin";
import RemoveButton from "./removeButton";
import Image from "next/image";
import { getColorHex } from "@/lib/data/shoeOptions";

export default async function ProductList() {
  const products = await getProducts();

  const headers = [
    "PRODUCT",
    "CATEGORY",
    "MATERIAL",
    "COLOR",
    "PRICE",
    "STOCK",
    "ACTION",
  ];

  return (
    <div className="m-2.5 bg-on-brand border rounded-2xl p-3 sm:p-4">
      <span className="mb-3 text-lg font-semibold">Products</span>
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
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-black/5">
                <td className="px-3 py-3 ">
                  <div className="flex flex-row gap-2">
                    <Image
                      src={product.image_url}
                      alt="product image"
                      width={48}
                      height={48}
                    />
                    {product.productName}
                  </div>
                </td>
                <td className="px-3 py-3">{product.category}</td>
                <td className="px-3 py-3">{product.material}</td>
                <td className="px-3 py-3">
                  {product.color}
                  <div className="flex items-center gap-2">
                    <div
                      className="rounded-full w-4 h-4 border"
                      style={{ backgroundColor: getColorHex(product.color) ?? "#D1D5DB" }}
                    ></div>
                  </div>
                </td>
                <td className="px-3 py-3 tabular-nums">${product.price}</td>
                <td className="px-3 py-3 tabular-nums">{product.quantity}</td>
                <td className="px-3 py-3">
                  <RemoveButton id={product.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <p className="py-8 text-center text-sm text-black/50">
          No products found.
        </p>
      )}
    </div>
  );
}
