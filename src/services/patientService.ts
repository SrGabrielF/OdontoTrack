import { mockApi } from './api';
import { Patient } from '../types';

export const patientService = {
  getAll: async () => {
    const response = await mockApi.get<Patient[]>('/patients');
    return response.data;
  },
  getById: async (id: string) => {
    const patients = await patientService.getAll();
    return patients.find(p => p.id === id);
  },
  create: async (patient: Omit<Patient, 'id' | 'createdAt'>) => {
    const response = await mockApi.post<Patient>('/patients', patient);
    return response.data;
  },
};
