'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bell, Sun, Moon, Menu, User, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDashboardStore } from '@/store/dashboardStore';

export function Header() {
  const { toggleSidebar, theme, toggleTheme } = useDashboardStore();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    if (showNotifications || showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showNotifications, showProfileMenu]);

  // Close dropdowns on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowNotifications(false);
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <header className="sticky top-0 z-30 h-16 bg-background/95 border-b border-border backdrop-blur-sm">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-accent transition-colors md:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-xl font-bold">Dashboard</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Welcome back, John!
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="Notifications"
              aria-expanded={showNotifications}
              aria-haspopup="true"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" aria-label="3 unread notifications" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-background border border-border rounded-lg shadow-lg">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="p-4 border-b border-border hover:bg-accent cursor-pointer transition-colors"
                    >
                      <p className="text-sm font-medium">New order received</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        2 minutes ago
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-accent transition-colors"
              aria-label="User menu"
              aria-expanded={showProfileMenu}
              aria-haspopup="true"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                JD
              </div>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-lg">
                <div className="p-4 border-b border-border">
                  <p className="font-semibold">John Doe</p>
                  <p className="text-sm text-muted-foreground">john@example.com</p>
                </div>
                <div className="p-2">
                  <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-left">
                    <User className="w-4 h-4" />
                    <span className="text-sm">Profile</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-left">
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">Settings</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-left text-destructive">
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
