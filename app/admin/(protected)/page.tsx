import Graph from "@/components/admin/graph";
import AdminHeader from "@/components/admin/header";
import LowStockList from "@/components/admin/lowStockList";
import RecentOrder from "@/components/admin/recentOrder";
import SummarySection from "@/components/admin/summary";
import { Suspense } from "react";
export default function AdminDashboard() {
  return (
    <div>
      <AdminHeader />
      <SummarySection />
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="min-w-0 flex-1 m-2.5 flex">
          <Graph />
        </div>

        <Suspense fallback={<div>Loading list</div>}>
          <LowStockList />
        </Suspense>
      </div>
      <Suspense fallback={<div>Loading orders</div>}>
        <RecentOrder />
      </Suspense>
    </div>
  );
}
