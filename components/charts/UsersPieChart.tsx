'use client';

import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { ChartSkeleton } from '@/components/ui/Skeleton';
import { formatNumber } from '@/lib/utils';
import type { UserDistribution } from '@/types/dashboard';

interface UsersPieChartProps {
  data: UserDistribution[];
  isLoading?: boolean;
}

const RADIAN = Math.PI / 180;

interface CustomLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: CustomLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.05) return null;

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="text-xs font-semibold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-lg shadow-lg p-3">
        <p className="text-sm font-medium">{payload[0].name}</p>
        <p className="text-sm text-primary font-semibold">
          {formatNumber(payload[0].value)} users
        </p>
      </div>
    );
  }
  return null;
};

export const UsersPieChart = React.memo(function UsersPieChart({
  data,
  isLoading = false,
}: UsersPieChartProps) {
  const chartData = useMemo(() => data, [data]);

  if (isLoading) {
    return <ChartSkeleton />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">User Distribution</CardTitle>
      </CardHeader>
      <div className="px-6 pb-6">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              animationDuration={1000}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value, entry: any) => (
                <span className="text-sm text-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
});
