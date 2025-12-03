import type { ReactNode } from 'react';
import { DataTable, type Column } from './DataTable';
import { DrawerModal } from './DrawerModal';
import { FormButton } from '../ui/Form';
import { Icons } from '../ui/Icons';
import type { PaginatedResponse } from '../../lib/types';

type IdType = string | number;

interface CrudPageLayoutProps<T extends { id: IdType }> {
  // Page info
  title: string;
  subtitle: string;
  addLabel: string;
  
  // Empty state
  emptyTitle: string;
  emptyDescription: string;
  emptyIcon?: ReactNode;
  
  // Search
  searchPlaceholder: string;
  
  // Table
  columns: Column<T>[];
  
  // Data from useCrudState
  filteredData: T[];
  isLoading: boolean;
  meta?: PaginatedResponse<T>['meta'];
  page: number;
  setPage: (page: number) => void;
  
  // Modal from useCrudState
  isFormOpen: boolean;
  editingItem: T | null;
  handleCreate: () => void;
  handleCloseForm: () => void;
  handleSearch: (query: string) => void;
  
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
  
  // Optional filter slot (e.g., category filter)
  filterSlot?: ReactNode;
  
  // Optional custom header actions
  headerActions?: ReactNode;
}

export function CrudPageLayout<T extends { id: IdType }>({
  // Page info
  title,
  subtitle,
  addLabel,
  
  // Empty state
  emptyTitle,
  emptyDescription,
  emptyIcon,
  
  // Search
  searchPlaceholder,
  
  // Table
  columns,
  
  // Data
  filteredData,
  isLoading,
  meta,
  page,
  setPage,
  
  // Modal
  isFormOpen,
  editingItem,
  handleCreate,
  handleCloseForm,
  handleSearch,
  
  // Form config
  formId,
  formTitle,
  formTitleEdit,
  formSubtitle,
  formSubtitleEdit,
  formSize = 'lg',
  submitLabel,
  submitLabelEdit,
  
  // Form content
  children,
  
  // Optional slots
  filterSlot,
  headerActions,
}: CrudPageLayoutProps<T>) {
  const isEditing = editingItem !== null;
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-ink dark:text-white">
            {title}
          </h1>
          <p className="text-text-secondary mt-1 dark:text-gray-300">{subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          {headerActions}
          <button
            onClick={handleCreate}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 transition-all shadow-soft dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            <Icons.add className="w-5 h-5" />
            {addLabel}
          </button>
        </div>
      </div>

      {/* Optional filter slot */}
      {filterSlot}

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        keyExtractor={(item) => String(item.id)}
        isLoading={isLoading}
        emptyIcon={emptyIcon}
        emptyTitle={emptyTitle}
        emptyDescription={emptyDescription}
        onAdd={handleCreate}
        addLabel={addLabel}
        searchPlaceholder={searchPlaceholder}
        onSearch={handleSearch}
        pagination={
          meta
            ? {
                page,
                limit: meta.limit,
                total: meta.total,
                totalPages: meta.totalPages,
                onPageChange: setPage,
              }
            : undefined
        }
      />

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
