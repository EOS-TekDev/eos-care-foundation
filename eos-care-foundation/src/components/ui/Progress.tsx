import { type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Progress({
  value,
  max = 100,
  showLabel = false,
  size = 'md',
  className,
  ...props
}: ProgressProps) {
  const percentage = Math.min(Math.round((value / max) * 100), 100);

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={cn('w-full', className)} {...props}>
      <div className={cn('bg-gray-200 rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between mt-1 text-sm text-text-muted">
          <span>{value.toLocaleString()}</span>
          <span>{percentage}%</span>
        </div>
      )}
    </div>
  );
}
