import { useState } from 'react';
import { cn } from '../lib/utils';

interface Tab {
  id: string;
  label: string;
}

export function useFormTabs(tabs: Tab[], initialTab?: string) {
  const [activeTab, setActiveTab] = useState(initialTab || tabs[0].id);

  const TabNavigation = () => (
    <div className="flex items-center gap-1 p-1 bg-warm-50 rounded-xl mb-6 border border-warm-100 dark:bg-white/5 dark:border-white/10">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            "flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all",
            activeTab === tab.id
              ? "bg-white text-ink shadow-sm dark:bg-white/10 dark:text-white"
              : "text-text-muted hover:text-ink hover:bg-white/50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/5"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );

  return {
    activeTab,
    setActiveTab,
    TabNavigation,
  };
}
