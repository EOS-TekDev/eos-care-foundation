import { useState, useMemo, useCallback } from 'react';
import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import type { PaginatedResponse } from '../lib/types';

interface QueryParams {
  page?: number;
  limit?: number;
  [key: string]: unknown;
}

type IdType = string | number;

interface UseCrudStateConfig<T extends { id: IdType }, F> {
  useList: (params: QueryParams) => UseQueryResult<PaginatedResponse<T>>;
  useCreate: () => UseMutationResult<unknown, Error, F>;
  useUpdate: () => UseMutationResult<unknown, Error, { id: IdType; data: Partial<F> }>;
  useDelete: () => UseMutationResult<unknown, Error, IdType>;
  getDefaultFormData: (items?: T[]) => Partial<F>;
  mapItemToFormData: (item: T) => Partial<F>;
  searchFilter?: (item: T, query: string) => boolean;
  pageSize?: number;
  deleteConfirmMessage?: string;
}

export interface CrudStateReturn<T extends { id: IdType }, F> {
  // Pagination
  page: number;
  setPage: (page: number) => void;
  
  // Modal state
  isFormOpen: boolean;
  setIsFormOpen: (open: boolean) => void;
  
  // Editing state
  editingItem: T | null;
  
  // Form state
  formData: Partial<F>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<F>>>;
  updateField: <K extends keyof F>(key: K, value: F[K]) => void;
  
  // File upload state
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
  
  // Search state
  searchQuery: string;
  
  // Data
  items: T[];
  filteredData: T[];
  isLoading: boolean;
  meta: PaginatedResponse<T>['meta'] | undefined;
  
  // Handlers
  handleSearch: (query: string) => void;
  handleCreate: () => void;
  handleEdit: (item: T) => void;
  handleDelete: (id: IdType) => Promise<void>;
  handleSubmit: (e: React.FormEvent, submitData: F | Partial<F>) => Promise<void>;
  handleCloseForm: () => void;
  
  // Mutation states
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
}

export function useCrudState<T extends { id: IdType }, F>(
  config: UseCrudStateConfig<T, F>
): CrudStateReturn<T, F> {
  const {
    useList,
    useCreate,
    useUpdate,
    useDelete,
    getDefaultFormData,
    mapItemToFormData,
    searchFilter,
    pageSize = 10,
    deleteConfirmMessage = 'Yakin ingin menghapus item ini?',
  } = config;

  // Pagination state
  const [page, setPage] = useState(1);
  
  // Modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Editing state
  const [editingItem, setEditingItem] = useState<T | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<Partial<F>>({});
  
  // File state
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Query hooks
  const { data, isLoading } = useList({ page, limit: pageSize });
  const createMutation = useCreate();
  const updateMutation = useUpdate();
  const deleteMutation = useDelete();

  // Derived data
  const items = useMemo(() => data?.data || [], [data?.data]);
  const meta = data?.meta;

  // Filtered data based on search
  const filteredData = useMemo(() => {
    if (!searchQuery || !searchFilter) return items;
    const q = searchQuery.toLowerCase();
    return items.filter((item) => searchFilter(item, q));
  }, [items, searchQuery, searchFilter]);

  // Update single field helper
  const updateField = useCallback(<K extends keyof F>(key: K, value: F[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }, []);

  // Handlers
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setPage(1);
  }, []);

  const handleCreate = useCallback(() => {
    setEditingItem(null);
    setFormData(getDefaultFormData(items));
    setImageFile(null);
    setIsFormOpen(true);
  }, [getDefaultFormData, items]);

  const handleEdit = useCallback((item: T) => {
    setEditingItem(item);
    setFormData(mapItemToFormData(item));
    setImageFile(null);
    setIsFormOpen(true);
  }, [mapItemToFormData]);

  const handleDelete = useCallback(async (id: IdType) => {
    if (confirm(deleteConfirmMessage)) {
      await deleteMutation.mutateAsync(id);
    }
  }, [deleteMutation, deleteConfirmMessage]);

  const handleSubmit = useCallback(async (e: React.FormEvent, submitData: F | Partial<F>) => {
    e.preventDefault();
    if (editingItem) {
      await updateMutation.mutateAsync({ id: editingItem.id, data: submitData as Partial<F> });
    } else {
      await createMutation.mutateAsync(submitData as F);
    }
    setIsFormOpen(false);
  }, [editingItem, createMutation, updateMutation]);

  const handleCloseForm = useCallback(() => {
    setIsFormOpen(false);
  }, []);

  return {
    // Pagination
    page,
    setPage,
    
    // Modal state
    isFormOpen,
    setIsFormOpen,
    
    // Editing state
    editingItem,
    
    // Form state
    formData,
    setFormData,
    updateField,
    
    // File state
    imageFile,
    setImageFile,
    
    // Search state
    searchQuery,
    
    // Data
    items,
    filteredData,
    isLoading,
    meta,
    
    // Handlers
    handleSearch,
    handleCreate,
    handleEdit,
    handleDelete,
    handleSubmit,
    handleCloseForm,
    
    // Mutation states
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
