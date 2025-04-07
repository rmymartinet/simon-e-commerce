"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { week: "S1", weight: 78 },
  { week: "S2", weight: 77.4 },
  { week: "S3", weight: 76.9 },
  { week: "S4", weight: 76.3 },
  { week: "S5", weight: 75.7 },
  { week: "S6", weight: 75.2 },
];

const chartConfig = {
  weight: {
    label: "Poids (kg)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const AreaChartComponent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Évolution du poids</CardTitle>
        <CardDescription>
          Suivi hebdomadaire de ton poids (exemple fictif) 📉 -2.8 kg atteints
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              domain={[74.5, 78.5]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="weight"
              type="monotone"
              fill="var(--color-weight)"
              fillOpacity={0.3}
              stroke="var(--color-weight)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending down (objectif atteint){" "}
              <TrendingUp className="h-4 w-4 rotate-180" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Semaines 1 à 6
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AreaChartComponent;
