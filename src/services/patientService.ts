import api, { mockApi } from './api';
import { Patient } from '../types';

const USE_MOCK = true; // Toggle for development

export const patientService = {
  async getAll(): Promise<Patient[]> {
    if (USE_MOCK) {
      const response = await mockApi.get<Patient[]>('/patients');
      return response.data;
    }
    const response = await api.get<Patient[]>('/patients');
    return response.data;
  },

  async getById(id: string): Promise<Patient | undefined> {
    if (USE_MOCK) {
      const patients = await this.getAll();
      return patients.find((p) => p.id === id);
    }
    const response = await api.get<Patient>(`/patients/${id}`);
    return response.data;
  },

  async create(patient: Omit<Patient, 'id' | 'createdAt'>): Promise<Patient> {
    if (USE_MOCK) {
      const response = await mockApi.post<Patient>('/patients', patient);
      return response.data;
    }
    const response = await api.post<Patient>('/patients', patient);
    return response.data;
  },

  async update(id: string, patient: Partial<Patient>): Promise<Patient> {
    const response = await api.patch<Patient>(`/patients/${id}`, patient);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/patients/${id}`);
  },
};
