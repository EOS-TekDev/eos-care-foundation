import { type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-text-secondary',
        primary: 'bg-primary-light text-primary',
        success: 'bg-green-100 text-status-success',
        warning: 'bg-orange-100 text-status-warning',
        urgent: 'bg-red-100 text-status-urgent',
        info: 'bg-blue-100 text-status-info',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-1.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}
