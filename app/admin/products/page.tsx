import ProductList from "@/components/admin/products/productsList";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { Suspense } from "react";

export default function ProductsPage() {
  return (
    <div>
      <main>
        <Suspense fallback={<p>Loading products...</p>}>
          <ProductList /> 
        </Suspense>
      </main>
    </div>
  );
}