import AdminHeader from "@/components/admin/dashboard/header";
import LowStockList from "@/components/admin/dashboard/lowStockList";
import RecentOrder from "@/components/admin/dashboard/recentOrder";
import RevenueChart from "@/components/admin/dashboard/revenuChart";
import SummarySection from "@/components/admin/dashboard/summary";
import { Suspense } from "react";
export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-5 sm:gap-6 max-w-7xl">
      <AdminHeader />
      <SummarySection />
      <div className="flex flex-col lg:flex-row gap-5 sm:gap-6">
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
