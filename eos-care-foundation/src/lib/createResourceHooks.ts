import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from './api';
import type { PaginatedResponse, ApiResponse } from './types';

interface ResourceConfig<TForm> {
  resource: string;
  buildFormData?: (data: TForm) => FormData;
  buildJsonData?: (data: TForm) => Record<string, unknown>;
  extraQueryKeys?: string[];
  adminOnly?: boolean;
}

interface QueryParams {
  page?: number;
  limit?: number;
  [key: string]: unknown;
}

export function createResourceHooks<TData, TForm>(config: ResourceConfig<TForm>) {
  const { resource, buildFormData, buildJsonData, extraQueryKeys = [], adminOnly = false } = config;

  const allQueryKeys = adminOnly
    ? [`admin-${resource}`, ...extraQueryKeys]
    : [`admin-${resource}`, `public-${resource}`, ...extraQueryKeys];

  function usePublicList(params?: QueryParams) {
    return useQuery({
      queryKey: [`public-${resource}`, params],
      queryFn: async () => {
        const response = await api.get<PaginatedResponse<TData>>(`/public/${resource}`, { params });
        return response.data;
      },
    });
  }

  function usePublicDetail(id: string) {
    return useQuery({
      queryKey: [`public-${resource}`, id],
      queryFn: async () => {
        const response = await api.get<ApiResponse<TData>>(`/public/${resource}/${id}`);
        return response.data.data;
      },
      enabled: !!id,
    });
  }

  function useAdminList(params?: QueryParams) {
    return useQuery({
      queryKey: [`admin-${resource}`, params],
      queryFn: async () => {
        const response = await api.get<PaginatedResponse<TData>>(`/admin/${resource}`, { params });
        return response.data;
      },
    });
  }

  function useAdminDetail(id: string) {
    return useQuery({
      queryKey: [`admin-${resource}`, id],
      queryFn: async () => {
        const response = await api.get<ApiResponse<TData>>(`/admin/${resource}/${id}`);
        return response.data.data;
      },
      enabled: !!id,
    });
  }

  function useCreate() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (data: TForm) => {
        const body = buildFormData ? buildFormData(data) : buildJsonData ? buildJsonData(data) : data;
        const response = await api.post<ApiResponse<TData>>(`/admin/${resource}`, body);
        return response.data.data;
      },
      onSuccess: () => {
        allQueryKeys.forEach(key => queryClient.invalidateQueries({ queryKey: [key] }));
      },
    });
  }

  function useUpdate() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async ({ id, data }: { id: string | number; data: Partial<TForm> }) => {
        const body = buildFormData ? buildFormData(data as TForm) : buildJsonData ? buildJsonData(data as TForm) : data;
        const response = await api.put<ApiResponse<TData>>(`/admin/${resource}/${id}`, body);
        return response.data.data;
      },
      onSuccess: (_, { id }) => {
        allQueryKeys.forEach(key => queryClient.invalidateQueries({ queryKey: [key] }));
        queryClient.invalidateQueries({ queryKey: [`admin-${resource}`, id] });
      },
    });
  }

  function useDelete() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (id: string | number) => {
        await api.delete(`/admin/${resource}/${id}`);
      },
      onSuccess: () => {
        allQueryKeys.forEach(key => queryClient.invalidateQueries({ queryKey: [key] }));
      },
    });
  }

  return {
    usePublicList,
    usePublicDetail,
    useAdminList,
    useAdminDetail,
    useCreate,
    useUpdate,
    useDelete,
  };
}
