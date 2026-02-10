'use client';

import { useEffect, useCallback } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { fetchAllDashboardData } from '@/lib/api';

export function useDashboardData() {
  const { filters, setData, setLoading, setError, data, isLoading, error } =
    useDashboardStore();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const dashboardData = await fetchAllDashboardData(filters);
      setData(dashboardData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch dashboard data';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [filters, setData, setLoading, setError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}
