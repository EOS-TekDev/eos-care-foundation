import { useState, type ReactNode, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes, type ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export function FormField({ label, required, children, hint }: { label: string; required?: boolean; children: ReactNode; hint?: string }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-ink dark:text-white">
        {label}
        {required && <span className="text-sunset ml-1">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-text-muted dark:text-gray-400">{hint}</p>}
    </div>
  );
}

export function FormInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full px-4 py-3 rounded-xl border border-warm-200 bg-white",
        "focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 focus-visible:outline-none transition-all",
        "placeholder:text-text-muted",
        "dark:bg-white/10 dark:border-white/20 dark:text-white dark:placeholder:text-gray-400",
        className
      )}
      {...props}
    />
  );
}

export function FormTextarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full px-4 py-3 rounded-xl border border-warm-200 bg-white resize-none",
        "focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 focus-visible:outline-none transition-all",
        "placeholder:text-text-muted",
        "dark:bg-white/10 dark:border-white/20 dark:text-white dark:placeholder:text-gray-400",
        className
      )}
      {...props}
    />
  );
}

export function FormSelect({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "w-full px-4 py-3 rounded-xl border border-warm-200 bg-white",
        "focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 focus-visible:outline-none transition-all",
        "dark:bg-white/10 dark:border-white/20 dark:text-white",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function FormFileInput({ 
  className, 
  onChange,
  accept,
  ...props 
}: InputHTMLAttributes<HTMLInputElement>) {
  const [fileName, setFileName] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file?.name || null);
    onChange?.(e);
  };

  return (
    <label className={cn(
      "flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-warm-200 border-dashed bg-warm-50",
      "cursor-pointer hover:bg-warm-100 transition-colors dark:bg-white/5 dark:border-white/20 dark:hover:bg-white/10",
      className
    )}>
      <span className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors shrink-0 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100">
        Pilih File
      </span>
      <span className="text-sm text-text-muted truncate dark:text-gray-400">
        {fileName || 'Belum ada file dipilih'}
      </span>
      <input
        type="file"
        className="sr-only"
        accept={accept}
        onChange={handleChange}
        {...props}
      />
    </label>
  );
}

export function FormCheckbox({ label, className, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        className={cn(
          "w-5 h-5 rounded border-warm-300 text-forest focus:ring-forest",
          className
        )}
        {...props}
      />
      <span className="text-sm text-ink dark:text-white">{label}</span>
    </label>
  );
}

export function FormButton({ variant = 'primary', className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' }) {
  return (
    <button
      className={cn(
        "px-5 py-2.5 text-sm font-medium rounded-xl transition-all",
        "active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        variant === 'primary' && "bg-gray-900 text-white hover:bg-gray-800 shadow-soft focus-visible:ring-gray-900 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100",
        variant === 'secondary' && "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 focus-visible:ring-gray-400 dark:bg-white/10 dark:text-gray-300 dark:border-white/20 dark:hover:bg-white/20",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
