'use client';

import SummaryCard from "./summaryCards";
import {getMonthlyRevenue} from "../../../app/utils/queries/admin";
import {getOrders} from "../../../app/utils/queries/admin";
import { getPendingOrders } from "@/app/utils/queries/admin";
import React from "react";
import orders from "./orders";
export default function SummarySection() {
    const [revenue, setRevenue] = React.useState<{revenue: number}[]>([]);
    const[orders,setOrders]=React.useState<number>(0);
    const[pendcount,setPendcount]=React.useState<number>(0);
    React.useEffect(() => {
        getMonthlyRevenue().then((data) => {
            setRevenue(data);
        });
        getOrders().then((data)=>{
            setOrders(data.length);
        });
        getPendingOrders().then((data)=>{
            setPendcount(data);
        });
    }, []);
    
    return (
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-2.5 sm:gap-3.5">
            <SummaryCard title="Revenue" value={revenue[0]?.revenue as any || 0} colorClass="on-brand" />
            <SummaryCard title="Orders" value={orders as any || 0} colorClass="on-brand" />
            <SummaryCard title="Average Order" value={parseFloat((revenue[0]?.revenue && orders > 0 ? revenue[0].revenue / orders : 0).toFixed(2)) as any || 0} colorClass="on-brand" />
            <SummaryCard title="Waiting to ship" value={pendcount as any || 0} colorClass="brand" />
        </div>
    )
}

