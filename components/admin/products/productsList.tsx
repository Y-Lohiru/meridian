import { getProducts } from "@/app/utils/queries/admin";
import { removeProduct } from "@/app/utils/queries/admin";
import { refresh } from "next/cache";
import RemoveButton from "./removeButton";


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
    <div>
      <span>Products</span>
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.productName}</td>
              <td>{product.category}</td>
              <td>{product.material}</td>
              <td>{product.color}</td>
              <td>${product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <RemoveButton id={product.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {products.length === 0 && <p>No products found.</p>}
    </div>
  );
}
