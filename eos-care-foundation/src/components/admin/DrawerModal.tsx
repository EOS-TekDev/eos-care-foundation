import { useEffect, type ReactNode } from 'react';
import { cn } from '../../lib/utils';

// Re-export form components from ui for backward compatibility
export { FormField, FormInput, FormTextarea, FormSelect, FormFileInput, FormCheckbox, FormButton } from '../ui/Form';

interface DrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'max-w-full sm:max-w-sm',
  md: 'max-w-full sm:max-w-md',
  lg: 'max-w-full sm:max-w-lg',
  xl: 'max-w-full sm:max-w-xl',
};

export function DrawerModal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size = 'lg',
}: DrawerModalProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      {/* Drawer panel - slides from right */}
      <div className="fixed inset-y-0 right-0 flex max-w-full">
        <div
          className={cn(
            "w-screen",
            sizeClasses[size],
            "transform transition-transform duration-300 ease-smooth",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="h-full flex flex-col bg-white shadow-lifted dark:bg-ink">
            {/* Header */}
            <div className="flex items-start justify-between px-6 py-5 border-b border-warm-100 bg-warm-50/50 dark:border-white/10 dark:bg-white/5">
              <div>
                <h2 className="text-xl font-display font-semibold text-ink dark:text-white">{title}</h2>
                {subtitle && <p className="text-sm text-text-muted mt-1 dark:text-gray-400">{subtitle}</p>}
              </div>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-text-muted hover:text-text-primary hover:bg-warm-100 rounded-xl transition-colors dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content - scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              {children}
            </div>

            {/* Footer - sticky */}
            {footer && (
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-warm-100 bg-warm-50/50 dark:border-white/10 dark:bg-white/5">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


