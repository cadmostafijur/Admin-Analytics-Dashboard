import { NextRequest, NextResponse } from 'next/server';
import { generateFilteredData } from '@/data/mockData';
import { randomDelay } from '@/lib/utils';
import type { DateRange, UserType } from '@/types/dashboard';

// Valid values for validation
const VALID_DATE_RANGES: DateRange[] = ['7days', '30days', '12months'];
const VALID_USER_TYPES: UserType[] = ['all', 'free', 'premium', 'enterprise'];

export async function GET(request: NextRequest) {
  try {
    // Simulate network delay
    await randomDelay();

    const searchParams = request.nextUrl.searchParams;
    const dateRange = searchParams.get('dateRange') || '12months';
    const userType = searchParams.get('userType') || 'all';

    // Input validation
    if (!VALID_DATE_RANGES.includes(dateRange as DateRange)) {
      return NextResponse.json(
        { error: 'Invalid date range parameter' },
        { status: 400 }
      );
    }

    if (!VALID_USER_TYPES.includes(userType as UserType)) {
      return NextResponse.json(
        { error: 'Invalid user type parameter' },
        { status: 400 }
      );
    }

    const { usersDistribution } = generateFilteredData(dateRange as DateRange, userType as UserType);

    // Add security headers
    const response = NextResponse.json(usersDistribution);
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    
    return response;
  } catch (error) {
    console.error('API Error in /api/users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
