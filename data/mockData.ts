import type {
  DashboardStats,
  RevenueData,
  OrdersData,
  UserDistribution,
  DateRange,
  UserType,
} from '@/types/dashboard';

/**
 * Mock dashboard statistics
 */
export const mockStats: DashboardStats = {
  totalRevenue: 54230,
  totalUsers: 1245,
  totalOrders: 342,
  conversionRate: 4.3,
  revenueChange: 12.5,
  usersChange: 8.2,
  ordersChange: -3.1,
  conversionChange: 2.4,
};

/**
 * Mock revenue data (12 months)
 */
export const mockRevenueData: RevenueData[] = [
  { month: 'Jan', revenue: 38000 },
  { month: 'Feb', revenue: 42000 },
  { month: 'Mar', revenue: 45000 },
  { month: 'Apr', revenue: 48000 },
  { month: 'May', revenue: 52000 },
  { month: 'Jun', revenue: 49000 },
  { month: 'Jul', revenue: 53000 },
  { month: 'Aug', revenue: 56000 },
  { month: 'Sep', revenue: 54000 },
  { month: 'Oct', revenue: 58000 },
  { month: 'Nov', revenue: 61000 },
  { month: 'Dec', revenue: 65000 },
];

/**
 * Mock orders data (12 months)
 */
export const mockOrdersData: OrdersData[] = [
  { month: 'Jan', orders: 245 },
  { month: 'Feb', orders: 278 },
  { month: 'Mar', orders: 312 },
  { month: 'Apr', orders: 289 },
  { month: 'May', orders: 356 },
  { month: 'Jun', orders: 334 },
  { month: 'Jul', orders: 398 },
  { month: 'Aug', orders: 412 },
  { month: 'Sep', orders: 378 },
  { month: 'Oct', orders: 423 },
  { month: 'Nov', orders: 445 },
  { month: 'Dec', orders: 467 },
];

/**
 * Mock user distribution data
 */
export const mockUsersDistribution: UserDistribution[] = [
  { name: 'Free', value: 620, color: '#3b82f6' },
  { name: 'Premium', value: 450, color: '#8b5cf6' },
  { name: 'Enterprise', value: 175, color: '#06b6d4' },
];

/**
 * Generate filtered data based on date range and user type
 */
export function generateFilteredData(dateRange: DateRange, userType: UserType) {
  // Simulate different data based on filters
  const multiplier = userType === 'all' ? 1 : userType === 'premium' ? 0.7 : userType === 'enterprise' ? 0.3 : 0.5;
  
  let stats = { ...mockStats };
  let revenueData = [...mockRevenueData];
  let ordersData = [...mockOrdersData];
  let usersDistribution = [...mockUsersDistribution];

  // Adjust based on date range
  if (dateRange === '7days') {
    revenueData = revenueData.slice(-1);
    ordersData = ordersData.slice(-1);
    stats.totalRevenue = Math.round(stats.totalRevenue * 0.15);
  } else if (dateRange === '30days') {
    revenueData = revenueData.slice(-3);
    ordersData = ordersData.slice(-3);
    stats.totalRevenue = Math.round(stats.totalRevenue * 0.35);
  }

  // Adjust based on user type
  if (userType !== 'all') {
    stats.totalRevenue = Math.round(stats.totalRevenue * multiplier);
    stats.totalUsers = Math.round(stats.totalUsers * multiplier);
    stats.totalOrders = Math.round(stats.totalOrders * multiplier);
    
    revenueData = revenueData.map(item => ({
      ...item,
      revenue: Math.round(item.revenue * multiplier),
    }));
    
    ordersData = ordersData.map(item => ({
      ...item,
      orders: Math.round(item.orders * multiplier),
    }));

    if (userType === 'free') {
      usersDistribution = [usersDistribution[0]];
    } else if (userType === 'premium') {
      usersDistribution = [usersDistribution[1]];
    } else if (userType === 'enterprise') {
      usersDistribution = [usersDistribution[2]];
    }
  }

  return {
    stats,
    revenueData,
    ordersData,
    usersDistribution,
  };
}
