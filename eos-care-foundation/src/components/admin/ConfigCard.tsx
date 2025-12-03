import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { Icons } from '../ui/Icons';

interface ConfigCardProps {
  title: string;
  description?: string;
  badge?: string;
  isActive: boolean;
  onEdit: () => void;
  onDelete: () => void;
  children?: ReactNode;
  className?: string;
}

export function ConfigCard({
  title,
  description,
  badge,
  isActive,
  onEdit,
  onDelete,
  children,
  className,
}: ConfigCardProps) {
  return (
    <div 
      className={cn(
        "group relative flex flex-col bg-white rounded-2xl border border-warm-100 overflow-hidden transition-all hover:shadow-soft dark:bg-white/5 dark:border-white/10",
        isActive && "ring-2 ring-forest border-transparent",
        className
      )}
    >
      {/* Status Badge */}
      <div className="absolute top-4 right-4 flex gap-2">
        <span className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium shadow-sm backdrop-blur-sm",
          isActive 
            ? "bg-forest/90 text-white" 
            : "bg-warm-100/90 text-text-muted dark:bg-white/10 dark:text-gray-400"
        )}>
          <span className={cn("w-1.5 h-1.5 rounded-full", isActive ? "bg-white" : "bg-gray-400")} />
          {isActive ? 'Aktif' : 'Nonaktif'}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex-1">
        <div className="pr-20"> {/* Space for badges */}
          {badge && (
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-warm-50 border border-warm-100 text-xs font-medium text-text-secondary mb-3 dark:bg-white/5 dark:border-white/10 dark:text-gray-300">
              {badge}
            </div>
          )}
          <h3 className="font-display font-semibold text-lg text-ink mb-1 line-clamp-1 dark:text-white">{title}</h3>
          {description && (
            <p className="text-sm text-text-muted line-clamp-2 dark:text-gray-400">{description}</p>
          )}
        </div>
        {children && <div className="mt-4 pt-4 border-t border-warm-50 dark:border-white/5">{children}</div>}
      </div>

      {/* Actions */}
      <div className="px-5 py-3 bg-warm-50/50 border-t border-warm-100 flex items-center justify-between dark:bg-white/5 dark:border-white/10">
        <span className="text-xs text-text-muted dark:text-gray-500">
          {isActive ? 'Ditampilkan di homepage' : 'Tersimpan di draft'}
        </span>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(); }}
            className="p-2 text-text-muted hover:text-forest hover:bg-forest/10 rounded-lg transition-colors"
            title="Edit"
          >
            <Icons.edit className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="p-2 text-text-muted hover:text-sunset hover:bg-sunset/10 rounded-lg transition-colors"
            title="Hapus"
          >
            <Icons.delete className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
