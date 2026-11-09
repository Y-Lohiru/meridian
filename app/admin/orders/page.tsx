import { getOrders } from "@/app/utils/queries/admin"
import OrderList from "@/components/admin/orders/ordersList";

export default function Orders() {
    const orders = getOrders();

    return (
        <div>
            <OrderList />
            
        </div>
    )
}