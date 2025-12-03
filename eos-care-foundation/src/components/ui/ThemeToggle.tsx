import { useTheme } from '../../contexts/ThemeContext';
import { cn } from '../../lib/utils';

interface ThemeToggleProps {
  className?: string;
  size?: 'default' | 'compact';
}

export function ThemeToggle({ className, size = 'default' }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleTheme}
      className={cn(
        'relative inline-flex items-center rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        isDark 
          ? 'bg-slate-700' 
          : 'bg-warm-200',
        size === 'compact' ? 'h-7 w-12' : 'h-8 w-14',
        className
      )}
    >
      {/* Track icons */}
      <span className="absolute inset-0 flex items-center justify-between px-1.5">
        {/* Sun icon (left side) */}
        <svg
          className={cn(
            'w-4 h-4 transition-all duration-300',
            isDark ? 'text-slate-500 scale-75' : 'text-amber-500 scale-100'
          )}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>
        {/* Moon icon (right side) */}
        <svg
          className={cn(
            'w-4 h-4 transition-all duration-300',
            isDark ? 'text-indigo-300 scale-100' : 'text-slate-400 scale-75'
          )}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </span>

      {/* Sliding thumb */}
      <span
        className={cn(
          'absolute rounded-full bg-white shadow-md transition-all duration-300 ease-out',
          'flex items-center justify-center',
          size === 'compact' ? 'h-5 w-5' : 'h-6 w-6',
          isDark
            ? size === 'compact' ? 'translate-x-[22px]' : 'translate-x-[26px]'
            : 'translate-x-1'
        )}
      >
        {/* Inner icon in thumb */}
        {isDark ? (
          <svg
            className="w-3.5 h-3.5 text-indigo-500 animate-[spin_0.5s_ease-out]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          <svg
            className="w-3.5 h-3.5 text-amber-500 animate-[spin_0.5s_ease-out]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </span>
    </button>
  );
}
