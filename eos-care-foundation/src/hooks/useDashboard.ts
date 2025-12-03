import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';
import type { DashboardStats, ApiResponse } from '../lib/types';

export interface Activity {
  id: string;
  type: 'berita' | 'donasi' | 'kegiatan' | 'user';
  title: string;
  description: string;
  meta?: string;
  timestamp: string;
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: async () => {
      const response = await api.get<ApiResponse<DashboardStats>>('/admin/dashboard');
      return response.data.data;
    },
  });
}

export function useRecentActivity() {
  return useQuery({
    queryKey: ['admin-activities'],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Activity[]>>('/admin/activities');
      return response.data.data;
    },
  });
}
