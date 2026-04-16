import api, { mockApi } from './api';
import { Appointment } from '../types';

const USE_MOCK = true;

export const appointmentService = {
  async getAll(): Promise<Appointment[]> {
    if (USE_MOCK) {
      const response = await mockApi.get<Appointment[]>('/appointments');
      return response.data;
    }
    const response = await api.get<Appointment[]>('/appointments');
    return response.data;
  },

  async create(appointment: Omit<Appointment, 'id'>): Promise<Appointment> {
    if (USE_MOCK) {
      const response = await mockApi.post<Appointment>('/appointments', appointment);
      return response.data;
    }
    const response = await api.post<Appointment>('/appointments', appointment);
    return response.data;
  },

  async updateStatus(id: string, status: Appointment['status']): Promise<Appointment> {
    if (USE_MOCK) {
      return { id, status } as Appointment;
    }
    const response = await api.patch<Appointment>(`/appointments/${id}/status`, { status });
    return response.data;
  },
};
