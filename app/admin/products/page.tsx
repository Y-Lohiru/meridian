import ProductList from "@/components/admin/products/productsList";
import ProductsHeader from "@/components/admin/products/header";
import { Suspense } from "react";

export default function ProductsPage() {
  return (
    <div>
      <ProductsHeader />
      <main>
        <Suspense fallback={<p>Loading products...</p>}>
          <ProductList /> 
        </Suspense>
      </main>
    </div>
  );
}