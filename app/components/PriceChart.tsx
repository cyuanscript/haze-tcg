"use client";

import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/components/ui/chart"
import { TrendingUp } from "lucide-react";

interface PriceChartProps {
  priceHistory: { date: string; price: number }[];
}

const PriceChart: React.FC<PriceChartProps> = ({ priceHistory }) => {
  const [timeRange, setTimeRange] = useState<'1Y' | '6M' | '3M' | '1M'>('1Y');

  // Filter data based on selected time range
  const getFilteredData = () => {
    const currentDate = new Date();
    const oldestDate = new Date(currentDate);

    switch (timeRange) {
      case '1Y':
        oldestDate.setFullYear(currentDate.getFullYear() - 1);
        break;
      case '6M':
        oldestDate.setMonth(currentDate.getMonth() - 6);
        break;
      case '3M':
        oldestDate.setMonth(currentDate.getMonth() - 3);
        break;
      case '1M':
        oldestDate.setMonth(currentDate.getMonth() - 1);
        break;
    }

    return priceHistory.filter(entry => new Date(entry.date) >= oldestDate);
  };

  const filteredData = getFilteredData();
  const chartData = filteredData.map((entry) => ({
    date: new Date(entry.date).toLocaleDateString(undefined, {
      month: 'numeric',
      day: 'numeric'
    }),
    price: entry.price,
  }));

  const getXAxisTicks = () => {
    if (chartData.length <= 4) return chartData.map(entry => entry.date);
  
    // Get the indices for evenly spaced points
    const lastIndex = chartData.length - 1;
    const indices = [
      0,
      Math.floor(lastIndex / 3),
      Math.floor((2 * lastIndex) / 3),
      lastIndex
    ];
  
    // Return the dates at these indices
    return indices.map(index => chartData[index].date);
  };

  const chartConfig = {
    price: {
      label: "Price",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  // Calculate min and max prices for Y-axis domain
  const prices = filteredData.map(entry => entry.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  // Calculate nice round numbers for the y-axis ticks
  const range = maxPrice - minPrice;
  const padding = range * 0.1; // 10% padding
  
  // Round down the minimum to the nearest dollar
  const yMin = Math.floor(minPrice - padding);
  // Round up the maximum to the nearest dollar
  const yMax = Math.ceil(maxPrice + padding);
  
  // Create an array of 5 evenly spaced values between yMin and yMax
  const interval = (yMax - yMin) / 4;
  const yAxisTicks = [
    yMin,
    yMin + interval,
    yMin + (2 * interval),
    yMin + (3 * interval),
    yMax
  ];

  // Format price to include dollar sign
  const formatYAxis = (value: number) => `$${value.toFixed(2)}`;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Price History</CardTitle>
            <CardDescription>
              Showing price changes over time
            </CardDescription>
          </div>
          <div className="flex gap-2">
            {(['1Y', '6M', '3M', '1M'] as const).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range)}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis 
              dataKey="date" 
              tickLine={false}
              axisLine={false}
              tickMargin={15}
              ticks={getXAxisTicks()}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#129638" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#129638" stopOpacity={0} />
              </linearGradient>
            </defs>
            <YAxis 
              tickFormatter={formatYAxis}
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              domain={[yMin, yMax]}
              ticks={yAxisTicks}
              allowDataOverflow={true}
            />
            <Area
              type="linear"
              dataKey="price"
              stroke="#129638"
              fillOpacity={0.4}
              fill="url(#colorPrice)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  );
};

export default PriceChart;