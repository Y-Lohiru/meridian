import { getMonthlyRevenue } from "@/app/utils/queries/admin";
import ChartExample from "./graph";

export default async function RevenueChart() {
  const revenue = await getMonthlyRevenue();

  return <ChartExample data={revenue} />;
}
