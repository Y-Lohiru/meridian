"use client"

import { Bar, BarChart } from "recharts"

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
    <ChartContainer config={chartConfig} className="h-48 bg-on-brand w-full">
      <BarChart accessibilityLayer data={chartData} className="max-h-64">
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
