import axios from 'axios';
import type { DashboardData, DashboardFilters } from '@/types/dashboard';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

/**
 * Fetch dashboard stats
 */
export async function fetchDashboardStats(filters: DashboardFilters) {
  const response = await api.get('/stats', { params: filters });
  return response.data;
}

/**
 * Fetch revenue data
 */
export async function fetchRevenueData(filters: DashboardFilters) {
  const response = await api.get('/revenue', { params: filters });
  return response.data;
}

/**
 * Fetch orders data
 */
export async function fetchOrdersData(filters: DashboardFilters) {
  const response = await api.get('/orders', { params: filters });
  return response.data;
}

/**
 * Fetch users distribution data
 */
export async function fetchUsersData(filters: DashboardFilters) {
  const response = await api.get('/users', { params: filters });
  return response.data;
}

/**
 * Fetch all dashboard data
 */
export async function fetchAllDashboardData(
  filters: DashboardFilters
): Promise<DashboardData> {
  const [stats, revenueData, ordersData, usersDistribution] = await Promise.all([
    fetchDashboardStats(filters),
    fetchRevenueData(filters),
    fetchOrdersData(filters),
    fetchUsersData(filters),
  ]);

  return {
    stats,
    revenueData,
    ordersData,
    usersDistribution,
  };
}

export default api;
