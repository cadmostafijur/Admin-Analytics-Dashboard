'use client';

import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { ChartSkeleton } from '@/components/ui/Skeleton';
import { formatNumber } from '@/lib/utils';
import type { OrdersData } from '@/types/dashboard';

interface OrdersBarChartProps {
  data: OrdersData[];
  isLoading?: boolean;
}

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-lg shadow-lg p-3">
        <p className="text-sm font-medium">{payload[0].payload.month}</p>
        <p className="text-sm text-primary font-semibold">
          {formatNumber(payload[0].value as number)} orders
        </p>
      </div>
    );
  }
  return null;
};

export const OrdersBarChart = React.memo(function OrdersBarChart({
  data,
  isLoading = false,
}: OrdersBarChartProps) {
  const chartData = useMemo(() => data, [data]);

  if (isLoading) {
    return <ChartSkeleton />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Orders Per Month</CardTitle>
      </CardHeader>
      <div className="px-6 pb-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="month"
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="orders"
              fill="hsl(var(--primary))"
              radius={[8, 8, 0, 0]}
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
});
