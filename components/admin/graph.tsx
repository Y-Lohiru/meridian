"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"


const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#4A2E1A",
  },
  mobile: {
    label: "Mobile",
    color: "#4A2E1A",
  },
} satisfies ChartConfig

export default function ChartExample() {
  return (
    <ChartContainer
      config={chartConfig}
      className="flex-1 aspect-auto min-h-48 w-full bg-on-brand border rounded-2xl p-3"
    >
      <BarChart
        accessibilityLayer
        data={chartData}
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
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
