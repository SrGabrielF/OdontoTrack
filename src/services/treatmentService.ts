import api, { mockApi } from './api';
import { Treatment } from '../types';

const USE_MOCK = true;

export const treatmentService = {
  async getAll(): Promise<Treatment[]> {
    if (USE_MOCK) {
      const response = await mockApi.get<Treatment[]>('/treatments');
      return response.data;
    }
    const response = await api.get<Treatment[]>('/treatments');
    return response.data;
  },

  async create(treatment: Omit<Treatment, 'id'>): Promise<Treatment> {
    if (USE_MOCK) {
      const response = await mockApi.post<Treatment>('/treatments', treatment);
      return response.data;
    }
    const response = await api.post<Treatment>('/treatments', treatment);
    return response.data;
  },
};
