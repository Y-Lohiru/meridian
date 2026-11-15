import OrderList from "@/components/admin/orders/ordersList";
import OrdersHeader from "@/components/admin/orders/header";
import { Suspense } from "react";

export default function Orders() {
    return (
        <div>
            <OrdersHeader />
            <Suspense fallback={<p className="text-sm text-ink-muted">Loading orders...</p>}>
                <OrderList />
            </Suspense>
        </div>
    )
}
