import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createResourceHooks } from '../lib/createResourceHooks';
import api from '../lib/api';
import type { Donasi, DonasiTransaction, DonasiForm, DonateForm, PaginatedResponse, ApiResponse, CreateTransactionResponse } from '../lib/types';

const donasiHooks = createResourceHooks<Donasi, DonasiForm>({
  resource: 'donasi',
  extraQueryKeys: ['admin-donasi-active'],
  buildFormData: (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('targetAmount', String(data.targetAmount));
    formData.append('isActive', String(data.isActive));
    if (data.deadline) formData.append('deadline', data.deadline);
    if (data.image) formData.append('image', data.image);
    return formData;
  },
});

// Standard CRUD exports
export const usePublicDonasi = donasiHooks.usePublicList;
export const usePublicDonasiDetail = donasiHooks.usePublicDetail;
export const useAdminDonasi = donasiHooks.useAdminList;
export const useAdminDonasiDetail = donasiHooks.useAdminDetail;
export const useCreateDonasi = donasiHooks.useCreate;
export const useUpdateDonasi = donasiHooks.useUpdate;
export const useDeleteDonasi = donasiHooks.useDelete;

// Donasi-specific hooks (can't be generalized)
export function useActiveDonasi() {
  return useQuery({
    queryKey: ['admin-donasi-active'],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Donasi[]>>('/admin/donasi/list/active');
      return response.data.data;
    },
  });
}

export function useDonasiTransactions(donasiId: string, params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ['admin-donasi-transactions', donasiId, params],
    queryFn: async () => {
      const response = await api.get<PaginatedResponse<DonasiTransaction>>(`/admin/donasi/${donasiId}/transactions`, { params });
      return response.data;
    },
    enabled: !!donasiId,
  });
}

export function useCreateDonation(donasiId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: DonateForm) => {
      const response = await api.post<CreateTransactionResponse>(`/public/donasi/${donasiId}/donate`, data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['public-donasi', donasiId] });
    },
  });
}
