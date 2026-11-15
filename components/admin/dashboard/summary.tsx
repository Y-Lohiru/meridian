"use client";

import SummaryCard from "./summaryCards";
import { getMonthlyRevenue } from "../../../app/utils/queries/admin";
import { getOrders } from "../../../app/utils/queries/admin";
import { getPendingOrders } from "@/app/utils/queries/admin";
import React from "react";

export default function SummarySection() {
  const [revenue, setRevenue] = React.useState<{ revenue: number }[]>([]);
  const [orders, setOrders] = React.useState<number>(0);
  const [pendcount, setPendcount] = React.useState<number>(0);
  React.useEffect(() => {
    getMonthlyRevenue().then((data) => {
      setRevenue(data);
    });
    getOrders().then((data) => {
      setOrders(data.length);
    });
    getPendingOrders().then((data) => {
      setPendcount(data);
    });
  }, []);

  const totalRevenue = revenue.reduce((sum, m) => sum + m.revenue, 0);
  const averageOrder = orders > 0 ? totalRevenue / orders : 0;

  const money = (n: number) =>
    n.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    });

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-5">
      <SummaryCard
        title="Revenue"
        value={money(totalRevenue)}
        colorClass="on-brand"
      />
      <SummaryCard
        title="Orders"
        value={(orders as any) || 0}
        colorClass="on-brand"
      />
      <SummaryCard
        title="Average Order"
        value={money(averageOrder)}
        colorClass="on-brand"
      />
      <SummaryCard
        title="Waiting to ship"
        value={(pendcount as any) || 0}
        colorClass="brand"
      />
    </div>
  );
}
