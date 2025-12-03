import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:bg-primary-hover hover:shadow-medium focus:ring-primary',
        secondary: 'bg-white/[0.85] backdrop-blur-[12px] text-text-primary border border-white/50 hover:bg-white hover:shadow-soft focus:ring-primary dark:bg-white/10 dark:text-white dark:border-white/15 dark:hover:bg-white/20',
        cta: 'bg-cta text-white font-semibold shadow-medium hover:bg-cta-hover hover:shadow-strong focus:ring-cta',
        outline: 'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white focus:ring-primary dark:border-white/40 dark:text-white dark:hover:bg-white/10',
        ghost: 'text-primary bg-transparent hover:bg-primary-light focus:ring-primary dark:text-white dark:hover:bg-white/10',
        danger: 'bg-status-urgent text-white hover:bg-red-600 focus:ring-status-urgent',
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
