import api, { mockApi } from './api';
import { StaffMember } from '../types';

const USE_MOCK = true;

export const staffService = {
  async getAll(): Promise<StaffMember[]> {
    if (USE_MOCK) {
      const response = await mockApi.get<StaffMember[]>('/staff');
      return response.data;
    }
    const response = await api.get<StaffMember[]>('/staff');
    return response.data;
  },

  async create(staff: Omit<StaffMember, 'id'>): Promise<StaffMember> {
    if (USE_MOCK) {
      const response = await mockApi.post<StaffMember>('/staff', staff);
      return response.data;
    }
    const response = await api.post<StaffMember>('/staff', staff);
    return response.data;
  },
};
