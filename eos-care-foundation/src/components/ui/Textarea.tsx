import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-text-secondary mb-2 dark:text-white">
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            'w-full px-4 py-3 rounded-xl bg-white/[0.85] backdrop-blur-[12px] border border-white/50 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-y min-h-[100px] dark:bg-white/10 dark:border-white/15 dark:text-white dark:placeholder:text-white/60',
            error && 'border-status-urgent focus:ring-status-urgent',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-status-urgent">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
