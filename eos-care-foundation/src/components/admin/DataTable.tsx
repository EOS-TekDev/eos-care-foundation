import { useState, type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface Column<T> {
  key: string;
  header: string;
  render: (item: T) => ReactNode;
  className?: string;
}

export interface TablePaginationProps {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  isLoading?: boolean;
  emptyIcon?: ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  onAdd?: () => void;
  addLabel?: string;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  pagination?: TablePaginationProps;
}

function TableSkeleton({ columns }: { columns: number }) {
  return (
    <div className="p-6 space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex gap-4" style={{ animationDelay: `${i * 100}ms` }}>
          <div className="w-14 h-10 bg-warm-100 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-warm-100 rounded w-3/4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
            </div>
            <div className="h-3 bg-warm-50 rounded w-1/2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
            </div>
          </div>
          {Array.from({ length: Math.max(0, columns - 2) }).map((_, j) => (
            <div key={j} className="w-20 h-4 bg-warm-100 rounded relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  isLoading,
  emptyIcon,
  emptyTitle = 'Belum ada data',
  emptyDescription = 'Data akan muncul di sini',
  onAdd,
  addLabel = 'Tambah',
  searchPlaceholder = 'Cari...',
  onSearch,
  pagination,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value);
  };

  return (
    <div className="bg-white rounded-2xl border border-warm-100 shadow-soft overflow-hidden dark:bg-white/5 dark:border-white/10">
      {/* Header with search */}
      {(onSearch || onAdd) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border-b border-warm-100 bg-warm-50/50 dark:border-white/10 dark:bg-white/5">
          {onSearch && (
            <div className="relative flex-1 max-w-xs">
              <svg 
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted dark:text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder={searchPlaceholder}
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-warm-200 bg-white focus:border-forest focus:ring-2 focus:ring-forest/20 focus-visible:outline-none transition-all dark:bg-white/10 dark:border-white/20 dark:text-white"
              />
            </div>
          )}
          {onAdd && (
            <button
              onClick={onAdd}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 transition-all shadow-soft dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              {addLabel}
            </button>
          )}
        </div>
      )}

      {/* Table */}
      {isLoading ? (
        <TableSkeleton columns={columns.length} />
      ) : data.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-warm-50 border-b border-warm-100 dark:bg-white/5 dark:border-white/10">
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className={cn(
                        "text-left py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider dark:text-gray-400",
                        col.className
                      )}
                    >
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-100 dark:divide-white/10">
                {data.map((item, index) => (
                  <tr
                    key={keyExtractor(item)}
                    className={cn(
                      "hover:bg-warm-50/50 transition-colors dark:hover:bg-white/5",
                      "opacity-0 animate-fade-up"
                    )}
                    style={{ animationDelay: `${index * 30}ms`, animationFillMode: 'forwards' }}
                  >
                    {columns.map((col) => (
                      <td key={col.key} className={cn("py-3 px-4", col.className)}>
                        {col.render(item)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pagination && (
            <div className="flex items-center justify-between border-t border-warm-100 bg-warm-50/60 px-4 py-3 text-xs text-text-muted dark:border-white/10 dark:bg-white/5 dark:text-gray-400">
              <span>
                Menampilkan{' '}
                {Math.min((pagination.page - 1) * pagination.limit + 1, pagination.total)}
                {'–'}
                {Math.min(pagination.page * pagination.limit, pagination.total)}
                {' '}dari{' '}
                {pagination.total} data
              </span>
              <div className="inline-flex gap-2">
                <button
                  type="button"
                  onClick={() => pagination.onPageChange(Math.max(1, pagination.page - 1))}
                  disabled={pagination.page === 1}
                  className={cn(
                    "inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all",
                    pagination.page === 1
                      ? "border-warm-100 text-text-muted/60 bg-white cursor-not-allowed dark:border-white/10 dark:text-gray-500 dark:bg-white/5"
                      : "border-warm-200 text-text-secondary bg-white hover:bg-warm-100 dark:border-white/20 dark:text-gray-300 dark:bg-white/10 dark:hover:bg-white/20"
                  )}
                >
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Sebelumnya</span>
                </button>
                <button
                  type="button"
                  onClick={() => pagination.onPageChange(Math.min(pagination.totalPages, pagination.page + 1))}
                  disabled={pagination.page === pagination.totalPages}
                  className={cn(
                    "inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all",
                    pagination.page === pagination.totalPages
                      ? "border-warm-100 text-text-muted/60 bg-white cursor-not-allowed dark:border-white/10 dark:text-gray-500 dark:bg-white/5"
                      : "border-warm-200 text-text-secondary bg-white hover:bg-warm-100 dark:border-white/20 dark:text-gray-300 dark:bg-white/10 dark:hover:bg-white/20"
                  )}
                >
                  <span>Berikutnya</span>
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-warm-100 rounded-full flex items-center justify-center dark:bg-white/10">
            {emptyIcon || (
              <svg className="w-8 h-8 text-text-muted dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            )}
          </div>
          <h3 className="text-lg font-display font-medium text-ink mb-2 dark:text-white">{emptyTitle}</h3>
          <p className="text-text-muted mb-6 dark:text-gray-400">{emptyDescription}</p>
          {onAdd && (
            <button
              onClick={onAdd}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 transition-all shadow-soft dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              {addLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
