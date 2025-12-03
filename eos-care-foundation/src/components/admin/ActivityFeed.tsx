import { cn } from '../../lib/utils';
import type { ReactNode } from 'react';

type ActivityType = 'berita' | 'donasi' | 'kegiatan' | 'user';

interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description?: string;
  timestamp: Date;
  meta?: string;
}

interface ActivityFeedProps {
  activities: Activity[];
  isLoading?: boolean;
  emptyMessage?: string;
}

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffSecs < 60) return 'baru saja';
  if (diffMins < 60) return `${diffMins} menit yang lalu`;
  if (diffHours < 24) return `${diffHours} jam yang lalu`;
  if (diffDays < 7) return `${diffDays} hari yang lalu`;
  if (diffWeeks < 4) return `${diffWeeks} minggu yang lalu`;
  if (diffMonths < 12) return `${diffMonths} bulan yang lalu`;
  return `${Math.floor(diffDays / 365)} tahun yang lalu`;
}

const typeConfig: Record<ActivityType, { icon: ReactNode; color: string; bg: string }> = {
  berita: {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
      </svg>
    ),
    color: 'text-ocean',
    bg: 'bg-ocean/10',
  },
  donasi: {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    color: 'text-forest',
    bg: 'bg-forest/10',
  },
  kegiatan: {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    color: 'text-terracotta',
    bg: 'bg-terracotta/10',
  },
  user: {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    color: 'text-sunset',
    bg: 'bg-sunset/10',
  },
};

export function ActivityFeed({ activities, isLoading, emptyMessage = "Belum ada aktivitas" }: ActivityFeedProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-3 animate-pulse">
            <div className="w-8 h-8 rounded-full bg-gray-200" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="py-8 text-center">
        <div className="w-12 h-12 mx-auto mb-3 bg-warm-100 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-sm text-text-muted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {activities.map((activity, index) => {
        const config = typeConfig[activity.type];
        return (
          <div 
            key={activity.id}
            className={cn(
              "flex gap-3 p-3 rounded-xl transition-colors hover:bg-warm-50",
              "opacity-0 animate-fade-up"
            )}
            style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
          >
            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0", config.bg)}>
              <span className={config.color}>{config.icon}</span>
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">{activity.title}</p>
              {activity.description && (
                <p className="text-xs text-text-muted truncate">{activity.description}</p>
              )}
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-text-muted">
                  {formatRelativeTime(activity.timestamp)}
                </span>
                {activity.meta && (
                  <>
                    <span className="text-text-disabled">•</span>
                    <span className="text-xs text-text-muted">{activity.meta}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
