"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface MetricsChartProps {
  data: Array<{
    month: string
    assessments: number
    completion: number
  }>
}

export function MetricsChart({ data }: MetricsChartProps) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="month" className="text-xs fill-muted-foreground" tick={{ fontSize: 12 }} />
          <YAxis className="text-xs fill-muted-foreground" tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px",
            }}
          />
          <Line type="monotone" dataKey="assessments" stroke="hsl(var(--primary))" strokeWidth={2} name="Avaliações" />
          <Line
            type="monotone"
            dataKey="completion"
            stroke="hsl(var(--destructive))"
            strokeWidth={2}
            name="Taxa de Conclusão (%)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
