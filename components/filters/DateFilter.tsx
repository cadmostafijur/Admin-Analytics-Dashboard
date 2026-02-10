'use client';

import React from 'react';
import { Calendar } from 'lucide-react';
import { useDashboardStore } from '@/store/dashboardStore';
import type { DateRange } from '@/types/dashboard';

const dateRangeOptions: { value: DateRange; label: string }[] = [
  { value: '7days', label: 'Last 7 days' },
  { value: '30days', label: 'Last 30 days' },
  { value: '12months', label: 'Last 12 months' },
];

export function DateFilter() {
  const { filters, setDateRange } = useDashboardStore();

  return (
    <div className="flex items-center space-x-2">
      <Calendar className="w-4 h-4 text-muted-foreground" />
      <select
        value={filters.dateRange}
        onChange={(e) => setDateRange(e.target.value as DateRange)}
        className="h-10 px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
      >
        {dateRangeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
