import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-background p-6 shadow-sm">
      <div className="space-y-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-background p-6 shadow-sm">
      <Skeleton className="h-6 w-40 mb-4" />
      <Skeleton className="h-[300px] w-full" />
    </div>
  );
}
