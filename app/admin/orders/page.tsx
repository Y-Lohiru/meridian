import { getOrders } from "@/app/utils/queries/admin"
import OrderList from "@/components/admin/orders/ordersList";
import OrdersHeader from "@/components/admin/orders/header";

export default function Orders() {
    const orders = getOrders();

    return (
        <div>
            <OrdersHeader />
            <OrderList />
            
        </div>
    )
}