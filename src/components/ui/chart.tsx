import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Format: { [key: string]: { label: string, color: string } }
const ChartContext = React.createContext<{ config: any } | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a ChartContainer.")
  }
  return context
}

function ChartContainer({
  id,
  config,
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  config: any
  children: React.ReactNode
}) {
  const chartId = React.useId()

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center text-xs",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </ChartContext.Provider>
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  label,
  labelFormatter,
  labelClassName,
}: any) {
  const { config } = useChart()

  if (!active || !payload?.length) {
    return null
  }

  return (
    <div
      className={cn(
        "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}
    >
      <div className="grid gap-1.5">
        {payload.map((item: any, index: number) => {
          const key = `${item.name || item.dataKey || "value"}`
          const itemConfig = config[key] || {}
          
          return (
            <div
              key={item.dataKey || index}
              className={cn(
                "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
                indicator === "dot" && "items-center"
              )}
            >
              <div
                className={cn(
                  "shrink-0 rounded-[2px]",
                  indicator === "dot" ? "h-2.5 w-2.5" : "w-1"
                )}
                style={{ backgroundColor: item.color || item.payload.fill }}
              />
              <div className="flex flex-1 justify-between leading-none">
                <span className="text-muted-foreground">
                  {itemConfig.label || item.name}
                </span>
                {item.value !== undefined && (
                  <span className="text-foreground font-mono font-medium tabular-nums">
                    {item.value.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const ChartLegend = RechartsPrimitive.Legend

function ChartLegendContent({ payload, className }: any) {
  const { config } = useChart()

  if (!payload?.length) {
    return null
  }

  return (
    <div className={cn("flex items-center justify-center gap-4 pt-3", className)}>
      {payload.map((item: any, index: number) => {
        const key = `${item.dataKey || "value"}`
        const itemConfig = config[key] || {}

        return (
          <div
            key={item.value || index}
            className="flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3"
          >
            <div
              className="h-2 w-2 rounded-[2px]"
              style={{ backgroundColor: item.color }}
            />
            {itemConfig.label || item.value}
          </div>
        )
      })}
    </div>
  )
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  useChart,
}
