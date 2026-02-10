'use client';

import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Target } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { cn, formatCurrency, formatNumber, formatPercentage } from '@/lib/utils';

interface KpiCardProps {
  label: string;
  value: string | number;
  change: number;
  icon: 'revenue' | 'users' | 'orders' | 'conversion';
  isLoading?: boolean;
}

const iconMap = {
  revenue: DollarSign,
  users: Users,
  orders: ShoppingCart,
  conversion: Target,
};

export const KpiCard = React.memo(function KpiCard({
  label,
  value,
  change,
  icon,
  isLoading = false,
}: KpiCardProps) {
  const Icon = iconMap[icon];
  const isPositive = change >= 0;

  if (isLoading) {
    return (
      <Card hover className="animate-pulse">
        <div className="space-y-3">
          <div className="h-4 bg-muted rounded w-24" />
          <div className="h-8 bg-muted rounded w-32" />
          <div className="h-3 bg-muted rounded w-20" />
        </div>
      </Card>
    );
  }

  return (
    <Card hover className="group">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <div>
            <p className="text-3xl font-bold tracking-tight">{value}</p>
          </div>
          <div className="flex items-center space-x-1">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-green-600" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-600" />
            )}
            <span
              className={cn(
                'text-sm font-medium',
                isPositive ? 'text-green-600' : 'text-red-600'
              )}
            >
              {formatPercentage(change)}
            </span>
            <span className="text-xs text-muted-foreground">vs last period</span>
          </div>
        </div>
        
        <div className="rounded-lg bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </Card>
  );
});

interface KpiGridProps {
  stats: {
    totalRevenue: number;
    totalUsers: number;
    totalOrders: number;
    conversionRate: number;
    revenueChange: number;
    usersChange: number;
    ordersChange: number;
    conversionChange: number;
  };
  isLoading?: boolean;
}

export function KpiGrid({ stats, isLoading = false }: KpiGridProps) {
  const kpiData = [
    {
      label: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      change: stats.revenueChange,
      icon: 'revenue' as const,
    },
    {
      label: 'Total Users',
      value: formatNumber(stats.totalUsers),
      change: stats.usersChange,
      icon: 'users' as const,
    },
    {
      label: 'Orders',
      value: formatNumber(stats.totalOrders),
      change: stats.ordersChange,
      icon: 'orders' as const,
    },
    {
      label: 'Conversion Rate',
      value: `${stats.conversionRate}%`,
      change: stats.conversionChange,
      icon: 'conversion' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {kpiData.map((kpi) => (
        <KpiCard
          key={kpi.label}
          label={kpi.label}
          value={kpi.value}
          change={kpi.change}
          icon={kpi.icon}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
}
