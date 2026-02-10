import { create } from 'zustand';
import type {
  DashboardData,
  DashboardFilters,
  DateRange,
  UserType,
} from '@/types/dashboard';

interface DashboardStore {
  // State
  filters: DashboardFilters;
  data: DashboardData | null;
  isLoading: boolean;
  error: string | null;
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark';
  
  // Actions
  setDateRange: (dateRange: DateRange) => void;
  setUserType: (userType: UserType) => void;
  setData: (data: DashboardData) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleTheme: () => void;
  resetFilters: () => void;
}

const defaultFilters: DashboardFilters = {
  dateRange: '12months',
  userType: 'all',
};

export const useDashboardStore = create<DashboardStore>((set) => ({
  // Initial state
  filters: defaultFilters,
  data: null,
  isLoading: false,
  error: null,
  sidebarCollapsed: false,
  theme: 'light',

  // Actions
  setDateRange: (dateRange) =>
    set((state) => ({
      filters: { ...state.filters, dateRange },
    })),

  setUserType: (userType) =>
    set((state) => ({
      filters: { ...state.filters, userType },
    })),

  setData: (data) => set({ data, error: null }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error, isLoading: false }),

  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      // Update document class and localStorage
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        localStorage.setItem('theme', newTheme);
      }
      return { theme: newTheme };
    }),

  resetFilters: () => set({ filters: defaultFilters }),
}));
