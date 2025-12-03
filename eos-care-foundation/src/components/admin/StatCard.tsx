import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import type { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: 'forest' | 'ocean' | 'sunset' | 'terracotta';
  link?: string;
  delay?: number;
}

const colorStyles = {
  forest: {
    bg: 'bg-forest/10',
    text: 'text-forest',
    accent: 'bg-forest',
    border: 'border-forest/20',
  },
  ocean: {
    bg: 'bg-ocean/10',
    text: 'text-ocean',
    accent: 'bg-ocean',
    border: 'border-ocean/20',
  },
  sunset: {
    bg: 'bg-sunset/10',
    text: 'text-sunset',
    accent: 'bg-sunset',
    border: 'border-sunset/20',
  },
  terracotta: {
    bg: 'bg-terracotta/10',
    text: 'text-terracotta',
    accent: 'bg-terracotta',
    border: 'border-terracotta/20',
  },
};

export function StatCard({ label, value, subtext, icon, trend, color, link, delay = 0 }: StatCardProps) {
  const styles = colorStyles[color];
  
  const className = cn(
    "group relative overflow-hidden bg-white rounded-2xl p-6 border transition-all duration-300 dark:bg-white/5 dark:text-white",
    "hover:shadow-lifted hover:-translate-y-1",
    link && "cursor-pointer",
    styles.border,
    "opacity-0 animate-fade-up"
  );
  const style = { animationDelay: `${delay}ms`, animationFillMode: 'forwards' as const };
  
  const content = (
    <>
      <div className={cn("absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl", styles.accent)} />
      
      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", styles.bg)}>
        <span className={styles.text}>{icon}</span>
      </div>
      
      <div className="flex items-end gap-2 mb-1">
        <p className="text-3xl font-display font-bold text-ink dark:text-white">{value}</p>
        {trend && (
          <span className={cn(
            "inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-full mb-1",
            trend.isPositive ? "bg-forest/10 text-forest" : "bg-sunset/10 text-sunset"
          )}>
            <svg 
              className={cn("w-3 h-3", !trend.isPositive && "rotate-180")} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            {Math.abs(trend.value)}%
          </span>
        )}
      </div>
      
      <p className="text-sm font-medium text-text-secondary dark:text-white">{label}</p>
      {subtext && <p className="text-xs text-text-muted mt-0.5 dark:text-gray-400">{subtext}</p>}
      
      {link && (
        <div className={cn(
          "absolute bottom-4 right-4 w-8 h-8 rounded-full flex items-center justify-center",
          "bg-transparent group-hover:bg-gray-100 dark:group-hover:bg-white/10 transition-all duration-300",
          "opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
        )}>
          <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </>
  );

  if (link) {
    return (
      <Link to={link} className={className} style={style}>
        {content}
      </Link>
    );
  }

  return (
    <div className={className} style={style}>
      {content}
    </div>
  );
}
