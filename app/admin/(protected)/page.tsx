import AdminHeader from "@/components/admin/header";
import LowStockList from "@/components/admin/lowStockList";
import RecentOrder from "@/components/admin/recentOrder";
import RevenueChart from "@/components/admin/revenuChart";
import SummarySection from "@/components/admin/summary";
import { Suspense } from "react";
export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      <AdminHeader />
      <SummarySection />
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="min-w-0 flex-1 flex">
          <Suspense fallback={<div>Loading chart</div>}>
            <RevenueChart />
          </Suspense>
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
