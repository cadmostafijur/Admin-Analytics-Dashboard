'use client';

import React from 'react';
import { Users } from 'lucide-react';
import { useDashboardStore } from '@/store/dashboardStore';
import type { UserType } from '@/types/dashboard';

const userTypeOptions: { value: UserType; label: string }[] = [
  { value: 'all', label: 'All Users' },
  { value: 'free', label: 'Free' },
  { value: 'premium', label: 'Premium' },
  { value: 'enterprise', label: 'Enterprise' },
];

export function UserTypeFilter() {
  const { filters, setUserType } = useDashboardStore();

  return (
    <div className="flex items-center space-x-2">
      <Users className="w-4 h-4 text-muted-foreground" />
      <select
        value={filters.userType}
        onChange={(e) => setUserType(e.target.value as UserType)}
        className="h-10 px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
      >
        {userTypeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
