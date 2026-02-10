'use client';

import React, { lazy, Suspense } from 'react';
import { KpiGrid } from '@/components/kpi/KpiCard';
import { DateFilter } from '@/components/filters/DateFilter';
import { UserTypeFilter } from '@/components/filters/UserTypeFilter';
import { Button } from '@/components/ui/Button';
import { ChartSkeleton } from '@/components/ui/Skeleton';
import { useDashboardData } from '@/hooks/useDashboardData';
import { Download, RefreshCw, AlertCircle } from 'lucide-react';

// Lazy load chart components for better performance
const RevenueLineChart = lazy(() =>
  import('@/components/charts/RevenueLineChart').then((mod) => ({
    default: mod.RevenueLineChart,
  }))
);

const OrdersBarChart = lazy(() =>
  import('@/components/charts/OrdersBarChart').then((mod) => ({
    default: mod.OrdersBarChart,
  }))
);

const UsersPieChart = lazy(() =>
  import('@/components/charts/UsersPieChart').then((mod) => ({
    default: mod.UsersPieChart,
  }))
);

export default function DashboardPage() {
  const { data, isLoading, error, refetch } = useDashboardData();

  const handleExportCSV = () => {
    // Simple CSV export functionality with error handling
    if (!data) return;

    try {
      const csvContent = `
Revenue Data
Month,Revenue
${data.revenueData.map((item) => `${item.month},${item.revenue}`).join('\n')}

Orders Data
Month,Orders
${data.ordersData.map((item) => `${item.month},${item.orders}`).join('\n')}

User Distribution
Type,Count
${data.usersDistribution.map((item) => `${item.name},${item.value}`).join('\n')}
    `.trim();

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dashboard-data-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export CSV:', error);
      alert('Failed to export data. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
          <p className="text-muted-foreground">
            Track your business metrics and performance
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <DateFilter />
          <UserTypeFilter />
          <Button
            variant="outline"
            size="md"
            onClick={refetch}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={handleExportCSV}
            disabled={!data}
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
          <div className="flex-1">
            <p className="font-medium text-destructive">Failed to load data</p>
            <p className="text-sm text-destructive/80">{error}</p>
          </div>
          <Button variant="outline" size="sm" onClick={refetch}>
            Retry
          </Button>
        </div>
      )}

      {/* KPI Cards */}
      {data ? (
        <KpiGrid stats={data.stats} isLoading={isLoading} />
      ) : (
        <KpiGrid
          stats={{
            totalRevenue: 0,
            totalUsers: 0,
            totalOrders: 0,
            conversionRate: 0,
            revenueChange: 0,
            usersChange: 0,
            ordersChange: 0,
            conversionChange: 0,
          }}
          isLoading={true}
        />
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<ChartSkeleton />}>
          {data ? (
            <RevenueLineChart data={data.revenueData} isLoading={isLoading} />
          ) : (
            <ChartSkeleton />
          )}
        </Suspense>

        <Suspense fallback={<ChartSkeleton />}>
          {data ? (
            <OrdersBarChart data={data.ordersData} isLoading={isLoading} />
          ) : (
            <ChartSkeleton />
          )}
        </Suspense>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<ChartSkeleton />}>
          {data ? (
            <UsersPieChart data={data.usersDistribution} isLoading={isLoading} />
          ) : (
            <ChartSkeleton />
          )}
        </Suspense>

        {/* Placeholder for future chart or content */}
        <div className="rounded-lg border border-dashed border-border bg-muted/10 p-8 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">Additional insights coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}
