import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format number as currency with validation
 */
export function formatCurrency(value: number): string {
  if (typeof value !== 'number' || !isFinite(value)) {
    console.error('formatCurrency: Invalid value', value);
    return '$0';
  }
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  } catch (error) {
    console.error('formatCurrency: Error formatting', error);
    return '$0';
  }
}

/**
 * Format number with commas and validation
 */
export function formatNumber(value: number): string {
  if (typeof value !== 'number' || !isFinite(value)) {
    console.error('formatNumber: Invalid value', value);
    return '0';
  }
  try {
    return new Intl.NumberFormat('en-US').format(value);
  } catch (error) {
    console.error('formatNumber: Error formatting', error);
    return '0';
  }
}

/**
 * Format percentage with validation
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  if (typeof value !== 'number' || !isFinite(value)) {
    console.error('formatPercentage: Invalid value', value);
    return '+0.0%';
  }
  if (typeof decimals !== 'number' || decimals < 0 || decimals > 10) {
    decimals = 1;
  }
  try {
    return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;
  } catch (error) {
    console.error('formatPercentage: Error formatting', error);
    return '+0.0%';
  }
}

/**
 * Simulate API delay
 */
export function randomDelay(min: number = 800, max: number = 1200): Promise<void> {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise((resolve) => setTimeout(resolve, delay));
}
