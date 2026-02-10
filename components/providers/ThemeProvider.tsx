'use client';

import { useEffect } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';

/**
 * ThemeProvider Component
 * Initializes theme from localStorage and applies it to the document
 * Prevents flash of unstyled content (FOUC)
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useDashboardStore();

  useEffect(() => {
    // Initialize theme from localStorage on mount
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      useDashboardStore.setState({ theme: savedTheme });
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const defaultTheme = prefersDark ? 'dark' : 'light';
      useDashboardStore.setState({ theme: defaultTheme });
      document.documentElement.classList.toggle('dark', defaultTheme === 'dark');
      localStorage.setItem('theme', defaultTheme);
    }
  }, []);

  useEffect(() => {
    // Update document and localStorage when theme changes
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return <>{children}</>;
}
