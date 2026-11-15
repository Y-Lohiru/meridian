"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#4A2E1A",
  },
} satisfies ChartConfig;

export default function ChartExample({
  data,
}: {
  data: { month: string; revenue: number }[];
}) {
  return (
    <ChartContainer
      config={chartConfig}
      className="flex-1 aspect-auto h-80 lg:h-auto lg:min-h-96 w-full bg-on-brand border border-line rounded-xl p-4 sm:p-6"
    >
      <BarChart
        accessibilityLayer
        data={data}
        margin={{ top: 10, right: 10, bottom: 20, left: 10 }}
      >
        <XAxis
          dataKey="month"
          tickLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
          label={{ value: "Month", position: "insideBottom", offset: -15 }}
        />
        <YAxis
          tickLine={false}
          label={{ value: "Sales", angle: -90, position: "insideLeft" }}
        />
        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
