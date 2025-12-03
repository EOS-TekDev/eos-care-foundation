import { useQuery } from '@tanstack/react-query';
import { createResourceHooks } from '../lib/createResourceHooks';
import api from '../lib/api';
import type { TeamMember, TeamMemberForm, ApiResponse } from '../lib/types';

const teamHooks = createResourceHooks<TeamMember, TeamMemberForm>({
  resource: 'team',
  buildFormData: (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('role', data.role);
    formData.append('order', String(data.order));
    formData.append('isActive', String(data.isActive));
    if (data.photo) formData.append('photo', data.photo);
    return formData;
  },
});

export function usePublicTeam() {
  return useQuery({
    queryKey: ['public-team'],
    queryFn: async () => {
      const response = await api.get<ApiResponse<TeamMember[]>>('/public/team');
      return response.data.data;
    },
  });
}

export const useAdminTeam = teamHooks.useAdminList;
export const useAdminTeamDetail = teamHooks.useAdminDetail;
export const useCreateTeam = teamHooks.useCreate;
export const useUpdateTeam = teamHooks.useUpdate;
export const useDeleteTeam = teamHooks.useDelete;
