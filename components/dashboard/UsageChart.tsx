'use client'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

interface UsageChartProps {
  data: { name: string; commits: number }[]
}

const chartConfig = {
  commits: {
    label: "Commits Analyzed",
    color: "#9bb15e",
  },
} satisfies ChartConfig

export function UsageChart({ data }: UsageChartProps) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full mt-4">
      <BarChart accessibilityLayer data={data} margin={{ top: 20 }}>
        <CartesianGrid vertical={false} stroke="rgba(19, 22, 12, 0.08)" />
        <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: 'rgba(19, 22, 12, 0.5)', fontSize: 10, fontFamily: 'var(--font-mono)' }}
          tickMargin={10}
        />
        <YAxis hide />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Bar 
          dataKey="commits" 
          fill="var(--color-commits)" 
          radius={[4, 4, 0, 0]} 
          maxBarSize={60}
        />
      </BarChart>
    </ChartContainer>
  )
}
