export interface KpiData {
  label: string;
  value: string | number;
  change: number;
  icon: string;
}

export interface RevenueData {
  month: string;
  revenue: number;
}

export interface OrdersData {
  month: string;
  orders: number;
}

export interface UserDistribution {
  name: string;
  value: number;
  color: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalUsers: number;
  totalOrders: number;
  conversionRate: number;
  revenueChange: number;
  usersChange: number;
  ordersChange: number;
  conversionChange: number;
}

export type DateRange = '7days' | '30days' | '12months';
export type UserType = 'all' | 'free' | 'premium' | 'enterprise';

export interface DashboardFilters {
  dateRange: DateRange;
  userType: UserType;
}

export interface DashboardData {
  stats: DashboardStats;
  revenueData: RevenueData[];
  ordersData: OrdersData[];
  usersDistribution: UserDistribution[];
}
