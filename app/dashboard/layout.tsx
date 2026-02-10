'use client';

import React, { useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { useDashboardStore } from '@/store/dashboardStore';
import { cn } from '@/lib/utils';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sidebarCollapsed, setSidebarCollapsed } = useDashboardStore();

  // Auto-collapse sidebar on tablet/mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setSidebarCollapsed]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <MobileMenu />
        
        <div
          className={cn(
            'transition-all duration-300',
            sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
          )}
        >
          <Header />
          <main className="p-4 md:p-6 lg:p-8">
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
}
