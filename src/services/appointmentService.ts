import { mockApi } from './api';
import { Appointment } from '../types';

export const appointmentService = {
  getAll: async () => {
    const response = await mockApi.get<Appointment[]>('/appointments');
    return response.data;
  },
  create: async (appointment: Omit<Appointment, 'id'>) => {
    const response = await mockApi.post<Appointment>('/appointments', appointment);
    return response.data;
  },
};
