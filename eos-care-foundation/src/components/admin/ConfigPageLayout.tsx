import type { ReactNode } from 'react';
import { DrawerModal } from './DrawerModal';
import { FormButton } from '../ui/Form';
import { Icons } from '../ui/Icons';
import { ConfigCard } from './ConfigCard';

type IdType = string | number;

interface ConfigPageLayoutProps<T extends { id: IdType; isActive: boolean }> {
  // Page info
  title: string;
  subtitle: string;
  addLabel: string;
  
  // Empty state
  emptyTitle: string;
  emptyDescription: string;
  emptyIcon?: ReactNode;
  
  // Data
  items: T[];
  activeItem: T | null;
  isLoading: boolean;
  
  // Renderers
  renderActivePreview?: (item: T) => ReactNode;
  renderConfigCard: (item: T) => {
    title: string;
    description?: string;
    badge?: string;
    content?: ReactNode;
  };
  
  // Modal from useCrudState
  isFormOpen: boolean;
  editingItem: T | null;
  handleCreate: () => void;
  handleCloseForm: () => void;
  handleEdit: (item: T) => void;
  handleDelete: (id: IdType) => void;
  
  // Form modal config
  formId: string;
  formTitle: string;
  formTitleEdit?: string;
  formSubtitle: string;
  formSubtitleEdit?: string;
  formSize?: 'sm' | 'md' | 'lg' | 'xl';
  submitLabel: string;
  submitLabelEdit?: string;
  
  // Form content
  children: ReactNode;
}

export function ConfigPageLayout<T extends { id: IdType; isActive: boolean }>({
  // Page info
  title,
  subtitle,
  addLabel,
  
  // Empty state
  emptyTitle,
  emptyDescription,
  emptyIcon,
  
  // Data
  items,
  activeItem,
  isLoading,
  
  // Renderers
  renderActivePreview,
  renderConfigCard,
  
  // Modal
  isFormOpen,
  editingItem,
  handleCreate,
  handleCloseForm,
  handleEdit,
  handleDelete,
  
  // Form config
  formId,
  formTitle,
  formTitleEdit,
  formSubtitle,
  formSubtitleEdit,
  formSize = 'xl',
  submitLabel,
  submitLabelEdit,
  
  // Form content
  children,
}: ConfigPageLayoutProps<T>) {
  const isEditing = editingItem !== null;
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin w-8 h-8 border-3 border-forest border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-ink dark:text-white">
            {title}
          </h1>
          <p className="text-text-secondary mt-1 dark:text-gray-300">{subtitle}</p>
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 transition-all shadow-soft dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
        >
          <Icons.add className="w-5 h-5" />
          {addLabel}
        </button>
      </div>

      {/* Active Preview */}
      {activeItem && renderActivePreview && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-warm-50 via-white to-primary/5 border border-warm-100 p-6 sm:p-8 dark:from-white/5 dark:via-white/5 dark:to-white/5 dark:border-white/10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 dark:from-primary/20" />
          
          <div className="relative">
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest/10 text-forest text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-forest animate-pulse" />
                Aktif
              </span>
              <span className="text-sm text-text-muted dark:text-gray-400">Tampilan saat ini di homepage</span>
            </div>

            {renderActivePreview(activeItem)}
          </div>
        </div>
      )}

      {/* Config List */}
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            const cardProps = renderConfigCard(item);
            return (
              <ConfigCard
                key={item.id}
                isActive={item.isActive}
                onEdit={() => handleEdit(item)}
                onDelete={() => handleDelete(item.id)}
                {...cardProps}
              />
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center bg-warm-50 rounded-2xl border border-warm-100 dark:bg-white/5 dark:border-white/10">
          <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-sm dark:bg-white/10">
            {emptyIcon || <Icons.settings className="w-8 h-8 text-text-muted dark:text-gray-400" />}
          </div>
          <h3 className="text-lg font-display font-medium text-ink mb-2 dark:text-white">{emptyTitle}</h3>
          <p className="text-text-muted mb-6 dark:text-gray-400">{emptyDescription}</p>
          <button
            onClick={handleCreate}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 transition-all shadow-soft dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            <Icons.add className="w-5 h-5" />
            {addLabel}
          </button>
        </div>
      )}

      {/* Drawer Form */}
      <DrawerModal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title={isEditing ? (formTitleEdit || formTitle) : formTitle}
        subtitle={isEditing ? (formSubtitleEdit || formSubtitle) : formSubtitle}
        size={formSize}
        footer={
          <>
            <FormButton variant="secondary" type="button" onClick={handleCloseForm}>
              Batal
            </FormButton>
            <FormButton type="submit" form={formId}>
              {isEditing ? (submitLabelEdit || submitLabel) : submitLabel}
            </FormButton>
          </>
        }
      >
        {children}
      </DrawerModal>
    </div>
  );
}
