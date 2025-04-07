"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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
  { name: "Protéines", grams: 120, fill: "#e63946" },
  { name: "Glucides", grams: 350, fill: "#f4a261" },
  { name: "Lipides", grams: 80, fill: "#2a9d8f" },
];

// 🧮 Calories : 4 kcal pour protéines et glucides, 9 pour lipides
const totalCalories = chartData.reduce((acc, macro) => {
  const kcal = macro.name === "Lipides" ? macro.grams * 9 : macro.grams * 4;
  return acc + kcal;
}, 0);

const chartConfig = {
  value: { label: "kcal" },
} satisfies ChartConfig;

const DonutChartComponent = () => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Répartition des macronutriments</CardTitle>
        <CardDescription>
          Exemple pour un jour d&apos;alimentation
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Pie
              data={chartData}
              dataKey="grams"
              nameKey="name"
              innerRadius={60}
              outerRadius={90}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (
                    viewBox &&
                    "cx" in viewBox &&
                    "cy" in viewBox &&
                    typeof viewBox.cy === "number"
                  ) {
                    const cx = viewBox.cx;
                    const cy = viewBox.cy;
                    return (
                      <text
                        x={cx}
                        y={cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={cx}
                          y={cy}
                          className="fill-foreground text-xl font-semibold"
                        >
                          {totalCalories} kcal
                        </tspan>
                        <tspan
                          x={cx}
                          y={cy + 20}
                          className="fill-muted-foreground text-sm"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Objectif atteint aujourd&apos;hui
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Protéines, Glucides et Lipides consommés aujourd&apos;hui
        </div>
      </CardFooter>
    </Card>
  );
};

export default DonutChartComponent;
