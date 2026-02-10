'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  FileText,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDashboardStore } from '@/store/dashboardStore';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: Users, label: 'Users', href: '/dashboard/users' },
  { icon: ShoppingCart, label: 'Orders', href: '/dashboard/orders' },
  { icon: FileText, label: 'Reports', href: '/dashboard/reports' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export function MobileMenu() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useDashboardStore();

  if (!sidebarCollapsed) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={toggleSidebar}
      />

      {/* Mobile Menu */}
      <aside className="fixed left-0 top-0 z-50 h-screen w-64 bg-background border-r border-border md:hidden animate-in slide-in-from-left duration-300">
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">AdminPro</span>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={toggleSidebar}
                className={cn(
                  'flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-accent">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">Admin</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
