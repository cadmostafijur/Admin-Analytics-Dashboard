'use client';

import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { ChartSkeleton } from '@/components/ui/Skeleton';
import { formatCurrency } from '@/lib/utils';
import type { RevenueData } from '@/types/dashboard';

interface RevenueLineChartProps {
  data: RevenueData[];
  isLoading?: boolean;
}

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-lg shadow-lg p-3">
        <p className="text-sm font-medium">{payload[0].payload.month}</p>
        <p className="text-sm text-primary font-semibold">
          {formatCurrency(payload[0].value as number)}
        </p>
      </div>
    );
  }
  return null;
};

export const RevenueLineChart = React.memo(function RevenueLineChart({
  data,
  isLoading = false,
}: RevenueLineChartProps) {
  const chartData = useMemo(() => data, [data]);

  if (isLoading) {
    return <ChartSkeleton />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Revenue Over Time</CardTitle>
      </CardHeader>
      <div className="px-6 pb-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="month"
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--primary))', r: 4 }}
              activeDot={{ r: 6 }}
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
});
